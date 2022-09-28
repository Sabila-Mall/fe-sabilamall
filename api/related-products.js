import axios from "axios";

import { HOST } from "../constants/api";
import { isRequestSuccess } from "../utils/api";

export const getRelatedProduct = async ({
    products_slug,
    customers_id,
}) => {
    try {
        const res = await axios.post(HOST + "/api/product/get_related_products_2", {
            products_slug,
            customers_id,
            language_id: 1,
        });

        if (!isRequestSuccess(res.data)) throw new Error();

        const data = await res.data?.data?.data;
        return data;
    } catch (err) {
        throw new Error(err);
    }
};
