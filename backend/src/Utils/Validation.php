<?php
// backend/src/Utils/Validation.php

declare(strict_types=1);

namespace ExpenseManagement\Utils;

class Validation
{
    public static function email(string $email): bool
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    public static function required(mixed $value): bool
    {
        if (is_string($value)) {
            return trim($value) !== '';
        }
        return $value !== null && $value !== '';
    }

    public static function minLength(string $value, int $min): bool
    {
        return strlen(trim($value)) >= $min;
    }

    public static function maxLength(string $value, int $max): bool
    {
        return strlen(trim($value)) <= $max;
    }

    public static function numeric(mixed $value): bool
    {
        return is_numeric($value);
    }

    public static function positive(mixed $value): bool
    {
        return is_numeric($value) && $value > 0;
    }

    public static function inArray(mixed $value, array $array): bool
    {
        return in_array($value, $array, true);
    }

    public static function date(string $date): bool
    {
        $d = \DateTime::createFromFormat('Y-m-d', $date);
        return $d && $d->format('Y-m-d') === $date;
    }

    public static function pastDate(string $date): bool
    {
        if (!self::date($date)) {
            return false;
        }

        $inputDate = new \DateTime($date);
        $today = new \DateTime();
        $today->setTime(23, 59, 59);

        return $inputDate <= $today;
    }
}
