import axios from "axios";

import { HOST, LOCALHOST } from "../constants/api";

export const getAddressByUserId = async (user_id, type) => {
  try {
    const res = await axios.get(
      `${LOCALHOST}/api/alamat/get_all_address?customers_id=${user_id}&address_book_type=${
        type == 2 ? "pengirim" : "penerima"
      }`,
    );
    const data = await res.data?.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteAddress = async (customers_id, address_book_id) => {
  try {
    const res = await axios.delete(
      `${LOCALHOST}/api/alamat/delete_shipping_address?customers_id=${customers_id}&address_book_id=${address_book_id}`,
    );
    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const addAddress = async (dataPost) => {
  try {
    const res = await axios.post(
      `${LOCALHOST}/api/alamat/add_shipping_address`,
      dataPost,
    );
    const data = await res?.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
