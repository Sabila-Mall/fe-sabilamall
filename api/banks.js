import axios from "axios";

import { HOST } from "../constants/api";

export const getAllBanks = async (dataPost) => {
  try {
    const res = await axios.post(HOST + "/api/bank/get_all_banks", dataPost);

    const data = await res.data?.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
