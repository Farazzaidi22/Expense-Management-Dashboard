<?php
// backend/src/Config/Database.php

declare(strict_types=1);

namespace ExpenseManagement\Config;

use PDO;
use PDOException;
use Exception;

class Database
{
    private static ?PDO $instance = null;
    private static array $config;

    public static function getInstance(): PDO
    {
        if (self::$instance === null) {
            self::$config = [
                'host' => $_ENV['DB_HOST'] ?? 'localhost',
                'port' => $_ENV['DB_PORT'] ?? '5432',
                'dbname' => $_ENV['DB_NAME'] ?? 'expense_management',
                'user' => $_ENV['DB_USER'] ?? 'postgres',
                'password' => $_ENV['DB_PASSWORD'] ?? 'password'
            ];

            self::connect();
        }

        return self::$instance;
    }

    private static function connect(): void
    {
        try {
            $dsn = sprintf(
                'pgsql:host=%s;port=%s;dbname=%s',
                self::$config['host'],
                self::$config['port'],
                self::$config['dbname']
            );

            self::$instance = new PDO(
                $dsn,
                self::$config['user'],
                self::$config['password'],
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );

            // Set timezone
            self::$instance->exec("SET timezone = 'UTC'");
        } catch (PDOException $e) {
            throw new Exception('Database connection failed: ' . $e->getMessage());
        }
    }

    public static function beginTransaction(): void
    {
        self::getInstance()->beginTransaction();
    }

    public static function commit(): void
    {
        self::getInstance()->commit();
    }

    public static function rollback(): void
    {
        self::getInstance()->rollBack();
    }
}
