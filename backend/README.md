<?php
// backend/scripts/migrate.php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use ExpenseManagement\Config\Database;
use Dotenv\Dotenv;

try {
    echo "Starting database migration...\n";

    // Load environment variables
    $dotenv = Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->load();

    // Get database connection
    $pdo = Database::getInstance();

    // Migration files directory
    $migrationsDir = __DIR__ . '/../database/migrations';
    $seedersDir = __DIR__ . '/../database/seeders';

    // Get all migration files
    $migrationFiles = glob($migrationsDir . '/*.sql');
    sort($migrationFiles);

    if (empty($migrationFiles)) {
        echo "No migration files found.\n";
        exit(1);
    }

    // Run migrations
    echo "Running migrations...\n";
    foreach ($migrationFiles as $file) {
        $filename = basename($file);
        echo "Running migration: {$filename}\n";
        
        $sql = file_get_contents($file);
        if ($sql === false) {
            throw new Exception("Failed to read migration file: {$filename}");
        }

        $pdo->exec($sql);
        echo "✓ Migration {$filename} completed successfully\n";
    }

    // Check if we should run seeders (only in development)
    $shouldSeed = ($_ENV['APP_ENV'] ?? 'production') === 'development';
    
    if ($shouldSeed) {
        echo "\nRunning seeders...\n";
        
        // Get all seeder files
        $seederFiles = glob($seedersDir . '/*.sql');
        sort($seederFiles);

        if (!empty($seederFiles)) {
            foreach ($seederFiles as $file) {
                $filename = basename($file);
                echo "Running seeder: {$filename}\n";
                
                $sql = file_get_contents($file);
                if ($sql === false) {
                    throw new Exception("Failed to read seeder file: {$filename}");
                }

                $pdo->exec($sql);
                echo "✓ Seeder {$filename} completed successfully\n";
            }
        } else {
            echo "No seeder files found.\n";
        }
    } else {
        echo "Skipping seeders (not in development environment).\n";
    }

    echo "\n✅ Database migration completed successfully!\n";

} catch (Exception $e) {
    echo "❌ Migration failed: " . $e->getMessage() . "\n";
    exit(1);
}

# backend/README.md
# Expense Management Backend API

A modern PHP REST API built with PostgreSQL for managing users, transactions, and expense analytics.

## 🚀 Tech Stack

- **PHP 8.2** with modern OOP practices
- **PostgreSQL 15** database
- **Composer** for dependency management
- **Docker** containerization
- **Apache** web server

## 📋 Features

### Core API Functionality
- **User Management**: Full CRUD operations for users
- **Transaction Management**: Income and expense tracking
- **Data Analytics**: Expense breakdown by category
- **Input Validation**: Comprehensive server-side validation
- **Error Handling**: Structured error responses

### Technical Features
- **Type Safety**: Strong typing with PHP 8.2 features
- **Database Migrations**: Automated schema management
- **Data Seeders**: Sample data for development
- **CORS Support**: Cross-origin request handling
- **RESTful Design**: Clean API endpoints following REST principles

## 🛠️ Development Setup

### Prerequisites
- Docker and Docker Compose
- PHP 8.2+ and Composer (for local development)
- PostgreSQL 15+ (if running without Docker)

### Docker Setup (Recommended)

1. **Build and start the container**
   ```bash
   docker-compose up --build
   ```

2. **API will be available at**
   ```
   http://localhost:8000/api
   ```

### Local Development Setup

1. **Install dependencies**
   ```bash
   composer install
   ```

2. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Database setup**
   ```bash
   # Create database
   createdb expense_management
   
   # Run migrations
   php scripts/migrate.php
   ```

4. **Start development server**
   ```bash
   php -S localhost:8000 -t public/
   ```

## 📖 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication
Currently, no authentication is required. All endpoints are publicly accessible.

### Response Format
All responses follow this structure:

**Success Response:**
```json
{
  "success": true,
  "data": {...},
  "message": "Success message"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": {...}
}
```

### API Endpoints

#### Users

**Get All Users**
```http
GET /api/users
```

**Get User by ID**
```http
GET /api/users/{id}
```

**Create User**
```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Update User**
```http
PUT /api/users/{id}
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

**Delete User**
```http
DELETE /api/users/{id}
```

#### Transactions

**Get User Transactions**
```http
GET /api/users/{userId}/transactions
```

**Create Transaction**
```http
POST /api/users/{userId}/transactions
Content-Type: application/json

{
  "type": "expense",
  "amount": 50.00,
  "category": "food",
  "description": "Lunch at restaurant",
  "date": "2025-05-27"
}
```

**Update Transaction**
```http
PUT /api/transactions/{id}
Content-Type: application/json

{
  "type": "expense",
  "amount": 60.00,
  "category": "food",
  "description": "Updated lunch expense",
  "date": "2025-05-27"
}
```

