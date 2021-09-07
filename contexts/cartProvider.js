import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

import {
  addCart,
  apiGetCartByCustomerID,
  deleteCart,
  editCartNotes,
  updateCartQuantity,
} from "../api/cart";
import { isRequestSuccess } from "../utils/api";
import { useAuthContext } from "./authProvider";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setcartData] = useState([]);
  const [loading, setloading] = useState(false);
  const [totalPrice, settotalPrice] = useState(0);
  const [totalDiscount, settotalDiscount] = useState(0);
  const [selectedPrice, setselectedPrice] = useState(0);
  const [selectedItem, setselectedItem] = useState([]);
  const [cartDataByVendor, setcartDataByVendor] = useState([]);
  const [selectedWeight, setselectedWeight] = useState(0);
  const [selectedQuantity, setselectedQuantity] = useState(0);
  const [selectedDiscount, setselectedDiscount] = useState(0);
  const router = useRouter();

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

  const getAllData = (checkDouble = true) => {
    checkDouble && setloading(true);
    if (userId) {
      apiGetCartByCustomerID(userId)
        .then((res) => {
          let tempCart = [];
          let allData = res;

          allData.forEach((vendor) => {
            for (let i = 0; i < vendor.keranjang.length; i++) {
              for (let j = 0; j < i; j++) {
                const firstItem = vendor.keranjang[i];
                const secondItem = vendor.keranjang[j];
                const firstVarian = makeObjectOfVariant(firstItem?.varian);
                const secondVarian = makeObjectOfVariant(secondItem?.varian);

                // delete object two product has same variant
                if (
                  checkDouble &&
                  JSON.stringify(firstVarian) === JSON.stringify(secondVarian)
                ) {
                  let tempKeranjang = [];
                  vendor.keranjang.forEach((el) => {
                    if (
                      el.customers_basket_id !== secondItem.customers_basket_id
                    ) {
                      tempKeranjang.push(el);
                    } else {
                      const newQuantity =
                        el.customers_basket_quantity +
                        secondItem.customers_basket_quantity;
                      if (newQuantity <= el.products_stok) {
                        updateQuantity(
                          userId,
                          el.customers_basket_id,
                          newQuantity,
                        );
                        deleteCartItem(
                          userId,
                          secondItem.customers_basket_id,
                          false,
                        );
                      } else {
                        updateQuantity(
                          userId,
                          el.customers_basket_id,
                          el.products_stok,
                        );
                        deleteCartItem(
                          userId,
                          secondItem.customers_basket_id,
                          false,
                        );
                      }
                    }
                  });
                  vendor.keranjang = tempKeranjang;
                }
              }
            }
          });
          setcartDataByVendor(allData);
          allData.forEach((vendor) => {
            vendor.keranjang.forEach((product) => {
              tempCart.push(product);
            });
          });

          let tempPrice = 0;
          let tempDiscount = 0;
          tempCart.forEach((element) => {
            const price = element.final_price;
            const quantity = element.customers_basket_quantity;
            const discount = element.customers_discount;
            tempPrice += price * quantity;
            tempDiscount += discount * quantity;
          });

          settotalPrice(tempPrice);
          settotalDiscount(tempDiscount);
          setcartData(tempCart);
        })
        .finally(() => setloading(false));
    }
  };

  const makeObjectOfVariant = (varian) => {
    let temp = {};
    varian?.forEach((el) => {
      temp[el.products_options_id] = el.products_options_values_id;
    });
    return temp;
  };

  const checkoutValidation = () => {
    if (selectedItem.length) {
      localStorage.setItem("selectedProduct", []);
      let tempVendor = selectedItem[0].vendors_id;
      let tempJenis = selectedItem[0].products_jenis;
      let tempWeight = 0;
      let tempQuantity = 0;
      let tempDiscount = 0;

      for (let i = 0; i < selectedItem.length; i++) {
        if (selectedItem[i].vendors_id != tempVendor) {
          errorToast("Vendor yang dipilih harus sama");
          return;
        } else if (selectedItem[i].products_jenis != tempJenis) {
          errorToast("Jenis pembelian yang dipilih harus sama");
          return;
        }
        tempVendor = selectedItem[i].vendors_id;
      }
      router.push("/alamat-penerima");

      selectedItem.forEach((element) => {
        tempWeight +=
          element.products_weight * element.customers_basket_quantity;
        tempQuantity += element.customers_basket_quantity;
        if (element.customers_discount) {
          tempDiscount +=
            Number(element.customers_discount) *
            element.customers_basket_quantity;
        }
      });

      const checkoutData = {
        weight: tempWeight,
        quantity: tempQuantity,
        products: selectedItem,
        discount: tempDiscount,
        total_price: selectedPrice,
      };

      localStorage.setItem("selectedProduct", JSON.stringify(checkoutData));
      setselectedQuantity(tempQuantity);
      setselectedWeight(tempWeight);
      setselectedDiscount(tempDiscount);
    } else {
      toast({
        title: "Pilih barang yang akan dicheckout terlebih dahulu",
        status: "warning",
        position: "top",
      });
    }
  };

  const addToCheckout = (data) => {
    let tempData = selectedItem;
    tempData.push(data);
    setselectedItem(tempData);
    calculateTotalSelected(tempData);
    calculateTotalDiscount(tempData);
  };

  const deleteFromCheckout = (data) => {
    let tempData = [];
    selectedItem.forEach((element) => {
      if (element.customers_basket_id !== data.customers_basket_id) {
        tempData.push(element);
      }
    });
    setselectedItem(tempData);
    calculateTotalSelected(tempData);
    calculateTotalDiscount(tempData);
  };

  const calculateTotalSelected = (data) => {
    setselectedPrice(0);
    if (data.length > 0) {
      let tempTotal = 0;
      data.forEach((element) => {
        tempTotal += element.final_price * element.customers_basket_quantity;
      });
      setselectedPrice(tempTotal);
    }
  };

  const calculateTotalDiscount = (data) => {
    setselectedDiscount(0);
    if (data.length > 0) {
      let tempTotal = 0;
      data.forEach((element) => {
        tempTotal +=
          element.products_discount * element.customers_basket_quantity;
      });
      setselectedDiscount(tempTotal);
    }
  };

  const editCartItemNotes = async (
    customers_id,
    customers_basket_id,
    customers_basket_notes,
  ) => {
    editCartNotes({ customers_id, customers_basket_id, customers_basket_notes })
      .then((res) => {
        if (isRequestSuccess(res)) {
          successToast("Berhasil menambahkan catatan produk");
          getAllData();
        } else {
          errorToast("Gagal menambahkan catatan produk");
          getAllData();
        }
      })
      .catch(() => {
        errorToast("Gagal menambahkan catatan produk");
      });
  };

  const addCartItem = async (
    customers_id,
    user_level,
    products_id,
    quantity,
    option_id,
    option_values_id,
  ) => {
    addCart({
      customers_id,
      user_level,
      products_id,
      quantity,
      option_id,
      option_values_id,
    })
      .then((res) => {
        if (isRequestSuccess(res)) {
          successToast("Produk berhasil ditambahkan ke keranjang belanja");
          getAllData();
        } else {
          errorToast("Produk gagal ditambahkan ke keranjang belanja");
          getAllData();
        }
      })
      .catch(() => {
        errorToast("Produk gagal ditambahkan ke keranjang belanja");
      });
  };

  const deleteCartItem = async (
    customers_id,
    customers_basket_id,
    toaster = true,
  ) => {
    deleteCart({ customers_id, customers_basket_id })
      .then((res) => {
        if (isRequestSuccess(res)) {
          toaster &&
            successToast("Produk berhasil dihapus dari keranjang belanja");
          getAllData();
        } else {
          toaster &&
            errorToast("Gagal menghapus produk dari keranjang belanja");
          getAllData();
        }
      })
      .catch(() => {
        errorToast("Gagal menghapus produk dari keranjang belanja");
        getAllData();
      });
  };
  const updateQuantity = async (
    customers_id,
    customers_basket_id,
    customers_basket_quantity,
  ) => {
    updateCartQuantity({
      customers_id,
      customers_basket_id,
      customers_basket_quantity,
    })
      .then((res) => {
        if (isRequestSuccess(res)) {
          console.log("berhasil");
          getAllData(false);
        } else {
          console.log("gagal");
        }
      })
      .catch(() => {
        console.log("gagal error");
      });
  };

  useEffect(() => {
    getAllData();
  }, [userData]);

  return (
    <CartContext.Provider
      value={{
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
        selectedQuantity,
        editCartItemNotes,
        selectedDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};