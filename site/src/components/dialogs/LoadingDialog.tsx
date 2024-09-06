import Dialog from "../common/Dialog";

const LoadingDialog = () => {
  return (
    <Dialog
      title=""
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        backgroundColor: "rgba(0, 0, 0, 1)",
        zIndex: 1,
        height: "100px",
        width: "200px",
      }}
      customClass="bg-blue-100 text-blue-700 border border-blue-400"
    >
      <div className="flex items-center justify-center flex-row h-full">
        <span className="relative flex h-5 w-5 mr-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
        Loading...
      </div>
    </Dialog>
  );
};

export default LoadingDialog;
