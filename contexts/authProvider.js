import nookies from "nookies";
import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { apiGetUserProfile } from "../api/Auth";
import { USER_FIELDS } from "../constants/authConstants";
import { isRequestSuccess } from "../utils/api";
import { filterObject } from "../utils/functions";
import { useCartContext } from "./cartProvider";
import { useCheckoutContext } from "./checkoutProvider";
import { useWishlistContext } from "./wishlistProvider";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData === null && !isLoggedIn) {
      const userId = nookies.get(null, "user_id");
      // console.log(userId);
      if (document.cookie.indexOf("user_id") !== -1) {
        const devId = localStorage.getItem("device_id");
        const parsedDevId = devId ? JSON.parse(devId) : null;
        if (!parsedDevId) {
          localStorage.setItem("device_id", JSON.stringify(uuidv4()));
        }
        setIsLoggedIn(true);
        setLoading(true);
        apiGetUserProfile(userId.user_id)
          .then((res) => {
            const response = res.data;
            if (isRequestSuccess(response)) {
              const tempData = filterObject(response.data, USER_FIELDS);
              const finalData = filterObject(response, USER_FIELDS);
              setUserData({ ...tempData, ...finalData });
            } else {
            }
          })
          .finally(() => setLoading(false));
      } else {
        localStorage.removeItem("device_id");
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
