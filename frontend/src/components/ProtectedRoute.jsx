import React from "react";
import { useUser } from "../context/userContext";
import { Route, redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const { state } = useUser();
  return (
    <Route
      {...rest}
      render={() => {
        return state ? children : <redirect to="/"></redirect>;
      }}
    ></Route>
  );
};

export default PrivateRoute;
