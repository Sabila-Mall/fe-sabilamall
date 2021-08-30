import axios from "axios";

import { HOST } from "../constants/api";

export const getAddress = async (dataPost) => {
  try {
    const res = await axios.post(
      HOST + "/api/alamat/get_all_address",
      dataPost,
    );
    const data = await res.data?.data;

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
    const data = await res.data?.data;

    return data;
  } catch (err) {
    throw new Error(err);
  }
};
