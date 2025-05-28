<?php
// backend/src/Services/TransactionService.php

declare(strict_types=1);

namespace ExpenseManagement\Services;

use ExpenseManagement\Models\Transaction;
use ExpenseManagement\Models\User;
use ExpenseManagement\Validators\TransactionValidator;
use Exception;

class TransactionService
{
    private Transaction $transactionModel;
    private User $userModel;
    private TransactionValidator $validator;

    public function __construct()
    {
        $this->transactionModel = new Transaction();
        $this->userModel = new User();
        $this->validator = new TransactionValidator();
    }

    public function getUserTransactions(int $userId): array
    {
        if (!$this->userModel->exists($userId)) {
            throw new Exception('User not found', 404);
        }

        return $this->transactionModel->findByUserId($userId);
    }

    public function getTransactionById(int $id): ?array
    {
        return $this->transactionModel->find($id);
    }

    public function createTransaction(int $userId, array $data): array
    {
        if (!$this->userModel->exists($userId)) {
            throw new Exception('User not found', 404);
        }

        if (!$this->validator->validate($data)) {
            throw new Exception('Validation failed', 422);
        }

        return $this->transactionModel->create([
            'user_id' => $userId,
            'type' => $data['type'],
            'amount' => (float) $data['amount'],
            'category' => $data['category'],
            'description' => trim($data['description'] ?? ''),
            'date' => $data['date']
        ]);
    }

    public function updateTransaction(int $id, array $data): ?array
    {
        $transaction = $this->transactionModel->find($id);
        if (!$transaction) {
            throw new Exception('Transaction not found', 404);
        }

        if (!$this->validator->validate($data)) {
            throw new Exception('Validation failed', 422);
        }

        return $this->transactionModel->update($id, [
            'type' => $data['type'],
            'amount' => (float) $data['amount'],
            'category' => $data['category'],
            'description' => trim($data['description'] ?? ''),
            'date' => $data['date']
        ]);
    }

    public function deleteTransaction(int $id): bool
    {
        if (!$this->transactionModel->exists($id)) {
            throw new Exception('Transaction not found', 404);
        }

        return $this->transactionModel->delete($id);
    }

    public function getExpensesByCategory(): array
    {
        return $this->transactionModel->getExpensesByCategory();
    }

    public function getUserTransactionSummary(int $userId): array
    {
        if (!$this->userModel->exists($userId)) {
            throw new Exception('User not found', 404);
        }

        return $this->transactionModel->getUserTransactionSummary($userId);
    }

    public function getValidationErrors(): array
    {
        return $this->validator->getErrors();
    }
}
