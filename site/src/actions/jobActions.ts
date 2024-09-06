import { JobService } from "../services/JobService";
import {
  setJobs,
  setJob,
  addJob,
  setJobError,
  setJobLoading,
} from "../reducers/jobReducer";
import { Job } from "../generated/models";
import {
  setErrorDialogOpen,
  setSuccessDialogOpen,
} from "../reducers/appReducer";
const jobService = new JobService();

export const getJobById = (jobId: string) => async (dispatch: any) => {
  try {
    dispatch(setJobLoading(true));
    const job = await jobService.getJobById(jobId);
    dispatch(setJob(job));
    dispatch(setSuccessDialogOpen("Job fetched successfully"));
  } catch (error: any) {
    dispatch(setJobError(error.message));
    dispatch(setErrorDialogOpen(error.message));
  } finally {
    dispatch(setJobLoading(false));
  }
};

export const getJobList = () => async (dispatch: any) => {
  try {
    dispatch(setJobLoading(true));
    const jobs = await jobService.getJobList();
    dispatch(setJobs(jobs));
    dispatch(setSuccessDialogOpen("Jobs fetched successfully"));
  } catch (error: any) {
    dispatch(setJobError(error.message));
    dispatch(setErrorDialogOpen(error.message));
  } finally {
    dispatch(setJobLoading(false));
  }
};

export const createJob = (job: Job) => async (dispatch: any) => {
  try {
    dispatch(setJobLoading(true));
    const newJob = await jobService.createJob(job);
    dispatch(addJob(newJob));
    dispatch(setSuccessDialogOpen("Job created successfully"));
  } catch (error: any) {
    dispatch(setJobError(error.message));
    dispatch(setErrorDialogOpen(error.message));
  } finally {
    dispatch(setJobLoading(false));
  }
};

export const removeJob = (jobId: string) => async (dispatch: any) => {
  try {
    dispatch(setJobLoading(true));
    await jobService.removeJob(jobId);
    dispatch(getJobList());
    dispatch(setSuccessDialogOpen("Job removed successfully"));
  } catch (error: any) {
    dispatch(setJobError(error.message));
    dispatch(setErrorDialogOpen(error.message));
  } finally {
    dispatch(setJobLoading(false));
  }
};
