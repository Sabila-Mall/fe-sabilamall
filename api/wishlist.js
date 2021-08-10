import axios from "axios";

import { HOST } from "../constants/api";

export const getWishlistByUserId = async (user_id) => {
  try {
    const res = await axios.post(HOST + "/api/wishlist/get_wishlist_by_user", {
      user_id,
    });
    console.log(res);
    const data = await res.data?.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteWishlist = async (dataPost) => {
  try {
    const res = await axios.post(
      HOST + "/api/wishlist/delete_wishlist",
      dataPost,
    );
    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const addWishlist = async (dataPost) => {
  try {
    const res = await axios.post(HOST + "/api/wishlist/add_wishlist", dataPost);
    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
