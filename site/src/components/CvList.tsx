import { useDispatch, useSelector } from "react-redux";
import { Cv } from "../generated";
import { AppDispatch, RootState } from "../store";
import { setCvs, setSelectedCvs } from "../reducers/cvReducer";
import React, { useEffect } from "react";
import PDFViewer from "./common/PdfViewer";
import { getCvById, removeCv } from "../actions/cvActions";

interface CvListProps {
  storeCVs: Cv[];
  isJobListOpen?: boolean;
}

const CvList = ({ storeCVs, isJobListOpen }: CvListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCvs = useSelector((state: RootState) => state.cvs.selectedCvs);
  const base64String = useSelector((state: RootState) => state.cvs.cvToView);
  const [localCvs, setLocalCvs] = React.useState<Cv[]>([]);
  const handleCheckboxChange = (index: number) => {
    const updatedSelectedCvs = [...selectedCvs];
    updatedSelectedCvs[index] = !updatedSelectedCvs[index];
    dispatch(setSelectedCvs(updatedSelectedCvs));
  };

  const handleRemoveCv = (index: number) => {
    const updatedCvs = [...storeCVs];
    const cvId = updatedCvs[index].id;
    if (!cvId) {
      throw new Error('No cv id selected')
    }
    dispatch(removeCv(cvId));
    updatedCvs.splice(index, 1);
    dispatch(setCvs(updatedCvs));
  };

  const handleClickView = (id: string | undefined) => {
    if (id) {
      dispatch(getCvById(id));
    }
  };

  const isMobile = window.innerWidth < 768;

  const handleFilterCvs = (value: string) => {
    if (value === "") {
      setLocalCvs(storeCVs);
    } else {
      const filteredCvs = storeCVs.filter((cv) =>
        cv?.name?.toLowerCase().includes(value.toLowerCase())
      );
      setLocalCvs(filteredCvs);
    }
  };

  useEffect(() => {
    setLocalCvs(storeCVs);
  }, [storeCVs]);

  return (
    <div className="">
      <h2 className="text-md font-bold">Uploaded CVs</h2>
      <span className="flex items-center align-center justify-center">
        <span className="w-full flex align-center" onClick={() => {
              const updatedSelectedCvs = selectedCvs.map(() => {
                return !selectedCvs.every((cv) => cv);
              });
              dispatch(setSelectedCvs(updatedSelectedCvs));
            }}>
          <input
            type="checkbox"
            checked={selectedCvs.every((cv) => cv)}
            className="mr-2 w-3"
          />
          <span className="w-full flex hover:cursor-pointer">Select all</span>
        </span>

        <input
          placeholder="Search CVs..."
          onChange={(value) => {
            console.log(value);
            handleFilterCvs(value.target.value);
          }}
          className="block h-6 w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-text bg-gray-50 focus:outline-none"
        />
      </span>
      <ul
        style={{
          maxHeight: isMobile ? "500px" : isJobListOpen ? "100px" : "350px",
          overflowY: "auto",
        }}
      >
        {localCvs?.map((cv, index) => (
          <li
            key={index}
            className="flex justify-between items-center mt-1 text-xs hover:cursor-pointer"
            onClick={() => handleCheckboxChange(index)}
          >
            <input
              type="checkbox"
              checked={selectedCvs[index] || false}
              className="w-1/4"
            />
            <span className="w-2/4 mr-2">{cv.name}</span>

            <button
              style={{
                height: "25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => handleClickView(cv.id)}
              className="mr-2 w-1/5 bg-blue-300 hover:bg-blue-500 text-white font-bold rounded"
            >
              View CV
            </button>
            <button
              autoFocus
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemoveCv(index);
              }}
              className="w-1/5 mr-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 focus:outline-none"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      {base64String && <PDFViewer />}
    </div>
  );
};

export default CvList;
