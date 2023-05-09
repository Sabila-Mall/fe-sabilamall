import { useToast } from "@chakra-ui/react";
import { data } from "jquery";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

import {
  addCart,
  apiGetCart,
  deleteCart,
  editCartNotes,
  updateCartQuantity,
} from "../api/cart";
import { getHandlingFeeAdminDiscount, apiCheckPromoBuyXYGetDisc } from "../api/Order";
import { isRequestSuccess } from "../utils/api";
import { useAuthContext } from "./authProvider";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setcartData] = useState([]);
  const [loading, setloading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [totalPrice, settotalPrice] = useState(0);
  const [totalDiscount, settotalDiscount] = useState(0);
  const [selectedPrice, setselectedPrice] = useState(0);
  const [selectedItem, setselectedItem] = useState([]);
  const [cartDataByVendor, setcartDataByVendor] = useState([]);
  const [selectedWeight, setselectedWeight] = useState(0);
  const [selectedQuantity, setselectedQuantity] = useState(0);
  const [selectedDiscount, setselectedDiscount] = useState(0);
  const [handlingFeeAdminData, setHandlingFeeAdminData] = useState(null);
  const router = useRouter();

  const { userData } = useAuthContext();
  const userId = userData?.id;
  const adminId = userData?.admin_id;

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

  const getAllData = (checkDouble = false) => {
    checkDouble && setloading(true);
    if (userId) {
      apiGetCart(userId)
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
                if (checkDouble && JSON.stringify(firstVarian) === JSON.stringify(secondVarian)) {
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
                        // deleteCartItem(
                        //   userId,
                        //   secondItem.customers_basket_id,
                        //   false,
                        // );
                      } else {
                        updateQuantity(
                          userId,
                          el.customers_basket_id,
                          el.products_stok,
                        );
                        // deleteCartItem(
                        //   userId,
                        //   secondItem.customers_basket_id,
                        //   false,
                        // );
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
            tempDiscount += discount * price * quantity;
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

  const checkoutValidation = async () => {
    if (selectedItem.length) {

      localStorage.setItem("selectedProduct", []);
      let tempVendor = selectedItem[0].vendors_id;
      let tempJenis = selectedItem[0].products_jenis;
      let tempWarehouse = selectedItem[0].warehouse_id;
      let tempWeight = 0;
      let tempQuantity = 0;
      let tempDiscount = 0;
      let tempHandlingFeeAdminDiscount = 0;
      let tempHandlingFeeAdmin = 0;
      let tempIsPromoBuyXY = false;
      let tempDiscBuyXYCustomers = 0;
      let tempDiscBuyXYManufacturers = 0;
      let tempPromoBuyXYDesc = '';
      let tempHandlingFee = 0;


      for (let i = 0; i < selectedItem.length; i++) {
        if (selectedItem[i].vendors_id != tempVendor) {
          errorToast("Vendor yang dipilih harus sama");
          return;
        } else if (selectedItem[i].products_jenis != tempJenis) {
          errorToast("Jenis pembelian yang dipilih harus sama");
          return;
        } else if (selectedItem[i].warehouse_id != tempWarehouse) {
          errorToast("Gudang pembelian yang dipilih harus sama");
          return;
        }
        tempVendor = selectedItem[i].vendors_id;
      }

      if (adminId != null) {
        // get data handling admin discount
        let handling_fee_admin = await getHandlingFeeAdminDiscount();
        if (handling_fee_admin.status == 200) {
          tempHandlingFeeAdminDiscount = handling_fee_admin.data.data;
          setHandlingFeeAdminData(tempHandlingFeeAdminDiscount);
        } else {
          tempHandlingFeeAdminDiscount = 0;
          setHandlingFeeAdminData(tempHandlingFeeAdminDiscount);
        }
      }

      // tambahan handling fee jika orderan sr12
      if (selectedItem[0].vendors_id == 10536) {
        tempHandlingFee = 4300;
      }

      router.push("/alamat-penerima");

      let data_promo = selectedItem.map((item) => {
        let data = [];
        data.push(Number(item.products_id));
        data.push(Number(item.varian.find((item) => item.products_options_id == 1)?.products_options_values_id));
        data.push(Number(item.varian.find((item) => item.products_options_id == 2)?.products_options_values_id));
        data.push(Number(item.customers_basket_quantity));
        return data;
      });

      const res_check_data_promo = await apiCheckPromoBuyXYGetDisc(data_promo, userId, tempVendor);
      if (res_check_data_promo.is_promo == true) {
        tempIsPromoBuyXY = true;
        tempDiscBuyXYCustomers = Number(res_check_data_promo.result_promo.customers_discount);
        tempDiscBuyXYManufacturers = Number(res_check_data_promo.result_promo.promos_disc);
        tempPromoBuyXYDesc = res_check_data_promo.result_promo.promos_name;

        selectedItem.forEach((element) => {
          let tempAddWeight = element.varian.reduce((partialSum, data) => partialSum + parseInt(data.values_weight), 0);
          tempWeight +=
            (parseInt(element.products_weight) + tempAddWeight) * parseInt(element.customers_basket_quantity);
          tempQuantity += element.customers_basket_quantity;
          if (tempDiscBuyXYCustomers) {
            tempDiscount +=
              (Number(tempDiscBuyXYCustomers) / 100) *
              element.customers_basket_quantity *
              element.final_price;
          }

          let disc_customer = parseInt(element.final_price) - ((parseInt(element.final_price) * (parseInt(tempDiscBuyXYCustomers) / 100)))
          let disc_admin = parseInt(element.final_price) - ((parseInt(element.final_price) * ((parseInt(tempDiscBuyXYCustomers) - parseInt(tempHandlingFeeAdminDiscount)) / 100)))

          tempHandlingFeeAdmin += (disc_admin - disc_customer) * parseInt(element.customers_basket_quantity);
        });

      } else {
        selectedItem.forEach((element) => {
          let tempAddWeight = element.varian.reduce((partialSum, data) => partialSum + parseInt(data.values_weight), 0);
          tempWeight +=
            (parseInt(element.products_weight) + tempAddWeight) * parseInt(element.customers_basket_quantity);
          tempQuantity += element.customers_basket_quantity;
          if (element.customers_discount) {
            tempDiscount +=
              (Number(element.customers_discount) / 100) *
              element.customers_basket_quantity *
              element.final_price;
          }

          let disc_customer = parseInt(element.final_price) - ((parseInt(element.final_price) * (parseInt(element.customers_discount) / 100)))
          let disc_admin = parseInt(element.final_price) - ((parseInt(element.final_price) * ((parseInt(element.customers_discount) - parseInt(tempHandlingFeeAdminDiscount)) / 100)))

          tempHandlingFeeAdmin += (disc_admin - disc_customer) * parseInt(element.customers_basket_quantity);
        });
      }

      const checkoutData = {
        weight: tempWeight,
        quantity: tempQuantity,
        products: selectedItem,
        discount: tempDiscount,
        total_price: selectedPrice,
        handling_fee_admin: tempHandlingFeeAdmin,
        handling_fee_admin_discount: tempHandlingFeeAdminDiscount,
        is_promo_buyxy: tempIsPromoBuyXY,
        disc_buyxy_customers: tempDiscBuyXYCustomers,
        disc_buyxy_manufacturers: tempDiscBuyXYManufacturers,
        promo_buyxy_desc: tempPromoBuyXYDesc,
        handling_fee: tempHandlingFee,
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
    console.log(data);
    let tempData = selectedItem;

    let countData = selectedItem.filter((item) => item.customers_basket_id == data.customers_basket_id);
    if (countData.length > 0) {
      return;
    }

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
          (element.customers_discount / 100) *
          element.final_price *
          element.customers_basket_quantity;
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
        let message;
        if (typeof res?.message === "object") {
          message = res?.message.customers_basket_notes[0];
        } else if (typeof res?.message === "string") {
          message = res?.message;
        }
        if (isRequestSuccess(res)) {
          successToast(message);
        } else {
          errorToast(message);
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
    warehouse_id,
    admin_id,
  ) => {
    try {
      const res = await addCart({
        customers_id,
        user_level,
        products_id,
        quantity,
        option_id,
        option_values_id,
        warehouse_id,
        admin_id,
      })

      if (isRequestSuccess(res)) {
        successToast("Produk berhasil ditambahkan ke keranjang belanja");
      } else {
        errorToast(res.message);
      }
    } catch (_) {
      errorToast("Produk gagal ditambahkan ke keranjang belanja");
    }

    getAllData();

  };

  const deleteCartItem = async (
    customers_id,
    customers_basket_id,
    toaster = true,
  ) => {
    await new Promise((res, rej) => {
      deleteCart({ customers_id, customers_basket_id })
        .then((res) => {
          if (isRequestSuccess(res)) {
            toaster &&
              successToast("Produk berhasil dihapus dari keranjang belanja");
            getAllData();

            // hapus dari selected
            let tempData = selectedItem.filter((item) => item.customers_basket_id != customers_basket_id);
            setselectedItem(tempData);
            calculateTotalSelected(tempData);
            calculateTotalDiscount(tempData);
            res();
          } else {
            toaster &&
              errorToast("Gagal menghapus produk dari keranjang belanja");
            getAllData();
            res();

          }
        })
        .catch(() => {
          errorToast("Gagal menghapus produk dari keranjang belanja");
          getAllData();
          res();
        });
    })

  };

  const updateQuantity = async (
    customers_id,
    customers_basket_id,
    customers_basket_quantity,
  ) => {
    setCheckoutLoading(true)
    updateCartQuantity({
      customers_id,
      customers_basket_id,
      customers_basket_quantity,
    })
      .then((res) => {
        if (isRequestSuccess(res)) {
          getAllData(false);
        } else {
        }
      })
      .catch(() => { })
      .finally(() => setCheckoutLoading(false))
  };

  useEffect(() => {
    getAllData();
  }, [userData]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        loading,
        checkoutLoading,
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
