import React from "react";
import { useUser } from "../context/userContext";
import { Navigate, Route, redirect } from "react-router-dom";

const ProtectedRoute = ({ Page }) => {
  const { state } = useUser();

  return (state ? <Page /> : <Navigate to={'/'} />)



};

export default ProtectedRoute;
