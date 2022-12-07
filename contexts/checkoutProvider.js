import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";
import { isValidJson } from '../utils/functions';

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState({});
  const [checkoutResponse, setCheckoutResponse] = useState({});
  const [orderNumber, setOrderNumber] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addressId, setAddressId] = useState(0);
  const router = useRouter();

  const addCheckoutData = (data) => {
    const dataLocal = localStorage.getItem("checkoutData");
    let parsedDataLocal;
    if (dataLocal && isValidJson(dataLocal))
      parsedDataLocal = JSON.parse(dataLocal)
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
    let parsedDataLocal;
    if (dataLocal && isValidJson(dataLocal))
      parsedDataLocal = JSON.parse(dataLocal)

    if (parsedDataLocal) {
      if (
        cookies.user_id && isValidJson(cookies.user_id) &&
        parsedDataLocal.userId == JSON.parse(cookies.user_id)
      ) {
        setCheckoutData(parsedDataLocal);
      } else {
        // destroyCookie(null, "checkoutData");
        localStorage.removeItem("checkoutData");
      }
    }
  }, [router]);

  useEffect(() => {
    const savedCheckoutResponse = window.sessionStorage.getItem(
      "checkoutResponse",
    );
    if (savedCheckoutResponse) {
      try {
        setCheckoutResponse(JSON.parse(savedCheckoutResponse));
      } catch (err) {
        saveCheckoutResponse({});
      }
    }
  }, []);

  const saveCheckoutResponse = (data) => {
    setCheckoutResponse(data);
    window.sessionStorage.setItem("checkoutResponse", JSON.stringify(data));
  };

  const clearCheckoutResponse = () => {
    const savedCheckoutResponse = window.sessionStorage.getItem(
      "checkoutResponse",
    );
    if (savedCheckoutResponse)
      window.sessionStorage.removeItem("checkoutResponse");

    setCheckoutResponse({});
  };

  const value = {
    checkoutData,
    setCheckoutData,
    loading,
    setLoading,
    addCheckoutData,
    orderNumber,
    setOrderNumber,
    subtotal,
    setSubtotal,
    checkoutResponse,
    clearCheckoutResponse,
    saveCheckoutResponse,
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
