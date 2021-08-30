import axios from "axios";

import { HOST } from "../constants/api";

export const getAddressByUserId = async (user_id, type) => {
  try {
    const res = await axios.post(HOST + "/api/alamat/get_all_address", {
      customers_id: user_id,
      address_book_type: type,
    });
    console.log(res);
    const data = await res.data?.data;
    console.log(data);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteAddress = async (dataPost) => {
  try {
    const res = await axios.post(
      HOST + "/api/alamat/delete_shipping_address",
      dataPost,
    );
    console.log(res);
    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const addAddress = async (dataPost) => {
  try {
    const res = await axios.post(
      HOST + "/api/alamat/add_shipping_address",
      dataPost,
    );
    console.log(res);
    const data = await res?.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
