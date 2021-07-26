import axios from "axios";

export const useLogin = (email, password) => {
  return axios.post("https://api.sabilamall.co.id/api/user/proses_login", {
    email: email,
    password: password,
  });
};

export const useRegister = (
  first_name,
  last_name,
  email,
  password,
  telephone,
  address,
  zone_id,
  city_id,
) => {
  return axios.post("https://api.sabilamall.co.id/api/user/proses_register", {
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

export const useResetPassword = (email) => {
  return axios.post("https://sabilamall.co.id/api/processforgotpassword", {
    email: email,
  });
};