**Delete Transaction**
```http
DELETE /api/transactions/{id}
```

#### Analytics

**Get Expenses by Category**
```http
GET /api/analytics/expenses-by-category
```

### Request/Response Examples

#### Create User
**Request:**
```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Smith","email":"alice@example.com"}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Alice Smith",
    "email": "alice@example.com",
    "created_at": "2025-05-27 10:30:00",
    "updated_at": "2025-05-27 10:30:00"
  },
  "message": "User created successfully"
}
```

#### Create Transaction
**Request:**
```bash
curl -X POST http://localhost:8000/api/users/1/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "type": "expense",
    "amount": 25.50,
    "category": "food",
    "description": "Coffee and pastry",
    "date": "2025-05-27"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "type": "expense",
    "amount": 25.50,
    "category": "food",
    "description": "Coffee and pastry",
    "date": "2025-05-27",
    "created_at": "2025-05-27 10:35:00",
    "updated_at": "2025-05-27 10:35:00"
  },
  "message": "Transaction created successfully"
}
```

## 🏗️ Project Structure

```
backend/
├── public/
│   └── index.php          # Application entry point
├── src/
│   ├── Config/
│   │   └── Database.php   # Database configuration
│   ├── Controllers/       # HTTP request handlers
│   ├── Models/           # Data models
│   ├── Services/         # Business logic layer
│   ├── Validators/       # Input validation
│   ├── Routes/          # API routing
│   └── Utils/           # Utility classes
├── database/
│   ├── migrations/      # Database schema migrations
│   └── seeders/        # Sample data seeders
├── scripts/
│   ├── migrate.php     # Migration runner
│   └── setup.sh       # Docker setup script
├── composer.json       # PHP dependencies
├── Dockerfile         # Docker configuration
└── README.md         # This file
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    category VARCHAR(50) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Configuration

### Environment Variables
```bash
# Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=expense_management
DB_USER=postgres
DB_PASSWORD=password

# Application
APP_ENV=development
APP_DEBUG=true
APP_TIMEZONE=UTC

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Valid Transaction Categories
- `income` (for income transactions only)
- `food`
- `transportation`
- `housing`
- `utilities`
- `healthcare`
- `entertainment`
- `shopping`
- `education`
- `travel`
- `other`

## ✅ Input Validation

### User Validation
- **name**: Required, 2-100 characters
- **email**: Required, valid email format, unique

### Transaction Validation
- **type**: Required, must be 'income' or 'expense'
- **amount**: Required, positive number, 0.01-999999.99
- **category**: Required, must be valid category
- **description**: Optional, max 500 characters
- **date**: Required, valid date, not in future

## 🐛 Error Handling

The API returns appropriate HTTP status codes:

- `200 OK` - Successful GET/PUT requests
- `201 Created` - Successful POST requests
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `405 Method Not Allowed` - Invalid HTTP method
- `422 Unprocessable Entity` - Validation errors
- `500 Internal Server Error` - Server errors

## 🧪 Testing

### Manual API Testing
```bash
# Test user creation
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'

# Test getting all users
curl http://localhost:8000/api/users

# Test creating transaction
curl -X POST http://localhost:8000/api/users/1/transactions \
  -H "Content-Type: application/json" \
  -d '{"type":"expense","amount":100,"category":"food","description":"Test","date":"2025-05-27"}'

# Test analytics
curl http://localhost:8000/api/analytics/expenses-by-category
```

### Database Testing
```bash
# Connect to database
docker-compose exec postgres psql -U postgres -d expense_management

# View tables
\dt

# Check users
SELECT * FROM users;

# Check transactions
SELECT * FROM transactions;
```

## 🚀 Deployment

### Docker Production Build
```dockerfile
FROM php:8.2-apache
# ... production optimizations
```

### Environment Setup
1. Set `APP_ENV=production`
2. Disable `APP_DEBUG`
3. Configure proper database credentials
4. Set up SSL/HTTPS
5. Configure proper CORS origins

## 📊 Performance

### Database Optimization
- Indexes on frequently queried columns
- Foreign key constraints for data integrity
- Triggers for automatic timestamp updates

### Query Performance
- Efficient JOIN queries for user totals
- Aggregation queries for analytics
- Proper use of prepared statements

## 🔒 Security

### Input Sanitization
- All user inputs are validated and sanitized
- SQL injection prevention with prepared statements
- XSS prevention with proper encoding

### CORS Configuration
- Configurable allowed origins
- Proper handling of preflight requests
- Security headers implementation

## 🤝 Contributing

1. Follow PSR-12 coding standards
2. Use type declarations for all methods
3. Write meaningful commit messages
4. Add validation for new endpoints
5. Update documentation for API changes

## 📄 License

This project is licensed under the MIT License.
