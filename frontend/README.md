// frontend/README.md

# Expense Management Frontend

A modern React application built with TypeScript, Redux, and Material UI for managing expenses and income.

## 🚀 Tech Stack

- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **Material UI (MUI)** for UI components
- **Vite** for build tooling and dev server
- **Vitest** for unit testing
- **Recharts** for data visualization
- **Axios** for API communication

## 📦 Features

### Core Functionality

- **User Management**: Create, edit, and delete users
- **Transaction Management**: Full CRUD operations for income and expenses
- **Dashboard**: Overview with statistics and charts
- **Data Visualization**: Pie charts for expense analysis
- **Responsive Design**: Mobile-friendly interface

### Technical Features

- **Type Safety**: Full TypeScript implementation
- **State Management**: Redux with async actions
- **Form Validation**: Client-side validation with error handling
- **Error Handling**: Comprehensive error management with user feedback
- **Loading States**: Skeleton loading and spinners
- **Testing**: Unit tests with Vitest and Testing Library

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ and npm
- Backend API running on port 8000

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment setup**

   ```bash
   cp .env.example .env
   # Edit .env with your API URL
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Run ESLint
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Common/         # Reusable components
│   ├── Dashboard/      # Dashboard-specific components
│   ├── Layout/         # Layout components
│   ├── Transaction/    # Transaction components
│   └── User/          # User management components
├── store/             # Redux store configuration
│   ├── slices/        # Redux slices
│   └── middleware/    # Custom middleware
├── services/          # API service classes
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── hooks/             # Custom React hooks
└── __tests__/         # Test files
```

## 🧪 Testing

The project includes comprehensive unit tests using Vitest and React Testing Library.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Test Structure

- **Component Tests**: Testing React components with user interactions
- **Service Tests**: Testing API service classes
- **Utility Tests**: Testing pure functions and utilities
- **Integration Tests**: Testing component integration with Redux

## 🎨 Styling and Theming

The application uses Material UI with a custom theme configuration:

- **Primary Color**: Blue (#1976d2)
- **Secondary Color**: Pink (#dc004e)
- **Typography**: Roboto font family
- **Responsive Breakpoints**: Mobile-first approach
- **Dark Mode**: Ready (can be implemented)

### Customization

Edit `src/utils/theme.ts` to customize the theme:

```typescript
export const theme = createTheme({
  palette: {
    primary: { main: "#your-color" },
    // ... other customizations
  },
});
```

## 🔌 API Integration

The frontend communicates with the backend API through service classes:

### API Configuration

```typescript
// src/services/api.ts
const apiClient = new ApiClient();
apiClient.baseURL = process.env.VITE_API_URL;
```

### Service Classes

- **UserService**: User CRUD operations
- **TransactionService**: Transaction management
- **AnalyticsService**: Data analytics

## 📱 State Management

Redux Toolkit is used for state management with three main slices:

### User Slice

- Manages user data and CRUD operations
- Handles user loading states and errors

### Transaction Slice

- Manages transaction data
- Handles analytics data for charts

### UI Slice

- Manages UI state (toasts, dialogs, loading)
- Handles global UI interactions

## 🚀 Build and Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
# Output in dist/ directory
```

### Docker Deployment

```bash
# Build Docker image
docker build -t expense-frontend .

# Run container
docker run -p 3000:80 expense-frontend
```

## 🔧 Configuration

### Environment Variables

```bash
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Expense Management Dashboard
VITE_APP_VERSION=1.0.0
```

### Vite Configuration

The project uses Vite with custom configuration for:

- Path aliases (`@/` → `src/`)
- Development server settings
- Build optimizations

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Write tests for new features
3. Update documentation as needed
4. Use TypeScript strictly
5. Follow Material UI best practices

## 📄 License

This project is licensed under the MIT License.
