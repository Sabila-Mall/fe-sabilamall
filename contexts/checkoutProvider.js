import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";

import { useAuthContext } from "./authProvider";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addCheckoutData = (data) => {
    const cookies = parseCookies();
    if (cookies?.checkoutData?.userId !== cookies.user_id) {
      destroyCookie(null, "checkoutData");
    }
    setCookie(null, "checkoutData", JSON.stringify(data), {
      path: "/",
    });

    setCheckoutData(data);
  };

  useEffect(() => {
    const cookies = parseCookies();

    if (cookies?.checkoutData) {
      if (
        JSON.parse(cookies.checkoutData).userId == JSON.parse(cookies.user_id)
      ) {
        setCheckoutData(JSON.parse(cookies.checkoutData));
      } else {
        destroyCookie(null, "checkoutData");
      }
    }
  }, [router]);

  const value = {
    checkoutData,
    setCheckoutData,
    loading,
    setLoading,
    addCheckoutData,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};
