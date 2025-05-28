<?php
// backend/src/Validators/TransactionValidator.php

declare(strict_types=1);

namespace ExpenseManagement\Validators;

use ExpenseManagement\Utils\Validation;

class TransactionValidator
{
    private array $errors = [];
    private array $validTypes = ['income', 'expense'];
    private array $validCategories = [
        'income',
        'food',
        'transportation',
        'housing',
        'utilities',
        'healthcare',
        'entertainment',
        'shopping',
        'education',
        'travel',
        'other'
    ];

    public function validate(array $data): bool
    {
        $this->errors = [];

        $this->validateType($data['type'] ?? '');
        $this->validateAmount($data['amount'] ?? '');
        $this->validateCategory($data['category'] ?? '', $data['type'] ?? '');
        $this->validateDescription($data['description'] ?? '');
        $this->validateDate($data['date'] ?? '');

        return empty($this->errors);
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    private function validateType(string $type): void
    {
        if (!Validation::required($type)) {
            $this->errors['type'][] = 'Type is required';
            return;
        }

        if (!Validation::inArray($type, $this->validTypes)) {
            $this->errors['type'][] = 'Type must be either income or expense';
        }
    }

    private function validateAmount(mixed $amount): void
    {
        if (!Validation::required($amount)) {
            $this->errors['amount'][] = 'Amount is required';
            return;
        }

        if (!Validation::numeric($amount)) {
            $this->errors['amount'][] = 'Amount must be a valid number';
            return;
        }

        $numericAmount = (float) $amount;

        if (!Validation::positive($numericAmount)) {
            $this->errors['amount'][] = 'Amount must be greater than 0';
        }

        if ($numericAmount < 0.01) {
            $this->errors['amount'][] = 'Amount must be at least $0.01';
        }

        if ($numericAmount > 999999.99) {
            $this->errors['amount'][] = 'Amount must be no more than $999,999.99';
        }
    }

    private function validateCategory(string $category, string $type): void
    {
        if (!Validation::required($category)) {
            $this->errors['category'][] = 'Category is required';
            return;
        }

        if (!Validation::inArray($category, $this->validCategories)) {
            $this->errors['category'][] = 'Invalid category selected';
            return;
        }

        // Income transactions must have 'income' category
        if ($type === 'income' && $category !== 'income') {
            $this->errors['category'][] = 'Income transactions must use the income category';
        }

        // Expense transactions cannot have 'income' category
        if ($type === 'expense' && $category === 'income') {
            $this->errors['category'][] = 'Expense transactions cannot use the income category';
        }
    }

    private function validateDescription(string $description): void
    {
        if (!Validation::maxLength($description, 500)) {
            $this->errors['description'][] = 'Description must be no more than 500 characters long';
        }
    }

    private function validateDate(string $date): void
    {
        if (!Validation::required($date)) {
            $this->errors['date'][] = 'Date is required';
            return;
        }

        if (!Validation::date($date)) {
            $this->errors['date'][] = 'Please enter a valid date in YYYY-MM-DD format';
            return;
        }

        if (!Validation::pastDate($date)) {
            $this->errors['date'][] = 'Date cannot be in the future';
        }
    }
}
