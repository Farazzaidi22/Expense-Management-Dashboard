<?php
// backend/src/Models/Transaction.php

declare(strict_types=1);

namespace ExpenseManagement\Models;

use PDO;

class Transaction extends BaseModel
{
    protected string $table = 'transactions';
    protected array $fillable = ['user_id', 'type', 'amount', 'category', 'description', 'date'];

    public function findByUserId(int $userId): array
    {
        $stmt = $this->db->prepare("
            SELECT * FROM transactions 
            WHERE user_id = :user_id 
            ORDER BY date DESC, created_at DESC
        ");
        $stmt->bindValue(':user_id', $userId, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll();
    }

    public function getExpensesByCategory(): array
    {
        $sql = "
            SELECT 
                category,
                SUM(amount) as total_amount,
                COUNT(*) as transaction_count
            FROM transactions 
            WHERE type = 'expense'
            GROUP BY category
            HAVING SUM(amount) > 0
            ORDER BY total_amount DESC
        ";

        $stmt = $this->db->query($sql);
        $results = $stmt->fetchAll();

        // Calculate total for percentages
        $totalExpenses = array_sum(array_column($results, 'total_amount'));

        // Add percentage and color to each category
        $colors = [
            'food' => '#FF6B6B',
            'transportation' => '#4ECDC4',
            'housing' => '#45B7D1',
            'utilities' => '#96CEB4',
            'healthcare' => '#FFEAA7',
            'entertainment' => '#DDA0DD',
            'shopping' => '#98D8C8',
            'education' => '#F7DC6F',
            'travel' => '#BB8FCE',
            'other' => '#AED6F1'
        ];

        return array_map(function ($item) use ($totalExpenses, $colors) {
            return [
                'category' => $item['category'],
                'amount' => (float) $item['total_amount'],
                'percentage' => $totalExpenses > 0 ? ($item['total_amount'] / $totalExpenses) * 100 : 0,
                'color' => $colors[$item['category']] ?? $colors['other']
            ];
        }, $results);
    }

    public function getUserTransactionSummary(int $userId): array
    {
        $sql = "
            SELECT 
                type,
                SUM(amount) as total_amount,
                COUNT(*) as transaction_count
            FROM transactions 
            WHERE user_id = :user_id
            GROUP BY type
        ";

        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':user_id', $userId, PDO::PARAM_INT);
        $stmt->execute();

        $results = $stmt->fetchAll();

        $summary = [
            'total_income' => 0,
            'total_expenses' => 0,
            'income_count' => 0,
            'expense_count' => 0
        ];

        foreach ($results as $result) {
            if ($result['type'] === 'income') {
                $summary['total_income'] = (float) $result['total_amount'];
                $summary['income_count'] = (int) $result['transaction_count'];
            } else {
                $summary['total_expenses'] = (float) $result['total_amount'];
                $summary['expense_count'] = (int) $result['transaction_count'];
            }
        }

        $summary['net_amount'] = $summary['total_income'] - $summary['total_expenses'];
        $summary['total_transactions'] = $summary['income_count'] + $summary['expense_count'];

        return $summary;
    }

    public function deleteByUserId(int $userId): bool
    {
        $stmt = $this->db->prepare("DELETE FROM transactions WHERE user_id = :user_id");
        $stmt->bindValue(':user_id', $userId, PDO::PARAM_INT);
        return $stmt->execute();
    }
}
