import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  successDialog: {
    open: boolean;
    message: string | null;
  };
  errorDialog: {
    open: boolean;
    message: string | null;
  };
}

const initialState: AppState = {
  successDialog: {
    open: false,
    message: null,
  },
  errorDialog: {
    open: false,
    message: null,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSuccessDialogOpen(state, action: PayloadAction<string>) {
      state.successDialog.open = true;
      state.successDialog.message = action.payload;
    },
    setSuccessDialogClosed(state) {
      state.successDialog.open = false;
      state.successDialog.message = null;
    },
    setErrorDialogOpen(state, action: PayloadAction<string>) {
      state.errorDialog.open = true;
      state.errorDialog.message = action.payload;
    },
    setErrorDialogClosed(state) {
      state.errorDialog.open = false;
      state.errorDialog.message = null;
    },
  },
});

export const {
  setSuccessDialogOpen,
  setSuccessDialogClosed,
  setErrorDialogClosed,
  setErrorDialogOpen,
} = appSlice.actions;
export default appSlice.reducer;
