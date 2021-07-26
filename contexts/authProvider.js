import nookies from "nookies";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userData === null) {
      const cookies = nookies.get(null);
      if (cookies.token) {
        console.log("jwt token exists");
      }
    }
  }, []);

  const value = {
    userData,
    setUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
