<?php
// backend/src/Controllers/TransactionController.php

declare(strict_types=1);

namespace ExpenseManagement\Controllers;

use ExpenseManagement\Services\TransactionService;
use ExpenseManagement\Utils\Response;
use Exception;

class TransactionController extends BaseController
{
    private TransactionService $transactionService;

    public function __construct()
    {
        $this->transactionService = new TransactionService();
    }

    public function getUserTransactions(string $path): void
    {
        try {
            $userId = $this->parseId($path, 1);
            $transactions = $this->transactionService->getUserTransactions($userId);
            Response::success($transactions, 'Transactions retrieved successfully');
        } catch (Exception $e) {
            if ($e->getCode() === 404) {
                Response::notFound($e->getMessage());
            }
            Response::error('Failed to retrieve transactions: ' . $e->getMessage(), 500);
        }
    }

    public function store(string $path): void
    {
        try {
            $userId = $this->parseId($path, 1);
            $data = $this->getRequestData();
            $this->validateRequiredFields($data, ['type', 'amount', 'category', 'date']);

            $transaction = $this->transactionService->createTransaction($userId, $data);
            Response::success($transaction, 'Transaction created successfully', 201);
        } catch (Exception $e) {
            if ($e->getCode() === 404) {
                Response::notFound($e->getMessage());
            }
            if ($e->getCode() === 422) {
                Response::validationError(
                    $this->transactionService->getValidationErrors(),
                    $e->getMessage()
                );
            }
            Response::error('Failed to create transaction: ' . $e->getMessage(), 500);
        }
    }

    public function update(string $path): void
    {
        try {
            $id = $this->parseId($path, 1);
            $data = $this->getRequestData();
            $this->validateRequiredFields($data, ['type', 'amount', 'category', 'date']);

            $transaction = $this->transactionService->updateTransaction($id, $data);

            if (!$transaction) {
                Response::notFound('Transaction not found');
            }

            Response::success($transaction, 'Transaction updated successfully');
        } catch (Exception $e) {
            if ($e->getCode() === 404) {
                Response::notFound($e->getMessage());
            }
            if ($e->getCode() === 422) {
                Response::validationError(
                    $this->transactionService->getValidationErrors(),
                    $e->getMessage()
                );
            }
            Response::error('Failed to update transaction: ' . $e->getMessage(), 500);
        }
    }

    public function destroy(string $path): void
    {
        try {
            $id = $this->parseId($path, 1);
            $deleted = $this->transactionService->deleteTransaction($id);

            if (!$deleted) {
                Response::error('Failed to delete transaction', 500);
            }

            Response::success(null, 'Transaction deleted successfully');
        } catch (Exception $e) {
            if ($e->getCode() === 404) {
                Response::notFound($e->getMessage());
            }
            Response::error('Failed to delete transaction: ' . $e->getMessage(), 500);
        }
    }

    public function getExpensesByCategory(): void
    {
        try {
            $data = $this->transactionService->getExpensesByCategory();
            Response::success($data, 'Expenses by category retrieved successfully');
        } catch (Exception $e) {
            Response::error('Failed to retrieve expenses by category: ' . $e->getMessage(), 500);
        }
    }
}
