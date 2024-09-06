import Dialog from "../common/Dialog";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setSuccessDialogClosed } from "../../reducers/appReducer";

const SucessDialog = () => {
  const successDialog = useSelector(
    (state: RootState) => state.app.successDialog
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (successDialog.open) {
      setTimeout(() => {
        dispatch(setSuccessDialogClosed());
      }, 1900);
    }
  }, [successDialog.open, dispatch]);

  return (
    <Dialog
      title=""
      autoCloseDuration={2000}
      type="success"
      style={{
        position: "fixed",
        bottom: "0%",
        right: "0%",
        backgroundColor: "green",
        zIndex: 1,
        height: "100px",
        width: "250px",
        color: "white",
      }}
      customClass="bg-blue-100 text-blue-700 border border-blue-400"
    >
      <div className="flex items-center justify-center flex-row h-full">
        <span className="relative flex h-5 w-5 mr-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
        {successDialog?.message ?? "Sucess!"}
      </div>
    </Dialog>
  );
};

export default SucessDialog;
