<?php
// backend/scripts/migrate.php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

try {
    echo "Starting database migration...\n";

    // Load environment variables
    $dotenv = Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->load();

    // Database connection
    $host = $_ENV['DB_HOST'] ?? 'postgres';
    $port = $_ENV['DB_PORT'] ?? '5432';
    $dbname = $_ENV['DB_NAME'] ?? 'expense_management';
    $user = $_ENV['DB_USER'] ?? 'postgres';
    $password = $_ENV['DB_PASSWORD'] ?? 'password';

    $dsn = "pgsql:host={$host};port={$port};dbname={$dbname}";

    echo "Connecting to database: {$dsn}\n";

    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    echo "Connected to database successfully\n";

    // Migration files directory
    $migrationsDir = __DIR__ . '/../database/migrations';
    $seedersDir = __DIR__ . '/../database/seeders';

    // Create migrations table to track what has been run
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS migrations (
            id SERIAL PRIMARY KEY,
            migration VARCHAR(255) NOT NULL UNIQUE,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ");

    // Get all migration files
    $migrationFiles = glob($migrationsDir . '/*.sql');
    sort($migrationFiles);

    if (empty($migrationFiles)) {
        echo "No migration files found in {$migrationsDir}\n";
    } else {
        // Run migrations
        echo "Running migrations...\n";
        foreach ($migrationFiles as $file) {
            $filename = basename($file);

            // Check if migration has already been run
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM migrations WHERE migration = ?");
            $stmt->execute([$filename]);
            $count = $stmt->fetchColumn();

            if ($count > 0) {
                echo "⏭️  Migration {$filename} already executed, skipping\n";
                continue;
            }

            echo "Running migration: {$filename}\n";

            $sql = file_get_contents($file);
            if ($sql === false) {
                throw new Exception("Failed to read migration file: {$filename}");
            }

            // Execute migration
            $pdo->exec($sql);

            // Record that migration has been run
            $stmt = $pdo->prepare("INSERT INTO migrations (migration) VALUES (?)");
            $stmt->execute([$filename]);

            echo "✅ Migration {$filename} completed successfully\n";
        }
    }

    // Check if we should run seeders (only in development)
    $shouldSeed = ($_ENV['APP_ENV'] ?? 'production') === 'development';

    if ($shouldSeed) {
        echo "\nRunning seeders (development environment)...\n";

        // Create seeders tracking table
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS seeders (
                id SERIAL PRIMARY KEY,
                seeder VARCHAR(255) NOT NULL UNIQUE,
                executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Get all seeder files
        $seederFiles = glob($seedersDir . '/*.sql');
        sort($seederFiles);

        if (!empty($seederFiles)) {
            foreach ($seederFiles as $file) {
                $filename = basename($file);

                // Check if seeder has already been run
                $stmt = $pdo->prepare("SELECT COUNT(*) FROM seeders WHERE seeder = ?");
                $stmt->execute([$filename]);
                $count = $stmt->fetchColumn();

                if ($count > 0) {
                    echo "⏭️  Seeder {$filename} already executed, skipping\n";
                    continue;
                }

                echo "Running seeder: {$filename}\n";

                $sql = file_get_contents($file);
                if ($sql === false) {
                    throw new Exception("Failed to read seeder file: {$filename}");
                }

                $pdo->exec($sql);

                // Record that seeder has been run
                $stmt = $pdo->prepare("INSERT INTO seeders (seeder) VALUES (?)");
                $stmt->execute([$filename]);

                echo "✅ Seeder {$filename} completed successfully\n";
            }
        } else {
            echo "No seeder files found in {$seedersDir}\n";
        }
    } else {
        echo "Skipping seeders (not in development environment).\n";
    }

    echo "\n🎉 Database migration completed successfully!\n";
} catch (PDOException $e) {
    echo "❌ Database connection failed: " . $e->getMessage() . "\n";
    echo "Make sure PostgreSQL is running and connection details are correct.\n";
    exit(1);
} catch (Exception $e) {
    echo "❌ Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}
