import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../../../Firebase/firebase.init";
import BrandedLoader from "../../Shared/BrandedLoader";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (loggedInUser) => {
      if (loggedInUser) {
        try {
          const token = await loggedInUser.getIdToken();
          localStorage.setItem("access-token", token);
          setUser(loggedInUser);
        } catch (error) {
          console.error("Token fetch error:", error);
        }
      } else {
        localStorage.removeItem("access-token");
        localStorage.removeItem("userRole");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("access-token");
    await signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    logout,
  };

  if (loading) {
    return <BrandedLoader fullScreen label="Preparing your dashboard..." />;
  }

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
