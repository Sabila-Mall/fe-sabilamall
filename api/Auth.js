import axios from "axios";

export const useLogin = (email, password) => {
  return axios.post("https://api.sabilamall.co.id/api/user/proses_login", {
    email: email,
    password: password,
  });
};
