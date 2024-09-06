import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cv } from "../generated/models";

export interface CvState {
  cvToView: any;
  items: Cv[];
  selectedCvs: boolean[];
  loading: boolean;
  error: string | null;
}

const initialState: CvState = {
  items: [],
  cvToView: null,
  loading: false,
  error: null,
  selectedCvs: [],
};

const cvSlice = createSlice({
  name: "cvs",
  initialState,
  reducers: {
    setCvs(state, action: PayloadAction<Cv[]>) {
      state.items = action.payload;
    },
    setCvBase64(state, action: PayloadAction<any>) {
      state.cvToView = action.payload;
    },
    addCv(state, action: PayloadAction<Cv>) {
      state.items.push(action.payload);
    },
    setCvError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setCvLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSelectedCvs(state, action: PayloadAction<boolean[]>) {
      state.selectedCvs = action.payload;
    },
  },
});

export const {
  setCvs,
  setCvBase64,
  addCv,
  setCvError,
  setCvLoading,
  setSelectedCvs,
} = cvSlice.actions;
export default cvSlice.reducer;
