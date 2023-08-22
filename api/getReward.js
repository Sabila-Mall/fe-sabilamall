import axios from "axios";

import { HOST, LOCAL } from "../constants/api";

export const getRewards = async (memberID) => {
    try {
        const res = await axios.get(LOCAL + `/api/user/reward?member_id=${memberID}`);
        const data = await res?.data;
        return data;
    } catch (err) {
        throw new Error(err);
    }
};