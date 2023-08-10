import axios from "axios";

import { HOST, LOCALHOST } from "../constants/api";

export const topUpHistory = (member_id) => {
  return axios.post(LOCALHOST + "/api/deposit/top_up", {
    action: "history",
    memberid: member_id,
  });
};

export const topUpList = (member_id) => {
  return axios.post(LOCALHOST + "/api/deposit/top_up", {
    action: "list",
    memberid: member_id,
  });
};
