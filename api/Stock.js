import axios from "axios";

export const apiStock = (productId) => {
  return axios.post("https://api.sabilamall.co.id/api/product/get_stock", {
    products_id: productId,
    type: "json",
  });
};
