import axios from "axios";

import { HOST } from "../constants/api";
import { isRequestSuccess } from "../utils/api";

export const confrimTopUp = async (dataPost) => {
  try {
    console.log(dataPost, "data post");
    const res = await axios.post(HOST + "/api/deposit/top_up", dataPost);

    if (!isRequestSuccess(res.data)) throw new Error(res.data.message);
    const data = await res.data?.data;
    return data;
  } catch (err) {
    console.log(err, "ERRR");
    throw new Error(err);
  }
};
