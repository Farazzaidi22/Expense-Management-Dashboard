<?php
// backend/src/Validators/UserValidator.php

declare(strict_types=1);

namespace ExpenseManagement\Validators;

use ExpenseManagement\Utils\Validation;
use ExpenseManagement\Models\User;

class UserValidator
{
    private array $errors = [];
    private User $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    public function validate(array $data, ?int $userId = null): bool
    {
        $this->errors = [];

        $this->validateName($data['name'] ?? '');
        $this->validateEmail($data['email'] ?? '', $userId);

        return empty($this->errors);
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    private function validateName(string $name): void
    {
        if (!Validation::required($name)) {
            $this->errors['name'][] = 'Name is required';
            return;
        }

        if (!Validation::minLength($name, 2)) {
            $this->errors['name'][] = 'Name must be at least 2 characters long';
        }

        if (!Validation::maxLength($name, 100)) {
            $this->errors['name'][] = 'Name must be no more than 100 characters long';
        }
    }

    private function validateEmail(string $email, ?int $userId = null): void
    {
        if (!Validation::required($email)) {
            $this->errors['email'][] = 'Email is required';
            return;
        }

        if (!Validation::email($email)) {
            $this->errors['email'][] = 'Please enter a valid email address';
            return;
        }

        if ($this->userModel->emailExists($email, $userId)) {
            $this->errors['email'][] = 'This email address is already in use';
        }
    }
}
