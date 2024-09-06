import { useEffect, useRef, useState } from "react";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { createJob } from "../actions/jobActions";
import { Job } from "../generated/models";

interface JobDescriptionFormProps {
  setClose: () => void;
}

const JobDescriptionForm = ({ setClose }: JobDescriptionFormProps) => {
  const formRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [rows, setRows] = useState<number>(0);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSend = () => {
    const job: Job = {
      title: formData.jobTitle,
      description: formData.jobDescription,
    };
    dispatch(createJob(job));
    setClose();
  };

  useEffect(() => {
    if (formRef.current) {
      const formHeight = formRef.current.clientHeight;
      const lineHeight = 162;
      const newRows = Math.floor(formHeight / lineHeight);
      setRows(newRows);
    }
  }, [formRef]);

  return (
    <div
      ref={formRef}
      className="w-full p-2 overflow-auto rounded-md"
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      <form className="space-y-1">
        <div>
          <label className="block text-gray-200 text-sm font-bold mb-1">
            Job Title
          </label>
          <input
            name="jobTitle"
            onChange={handleChange}
            type="text"
            placeholder="Enter Job Title..."
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-200 text-sm font-bold mb-1">
            Job Description
          </label>
          <textarea
            name="jobDescription"
            onChange={handleChange}
            placeholder="Enter Job Description..."
            className="w-full p-2 border border-gray-300 rounded"
            rows={rows}
            style={{
              height: "65vh"
            }}
          />
        </div>
        <div className="flex justify-end">
          <button
            disabled={
              !formData.jobTitle ||
              !formData.jobDescription
            }
            type="button"
            onClick={handleSend}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobDescriptionForm;
