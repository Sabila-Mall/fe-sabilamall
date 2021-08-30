import axios from "axios";

import { HOST } from "../constants/api";
import { isRequestSuccess } from "../utils/api";

export const addToCart = async (dataPost) => {
  try {
    const res = await axios.post(HOST + "/api/cart/add_to_cart", dataPost);

    if (!isRequestSuccess(res.data)) throw new Error();

    const data = await res.data?.data;
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};
