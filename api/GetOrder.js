import axios from "axios";

import { HOST } from "../constants/api";

export const apiGetOrder = async (customerId, page) => {
  let device_id = null;
  if (typeof window !== "undefined") {
    device_id = window.localStorage.getItem("device_id");
  }
  try {
    const res = await axios.post(
      HOST + `/api/order/get_by_customers?page=${page}`,
      {
        customers_id: customerId,
        currency_code: "IDR",
        language_id: 1,
        device_id,
      },
    );
    const d = {
      current_page: res.data.current_page,
      last_page: res.data.last_page,
      data: res.data.data,
    };

    return d;
  } catch (err) {
    throw new Error(err);
  }
};

export const apiGetSingleOrder = async (customers_id, orders_id) => {
  let device_id = null;
  if (typeof window !== "undefined") {
    device_id = window.localStorage.getItem("device_id");
  }
  return axios.post(HOST + "/api/order/get_by_customers", {
    customers_id: customers_id,
    currency_code: "IDR",
    language_id: 1,
    orders_id: orders_id,
    device_id,
  });
};

export const apiSearchOrder = async (customerId, orderId) => {
  let device_id = null;
  if (typeof window !== "undefined") {
    device_id = window.localStorage.getItem("device_id");
  }
  try {
    const res = await axios.post(HOST + `/api/order/search_by_customers`, {
      customers_id: customerId,
      currency_code: "IDR",
      language_id: 1,
      orders_id: orderId,
      device_id,
    });
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
  let device_id = null;
  if (typeof window !== "undefined") {
    device_id = window.localStorage.getItem("device_id");
  }
  return axios.post(HOST + "/api/resi/cek_resi", {
    customers_id: customers_id,
    orders_id: orders_id,
    device_id,
  });
};

export const apiGetOrderCustomer = async (customerId, orderId) => {
  let device_id = null;
  if (typeof window !== "undefined") {
    device_id = window.localStorage.getItem("device_id");
  }
  const res = await axios.post(HOST + `/api/order/get_by_customers`, {
    customers_id: customerId,
    currency_code: "IDR",
    language_id: 1,
    orders_id: orderId,
    device_id,
  });
  return res.data;
};
