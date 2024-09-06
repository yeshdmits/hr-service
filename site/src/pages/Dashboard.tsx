import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchCvsToJob } from "../actions/matchingActions";
import { AppDispatch, RootState } from "../store";
import { MatchCvsToJobRequest } from "../generated";
import MatchTable from "../components/MatchTable";
import { getCvList } from "../actions/cvActions";
import { setSelectedCvs } from "../reducers/cvReducer";
import Dialog from "../components/common/Dialog";
import LoadingDialog from "../components/dialogs/LoadingDialog";
import CvList from "../components/CvList";
import FileUploader from "../components/FileUploader";
import JobSelector from "../components/JobSelector";
import JobDescriptionForm from "../components/JobDescriptionForm";
import { getJobList } from "../actions/jobActions";
import SucessDialog from "../components/dialogs/SuccessDialog";
import ErrorDialog from "../components/dialogs/ErrorDialog";
import { setErrorDialogOpen } from "../reducers/appReducer";
import GuideComponent from "../components/GuideComponent";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const storeCVs = useSelector((state: RootState) => state.cvs.items);
  const selectedCvs = useSelector((state: RootState) => state.cvs.selectedCvs);
  const selectedJob = useSelector((state: RootState) => state.jobs.selectedJob);
  const jobList = useSelector((state: RootState) => state.jobs.items);
  const successDialog = useSelector(
    (state: RootState) => state.app.successDialog
  );
  const errorDialog = useSelector((state: RootState) => state.app.errorDialog);
  const { matches, loading, error, bestMatch } = useSelector(
    (state: RootState) => state.matching
  );
  const cvsLoading = useSelector((state: RootState) => state.cvs.loading);
  const jobLoading = useSelector((state: RootState) => state.jobs.loading);
  const [matchClicked, setMatchClicked] = useState(false);
  const [openAddJob, setOpenAddJob] = useState(false);
  const [isJobListOpen, setIsJobListOpen] = useState(false);

  useEffect(() => {
    dispatch(getCvList());
    dispatch(getJobList());
  }, [dispatch]);

  useEffect(() => {
    if (storeCVs.length === 0) return;

    dispatch(setSelectedCvs(new Array(storeCVs.length).fill(false)));
  }, [dispatch, storeCVs]);

  const calculateMatch = () => {
    const selectedCvIds = storeCVs
      .filter((_, index) => selectedCvs[index])
      .map((cv) => cv.id);
    if (selectedCvIds.length === 0) {
      dispatch(setErrorDialogOpen("No CVs selected"));
      return;
    }
    setMatchClicked(true);
    // Dispatch the match action with the selected CV IDs
    const requestData: MatchCvsToJobRequest = {
      jobId: selectedJob,
      cvId: selectedCvIds.filter((id): id is string => id !== undefined),
    };
    dispatch(matchCvsToJob(requestData));
  };

  const handleAddJD = () => {
    setOpenAddJob(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold p-2 border-b-2">
        <span className="flex">
          <img
            height={30}
            width={30}
            className="mr-2"
            alt=""
          />
          HR Tool
        </span>
      </h1>
      <div
        className={`p-2 grid grid-cols-1  md:grid-cols-${
          matchClicked ? "3" : "2"
        } gap-1`}
        style={{
          height: "calc(100dvh - 100px)",
          overflow: "auto",
        }}
      >
        <div className="md:col-span-1 w-full h-full">
          <FileUploader />
          <div className="w-full">
            <button
              className="px-4 w-full py-1 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 focus:outline-none"
              onClick={handleAddJD}
            >
              Add a Custom Job
            </button>
          </div>
          {jobList?.length > 0 && (
            <div className="flex w-full">
              <JobSelector
                setJobListOpen={(v) => {
                  setIsJobListOpen(v);
                }}
              />
            </div>
          )}

          {storeCVs?.length > 0 && (
            <CvList isJobListOpen={isJobListOpen} storeCVs={storeCVs} />
          )}
          {selectedCvs.length > 0 && selectedJob && (
            <button
              onClick={calculateMatch}
              className="px-4 w-full py-1 mt-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 focus:outline-none"
            >
              Calculate Matching CVs
            </button>
          )}
        </div>

        {openAddJob && (
          <Dialog
            type="custom"
            customClass="w-2/3 h-2/3 bg-black fixed top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            title="Job specifications:"
            setClose={() => {
              setOpenAddJob(false);
            }}
          >
            <JobDescriptionForm
              setClose={() => {
                setOpenAddJob(false);
              }}
            />
          </Dialog>
        )}

        {(loading || cvsLoading || jobLoading) && <LoadingDialog />}
        {successDialog.open && <SucessDialog />}
        {errorDialog.open && <ErrorDialog />}

        {matchClicked ? (
          <div className="md:col-span-2">
            {error && <p className="text-red-500">{error}</p>}
            <MatchTable setMatchClicked={setMatchClicked} data={matches} best={bestMatch} />
          </div>
        ) : (
          <GuideComponent />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
