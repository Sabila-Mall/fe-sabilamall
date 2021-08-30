import axios from "axios";

import { HOST } from "../constants/api";

export const apiCancelOrder = (id, orders_id) => {
  return axios.post(HOST + `/api/order/cancel_order`, {
    customers_id: id,
    orders_id: orders_id,
  });
};
