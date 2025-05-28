<?php
// backend/src/Models/User.php

declare(strict_types=1);

namespace ExpenseManagement\Models;

use PDO;

class User extends BaseModel
{
    protected string $table = 'users';
    protected array $fillable = ['name', 'email'];

    public function findByEmail(string $email): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->bindValue(':email', $email);
        $stmt->execute();

        $result = $stmt->fetch();
        return $result ?: null;
    }

    public function findAllWithTotals(): array
    {
        $sql = "
            SELECT 
                u.*,
                COALESCE(income.total, 0) as total_income,
                COALESCE(expenses.total, 0) as total_expense
            FROM users u
            LEFT JOIN (
                SELECT user_id, SUM(amount) as total
                FROM transactions 
                WHERE type = 'income'
                GROUP BY user_id
            ) income ON u.id = income.user_id
            LEFT JOIN (
                SELECT user_id, SUM(amount) as total
                FROM transactions 
                WHERE type = 'expense'
                GROUP BY user_id
            ) expenses ON u.id = expenses.user_id
            ORDER BY u.created_at DESC
        ";

        $stmt = $this->db->query($sql);
        return $stmt->fetchAll();
    }

    public function findWithTotals(int $id): ?array
    {
        $sql = "
            SELECT 
                u.*,
                COALESCE(income.total, 0) as total_income,
                COALESCE(expenses.total, 0) as total_expense
            FROM users u
            LEFT JOIN (
                SELECT user_id, SUM(amount) as total
                FROM transactions 
                WHERE type = 'income' AND user_id = :id
                GROUP BY user_id
            ) income ON u.id = income.user_id
            LEFT JOIN (
                SELECT user_id, SUM(amount) as total
                FROM transactions 
                WHERE type = 'expense' AND user_id = :id
                GROUP BY user_id
            ) expenses ON u.id = expenses.user_id
            WHERE u.id = :id
        ";

        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetch();
        return $result ?: null;
    }

    public function emailExists(string $email, ?int $excludeId = null): bool
    {
        $sql = "SELECT 1 FROM users WHERE email = :email";
        $params = [':email' => $email];

        if ($excludeId !== null) {
            $sql .= " AND id != :exclude_id";
            $params[':exclude_id'] = $excludeId;
        }

        $stmt = $this->db->prepare($sql);
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        $stmt->execute();

        return $stmt->fetch() !== false;
    }
}
