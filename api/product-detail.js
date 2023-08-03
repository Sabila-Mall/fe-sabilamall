import axios from "axios";

import { HOST, HOST_2, LOCALHOST } from "../constants/api";
import { isRequestSuccess } from "../utils/api";

export const getProductDetail = async (customers_id, products_slug) => {
  const params = new URLSearchParams({
    products_slug,
    customers_id,
  })
    .toString()
    .replaceAll("null", "")
    .replaceAll("undefined", "");

  return axios.get(`${LOCALHOST}/api/products/${products_slug}?${params}`);
};
