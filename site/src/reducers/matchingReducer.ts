import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cv, MatchCvsToJobResponse } from "../generated";

export interface MatchingState {
  matches: Cv[];
  bestMatch: Cv | null;
  loading: boolean;
  error: string | null;
}

const initialState: MatchingState = {
  matches: [],
  bestMatch: null,
  loading: false,
  error: null,
};

const matchingSlice = createSlice({
  name: "matching",
  initialState,
  reducers: {
    setMatchingResults(state, action: PayloadAction<MatchCvsToJobResponse>) {
      state.matches = action.payload.topMatches || [];
      state.bestMatch = action.payload.bestMatch || null;
    },
    setMatchingError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setMatchingLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setMatchingResults, setMatchingError, setMatchingLoading } =
  matchingSlice.actions;
export default matchingSlice.reducer;
