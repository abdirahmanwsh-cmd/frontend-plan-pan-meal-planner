import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("token");
  console.log("ProtectedRoute", { user,loading, token });

  // While Firebase is still figuring out if the user is logged in
  if (loading) {
    return null; // or a spinner if you want
  }

  // Not logged in -> send to login
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in -> render page
  return children;
};

export default ProtectedRoute;