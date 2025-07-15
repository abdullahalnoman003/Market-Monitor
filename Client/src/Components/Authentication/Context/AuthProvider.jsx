import React, { useEffect, useState } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";

import { AuthContext } from "./AuthContext";
import { auth } from "../../../Firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("access-token");
    signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    logout,
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-base-content">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-primary ">
            Please Wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
