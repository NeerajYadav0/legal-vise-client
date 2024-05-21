import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = () => {
    // Example: check if a token exists in localStorage
    return localStorage.getItem("token") !== null;
  };

  if (!isAuthenticated()) {
    alert("Please login. Access rejected.");
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
