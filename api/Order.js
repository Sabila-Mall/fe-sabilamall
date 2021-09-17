import axios from "axios";

import { HOST } from "../constants/api";
import { getDeviceId } from "../utils/functions";

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
) => {
  let device_id = getDeviceId();
  return axios.post(HOST + "/api/order/place_order", {
    dataorder: [
      {
        vendors_id: vendorId,
        customers_basket_id: customerBasketId,
        destination: destination,
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
  });
};

export const getKurir = (
  customerId,
  postCode,
  cityId,
  zoneId,
  subDistrictId,
  subSubDistrictId,
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
  } catch (error) {}

  return axios.post(HOST + "/api/shipping/get_all_shipping", {
    customers_id: customerId,
    countries_id: 100,
    postcode: postCode,
    city_id: cityId,
    zone_id: zoneId,
    subdistrict_id: subDistrictId,
    subsubdistrict_id: subSubDistrictId,
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
  } catch (error) {}
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
