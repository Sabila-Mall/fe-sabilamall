import axios from "axios";

import { HOST } from "../constants/api";

export const getRewards = async (memberID) => {
    try {
        const res = await axios.post(HOST + "/api/user/get_reward", {
            memberid: memberID
        });
        const data = await res?.data;
        return data;
    } catch (err) {
        throw new Error(err);
    }
};