// frontend/src/services/transactionService.ts
import {
  Transaction,
  CreateTransactionRequest,
  UpdateTransactionRequest,
  ExpenseByCategory,
} from "../types";
import { apiClient } from "./api";

class TransactionService {
  async getUserTransactions(userId: number) {
    return apiClient.get<Transaction[]>(`/users/${userId}/transactions`);
  }

  async createTransaction(
    userId: number,
    transactionData: CreateTransactionRequest
  ) {
    return apiClient.post<Transaction>(
      `/users/${userId}/transactions`,
      transactionData
    );
  }

  async updateTransaction(
    id: number,
    transactionData: UpdateTransactionRequest
  ) {
    return apiClient.put<Transaction>(`/transactions/${id}`, transactionData);
  }

  async deleteTransaction(id: number) {
    return apiClient.delete(`/transactions/${id}`);
  }

  async getExpensesByCategory() {
    return apiClient.get<ExpenseByCategory[]>(
      "/analytics/expenses-by-category"
    );
  }
}

export const transactionService = new TransactionService();
