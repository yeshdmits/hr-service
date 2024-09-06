import { CvService } from "../services/CvService";
import {
  setCvs,
  setCvBase64,
  setCvError,
  setCvLoading,
} from "../reducers/cvReducer";
import {
  setErrorDialogOpen,
  setSuccessDialogOpen,
} from "../reducers/appReducer";

const cvService = new CvService();

export const uploadCv = (file: File) => async (dispatch: any) => {
  try {
    dispatch(setCvLoading(true));
    await cvService.uploadCv(file);
    dispatch(getCvList());
    dispatch(setSuccessDialogOpen("CV uploaded successfully"));
  } catch (error: any) {
    dispatch(setCvError(error.message));
    dispatch(setErrorDialogOpen(error.message));
  } finally {
    dispatch(setCvLoading(false));
  }
};

export const getCvById = (cvId: string) => async (dispatch: any) => {
  try {
    dispatch(setCvLoading(true));
    const cv = await cvService.getCvById(cvId);
    dispatch(setCvBase64(cv));
    dispatch(setSuccessDialogOpen("CV fetched successfully"));
  } catch (error: any) {
    dispatch(setCvError(error.message));
    dispatch(setErrorDialogOpen(error.message));
  } finally {
    dispatch(setCvLoading(false));
  }
};

export const getCvList = () => async (dispatch: any) => {
  try {
    dispatch(setCvLoading(true));
    const cvs = await cvService.getCvList();
    dispatch(setCvs(cvs));
    setTimeout(() => {
      dispatch(setSuccessDialogOpen("CVs fetched successfully."));
    }, 1000);
  } catch (error: any) {
    dispatch(setCvError(error.message));
    dispatch(setErrorDialogOpen(error.message));
  } finally {
    dispatch(setCvLoading(false));
  }
};

export const removeCv = (cvId: string) => async (dispatch: any) => {
  try {
    dispatch(setCvLoading(true));
    await cvService.removeCv(cvId);
    dispatch(setSuccessDialogOpen("CV removed successfully."));
  } catch (error: any) {
    dispatch(setCvError(error.message));
    dispatch(setErrorDialogOpen(error.message));
  } finally {
    dispatch(setCvLoading(false));
  }
};
