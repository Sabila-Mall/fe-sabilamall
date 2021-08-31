import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addCheckoutData = (data) => {
    const dataLocal = localStorage.getItem("checkoutData");
    const parsedDataLocal = dataLocal && JSON.parse(dataLocal);
    const cookie = parseCookies();

    if (parsedDataLocal?.userId !== cookie?.user_id) {
      // destroyCookie(null, "checkoutData");
      localStorage.removeItem("checkoutData");
    }
    localStorage.setItem("checkoutData", JSON.stringify(data));

    // setCookie(null, "checkoutData", JSON.stringify(data), {
    //   path: "/",
    // });

    setCheckoutData(data);
  };

  useEffect(() => {
    const cookies = parseCookies();
    const dataLocal = localStorage.getItem("checkoutData");
    const parsedDataLocal = dataLocal && JSON.parse(dataLocal);

    if (parsedDataLocal) {
      if (parsedDataLocal.userId == JSON.parse(cookies.user_id)) {
        setCheckoutData(parsedDataLocal);
      } else {
        // destroyCookie(null, "checkoutData");
        localStorage.removeItem("checkoutData");
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
