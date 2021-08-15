import axios from "axios";

import { HOST } from "../constants/api";

export const apiGetCartByCustomerID = async (customers_id) => {
    const res = await axios.post(HOST + "/api/cart/get_cart_by_customer",
        {
            customers_id,
        }
    );
    const data = await res.data?.data
    return data
};

export const addCart = async (dataPost) => {
    try {
        const res = await axios.post(HOST + "/api/cart/add_to_cart", dataPost)
        const data = await res.data;
        return data
    } catch (error) {
        throw new Error(error)
    }
}

export const editCartNotes = async (dataPost) => {
    try {
        const res = await axios.post(HOST + "/api/cart/update_notes_item", dataPost)
        const data = await res.data;
        return data
    } catch (error) {
        throw new Error(error)
    }
}