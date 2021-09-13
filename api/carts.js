import axios from "axios";

import { HOST } from "../constants/api";
import { isRequestSuccess } from "../utils/api";

export const addToCart = async (dataPost) => {
  let device_id = window.localStorage.getItem("device_id");
  try {
    const res = await axios.post(HOST + "/api/cart/add_to_cart", {
      ...dataPost,
      device_id,
    });

    if (!isRequestSuccess(res.data)) throw new Error();

    const data = await res.data?.data;
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};
