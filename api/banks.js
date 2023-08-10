import axios from "axios";

import { HOST, LOCALHOST } from "../constants/api";

export const getAllBanks = async (dataPost) => {
  try {
    const payload = new URLSearchParams(dataPost)
      .toString()
      .replaceAll("null", "");

    const res = await axios.get(LOCALHOST + "/api/banks?" + payload);

    const data = await res.data?.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
