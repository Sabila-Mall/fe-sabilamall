import axios from "axios";

export const getWishlistByUserId = async (user_id) => {
  try {
    const res = await axios.post(
      "https://api.sabilamall.co.id/api/wishlist/get_wishlist_by_user",
      {
        user_id,
      },
    );
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
      "https://api.sabilamall.co.id/api/wishlist/delete_wishlist",
      dataPost,
    );
    console.log(res);
    const data = await res.data?.product_data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const addWishlist = async (dataPost) => {
  try {
    const res = await axios.post(
      "https://api.sabilamall.co.id/api/wishlist/add_wishlist",
      dataPost,
    );
    console.log(res);
    const data = await res.data?.product_data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
