import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setSelectedJob } from "../reducers/jobReducer";
import { removeJob } from "../actions/jobActions";
import CollapsibleSection from "./common/CollapsableSection";

interface JobSelectorProps {
  setJobListOpen: (isOpen: boolean) => void;
}

const JobSelector = ({ setJobListOpen }: JobSelectorProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedJob = useSelector((state: RootState) => state.jobs.selectedJob);
  const jobs = useSelector((state: RootState) => state.jobs.items);

  const handleJobRemove = (jobId: string | undefined) => {
    if (jobId) {
      dispatch(removeJob(jobId));
    }
  };

  return (
    <div className=" w-full">
      <CollapsibleSection
        title="Available jobs"
        setIsCollapsed={setJobListOpen}
      >
        <ul
          className="space-y-1 p-1"
          style={{
            maxHeight: "250px",
            overflowY: "auto",
          }}
        >
          {jobs?.map((job) => (
            <li
              key={job.id}
              className="flex flex-col p-1 bg-white rounded-md shadow-md border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Title: {job.title}
              </h3>
              <p className="text-sm text-gray-600">
                Description:{job.description}
              </p>
              <button
                style={{
                  height: "1.3em",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleJobRemove(job.id);
                }}
                className="text-red-500 hover:text-red-700 mt-2 w-full"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </CollapsibleSection>
      <div className="mb-2 p-2 border-2 border-dashed border-gray-300 rounded-md">
        <label
          style={{
            color: selectedJob ? "lightgray" : "red",
          }}
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Select Job Description*
        </label>
        <select
          value={jobs?.find((job) => job.id === selectedJob)?.title}
          onChange={(e) => {
            const selectedJob = jobs?.find(
              (job) => job.id === e.target.value
            );
            if (selectedJob && selectedJob.id) {
              dispatch(setSelectedJob(selectedJob.id));
            }
          }}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md h-8 bg-gray-50 focus:outline-none"
        >
          <option value="">Select a job</option>
          {jobs?.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default JobSelector;
