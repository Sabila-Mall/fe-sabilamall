import { useToast } from "@chakra-ui/react";
import axios from "axios";

import { HOST, LOCALHOST } from "../constants/api";
import { getDeviceId } from "../utils/functions";

export const apiSendMail = async (name, phone, email, message) => {
  let device_id = getDeviceId();

  const body = {
    name: name,
    phone: phone,
    email: email,
    message: message,
    device_id: device_id,
  };

  const res = axios.post(
    LOCALHOST + "/api/general_setting/submit_contact_us",
    body,
  );
  return (await res).data;
};
