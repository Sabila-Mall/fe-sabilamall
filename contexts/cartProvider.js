import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";

import { apiGetCartByCustomerID } from "../api/cart";
import { useAuthContext } from "./authProvider";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setcartData] = useState([]);
    const [loading, setloading] = useState(false);
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


    useEffect(() => {
        setloading(true);
        if (userId) {
            apiGetCartByCustomerID(userId)
                .then((res) => {
                    setcartData(res);
                })
                .finally(() => setloading(false));
        }
    }, [userData]);
    console.log(cartData);
    console.log(userId);

    return (
        <CartContext.Provider value={{ cartData: [cartData, setcartData], loading: [loading, setloading] }} >
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext);
}