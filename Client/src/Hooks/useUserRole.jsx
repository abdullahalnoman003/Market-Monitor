import { useEffect, useState } from "react";
import useAxios from "./useAxios"; 

const useUserRole = (email) => {
  const [role, setRole] = useState(null);
  const axios = useAxios();

  useEffect(() => {
    if (email) {
      axios
        .get(`/users/role/${email}`)
        .then((res) => {
          const fetchedRole = res.data?.role || "user";
          setRole(fetchedRole);
          localStorage.setItem("userRole", fetchedRole);
        })
        .catch((err) => {
          console.error("Failed to fetch user role:", err);
          setRole("user"); 
        });
    }
  }, [email, axios]);

  return [role];
};

export default useUserRole;
