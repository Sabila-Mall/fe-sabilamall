import axios from "axios";

import { HOST, HOST_2 } from "../constants/api";
import { isRequestSuccess } from "../utils/api";

export const getProductDetail = async (customers_id, products_slug, products_id, admin_id) => {
  const params = new URLSearchParams({
    products_slug,
    customers_id,
    products_id,
    language_id: 1,
    admin_id
  }).toString().replaceAll('null', '').replaceAll('undefined', '');

  return axios.get(`${HOST_2}/api/product?${params}`);
};

