import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

import { addCart, apiGetCartByCustomerID, deleteCart, updateCartQuantity } from "../api/cart";
import { isRequestSuccess } from "../utils/api";
import { useAuthContext } from "./authProvider";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setcartData] = useState([]);
    const [loading, setloading] = useState(false);
    const [totalPrice, settotalPrice] = useState(0)
    const [totalDiscount, settotalDiscount] = useState(0)
    const [selectedPrice, setselectedPrice] = useState(0)
    const [selectedItem, setselectedItem] = useState([])
    const [cartDataByVendor, setcartDataByVendor] = useState([])
    const [selectedWeight, setselectedWeight] = useState(0)
    const [selectedQuantity, setselectedQuantity] = useState(0)
    const router = useRouter()

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

    const getAllData = () => {
        setloading(true);
        if (userId) {
            apiGetCartByCustomerID(userId)
                .then((res) => {
                    let tempCart = []
                    let allData = res

                    allData.forEach(vendor => {
                        for (let i = 0; i < vendor.keranjang.length; i++) {
                            for (let j = 0; j < i; j++) {
                                const firstItem = vendor.keranjang[i]
                                const secondItem = vendor.keranjang[j]
                                const firstVarian = makeObjectOfVariant(firstItem?.varian)
                                const secondVarian = makeObjectOfVariant(secondItem?.varian)

                                // delete object two product has same variant
                                if (JSON.stringify(firstVarian) === JSON.stringify(secondVarian)) {
                                    let tempKeranjang = []
                                    vendor.keranjang.forEach(el => {
                                        if (el.customers_basket_id !== secondItem.customers_basket_id) {
                                            tempKeranjang.push(el)
                                        }
                                    });
                                    vendor.keranjang = tempKeranjang
                                    console.log(vendor.keranjang);
                                    console.log(secondItem);
                                }
                            }
                        }
                    });
                    setcartDataByVendor(allData)
                    allData.forEach(vendor => {
                        vendor.keranjang.forEach(product => {
                            tempCart.push(product)
                        });
                    });
                    console.log(tempCart);

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
                    setcartData(tempCart)

                })
                .finally(() => setloading(false));
        }
    }

    const makeObjectOfVariant = (varian) => {
        let temp = {}
        varian?.forEach(el => {
            temp[el.products_options_id] = el.products_options_values_id
        });
        return temp
    }

    const checkoutValidation = () => {
        if (selectedItem.length) {
            let tempVendor = selectedItem[0].vendors_id
            let tempWeight = 0
            let tempQuantity = 0

            for (let i = 0; i < selectedItem.length; i++) {
                if (selectedItem[i].vendors_id != tempVendor) {
                    errorToast("Vendor yang dipilih harus sama")
                    return;
                }
                tempVendor = selectedItem[i].vendors_id
            }
            router.push("/alamat-penerima")

            selectedItem.forEach(element => {
                tempWeight += element.products_weight * element.customers_basket_quantity
                tempQuantity += element.customers_basket_quantity
            });

            console.log(tempWeight);
            console.log(tempQuantity);
            setselectedQuantity(tempQuantity)
            setselectedWeight(tempWeight)
            console.log(selectedItem);
            console.log(selectedPrice);
            console.log(totalDiscount);
        }
    }

    const addToCheckout = (data) => {
        let tempData = selectedItem
        tempData.push(data)
        setselectedItem(tempData)
        calculateTotalSelected(tempData)
    }

    const deleteFromCheckout = (data) => {
        let tempData = []
        selectedItem.forEach(element => {
            console.log(element.products_id === data.products_id);
            if (element.customers_basket_id !== data.customers_basket_id) {
                tempData.push(element)
            }
        });
        setselectedItem(tempData)
        calculateTotalSelected(tempData)
    }

    const calculateTotalSelected = (data) => {
        setselectedPrice(0)
        console.log(data);
        if (data.length > 0) {
            let tempTotal = 0
            data.forEach(element => {
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

    return (
        <CartContext.Provider value={{
            cartData,
            loading,
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
            selectedPrice,
            cartDataByVendor,
            checkoutValidation,
            selectedWeight,
            selectedQuantity
        }} >
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext);
}