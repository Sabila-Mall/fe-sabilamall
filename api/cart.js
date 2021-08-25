import axios from "axios";

import { HOST } from "../constants/api";
import { isRequestSuccess } from "../utils/api";

export const getMyCart = async (user_id) => {
  try {
    const res = await axios.post(HOST + "/api/cart/get_cart_by_customer", {
      customers_id: user_id,
      language_id: 1,
    });

    if (!isRequestSuccess(res.data)) throw new Error(res.data.message);

    const data = await res.data?.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
