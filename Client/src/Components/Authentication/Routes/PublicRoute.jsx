import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user) {
    const from = location.state?.from;
    const target =
      from?.pathname && from.pathname !== "/login" && from.pathname !== "/register"
        ? `${from.pathname}${from.search || ""}${from.hash || ""}`
        : "/";
    return <Navigate to={target} replace />;
  }

  return children;
};

export default PublicRoute;
