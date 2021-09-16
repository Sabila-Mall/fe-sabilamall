import axios from "axios";

import { HOST } from "../constants/api";

export const topUpHistory = (member_id) => {
  return axios.post(HOST + "/api/deposit/top_up", {
    action: "history",
    memberid: member_id,
  });
};

export const topUpList = (member_id) => {
  return axios.post(HOST + "/api/deposit/top_up", {
    action: "list",
    memberid: member_id,
  });
};
