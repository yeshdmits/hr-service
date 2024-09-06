import React, { useState } from "react";
import Dialog from "./Dialog";
import { useSelector } from "react-redux";
import { setCvBase64 } from "../../reducers/cvReducer";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";

interface PDFViewerProps {
}

const PDFViewer: React.FC<PDFViewerProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const base64String = useSelector((state: RootState) => state.cvs.cvToView);
  const pdfData = `data:application/pdf;base64,${base64String}`;
  const [isDialogOpen, setIsDialogOpen] = useState(pdfData !== "data:application/pdf;base64,undefined");

  const closeDialog = () => {
    dispatch(setCvBase64(""));
    setIsDialogOpen(false);
  };

  return (
    isDialogOpen &&
    pdfData && (
      <Dialog
        type="custom"
        style={{
          top: "48%",
          display: "flex",
          flexDirection: "column",
          width: "50em",
          backgroundColor: "black",
          left: "50%",
          height: "48em",
          zIndex: 1,
        }}
        title="PDF Viewer"
        setClose={closeDialog}
      >
        <iframe
          title="PDF Viewer"
          src={pdfData}
          width="100%"
          height="100%"
          className="border rounded-md shadow-md"
        />
      </Dialog>
    )
  );
};

export default PDFViewer;
