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

  useEffect(() => {
    if (userData === null) {
      const userId = nookies.get(null, "user_id");
      if (Object.keys(userId).length !== 0) {
        setIsLoggedIn(true);
        apiGetUserProfile(userId).then((res) => {
          const response = res.data;
          if (isRequestSuccess(response)) {
            setUserData(filterObject(res.data.data, USER_FIELDS));
          } else {
            console.log(res);
          }
        });
      }
    }
  }, []);

  const value = {
    userData,
    setUserData,
    isLoggedIn,
    setIsLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
