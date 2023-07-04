import axios from "axios";

import { HOST, HOST_2 } from "../constants/api";
import { isRequestSuccess } from "../utils/api";

export const apiStock = (productId) => {
  return axios.post(HOST + "/api/product/get_stock_2", {
    products_id: productId,
    type: "json",
  });
};

export const checkStock = async (dataPost) => {
  try {
    const res = await axios.post(HOST + "/api/product/get_stock_2", {
      type: "json",
      ...dataPost,
    });
    // jangan cek request

    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getStockData = async (dataPost) => {
  try {
    const res = await axios.post(HOST + "/api/product/get_stock_2", {
      type: "json",
      ...dataPost,
    });
    // jangan cek request

    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getProductStock = async ({ products_slug }) => {
  return axios.get(`${HOST_2}/api/product/stock?products_slug=${products_slug}`);
}

export const checkStockByAttribute = async (dataPost) => {
  try {
    const res = await axios.post(HOST + "/api/product/get_quantity_2", {
      type: "json",
      ...dataPost,
    });
    // jangan cek request

    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
