import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";

import { addCart, apiGetCartByCustomerID, deleteCart, updateCartQuantity } from "../api/cart";
import { isRequestSuccess } from "../utils/api";
import { useAuthContext } from "./authProvider";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [tempData, settempData] = useState([])
    const [cartData, setcartData] = useState([]);
    const [loading, setloading] = useState(false);
    const [totalPrice, settotalPrice] = useState(0)
    const [totalDiscount, settotalDiscount] = useState(0)
    const [selectedPrice, setselectedPrice] = useState(0)
    const [selectedItem, setselectedItem] = useState([])

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

    const getAllData = () => {
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

                    let tempPrice = 0
                    let tempDiscount = 0
                    tempCart.forEach(element => {
                        const price = element.final_price
                        const quantity = element.customers_basket_quantity
                        const discount = element.products_discount
                        tempPrice += price * quantity
                        tempDiscount += discount * quantity
                    });

                    settotalPrice(tempPrice)
                    settotalDiscount(tempDiscount)
                    console.log(productIDs);
                    setcartData(tempCart)
                    console.log(cartData);

                })
                .finally(() => setloading(false));
        }
    }

    const addToCheckout = (data) => {
        let tempData = selectedItem
        tempData.push(data)
        setselectedItem(tempData)
        console.log(selectedItem);
        calculateTotalSelected()
    }

    const deleteFromCheckout = (data) => {
        let tempData = []
        selectedItem.forEach(element => {
            console.log(element.products_id === data.products_id);
            if (element.customers_basket_id !== data.customers_basket_id) {
                tempData.push(element)
            }
        });
        console.log(tempData);
        setselectedItem(tempData)
        calculateTotalSelected()
    }

    const calculateTotalSelected = () => {
        setselectedPrice(0)
        if (selectedItem.length > 0) {
            let tempTotal = 0
            selectedItem.forEach(element => {
                tempTotal += element.final_price * element.customers_basket_quantity
            });
            setselectedPrice(tempTotal)
        }

    }

    const addCartItem = async (customers_id, user_level, products_id, quantity, option_id, option_values_id) => {
        addCart({ customers_id, user_level, products_id, quantity, option_id, option_values_id })
            .then((res) => {
                console.log(res);
                if (isRequestSuccess(res)) {
                    successToast("Produk berhasil ditambahkan ke keranjang belanja")
                    getAllData()
                } else {
                    errorToast("Produk gagal ditambahkan ke keranjang belanja")
                    getAllData()
                }
            })
            .catch(() => {
                errorToast("Produk gagal ditambahkan ke keranjang belanja")
            })
    }

    const deleteCartItem = async (customers_id, customers_basket_id) => {
        deleteCart({ customers_id, customers_basket_id })
            .then((res) => {
                if (isRequestSuccess(res)) {
                    successToast("Produk berhasil dihapus dari keranjang belanja")
                    getAllData()
                } else {
                    errorToast("Gagal menghapus produk dari keranjang belanja")
                    getAllData()
                }
            })
            .catch(() => {
                errorToast("Gagal menghapus produk dari keranjang belanja")
                getAllData()
            })
    }
    const updateQuantity = async (customers_id, customers_basket_id, customers_basket_quantity) => {
        updateCartQuantity({ customers_id, customers_basket_id, customers_basket_quantity })
            .then((res) => {
                if (isRequestSuccess(res)) {
                    console.log("berhasil");
                } else {
                    console.log("gagal");
                }
            })
            .catch(() => {
                console.log("gagal error");
            })
    }

    useEffect(() => {
        getAllData()
    }, [userData]);

    console.log(cartData);



    return (
        <CartContext.Provider value={{
            cartData,
            loading,
            tempData,
            addCartItem,
            deleteCartItem,
            updateQuantity,
            totalPrice,
            settotalPrice,
            totalDiscount,
            settotalDiscount,
            selectedItem,
            setselectedItem,
            addToCheckout,
            deleteFromCheckout,
            selectedPrice
        }} >
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext);
}