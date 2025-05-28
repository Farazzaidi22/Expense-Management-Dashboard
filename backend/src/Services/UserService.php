<?php
// backend/src/Services/UserService.php

declare(strict_types=1);

namespace ExpenseManagement\Services;

use ExpenseManagement\Models\User;
use ExpenseManagement\Models\Transaction;
use ExpenseManagement\Validators\UserValidator;
use ExpenseManagement\Config\Database;
use Exception;

class UserService
{
    private User $userModel;
    private Transaction $transactionModel;
    private UserValidator $validator;

    public function __construct()
    {
        $this->userModel = new User();
        $this->transactionModel = new Transaction();
        $this->validator = new UserValidator();
    }

    public function getAllUsers(): array
    {
        return $this->userModel->findAllWithTotals();
    }

    public function getUserById(int $id): ?array
    {
        return $this->userModel->findWithTotals($id);
    }

    public function createUser(array $data): array
    {
        if (!$this->validator->validate($data)) {
            throw new Exception('Validation failed', 422);
        }

        return $this->userModel->create([
            'name' => trim($data['name']),
            'email' => trim(strtolower($data['email']))
        ]);
    }

    public function updateUser(int $id, array $data): ?array
    {
        if (!$this->userModel->exists($id)) {
            throw new Exception('User not found', 404);
        }

        if (!$this->validator->validate($data, $id)) {
            throw new Exception('Validation failed', 422);
        }

        return $this->userModel->update($id, [
            'name' => trim($data['name']),
            'email' => trim(strtolower($data['email']))
        ]);
    }

    public function deleteUser(int $id): bool
    {
        if (!$this->userModel->exists($id)) {
            throw new Exception('User not found', 404);
        }

        try {
            Database::beginTransaction();

            // Delete all user's transactions first
            $this->transactionModel->deleteByUserId($id);

            // Delete the user
            $result = $this->userModel->delete($id);

            Database::commit();
            return $result;
        } catch (Exception $e) {
            Database::rollback();
            throw $e;
        }
    }

    public function getValidationErrors(): array
    {
        return $this->validator->getErrors();
    }
}
