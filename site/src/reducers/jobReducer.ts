import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Job } from "../generated";

export interface JobState {
  items: Job[];
  selectedJob: string;
  loading: boolean;
  error: string | null;
}

const initialState: JobState = {
  items: [],
  loading: false,
  error: null,
  selectedJob: "",
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs(state, action: PayloadAction<Job[]>) {
      state.items = action.payload;
    },
    setJob(state, action: PayloadAction<Job>) {
      const index = state.items.findIndex(
        (job) => job.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },
    addJob(state, action: PayloadAction<Job>) {
      state.items.push(action.payload);
    },
    setJobError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setJobLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSelectedJob(state, action: PayloadAction<string>) {
      state.selectedJob = action.payload;
    },
  },
});

export const {
  setJobs,
  setJob,
  addJob,
  setJobError,
  setJobLoading,
  setSelectedJob,
} = jobSlice.actions;
export default jobSlice.reducer;
