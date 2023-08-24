import axios from "axios";

import { HOST, HOST_3, STAGING } from "../constants/api";
import { getDeviceId } from "../utils/functions";

export const apiGetPaymentMekariPay = async (customerId, orderId) => {
  try {
    const res = await axios.get(
      `${STAGING}/api/jurnal/order/payment/link?orders_no=SMC${orderId}`,
    );

    return res.data;
  } catch (error) {
    toast({
      position: "top",
      title: error?.response?.data?.message,
      status: "error",
      isClosable: true,
    });
  }
};

export const apiConfirmPaymentMekariPay = async (customerId, orderId) => {
  try {
    const res = await axios.post(
      `${STAGING}/api/jurnal/order/payment/confirm`,
      {
        orders_no: "SMC" + orderId,
      },
    );
    return res.data;
  } catch (error) {
    toast({
      position: "top",
      title: error?.response?.data?.message,
      status: "error",
      isClosable: true,
    });
  }
};

export const apiCreateVirtualAccount = async (customerId, orderId) => {
  try {
    const res = await axios.post(`${STAGING}/api/jurnal/order/create_sync`, {
      orders_no: "SMC" + orderId,
    });
    return res.data;
  } catch (error) {
    toast({
      position: "top",
      title: error?.response?.data?.message,
      status: "error",
      isClosable: true,
    });
  }
};

export const apiUpdateVirtualAccount = async (customerId, orderId) => {
  try {
    const res = await axios.put(
      `${STAGING}/api/jurnal/order/shipping/update/${"SMC" + orderId}`,
    );
    return res.data;
  } catch (error) {
    toast({
      position: "top",
      title: error?.response?.data?.message,
      status: "error",
      isClosable: true,
    });
  }
};
