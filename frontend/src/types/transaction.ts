import { TransactionType } from "./index";

// frontend/src/types/transaction.ts
export const TRANSACTION_CATEGORIES = [
  "food",
  "transportation",
  "housing",
  "utilities",
  "healthcare",
  "entertainment",
  "shopping",
  "education",
  "travel",
  "other",
  'income'
] as const;

export type TransactionCategory = typeof TRANSACTION_CATEGORIES[number];

export interface TransactionFilters {
  type?: TransactionType;
  category?: TransactionCategory;
  dateFrom?: string;
  dateTo?: string;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpenses: number;
  netAmount: number;
  transactionCount: number;
  categories: Record<string, number>;
}