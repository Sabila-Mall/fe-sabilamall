import { useToast } from "@chakra-ui/react";
import axios from "axios";

import { HOST } from "../constants/api";

export const apiSendMail = async (name, phone, email, message) => {
  const body = {
    name: name,
    phone: phone,
    email: email,
    message: message,
  };

  const res = axios.post(HOST + "/api/general_setting/submit_contact_us", body);
  return (await res).data;
};
