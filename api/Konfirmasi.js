import axios from "axios";

import { HOST, LOCALHOST } from "../constants/api";

export const getBanks = async () => {
  try {
    const res = await axios.post(HOST + "/api/bank/get_all_banks", {
      action: "forconfirmation",
    });

    // Dont check if the request is success,
    // since the status message is still `Failed` on successful request
    return res.data;
  } catch (err) {
    console.error(err);
    throw "Terjadi kesalahan pada server";
  }
};

export const postPaymentConfirmation = async (postData) => {
  try {
    const res = await axios.post(LOCALHOST + "/api/confirmation", postData);
    return res.data;
  } catch (err) {
    console.error(err);
    throw "Terjadi kesalahan pada server";
  }
};

export const getMyOrder = async (customerId, orderId) => {
  try {
    const res = await axios.post(HOST + "/api/order/get_by_customers", {
      customers_id: customerId,
      currency_code: "IDR",
      language_id: 1,
      orders_id: orderId,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw "Gagal mengambil informasi pesanan";
  }
};
