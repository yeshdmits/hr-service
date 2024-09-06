import React from "react";
import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";

const ProtectedRoute: React.FC<{ component: React.FC }> = ({
  component: Component,
}) => {
  const isAuthenticated = useIsAuthenticated();

  return !isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
