import axios from "axios";

import { HOST } from "../constants/api";
import { isRequestSuccess } from "../utils/api";

export const getReviewProduct = async (dataPost) => {
  console.log(dataPost, "DATAPOSTTT");
  try {
    const res = await axios.post(HOST + "/api/review/get_by_product", {
      language_id: 1,
      ...dataPost,
    });

    const data = await res.data?.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
