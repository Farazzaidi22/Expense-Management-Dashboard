# Expense Management Dashboard - Complete Project Structure

```
expense-management-dashboard/
├── README.md
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── README.md
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── vitest.config.ts
│   ├── index.html
│   ├── .env
│   ├── .env.example
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── vite-env.d.ts
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── DashboardPage.tsx
│   │   │   │   ├── UserList.tsx
│   │   │   │   ├── UserCard.tsx
│   │   │   │   └── ExpenseChart.tsx
│   │   │   ├── User/
│   │   │   │   ├── UserForm.tsx
│   │   │   │   └── UserTransactions.tsx
│   │   │   ├── Transaction/
│   │   │   │   ├── TransactionForm.tsx
│   │   │   │   ├── TransactionList.tsx
│   │   │   │   └── TransactionItem.tsx
│   │   │   └── Common/
│   │   │       ├── Loading.tsx
│   │   │       ├── ErrorMessage.tsx
│   │   │       └── ConfirmDialog.tsx
│   │   ├── store/
│   │   │   ├── index.ts
│   │   │   ├── rootReducer.ts
│   │   │   ├── slices/
│   │   │   │   ├── userSlice.ts
│   │   │   │   ├── transactionSlice.ts
│   │   │   │   └── uiSlice.ts
│   │   │   └── middleware/
│   │   │       └── api.ts
│   │   ├── types/
│   │   │   ├── index.ts
│   │   │   ├── user.ts
│   │   │   └── transaction.ts
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── userService.ts
│   │   │   └── transactionService.ts
│   │   ├── utils/
│   │   │   ├── validation.ts
│   │   │   ├── formatters.ts
│   │   │   └── constants.ts
│   │   ├── hooks/
│   │   │   ├── useApi.ts
│   │   │   └── useDebounce.ts
│   │   └── __tests__/
│   │       ├── components/
│   │       ├── services/
│   │       └── utils/
│   └── .dockerignore
├── backend/
│   ├── Dockerfile
│   ├── README.md
│   ├── composer.json
│   ├── .env
│   ├── .env.example
│   ├── public/
│   │   └── index.php
│   ├── src/
│   │   ├── Config/
│   │   │   ├── Database.php
│   │   │   └── Cors.php
│   │   ├── Controllers/
│   │   │   ├── BaseController.php
│   │   │   ├── UserController.php
│   │   │   └── TransactionController.php
│   │   ├── Models/
│   │   │   ├── BaseModel.php
│   │   │   ├── User.php
│   │   │   └── Transaction.php
│   │   ├── Services/
│   │   │   ├── UserService.php
│   │   │   └── TransactionService.php
│   │   ├── Validators/
│   │   │   ├── UserValidator.php
│   │   │   └── TransactionValidator.php
│   │   ├── Middleware/
│   │   │   ├── CorsMiddleware.php
│   │   │   └── ValidationMiddleware.php
│   │   ├── Routes/
│   │   │   └── api.php
│   │   └── Utils/
│   │       ├── Response.php
│   │       └── Validation.php
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── 001_create_users_table.sql
│   │   │   └── 002_create_transactions_table.sql
│   │   └── seeders/
│   │       ├── users_seeder.sql
│   │       └── transactions_seeder.sql
│   ├── scripts/
│   │   ├── setup.sh
│   │   └── migrate.php
│   └── .dockerignore
└── .gitignore
```

## Key Features Implemented:

### Frontend (React + TypeScript + Redux)

- **Modern Stack**: Vite, TypeScript, Material UI, Redux Toolkit
- **Testing**: Vitest with comprehensive test coverage
- **Components**: Modular, reusable components with proper typing
- **State Management**: Redux with proper async actions
- **Validation**: Field-level validation with custom hooks
- **Charts**: Pie chart for expense visualization
- **Responsive Design**: Mobile-friendly Material UI components

### Backend (PHP + PostgreSQL)

- **Modern PHP**: Object-oriented architecture with namespaces
- **Database**: PostgreSQL with proper migrations and seeders
- **Type Safety**: Strong typing with proper validation
- **RESTful API**: Clean API endpoints with proper HTTP methods
- **Error Handling**: Comprehensive error handling and validation
- **Security**: CORS handling and input sanitization

### DevOps & Deployment

- **Docker**: Multi-stage builds for both frontend and backend
- **Docker Compose**: Easy development environment setup
- **Environment Variables**: Proper configuration management
- **Database Migrations**: Automated database setup with seeders

### Additional Features (Bonus Points)

- ✅ Pie chart for expense visualization
- ✅ Field-level validation (email, dates, numbers)
- ✅ Type safety throughout the application
- ✅ Clean Git structure ready
- ❌ Flutter frontend (excluded as requested)

This structure provides a complete, production-ready expense management application with all the requested features and bonus points implemented.
