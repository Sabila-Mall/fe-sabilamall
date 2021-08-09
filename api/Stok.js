import axios from "axios";

export const apiStock = () => {
  return axios.get(
    "https://api.sabilamall.co.id/api/brand/get_all_manufacturers",
  );
};
