import axios from "axios";

import { HOST } from "../constants/api";

export const getProducts = (page = 1, type = "", userId) => {
  return axios.get(HOST + '/api/product/get_all_filters', {
    params: {
      page: page,
      type: type,
      customers_id: userId ?? "",
    }
  })
};

export const getFlashSaleProducts = (page = 1, userId) => {
  return axios.post(HOST + "/api/product/get_flash_sale_products", {
    type: "paginate",
    page: page,
    customers_id: userId,
  });
};

export const getAllProductsByFilters = (page = 1, userId, type = '', search = '', categories_id = '', min_price = 0, max_price = 999999999, paginate = 20) => {
  return axios.post(HOST + "/api/product/get_all_by_filters", {
    type: type,
    page: page,
    customers_id: userId,
    search: search,
    categories_id: categories_id,
    min_price: min_price,
    max_price: max_price,
    paginate: paginate,
  });
}

export const getDiscountProducts = (page = 1, userId) => {
  return axios.post(HOST + "/api/product/get_sale_products", {
    type: "paginate",
    page: page,
    customers_id: userId,
  });
};

export const getBanner = () => {
  return axios.get(HOST + "/api/banner/get_all_banners");
};

export const getCategory = () => {
  return axios.get(HOST + "/api/category/get_all_categories");
};
