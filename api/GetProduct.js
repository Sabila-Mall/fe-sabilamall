import axios from "axios";

export const apiGetProduct = () => {
  return axios.get(
    "https://api.sabilamall.co.id/api/brand/get_all_manufacturers",
  );
};

export const apiGetProductBrand = (id) => {
  return axios.get(
    `https://api.sabilamall.co.id/api/brand/get_all_products_by_brand/${id}`,
  );
};

export const apiGetProductBrandPage = (id, page) => {
  return axios.get(
    `https://api.sabilamall.co.id/api/brand/get_all_products_by_brand/${id}?page=${page}`,
  );
};

export const apiGetProductByNamePage = (searchQuery, page) => {
  return axios.get(
    `https://api.sabilamall.co.id/api/product/search/${searchQuery}?page=${page}`,
  );
};
