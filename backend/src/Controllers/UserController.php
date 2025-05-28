<?php
// backend/src/Controllers/UserController.php

declare(strict_types=1);

namespace ExpenseManagement\Controllers;

use ExpenseManagement\Services\UserService;
use ExpenseManagement\Utils\Response;
use Exception;

class UserController extends BaseController
{
    private UserService $userService;

    public function __construct()
    {
        $this->userService = new UserService();
    }

    public function index(): void
    {
        try {
            $users = $this->userService->getAllUsers();
            Response::success($users, 'Users retrieved successfully');
        } catch (Exception $e) {
            Response::error('Failed to retrieve users: ' . $e->getMessage(), 500);
        }
    }

    public function show(string $path): void
    {
        try {
            $id = $this->parseId($path, 1);
            $user = $this->userService->getUserById($id);

            if (!$user) {
                Response::notFound('User not found');
            }

            Response::success($user, 'User retrieved successfully');
        } catch (Exception $e) {
            if ($e->getCode() === 404) {
                Response::notFound($e->getMessage());
            }
            Response::error('Failed to retrieve user: ' . $e->getMessage(), 500);
        }
    }

    public function store(): void
    {
        try {
            $data = $this->getRequestData();
            $this->validateRequiredFields($data, ['name', 'email']);

            $user = $this->userService->createUser($data);
            Response::success($user, 'User created successfully', 201);
        } catch (Exception $e) {
            if ($e->getCode() === 422) {
                Response::validationError(
                    $this->userService->getValidationErrors(),
                    $e->getMessage()
                );
            }
            Response::error('Failed to create user: ' . $e->getMessage(), 500);
        }
    }

    public function update(string $path): void
    {
        try {
            $id = $this->parseId($path, 1);
            $data = $this->getRequestData();
            $this->validateRequiredFields($data, ['name', 'email']);

            $user = $this->userService->updateUser($id, $data);

            if (!$user) {
                Response::notFound('User not found');
            }

            Response::success($user, 'User updated successfully');
        } catch (Exception $e) {
            if ($e->getCode() === 404) {
                Response::notFound($e->getMessage());
            }
            if ($e->getCode() === 422) {
                Response::validationError(
                    $this->userService->getValidationErrors(),
                    $e->getMessage()
                );
            }
            Response::error('Failed to update user: ' . $e->getMessage(), 500);
        }
    }

    public function destroy(string $path): void
    {
        try {
            $id = $this->parseId($path, 1);
            $deleted = $this->userService->deleteUser($id);

            if (!$deleted) {
                Response::error('Failed to delete user', 500);
            }

            Response::success(null, 'User deleted successfully');
        } catch (Exception $e) {
            if ($e->getCode() === 404) {
                Response::notFound($e->getMessage());
            }
            Response::error('Failed to delete user: ' . $e->getMessage(), 500);
        }
    }
}
