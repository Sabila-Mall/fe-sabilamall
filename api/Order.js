import axios from "axios";

import { HOST } from "../constants/api";
import { getDeviceId, isValidJson } from "../utils/functions";

export const apiPlaceOrder = (
  vendorId,
  customerBasketId,
  destination,
  customerId,
  deliveryId,
  dropshipperId,
  paymentMethod,
  isCouponApplied,
  coupons,
  couponAmount,
  orderNote,
  appVersion,
  paymentAddCostMethod,
  paymentAddCostValue,
  shippingPromo,
  adminId,
  handlingFeeAdmin,
  handlingFeeAdminDiscount,
) => {
  let device_id = getDeviceId();
  return axios.post(HOST + "/api/order/place_order", {
    dataorder: [
      {
        vendors_id: vendorId,
        customers_basket_id: customerBasketId,
        destination: destination,
        shipping_promo: shippingPromo,
      },
    ],
    customers_id: customerId,
    delivery_id: deliveryId,
    dropshipper_id: dropshipperId,
    payment_method: paymentMethod,
    is_coupon_applied: isCouponApplied,
    coupons: coupons,
    coupon_amount: couponAmount,
    order_notes: orderNote,
    app_version: appVersion,
    payment_addcostmethod: paymentAddCostMethod,
    payment_addcostvalue: paymentAddCostValue,
    device_id,
    admin_id: adminId,
    handling_fee_admin: handlingFeeAdmin,
    handling_fee_admin_discount: handlingFeeAdminDiscount,
  });
};

export const getHandlingFeeAdminDiscount = () => {
  return axios.post(HOST + "/api/order/get_handling_fee_admin_discount");
}

export const getKurir = (
  customerId,
  delivery_id,
  // postCode,
  // cityId,
  // zoneId,
  // subDistrictId,
  // subSubDistrictId,
  weight,
  vendorId,
  vendorOrigin,
  deviceId,
) => {
  const customers_basket_id = [];
  try {
    JSON.parse(window.localStorage.getItem("selectedProduct")).products.forEach(
      (el) => {
        customers_basket_id.push(el.customers_basket_id);
      },
    );
  } catch (error) { }

  return axios.post(HOST + "/api/shipping/get_all_shipping", {
    customers_id: customerId,
    // countries_id: 100,
    // postcode: postCode,
    // city_id: cityId,
    // zone_id: zoneId,
    // subdistrict_id: subDistrictId,
    // subsubdistrict_id: subSubDistrictId,
    delivery_id: delivery_id,
    language_id: 1,
    currency_code: "IDR",
    weight: weight,
    vendors_id: vendorId,
    vendors_origin: vendorOrigin,
    device_id: deviceId,
    customers_basket_id: customers_basket_id,
  });
};

export const getPaymentMethod = (
  vendors_id,
  users_id,
  products_jenis,
  totalorder,
  kurir,
) => {
  const customers_basket_id = [];
  try {
    JSON.parse(window.localStorage.getItem("selectedProduct")).products.forEach(
      (el) => {
        customers_basket_id.push(el.customers_basket_id);
      },
    );
  } catch (error) { }
  return axios.post(HOST + "/api/payment/get_payment_method", {
    language_id: "1",
    vendors_id: [`${vendors_id}`],
    users_id: `${users_id}`,
    productsjenis: [`${products_jenis}`],
    totalorder: `${totalorder}`,
    kurir: kurir,
    customers_basket_id: customers_basket_id,
  });
};

export const apiGetVoucher = (customerId) => {
  return axios.post(
    HOST + "/api/coupon/get_all_active",
    {
      customers_id: customerId,
      currency_code: "IDR",
    },
    {
      headers: {
        apikey: "32c9284bfd35879a8dce97f8db9e0c2c",
      },
    },
  );
};

export const apiApplyVoucherToCart = (customerId, code) => {
  let deviceId = getDeviceId();
  let arrayOfCustomerBasket = [];

  if (typeof window !== "undefined") {
    const json = localStorage.getItem("selectedProduct")
    const products = isValidJson(json) ? JSON.parse(json) : {}
    const productItems = products?.products;
    if (productItems) {
      productItems.forEach((element) => {
        arrayOfCustomerBasket.push(element.customers_basket_id);
      });
    }

    return axios.post(HOST + "/api/coupon/apply_to_cart", {
      customers_id: customerId,
      device_id: deviceId,
      coupon_code: code,
      customers_basket_id: arrayOfCustomerBasket,
    });
  }
};
