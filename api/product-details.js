import axios from "axios";

import { HOST } from "../constants/api";
import { isRequestSuccess } from "../utils/api";

export const getProductDetail = async ({
  products_slug,
  customers_id,
  products_id,
}) => {
  try {
    const res = await axios.post(HOST + "/api/product/get_products", {
      products_slug,
      customers_id,
      products_id,
      language_id: 1,
    });

    if (!isRequestSuccess(res.data)) throw new Error();

    const data = await res.data?.product_data?.[0];
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
