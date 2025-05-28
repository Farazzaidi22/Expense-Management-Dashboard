// frontend/src/types/index.ts
export interface User {
  id: number;
  name: string;
  email: string;
  totalIncome: number;
  totalExpense: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
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