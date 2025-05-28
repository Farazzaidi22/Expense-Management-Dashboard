<?php
// backend/public/index.php

declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../vendor/autoload.php';

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

    // Handle API routes
    $api = new Api();
    $api->handleRequest();

} catch (Exception $e) {
    Response::error('Internal Server Error: ' . $e->getMessage(), 500);
}