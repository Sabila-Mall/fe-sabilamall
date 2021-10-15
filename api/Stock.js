import axios from "axios";

import { HOST } from "../constants/api";
import { isRequestSuccess } from "../utils/api";

export const apiStock = (productId) => {
  return axios.post("https://apiweb.sabilamall.co.id/api/product/get_stock", {
    products_id: productId,
    type: "json",
  });
};

export const checkStock = async (dataPost) => {
  try {
    const res = await axios.post(HOST + "/api/product/get_stock", {
      type: "json",
      ...dataPost,
    });
    // jangan cek request

    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
