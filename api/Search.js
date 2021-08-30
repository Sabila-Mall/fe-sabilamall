import { HOST } from "../constants/api";
import axios from "axios";

export const getSearchResult = async (searchQuery) => {
  try {
    const res = await axios.get(HOST + `/api/product/search/${searchQuery}`);
    return await res.data
  } catch (err) {
    console.error(err);
  }
}