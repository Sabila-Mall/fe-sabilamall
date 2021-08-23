import axios from "axios";

import { HOST } from "../constants/api";

export const apiGetOrder = async (customerId, page) => {
  try {
    const res = await axios.post(
      HOST + `/api/order/get_by_customers?page=${page}`,
      {
        customers_id: customerId,
        currency_code: "IDR",
        language_id: 1,
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

export const apiSearchOrder = async (customerId, orderId) => {
  try {
    const res = await axios.post(HOST + `/api/order/search_by_customers`, {
      customers_id: customerId,
      currency_code: "IDR",
      language_id: 1,
      orders_id: orderId,
    });
    const d = {
      data: res.data,
    };
    return d;
  } catch (err) {
    throw new Error(err);
  }
};
