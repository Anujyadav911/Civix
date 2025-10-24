import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useHistoryManager } from "../hooks/useHistoryManager";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  // Use custom hook to manage browser history
  useHistoryManager(isAuthenticated, loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
