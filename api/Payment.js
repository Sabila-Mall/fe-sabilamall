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

export const apiCreateVirtualAccount = async (customerId, orderId) => {
    const res = await axios.post('https://api.sabilamall.co.id/api/jurnal/order/create_sync', {
        customers_id: customerId,
        transaction_no: 'SMC' + orderId,
    });
    return res.data;
}

export const apiUpdateVirtualAccount = async (customerId, orderId) => {
    const res = await axios.put(`https://api.sabilamall.co.id/api/jurnal/order/shipping/update/${'SMC' + orderId}`);
    return res.data;
}