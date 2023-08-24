import axios from "axios";

import { HOST_3, STAGING } from "../constants/api";

export const apiGetProduct = () => {
  console.log("api get product");
  return axios.get(`${STAGING}/api/brand/list`);
};

// gakepake
export const apiGetProductBrand = (id) => {
  console.log("api get product");
  return axios.get(`${STAGING}/api/brand/products/${id}`);
};

export const apiGetProductBrandPage = (id, page) => {
  console.log("api get product brand page");
  return axios.get(`${STAGING}/api/brand/products/${id}?page=${page}`);
};

export const apiGetProductByNamePage = (searchQuery, page) => {
  console.log("api get product by name page");
  return axios.get(
    `${STAGING}/api/products/search?name=${searchQuery}&page=${page}`,
  );
};
