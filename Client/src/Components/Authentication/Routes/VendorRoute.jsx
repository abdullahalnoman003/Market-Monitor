import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import useUserRole from "../../../Hooks/useUserRole";

const VendorRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [role] = useUserRole(user?.email);

  if (!role) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-primary mt-4">
            Checking Access...
          </p>
        </div>
      </div>
    );
  }

  if (user && role === "vendor") {
    return children;
  }

  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default VendorRoute;
