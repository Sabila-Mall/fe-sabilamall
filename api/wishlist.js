import axios from "axios";

import { HOST, LOCALHOST } from "../constants/api";
import { isRequestSuccess } from "../utils/api";
import { getDeviceId } from "../utils/functions";

export const getWishlistByUserId = async (user_id) => {
  try {
    const params = new URLSearchParams({
      user_id,
    })
      .toString()
      .replaceAll("null", "")
      .replaceAll("undefined", "");

    const res = await axios.get(`${LOCALHOST}/api/wishlist?${params}`);

    if (!isRequestSuccess(res.data)) throw new Error();

    const data = await res.data?.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteWishlist = async (dataPost) => {
  try {
    const res = await axios.delete(LOCALHOST + "/api/wishlist", {
      data: {
        ...dataPost,
      },
    });

    if (!isRequestSuccess(res.data)) throw new Error();

    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const addWishlist = async (dataPost) => {
  try {
    const res = await axios.post(LOCALHOST + "/api/wishlist", {
      ...dataPost,
    });

    if (!isRequestSuccess(res.data)) throw new Error();

    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
