import { Transaction, User } from "./index";

// frontend/src/types/user.ts
export interface UserStats {
  totalUsers: number;
  totalIncome: number;
  totalExpenses: number;
  averageIncome: number;
  averageExpenses: number;
}

export interface UserWithTransactions extends User {
  transactions: Transaction[];
}
