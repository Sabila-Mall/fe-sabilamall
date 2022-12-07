import nookies from "nookies";
import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { apiGetUserProfile } from "../api/Auth";
import { USER_FIELDS } from "../constants/authConstants";
import { isRequestSuccess } from "../utils/api";
import { filterObject, isValidJson } from "../utils/functions";
import { useCartContext } from "./cartProvider";
import { useCheckoutContext } from "./checkoutProvider";
import { useWishlistContext } from "./wishlistProvider";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    setLoading(true);
    const cookie = nookies.get();
    const user_id = cookie.user_id;
    const admin_id = cookie.admin_id;
    if (user_id != null) {
      const devId = localStorage.getItem("device_id");
      const parsedDevId = isValidJson(devId) ? JSON.parse(devId) : null
      if (!parsedDevId) {
        localStorage.setItem("device_id", JSON.stringify(uuidv4()));
      }

      const secureTempData = localStorage.getItem('tempData');
      const secureFinalData = localStorage.getItem('finalData');

      if (secureTempData != null && secureFinalData != null) {
        const tempData = filterObject(JSON.parse(Buffer.from(secureTempData, 'base64').toString()), USER_FIELDS);
        const finalData = filterObject(JSON.parse(Buffer.from(secureFinalData, 'base64').toString()), USER_FIELDS);

        setUserData({ ...tempData, ...finalData, ...{ 'admin_id': admin_id } });
        setIsLoggedIn(true);
        setLoading(false);
      }

      // get user

      const res = await apiGetUserProfile(user_id)
      const response = res.data;
      if (isRequestSuccess(response)) {
        const tempData = filterObject(response.data, USER_FIELDS);
        const finalData = filterObject(response, USER_FIELDS);

        const secureTempData = Buffer.from(JSON.stringify(tempData)).toString('base64');
        const secureFinalData = Buffer.from(JSON.stringify(finalData)).toString('base64');

        localStorage.setItem("tempData", secureTempData);
        localStorage.setItem("finalData", secureFinalData);

        setUserData({ ...tempData, ...finalData, ...{ 'admin_id': admin_id } });
        setIsLoggedIn(true);
        setLoading(false);

      }

    } else {
      localStorage.removeItem("device_id");
      setLoading(false);
    }

  }

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
