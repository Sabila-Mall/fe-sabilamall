import axios from "axios";

import { HOST } from "../constants/api";

export const apiProvinsi = () => {
  return axios.post(HOST + "/api/location/get_zones", {
    zone_country_id: 100,
  });
};

export const apiKota = (id) => {
  console.log(id, "IDDD");
  return axios.post(HOST + "/api/location/get_cities", {
    city_zone_id: id,
  });
};

export const apiKecamatan = (id) => {
  return axios.post(HOST + "/api/location/get_districts", {
    district_city_id: id,
  });
};

export const apiKodePos = (city_id, subdistrict_id, province_id) => {
  return axios.post(HOST + "/api/location/get_zipcode", {
    cityid: city_id,
    subdistrict_id: subdistrict_id,
    provinceid: province_id,
  });
};
