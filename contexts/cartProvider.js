import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";

import { apiGetCartByCustomerID } from "../api/cart";
import { useAuthContext } from "./authProvider";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [tempData, settempData] = useState([])
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
    const updateCart = async (productId, customerId) => {
        if (userId) {
            setcartData(
                cartData.filter((item) => {
                    // console.log(item.keranjang[0].products_id);
                    item.keranjang[0].products_id != productId
                }),
            );
            apiGetCartByCustomerID(customerId).
                then((res) => {
                    settempData(res)
                })
            console.log(tempData);
        }
    }


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

    return (
        <CartContext.Provider value={{ cartData: [cartData, setcartData], loading: [loading, setloading], tempData: [tempData, settempData], updateCart }} >
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext);
}