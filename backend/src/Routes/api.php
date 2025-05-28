<?php
// backend/src/Routes/Api.php

declare(strict_types=1);

namespace ExpenseManagement\Routes;

use ExpenseManagement\Controllers\UserController;
use ExpenseManagement\Controllers\TransactionController;
use ExpenseManagement\Utils\Response;

class Api
{
    private string $method;
    private string $path;
    private UserController $userController;
    private TransactionController $transactionController;

    public function __construct()
    {
        $this->method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $this->path = $this->parsePath();
        $this->userController = new UserController();
        $this->transactionController = new TransactionController();
    }

    public function handleRequest(): void
    {
        // Remove /api prefix if present
        $path = preg_replace('#^/api#', '', $this->path);
        $pathParts = explode('/', trim($path, '/'));

        if (empty($pathParts[0])) {
            Response::error('API endpoint not found', 404);
        }

        $resource = $pathParts[0];

        match ($resource) {
            'users' => $this->handleUserRoutes($path),
            'transactions' => $this->handleTransactionRoutes($path),
            'analytics' => $this->handleAnalyticsRoutes($path),
            default => Response::error('API endpoint not found', 404)
        };
    }

    private function handleUserRoutes(string $path): void
    {
        $pathParts = explode('/', trim($path, '/'));

        match ($this->method) {
            'GET' => $this->handleUserGetRoutes($path, $pathParts),
            'POST' => $this->handleUserPostRoutes($path, $pathParts),
            'PUT' => $this->handleUserPutRoutes($path, $pathParts),
            'DELETE' => $this->handleUserDeleteRoutes($path, $pathParts),
            default => Response::methodNotAllowed()
        };
    }

    private function handleUserGetRoutes(string $path, array $pathParts): void
    {
        if (count($pathParts) === 1) {
            // GET /users
            $this->userController->index();
        } elseif (count($pathParts) === 2 && is_numeric($pathParts[1])) {
            // GET /users/{id}
            $this->userController->show($path);
        } elseif (count($pathParts) === 3 && is_numeric($pathParts[1]) && $pathParts[2] === 'transactions') {
            // GET /users/{id}/transactions
            $this->transactionController->getUserTransactions($path);
        } else {
            Response::notFound();
        }
    }

    private function handleUserPostRoutes(string $path, array $pathParts): void
    {
        if (count($pathParts) === 1) {
            // POST /users
            $this->userController->store();
        } elseif (count($pathParts) === 3 && is_numeric($pathParts[1]) && $pathParts[2] === 'transactions') {
            // POST /users/{id}/transactions
            $this->transactionController->store($path);
        } else {
            Response::notFound();
        }
    }

    private function handleUserPutRoutes(string $path, array $pathParts): void
    {
        if (count($pathParts) === 2 && is_numeric($pathParts[1])) {
            // PUT /users/{id}
            $this->userController->update($path);
        } else {
            Response::notFound();
        }
    }

    private function handleUserDeleteRoutes(string $path, array $pathParts): void
    {
        if (count($pathParts) === 2 && is_numeric($pathParts[1])) {
            // DELETE /users/{id}
            $this->userController->destroy($path);
        } else {
            Response::notFound();
        }
    }

    private function handleTransactionRoutes(string $path): void
    {
        $pathParts = explode('/', trim($path, '/'));

        match ($this->method) {
            'PUT' => $this->handleTransactionPutRoutes($path, $pathParts),
            'DELETE' => $this->handleTransactionDeleteRoutes($path, $pathParts),
            default => Response::methodNotAllowed()
        };
    }

    private function handleTransactionPutRoutes(string $path, array $pathParts): void
    {
        if (count($pathParts) === 2 && is_numeric($pathParts[1])) {
            // PUT /transactions/{id}
            $this->transactionController->update($path);
        } else {
            Response::notFound();
        }
    }

    private function handleTransactionDeleteRoutes(string $path, array $pathParts): void
    {
        if (count($pathParts) === 2 && is_numeric($pathParts[1])) {
            // DELETE /transactions/{id}
            $this->transactionController->destroy($path);
        } else {
            Response::notFound();
        }
    }

    private function handleAnalyticsRoutes(string $path): void
    {
        if ($this->method !== 'GET') {
            Response::methodNotAllowed();
        }

        $pathParts = explode('/', trim($path, '/'));

        if (count($pathParts) === 2 && $pathParts[1] === 'expenses-by-category') {
            // GET /analytics/expenses-by-category
            $this->transactionController->getExpensesByCategory();
        } else {
            Response::notFound();
        }
    }

    private function parsePath(): string
    {
        $path = $_SERVER['REQUEST_URI'] ?? '/';

        // Remove query string
        if (($pos = strpos($path, '?')) !== false) {
            $path = substr($path, 0, $pos);
        }

        return $path;
    }
}
