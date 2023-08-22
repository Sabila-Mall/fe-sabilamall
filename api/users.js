import axios from "axios";

import { HOST, LOCAL } from "../constants/api";
import { isRequestSuccess } from "../utils/api";

// UNUSED
// export const getProfile = async (dataPost) => {
//   try {
//     const res = await axios.post(HOST + "/api/user/get_profile", dataPost);

//     const data = await res.data?.data;
//     return data;
//   } catch (err) {
//     throw new Error(err);
//   }
// };

export const updatePassword = async (dataPost) => {
  try {
    const res = await axios.patch(LOCAL + "/api/user/change_password", dataPost);

    if (!isRequestSuccess(res.data)) throw new Error();

    const data = await res.data?.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getUpgradeOptions = async (dataPost) => {
  try {
    const res = await axios.get(LOCAL + `/api/user/${dataPost.user_id}`);

    if (!isRequestSuccess(res.data)) throw new Error();

    const data = await res.data?.upgrade_options;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const postUpgradeLevel = async (dataPost) => {
  try {
    const res = await axios.post(LOCAL + "/api/user/upgrade_level", dataPost);
    if (!isRequestSuccess(res.data)) throw new Error();
    const data = await res?.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const upgradeConfirmation = async (dataPost) => {
  try {
    const res = await axios.post(
      LOCAL + "/api/user/upgrade_confirmation",
      dataPost,
    );
    const data = await res?.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getInvoiceUpgradeAkun = async (user_id) => {
  try {
    const res = await axios.get(LOCAL + `/api/user/upgrade_invoice?user_id=${user_id}`);

    const data = await res.data;
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
