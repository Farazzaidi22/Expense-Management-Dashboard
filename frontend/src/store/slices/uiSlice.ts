// frontend/src/store/slices/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

interface UIState {
  toast: ToastState;
  confirmDialog: {
    open: boolean;
    title: string;
    message: string;
    onConfirm: (() => void) | null;
  };
}

const initialState: UIState = {
  toast: {
    open: false,
    message: "",
    severity: "info",
  },
  confirmDialog: {
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<Omit<ToastState, "open">>) => {
      state.toast = {
        ...action.payload,
        open: true,
      };
    },
    hideToast: (state) => {
      state.toast.open = false;
    },
    showConfirmDialog: (
      state,
      action: PayloadAction<
        Omit<UIState["confirmDialog"], "open" | "onConfirm"> & {
          onConfirm?: () => void;
        }
      >
    ) => {
      state.confirmDialog = {
        ...action.payload,
        open: true,
        onConfirm: action.payload.onConfirm || null,
      };
    },
    hideConfirmDialog: (state) => {
      state.confirmDialog.open = false;
      state.confirmDialog.onConfirm = null;
    },
  },
});

export const {
  showToast,
  hideToast,
  showConfirmDialog,
  hideConfirmDialog,
} = uiSlice.actions;
export default uiSlice.reducer;
