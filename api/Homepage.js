import axios from "axios";

import { HOST } from "../constants/api";

export const getProducts = (page = 1, type = "") => {
  return axios.get(HOST + `/api/product/get_all_filters?page=${page}&type=${type}`);
};

export const getFlashSaleProducts = () => {
  return axios.post(HOST + "/api/product/get_flash_sale_products", {});
};

export const getDiscountProducts = () => {
  return axios.post(HOST + "/api/product/get_sale_products", {});
};

export const getBanner = () => {
  return axios.get(HOST + "/api/banner/get_all_banners");
};

export const getCategory = () => {
  return axios.get(HOST + "/api/category/get_all_categories");
}
