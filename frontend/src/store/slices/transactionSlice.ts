// frontend/src/store/slices/transactionSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  Transaction,
  CreateTransactionRequest,
  UpdateTransactionRequest,
  ApiError,
  ExpenseByCategory,
} from "../../types";
import { transactionService } from "../../services/transactionService";

interface TransactionState {
  transactions: Transaction[];
  expensesByCategory: ExpenseByCategory[];
  loading: boolean;
  error: ApiError | null;
}

const initialState: TransactionState = {
  transactions: [],
  expensesByCategory: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchUserTransactions = createAsyncThunk(
  "transactions/fetchUserTransactions",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await transactionService.getUserTransactions(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (
    {
      userId,
      transactionData,
    }: { userId: number; transactionData: CreateTransactionRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await transactionService.createTransaction(
        userId,
        transactionData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (
    {
      id,
      transactionData,
    }: { id: number; transactionData: UpdateTransactionRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await transactionService.updateTransaction(
        id,
        transactionData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId: number, { rejectWithValue }) => {
    try {
      await transactionService.deleteTransaction(transactionId);
      return transactionId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchExpensesByCategory = createAsyncThunk(
  "transactions/fetchExpensesByCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionService.getExpensesByCategory();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    clearTransactions: (state) => {
      state.transactions = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user transactions
      .addCase(fetchUserTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserTransactions.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.loading = false;
          state.transactions = action.payload;
        }
      )
      .addCase(fetchUserTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      })
      // Create transaction
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createTransaction.fulfilled,
        (state, action: PayloadAction<Transaction>) => {
          state.loading = false;
          state.transactions.push(action.payload);
        }
      )
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      })
      // Update transaction
      .addCase(updateTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateTransaction.fulfilled,
        (state, action: PayloadAction<Transaction>) => {
          state.loading = false;
          const index = state.transactions.findIndex(
            (transaction) => transaction.id === action.payload.id
          );
          if (index !== -1) {
            state.transactions[index] = action.payload;
          }
        }
      )
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      })
      // Delete transaction
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteTransaction.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.transactions = state.transactions.filter(
            (transaction) => transaction.id !== action.payload
          );
        }
      )
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      })
      // Fetch expenses by category
      .addCase(fetchExpensesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchExpensesByCategory.fulfilled,
        (state, action: PayloadAction<ExpenseByCategory[]>) => {
          state.loading = false;
          state.expensesByCategory = action.payload;
        }
      )
      .addCase(fetchExpensesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      });
  },
});

export const { clearTransactions, clearError } = transactionSlice.actions;
export default transactionSlice.reducer;
