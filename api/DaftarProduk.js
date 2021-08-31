import { HOST } from "../constants/api";
import axios from "axios";
import { isRequestSuccess } from "../utils/api";

export const getProductsByCategory = async (categoryId, page = 1) => {
  const res = await axios.get(HOST + `/api/category/get_all_products_by_category/${categoryId}?page=${page}`);

  if (isRequestSuccess(res.data)) {
    return await res.data;
  } else {
    throw "Gagal mendapatkan produk sesuai kategori";
  }
};