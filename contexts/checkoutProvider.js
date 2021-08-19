import { useToast } from "@chakra-ui/toast";
import { createContext, useContext, useEffect, useState } from "react";

import { useAuthContext } from "./authProvider";

const CheckoutContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useAuthContext();
  const userId = userData?.id;
  const toast = useToast();

  const successToast = (successMessage) => {
    toast({
      position: "top",
      title: successMessage,
      status: "success",
      isClosable: true,
    });
  };

  const errorToast = (errMessage) => {
    toast({
      position: "top",
      title: errMessage,
      status: "error",
      isClosable: true,
    });
  };

  const value = {
    checkoutData,
    setCheckoutData,
    loading,
    setLoading,
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
