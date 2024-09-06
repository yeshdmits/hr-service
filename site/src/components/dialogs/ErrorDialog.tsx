import Dialog from "../common/Dialog";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setErrorDialogClosed } from "../../reducers/appReducer";

const ErrorDialog = () => {
  const successDialog = useSelector(
    (state: RootState) => state.app.errorDialog
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (successDialog.open) {
      setTimeout(() => {
        dispatch(setErrorDialogClosed());
      }, 1900);
    }
  }, [successDialog.open, dispatch]);

  return (
    <Dialog
      title=""
      autoCloseDuration={2000}
      type="error"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        backgroundColor: "red",
        zIndex: 1,
        height: "100px",
        width: "200px",
        color: "white",
      }}
      customClass="text-blue-700 border border-blue-400"
    >
      <div className="flex items-center justify-center flex-row h-full">
        <span className="relative flex h-5 w-5 mr-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-5 w-5 bg-black"></span>
        </span>
        {successDialog?.message + "!"}
      </div>
    </Dialog>
  );
};

export default ErrorDialog;
