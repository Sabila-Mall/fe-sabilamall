import axios from "axios";

import { HOST } from "../constants/api";
import { getDeviceId } from "../utils/functions";

export const apiGetPaymentMekariPay = async (customerId, orderId) => {
    const res = await axios.post('https://api.sabilamall.co.id/api/jurnal/order/payment/link', {
        customers_id: customerId,
        transaction_no: 'SMC' + orderId,
    });
    console.log(res.data);
    return res.data;
};

export const apiConfirmPaymentMekariPay = async (customerId, orderId) => {
    const res = await axios.post('https://api.sabilamall.co.id/api/jurnal/order/payment/confirm', {
        customers_id: customerId,
        transaction_no: 'SMC' + orderId,
    });
    return res.data;
};