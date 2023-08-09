import axios from "axios";

import { HOST, LOCALHOST } from "../constants/api";

export const getLeaderboard = (limit = 5) => {
  const payload = new URLSearchParams({
    limit: limit,
  })
    .toString()
    .replaceAll("null", "");
  return axios.get(LOCALHOST + "/api/user/leaderboard?" + payload);
};

export const getRanking = (memberId) => {
  const payload = new URLSearchParams({
    memberid: memberId,
  });
  return axios.get(LOCALHOST + "/api/user/rank?" + payload);
};

export const getProfile = (userId) => {
  return axios.get(LOCALHOST + "/api/user/" + userId);
};
