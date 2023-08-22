import axios from "axios";
import nookies from "nookies";

import { HOST, LOCAL } from "../constants/api";
import { getDeviceId } from "../utils/functions";

export const apiLogin = (email, password) => {
  return axios.post(LOCAL + "/api/user/login", {
    email: email,
    password: password,
    device_id: getDeviceId(),
  });
};

export const apiLoginByAdmin = (token) => {
  return axios.post(LOCAL + "/api/user/login/admin", {
    token: token,
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
  return axios.post(LOCAL + "/api/user/register", {
    email: email,
    customers_firstname: first_name,
    customers_lastname: last_name,
    password: password,
    customers_telephone: telephone,
    customers_address: address,
    customers_zone_id: zone_id,
    customers_city_id: city_id,
  });
};

export const apiResetPassword = (email, phoneNumber) => {
  let body;
  if (email !== "") {
    body = { email: email };
  } else if (phoneNumber !== "") {
    body = { phone: phoneNumber };
  }
  return axios.post(LOCAL + "/api/user/process_forgot_password", body);
};

export const apiGetUserProfile = (id) => {
  if (typeof id !== "string") {
    id = id.user_id;
  }
  return axios.get(LOCAL + `/api/user/${id}`);
};

export const apiUbahProfileSaya = (
  id,
  firstName,
  lastName,
  phone,
  gender,
  birthDate,
  users_ktp,
) => {
  return axios.patch(LOCAL + "/api/user/update_profile", {
    user_id: id,
    first_name: firstName,
    last_name: lastName,
    gender: gender,
    phone: phone,
    dob: birthDate,
    users_ktp: users_ktp,
  });
};

export const apiEditProfile = (
  id,
  firstName,
  lastName,
  email,
  gender,
  birthDate,
) => {
  return axios.patch(LOCAL + "/api/user/update_profile", {
    user_id: id,
    first_name: firstName,
    last_name: lastName,
    email: email,
    gender: gender,
    dob: birthDate,
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

export const saveAdminIdToCookies = (adminId) => {
  nookies.set(null, "admin_id", adminId, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};
