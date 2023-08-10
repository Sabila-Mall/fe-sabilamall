import axios from "axios";

import { HOST_3, LOCALHOST } from "../constants/api";

const HOST_3_LOCAL = "http://localhost:8002";
export const apiGetProduct = () => {
  console.log("api get product");
  return axios.get(`${LOCALHOST}/api/brand/list`);
};

// gakepake
export const apiGetProductBrand = (id) => {
  console.log("api get product");
  return axios.get(`${LOCALHOST}/api/brand/products/${id}`);
};

export const apiGetProductBrandPage = (id, page) => {
  console.log("api get product brand page");
  return axios.get(`${LOCALHOST}/api/brand/products/${id}?page=${page}`);
};

export const apiGetProductByNamePage = (searchQuery, page) => {
  console.log("api get product by name page");
  return axios.get(
    `${LOCALHOST}/api/products/search?name=${searchQuery}&page=${page}`,
  );
};
