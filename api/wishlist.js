import axios from "axios";

import { HOST } from "../constants/api";
import { isRequestSuccess } from "../utils/api";
import { getDeviceId } from "../utils/functions";

export const getWishlistByUserId = async (user_id) => {
  try {
    const device_id = getDeviceId();
    const res = await axios.post(HOST + "/api/wishlist/get_wishlist_by_user", {
      user_id,
      device_id,
    });

    if (!isRequestSuccess(res.data)) throw new Error();

    const data = await res.data?.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteWishlist = async (dataPost) => {
  try {
    const device_id = getDeviceId();
    const res = await axios.post(HOST + "/api/wishlist/delete_wishlist", {
      ...dataPost,
      device_id,
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
    const device_id = getDeviceId();
    const res = await axios.post(HOST + "/api/wishlist/add_wishlist", {
      ...dataPost,
      device_id,
    });

    if (!isRequestSuccess(res.data)) throw new Error();

    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
