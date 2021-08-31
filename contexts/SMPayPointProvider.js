import nookies from "nookies";
import { createContext, useContext, useState, useEffect } from "react";

import { apiGetUserProfile } from "../api/Auth";
import { isRequestSuccess } from "../utils/api";

const SMPayPointContext = createContext();

export const SMPayPointProvider = ({ children }) => {
  const [smPoint, setSmPoint] = useState(null);
  const [smPay, setSmPay] = useState(null);

  const [smLoading, setSmLoading] = useState(false);

  const updateSmPayPoint = () => {
    const userId = nookies.get(null, "user_id");
    if (document.cookie.indexOf("user_id") !== -1) {
      setSmLoading(true);
      apiGetUserProfile(userId)
        .then((res) => {
          const response = res.data;
          if (isRequestSuccess(response)) {
            setSmPoint(res.data.smpoint);
            setSmPay(
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumSignificantDigits: 21,
              }).format(res.data.memberdeposit),
            );
          }
        })
        .finally(() => setSmLoading(false));
    }
  };

  useEffect(() => {
    if (smPoint === null || smPay === null) {
      updateSmPayPoint();
    }
  }, []);

  const value = {
    smPoint,
    setSmPoint,
    smPay,
    setSmPay,
    smLoading,
    updateSmPayPoint,
  };

  return (
    <SMPayPointContext.Provider value={value}>
      {children}
    </SMPayPointContext.Provider>
  );
};

export const useSmPayPointContext = () => {
  return useContext(SMPayPointContext);
};
