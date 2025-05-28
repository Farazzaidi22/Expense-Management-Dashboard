# Expense Management Dashboard

A full-stack expense management application with user registration, transaction tracking, and data visualization capabilities.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   React + TS    │◄──►│   PHP + REST    │◄──►│  PostgreSQL     │
│   Redux + MUI   │    │   Validation    │    │  Migrations     │
│   Vite + Docker │    │   Docker        │    │  Seeders        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Tech Stack

### Frontend

- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **Material UI (MUI)** for components
- **Vite** for build tooling
- **Vitest** for testing
- **Recharts** for data visualization
- **Docker** containerization

### Backend

- **PHP 8.2** with modern OOP practices
- **PostgreSQL 15** database
- **Composer** for dependency management
- **RESTful API** architecture
- **Input validation** and sanitization
- **Docker** containerization

### DevOps

- **Docker Compose** for orchestration
- **Multi-stage Docker builds**
- **Environment-based configuration**
- **Automated database migrations**

## 📋 Features

### Core Features

- ✅ **User Management**: Registration, editing, and deletion
- ✅ **Transaction Management**: Full CRUD operations for income/expenses
- ✅ **Category System**: Expense categorization
- ✅ **Dashboard**: Overview of all users with totals
- ✅ **Data Visualization**: Pie charts for expense analysis

### Bonus Features

- ✅ **Advanced Validation**: Email, date, and number validation
- ✅ **Type Safety**: Full TypeScript implementation
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Loading States**: User-friendly loading indicators

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd expense-management-dashboard
   ```

2. **Start the application**

   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api
   - Database: localhost:5432

### Development Setup

1. **Environment Configuration**

   ```bash
   # Copy environment files
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```

2. **Run in development mode**

   ```bash
   docker-compose up --build
   ```

3. **Run tests**

   ```bash
   # Frontend tests
   cd frontend && pnpm test

   # Backend tests (if implemented)
   cd backend && composer test
   ```

## 📖 API Documentation

### Base URL

```
http://localhost:8000/api
```

### Endpoints

#### Users

- `GET /users` - Get all users
- `POST /users` - Create a new user
- `GET /users/{id}` - Get user by ID
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

#### Transactions

- `GET /users/{userId}/transactions` - Get user transactions
- `POST /users/{userId}/transactions` - Create transaction
- `PUT /transactions/{id}` - Update transaction
- `DELETE /transactions/{id}` - Delete transaction

#### Analytics

- `GET /analytics/expenses-by-category` - Get expense breakdown by category

### Request/Response Examples

#### Create User

```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Create Transaction

```bash
POST /api/users/1/transactions
Content-Type: application/json

{
  "type": "expense",
  "amount": 50.00,
  "category": "food",
  "description": "Lunch at restaurant",
  "date": "2025-05-27"
}
```

## 🐳 Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f [service_name]

# Stop all services
docker-compose down

# Rebuild specific service
docker-compose build [service_name]

# Execute commands in containers
docker-compose exec frontend pnpm test
docker-compose exec backend php -v
docker-compose exec postgres psql -U postgres -d expense_management
```

## 📁 Project Structure

```
expense-management-dashboard/
├── frontend/          # React TypeScript application
├── backend/           # PHP REST API
├── docker-compose.yml # Service orchestration
└── README.md         # This file
```

## 🧪 Testing

### Frontend Testing

```bash
cd frontend
pnpm test                # Run tests
pnpm run test:coverage   # Run with coverage
pnpm run test:ui         # Run with UI
```

### API Testing

```bash
# Test API endpoints
curl http://localhost:8000/api/users
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

## 🚀 Deployment

### Production Build

```bash
# Build for production
docker-compose -f docker-compose.prod.yml up --build

# Or build individual services
docker build -t expense-frontend ./frontend
docker build -t expense-backend ./backend
```

### Environment Variables

Ensure all environment variables are properly set for production:

- Database credentials
- API URLs
- Security settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔧 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 8000, and 5432 are available
2. **Docker permissions**: Run with `sudo` if needed on Linux
3. **Database connection**: Wait for PostgreSQL to fully initialize
4. **CORS issues**: Check backend CORS configuration

### Useful Commands

```bash
# Reset database
docker-compose down -v
docker-compose up --build

# View container logs
docker-compose logs backend
docker-compose logs frontend

# Access database
docker-compose exec postgres psql -U postgres -d expense_management
```

## 📞 Support

For support and questions, please open an issue in the repository.
