import { MatchingService } from "../services/MathingService";
import {
  setMatchingResults,
  setMatchingError,
  setMatchingLoading,
} from "../reducers/matchingReducer";
import { MatchCvsToJobRequest } from "../generated/models";
import {
  setErrorDialogOpen,
  setSuccessDialogOpen,
} from "../reducers/appReducer";

const matchingService = new MatchingService();

export const matchCvsToJob =
  (data: MatchCvsToJobRequest) => async (dispatch: any) => {
    try {
      dispatch(setMatchingLoading(true));
      const matchingResults = await matchingService.matchCvsToJob(data);
      dispatch(setMatchingResults(matchingResults));
      dispatch(setSuccessDialogOpen("Matching completed successfully"));
    } catch (error: any) {
      dispatch(setMatchingError(error.message));
      dispatch(
        setErrorDialogOpen(
          error.message ? error.message : error ? error : "An error occurred"
        )
      );
    } finally {
      dispatch(setMatchingLoading(false));
    }
  };
