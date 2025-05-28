<?php
// backend/src/Controllers/BaseController.php

declare(strict_types=1);

namespace ExpenseManagement\Controllers;

use ExpenseManagement\Utils\Response;

abstract class BaseController
{
    protected function getRequestData(): array
    {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        if (json_last_error() !== JSON_ERROR_NONE && !empty($input)) {
            Response::error('Invalid JSON data', 400);
        }

        return $data ?? [];
    }

    protected function validateRequiredFields(array $data, array $requiredFields): void
    {
        $missing = [];
        foreach ($requiredFields as $field) {
            if (
                !array_key_exists($field, $data) ||
                (is_string($data[$field]) && trim($data[$field]) === '')
            ) {
                $missing[] = $field;
            }
        }

        if (!empty($missing)) {
            Response::validationError(
                ['required' => $missing],
                'Missing required fields: ' . implode(', ', $missing)
            );
        }
    }

    protected function getPathParameter(string $path, int $position): ?string
    {
        $parts = explode('/', trim($path, '/'));
        return $parts[$position] ?? null;
    }

    protected function parseId(string $path, int $position): int
    {
        $id = $this->getPathParameter($path, $position);

        if ($id === null || !is_numeric($id) || (int)$id <= 0) {
            Response::error('Invalid ID parameter', 400);
        }

        return (int)$id;
    }
}
