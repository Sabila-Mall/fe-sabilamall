import { HOST, LOCAL } from "../constants/api";
import axios from "axios";

export const getLeaderboard = (limit = 5) => {
  return axios.get(LOCAL + `/api/user/leaderboard?limit=${limit}`);
}

export const getRanking = (memberId) => {
  return axios.get(LOCAL + `/api/user/rank?memberid=${memberId}`);
}

export const getProfile = (userId) => {
  return axios.get(LOCAL + `/api/user/${userId}`);
}
