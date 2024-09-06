import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type?: "error" | "success" | "custom" | "loading";
  title?: string;
  customClass?: string;
  setClose?: () => void;
  autoCloseDuration?: number; // Duration in milliseconds
}

const Dialog = ({
  children,
  type,
  title,
  customClass,
  autoCloseDuration,
  setClose,
  ...props
}: DialogProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const dialogRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if ((type === "error" || type === "success") && autoCloseDuration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (setClose) {
          setClose();
        }
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [type, autoCloseDuration, setClose, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (type === "loading") {
        return;
      }
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
        if (setClose) {
          setClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setClose, type]);

  const baseClasses =
    "p-4 border rounded-md my-4 w-2/3 shadow-lg fixed bottom-1 right-1 transform -translate-x-1/2 -translate-y-1/2";
  const typeClasses =
    type === "error"
      ? "bg-red-100 text-red-700 border border-red-400"
      : type === "success"
      ? "bg-green-100 text-green-700 border border-green-400"
      : type === "custom"
      ? customClass
      : "";

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={dialogRef}
      style={{
        zIndex: 100,
        display: "flex",
        height: "fit-content",
        flexDirection: "column",
        position: "absolute",
        bottom: type === "error" || type === "success" ? "0%" : "",
        right: type === "error" || type === "success" ? "0%" : "",
      }}
      className={`${baseClasses} ${typeClasses}`}
      {...props}
    >
      {title && <h2 className="text-xl mb-2">{title}</h2>}
      {type !== "success" && (
        <button
          onClick={() => {
            setIsVisible(false);
            if (setClose) {
              setClose();
            }
          }}
          style={{
            padding: 0,
            height: "1.5rem",
            width: "1.5rem",
          }}
          className="items-center justify-center flex absolute top-2 right-2 text-lg font-bold"
        >
          &times;
        </button>
      )}
      {children}
    </div>
  );
};

export default Dialog;
