// frontend/src/services/transactionService.ts
import {
  CreateTransactionRequest,
  UpdateTransactionRequest,
  ExpenseByCategory,
  ApiTransaction,
} from "../types";
import { apiClient } from "./api";
import {
  transformTransaction,
  transformTransactions,
} from "../utils/transforms";

class TransactionService {
  async getUserTransactions(userId: number) {
    const response = await apiClient.get<ApiTransaction[]>(
      `/users/${userId}/transactions`
    );

    // Transform the array of API transactions to frontend format
    const transformedTransactions = transformTransactions(response.data);

    return {
      ...response,
      data: transformedTransactions,
    };
  }

  async getTransactionById(id: number) {
    const response = await apiClient.get<ApiTransaction>(`/transactions/${id}`);

    // Transform the single transaction to frontend format
    const transformedTransaction = transformTransaction(response.data);

    return {
      ...response,
      data: transformedTransaction,
    };
  }

  async createTransaction(
    userId: number,
    transactionData: CreateTransactionRequest
  ) {
    const response = await apiClient.post<ApiTransaction>(
      `/users/${userId}/transactions`,
      transactionData
    );

    // Transform the created transaction to frontend format
    const transformedTransaction = transformTransaction(response.data);

    return {
      ...response,
      data: transformedTransaction,
    };
  }

  async updateTransaction(
    id: number,
    transactionData: UpdateTransactionRequest
  ) {
    const response = await apiClient.put<ApiTransaction>(
      `/transactions/${id}`,
      transactionData
    );

    // Transform the updated transaction to frontend format
    const transformedTransaction = transformTransaction(response.data);

    return {
      ...response,
      data: transformedTransaction,
    };
  }

  async deleteTransaction(id: number) {
    return apiClient.delete(`/transactions/${id}`);
  }

  async getExpensesByCategory() {
    // This endpoint might return data in different format, but assuming it's already correct
    return apiClient.get<ExpenseByCategory[]>(
      "/analytics/expenses-by-category"
    );
  }
}

export const transactionService = new TransactionService();
