import axios from "axios";

import { HOST_3 } from "../constants/api";

export const apiGetProduct = () => {
  console.log("api get product");
  return axios.get(`${HOST_3}/api/brand/get_all_manufacturers`);
};

// gakepake
export const apiGetProductBrand = (id) => {
  console.log("api get product");
  return axios.get(`${HOST_3}/api/brand/get_all_products_by_brand/${id}`);
};

export const apiGetProductBrandPage = (id, page) => {
  console.log("api get product brand page");
  return axios.get(
    `${HOST_3}/api/brand/get_all_products_by_brand/${id}?page=${page}`,
  );
};

export const apiGetProductByNamePage = (searchQuery, page) => {
  console.log("api get product by name page");
  return axios.get(`${HOST_3}/api/product/search/${searchQuery}?page=${page}`);
};
