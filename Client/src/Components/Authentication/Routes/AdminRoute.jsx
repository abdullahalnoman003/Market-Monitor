import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUserRole from "../../../Hooks/useUserRole";
import { AuthContext } from "../Context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { role, loading } = useUserRole(user?.email);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-base">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold ">Please Wait... <br /> Checking Admin Info...</p>
        </div>
      </div>
    );
  } // Or just return a spinner or skeleton

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default AdminRoute;
