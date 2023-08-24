import axios from "axios";

import { HOST, HOST_2, STAGING } from "../constants/api";
import { getDeviceId } from "../utils/functions";

export const apiGetOrder = async (customerId, page) => {
  let device_id = getDeviceId();

  const params = new URLSearchParams({
    customers_id: customerId,
    device_id: device_id,
    page: page,
  })
    .toString()
    .replaceAll("null", "");

  try {
    const res = await axios.get(`${STAGING}/api/order?${params}`);
    const d = {
      current_page: res.data.data.current_page,
      last_page: res.data.data.last_page,
      data: res.data.data.data,
    };

    return d;
  } catch (err) {
    throw new Error(err);
  }
};

export const apiGetSingleOrder = async (customers_id, orders_id) => {
  let device_id = getDeviceId();

  return axios.get(
    `${STAGING}/api/order/detail/${orders_id}?customers_id=${customers_id}`,
  );
};

export const apiSearchOrder = async (customerId, orderId) => {
  let device_id = getDeviceId();
  try {
    const res = await axios.get(
      `${STAGING}/api/order/detail/${orderId}?customers_id=${customerId}&no_detail=true`,
    );
    const d = {
      data: res.data,
    };
    return d;
  } catch (err) {
    const d = {
      data: {
        success: false,
      },
    };
    return d;
  }
};

export const apiGetResi = async (customers_id, orders_id) => {
  let device_id = getDeviceId();

  return axios.get(
    `${STAGING}/api/resi?orders_id=${orders_id}&customers_id=${customers_id}`,
  );
};

export const apiGetOrderCustomer = async (customerId, orderId) => {
  let device_id = getDeviceId();
  const res = await axios.post(HOST + `/api/order/get_by_customers`, {
    customers_id: customerId,
    currency_code: "IDR",
    language_id: 1,
    orders_id: orderId,
    device_id,
  });
  return res.data;
};
