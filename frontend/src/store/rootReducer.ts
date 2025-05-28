// frontend/src/store/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import transactionSlice from "./slices/transactionSlice";
import uiSlice from "./slices/uiSlice";

export const rootReducer = combineReducers({
  users: userSlice,
  transactions: transactionSlice,
  ui: uiSlice,
});
