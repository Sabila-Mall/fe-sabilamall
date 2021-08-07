import axios from "axios";
import nookies from "nookies";

import { HOST } from "../constants/api";

export const apiLogin = (email, password) => {
  return axios.post(HOST + "/api/user/proses_login", {
    email: email,
    password: password,
  });
};

export const apiRegister = (
  first_name,
  last_name,
  email,
  password,
  telephone,
  address,
  zone_id,
  city_id,
) => {
  return axios.post(HOST + "/api/user/proses_register", {
    customers_firstname: first_name,
    customers_lastname: last_name,
    email: email,
    password: password,
    customers_telephone: telephone,
    customers_address: address,
    customers_zone_id: zone_id,
    customers_city_id: city_id,
  });
};

export const apiResetPassword = (email) => {
  return axios.post(HOST + "/user/process_forgot_password", {
    email: email,
  });
};

export const apiGetUserProfile = (id) => {
  return axios.post(HOST + "/api/user/get_profile", {
    user_id: id,
  });
};

export const saveUserIdToCookies = (userId) => {
  nookies.set(null, "user_id", userId, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export const saveTokenToCookies = (token) => {
  nookies.set(null, "token", token, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};
