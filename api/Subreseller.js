import axios from "axios";

import { LOCAL } from "../constants/api";

export const getSubresellerOrderRecap = (user_id) => {
  return axios.get(LOCAL + `/api/user/subseller_recap_order?user_id=${user_id}`);
};
