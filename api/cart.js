import axios from "axios";

import { HOST } from "../constants/api";
import { isRequestSuccess } from "../utils/api";
import { getDeviceId } from "../utils/functions";

export const apiGetCartByCustomerID = async (customers_id) => {
  let device_id = getDeviceId();

  const res = await axios.post(HOST + "/api/cart/get_cart_by_customer_2", {
    customers_id,
    device_id,
  });
  const data = await res.data?.data;
  return data;
};


export const apiGetPromoBuyXYGetDisc = async (dataPost) => {
  let device_id = getDeviceId();

  const res = await axios.post(HOST + "/api/cart/get_cart_by_customer_2", {
    customers_id,
    device_id,
  });
  const data = await res.data?.data;
  return data;
}

export const addCart = async (dataPost) => {
  let device_id = getDeviceId();
  try {
    const res = await axios.post(HOST + "/api/cart/add_to_cart_2", {
      ...dataPost,
      device_id,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteCart = async (dataPost) => {
  let device_id = getDeviceId();
  try {
    const res = await axios.post(HOST + "/api/cart/delete", {
      ...dataPost,
      device_id,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const editCartNotes = async (dataPost) => {
  let device_id = getDeviceId();
  try {
    const res = await axios.post(HOST + "/api/cart/update_notes_item", {
      ...dataPost,
      device_id,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCartQuantity = async (dataPost) => {
  let device_id = getDeviceId();
  try {
    const res = await axios.post(HOST + "/api/cart/update_qty_item_2", {
      ...dataPost,
      device_id,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMyCart = async (user_id) => {
  let device_id = getDeviceId();
  try {
    const res = await axios.post(HOST + "/api/cart/get_cart_by_customer", {
      customers_id: user_id,
      language_id: 1,
      device_id,
    });

    if (!isRequestSuccess(res.data)) throw new Error(res.data.message);

    const data = await res.data?.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
