import {HOST} from "../constants/api";
import axios from "axios";
import {isRequestSuccess} from "../utils/api";

export const getProductsByCategory = async (categoryId, page = 1, customerId) => {
  const res = await axios.get(HOST + `/api/category/get_all_products_by_category/${categoryId}`, {
    params: {
      page: page,
      customers_id: customerId,
    }
  });

  if (isRequestSuccess(res.data)) {
    return await res.data;
  } else {
    throw "Gagal mendapatkan produk sesuai kategori";
  }
};