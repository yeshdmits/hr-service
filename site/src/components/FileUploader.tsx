import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { ChangeEvent, DragEvent, useRef } from "react";
import { uploadCv } from "../actions/cvActions";

const FileUploader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const storeCVs = useSelector((state: RootState) => state.cvs.items);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const filesArray = Array.from(files);

    dispatch(uploadCv(filesArray[0]));
    fileInputRef.current!.value = "";
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      dispatch(uploadCv(filesArray[0]));
      fileInputRef.current!.value = "";
    }
  };

  return (
    <div
      className="mb-1 p-4 border-2 border-dashed border-gray-300 rounded-md"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label
        style={{
          color: storeCVs.length > 0 ? "white" : "red",
        }}
        className="block mb-2 text-sm font-medium text-gray-200"
      >
        Drag and drop CVs here or use the choose file button.
      </label>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
      />
    </div>
  );
};

export default FileUploader;
