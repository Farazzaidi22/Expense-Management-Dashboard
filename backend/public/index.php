<?php
// backend/public/index.php

declare(strict_types=1);

// Set CORS headers first
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Debug: Check if autoload exists
$autoloadPath = __DIR__ . '/../vendor/autoload.php';
if (!file_exists($autoloadPath)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Autoload file not found',
        'debug' => [
            'looking_for' => $autoloadPath,
            'current_dir' => __DIR__,
            'files_in_parent' => is_readable(__DIR__ . '/..') ? scandir(__DIR__ . '/..') : 'Cannot read parent directory'
        ]
    ]);
    exit();
}

require_once $autoloadPath;

use ExpenseManagement\Config\Database;
use ExpenseManagement\Routes\Api;
use ExpenseManagement\Utils\Response;
use Dotenv\Dotenv;

try {
    // Load environment variables
    $dotenv = Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->load();

    // Initialize database connection
    Database::getInstance();

    // Debug: Log the request
    error_log("Request: " . $_SERVER['REQUEST_METHOD'] . " " . $_SERVER['REQUEST_URI']);

    // Handle API routes
    $api = new Api();
    $api->handleRequest();
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());

    // Return JSON error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Internal Server Error: ' . $e->getMessage(),
        'timestamp' => date('c')
    ]);
}
