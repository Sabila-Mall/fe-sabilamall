import nookies from "nookies";
import { createContext, useContext, useState, useEffect } from "react";

import { apiGetUserProfile } from "../api/Auth";
import { USER_FIELDS } from "../constants/authConstants";
import { isRequestSuccess } from "../utils/api";
import { filterObject } from "../utils/functions";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const logout = () => {
    nookies.destroy(null, "user_id");
    setIsLoggedIn(false);
    setUserData(null);
  };

  useEffect(() => {
    if (userData === null) {
      const userId = nookies.get(null, "user_id");
      if (document.cookie.indexOf("user_id") !== -1) {
        setIsLoggedIn(true);
        setLoading(true);
        apiGetUserProfile(userId.user_id)
          .then((res) => {
            const response = res.data;
            if (isRequestSuccess(response)) {
              setUserData(filterObject(res.data.data, USER_FIELDS));
            } else {
              console.log(res);
            }
          })
          .finally(() => setLoading(false));
      }
    }
  }, []);

  const value = {
    loading,
    setLoading,
    userData,
    setUserData,
    isLoggedIn,
    setIsLoggedIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
