// frontend/src/utils/transforms.ts
import { User, Transaction, ApiUser, ApiTransaction } from "../types";

/**
 * Transform API user response (snake_case) to frontend format (camelCase)
 */
export const transformUser = (apiUser: ApiUser): User => ({
  id: apiUser.id,
  name: apiUser.name,
  email: apiUser.email,
  totalIncome: parseFloat(apiUser.total_income || "0"),
  totalExpense: parseFloat(apiUser.total_expense || "0"),
  createdAt: apiUser.created_at,
  updatedAt: apiUser.updated_at,
});

/**
 * Transform API transaction response (snake_case) to frontend format (camelCase)
 */
export const transformTransaction = (
  apiTransaction: ApiTransaction
): Transaction => ({
  id: apiTransaction.id,
  userId: apiTransaction.user_id,
  type: apiTransaction.type,
  amount: parseFloat(apiTransaction.amount || "0"),
  category: apiTransaction.category,
  description: apiTransaction.description,
  date: apiTransaction.date,
  createdAt: apiTransaction.created_at,
  updatedAt: apiTransaction.updated_at,
});

/**
 * Transform array of API users to frontend format
 */
export const transformUsers = (apiUsers: ApiUser[]): User[] =>
  apiUsers.map(transformUser);

/**
 * Transform array of API transactions to frontend format
 */
export const transformTransactions = (
  apiTransactions: ApiTransaction[]
): Transaction[] => apiTransactions.map(transformTransaction);
