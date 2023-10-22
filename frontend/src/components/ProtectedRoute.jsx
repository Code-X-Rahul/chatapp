import React from "react";
import { useUser } from "../context/userContext";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useUser();

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
