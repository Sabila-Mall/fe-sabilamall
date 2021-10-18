import axios from "axios";
import { HOST } from "../constants/api";

export const getSearchResult = async (searchQuery, page) => {
  try {
    const res = await axios.get(HOST + `/api/product/search/${searchQuery}?page=${page}`);
    return await res.data
  } catch (err) {
    console.error(err);
  }
}