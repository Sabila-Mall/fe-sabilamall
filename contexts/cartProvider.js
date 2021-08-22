import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";

import { apiGetCartByCustomerID } from "../api/cart";
import { useAuthContext } from "./authProvider";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [tempData, settempData] = useState([])
    const [cartData, setcartData] = useState([]);
    const [loading, setloading] = useState(false);
    const [totalPrice, settotalPrice] = useState(0)
    const { userData } = useAuthContext();
    const userId = userData?.id;
    console.log(userId);

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
                    let tempCart = cartData
                    let productIDs = []


                    res.forEach(element => {
                        console.log(element.keranjang);
                        element.keranjang.forEach(item => {

                            // check if data is duplicate
                            if (productIDs.indexOf(item.products_id) === -1) {
                                tempCart.push(item)
                            }

                            tempCart.forEach(cartItem => {
                                productIDs.push(cartItem.products_id)
                            })
                        });

                    });
                    console.log(productIDs);
                    setcartData(tempCart)
                    console.log(cartData);
                })
                .finally(() => setloading(false));
        }
    }, [userData]);

    return (
        <CartContext.Provider value={{
            cartData,
            loading,
            tempData,
            updateCart,
            totalPrice,
            settotalPrice
        }} >
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext);
}