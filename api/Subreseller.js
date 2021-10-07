import axios from "axios";

import { HOST } from "../constants/api";

export const getSubresellerOrderRecap = (user_id) => {
  return axios.post(HOST + "/api/user/get_subreseller_rekap_order", {
    user_id: user_id,
  });
};
