import axios from "axios";

import { HOST } from "../constants/api";

export const apiProvinsi = () => {
  return axios.post(HOST + "/api/location/get_zones", {
    zone_country_id: 100,
  });
};

export const apiKota = (id, setKotaOnFly = null) => {
  if (setKotaOnFly) setKotaOnFly(true);
  return axios.post(HOST + "/api/location/get_cities", {
    city_zone_id: id,
  });
};

export const apiKecamatan = (id, setKecamatanOnFly = null) => {
  if (setKecamatanOnFly) setKecamatanOnFly(true);
  return axios.post(HOST + "/api/location/get_districts", {
    district_city_id: id,
  });
};

export const apiKodePos = (
  city_id,
  subdistrict_id,
  province_id,
  setKodeOnFly = null,
) => {
  if (setKodeOnFly) setKodeOnFly(true);
  return axios.post(HOST + "/api/location/get_zipcode", {
    cityid: city_id,
    subdistrict_id: subdistrict_id,
    provinceid: province_id,
  });
};
