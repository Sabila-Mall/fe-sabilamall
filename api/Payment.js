import axios from "axios";

import { HOST, HOST_3, LOCALHOST } from "../constants/api";
import { getDeviceId } from "../utils/functions";

export const apiGetPaymentMekariPay = async (customerId, orderId) => {
  const res = await axios.get(
    `${LOCALHOST}/api/jurnal/order/payment/link?orders_no=SMC${orderId}`,
  );
  // console.log(res.data);
  return res.data;
};

export const apiConfirmPaymentMekariPay = async (customerId, orderId) => {
  const res = await axios.post(
    `${LOCALHOST}/api/jurnal/order/payment/confirm`,
    {
      orders_no: "SMC" + orderId,
    },
  );
  return res.data;
};

export const apiCreateVirtualAccount = async (customerId, orderId) => {
  const res = await axios.post(`${LOCALHOST}/api/jurnal/order/create_sync`, {
    orders_no: "SMC" + orderId,
  });
  return res.data;
};

export const apiUpdateVirtualAccount = async (customerId, orderId) => {
  const res = await axios.put(
    `${LOCALHOST}/api/jurnal/order/shipping/update/${"SMC" + orderId}`,
  );
  return res.data;
};
