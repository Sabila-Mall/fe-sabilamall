import { HOST } from "../constants/api";
import axios from "axios";

export const getLeaderboard = (limit = 5) => {
  return axios.post(HOST + "/api/user/get_rangking", {
    limit: limit,
  });
}

export const getRanking = (memberId) => {
  return axios.post(HOST + "/api/user/get_rangking", {
    memberid: memberId,
  });
}

export const getProfile = (userId) => {
  return axios.post(HOST + "/api/user/get_profile", {
    user_id: userId,
  });
}
