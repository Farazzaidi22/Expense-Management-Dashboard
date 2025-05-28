// frontend/src/types/index.ts

// Frontend interfaces (camelCase - JavaScript convention)
export interface User {
  id: number;
  name: string;
  email: string;
  totalIncome: number;
  totalExpense: number;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: number;
  userId: number;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

// API Response interfaces (snake_case - matches backend)
export interface ApiUser {
  id: number;
  name: string;
  email: string;
  total_income: string;
  total_expense: string;
  created_at: string;
  updated_at: string;
}

export interface ApiTransaction {
  id: number;
  user_id: number;
  type: TransactionType;
  amount: string;
  category: string;
  description: string;
  date: string;
  created_at: string;
  updated_at: string;
}

// Request interfaces
export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}

export interface CreateTransactionRequest {
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface UpdateTransactionRequest {
  type?: TransactionType;
  amount?: number;
  category?: string;
  description?: string;
  date?: string;
}

// Other types
export type TransactionType = "income" | "expense";

export interface ExpenseByCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface LoadingState {
  users: boolean;
  transactions: boolean;
  analytics: boolean;
}

export interface UIState {
  isLoading: LoadingState;
  error: ApiError | null;
  toast: {
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
  };
}

// Utility type for transforming API responses
export type TransformFunction<TApi, TFrontend> = (apiData: TApi) => TFrontend;
