// src/components/Login.tsx
import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

const Login: React.FC = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance
      .loginPopup(loginRequest)
      .then((response) => {
        console.log("Login successful:", response);
        // You can store the response in your state or context
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login with Microsoft</button>
    </div>
  );
};

export default Login;
