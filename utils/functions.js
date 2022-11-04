import nookies from "nookies";

import { IMAGE_HOST } from "../constants/api";
import { deleteAllCookies } from "../utils/cookies";


const fallbackCopyTextToClipboard = (text) => {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    const msg = successful ? "successful" : "unsuccessful";
  } catch (err) {
    console.error("Unable to copy", err);
  }

  document.body.removeChild(textArea);
};

export const copyToClipboard = (text, onSuccess, onFail) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard
    .writeText(text)
    .then(onSuccess ? onSuccess : () => { })
    .catch(() => console.error("Unable to copy", err));
};

export const formatNumber = (amount) => {
  return new Intl.NumberFormat("id-ID").format(amount);
};

export const formatPhoneNumber = (phoneNumber) => {
  return (
    phoneNumber?.slice(0, 4) +
    "-" +
    phoneNumber?.slice(4, 8) +
    "-" +
    phoneNumber?.slice(7, 11)
  );
};

export const isEmpty = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

/**
 * Filter an object based on the allowed keys
 * @param {object} obj
 * @param {array} allowed
 * @returns filtered object
 */
export const filterObject = (rawObj, allowed) => {
  const filtered = Object.keys(rawObj)
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = rawObj[key];
      return obj;
    }, {});

  return filtered;
};

export const extractName = (name) => {
  if (!name) return;

  const splittedName = name.split(" ");
  const firstname = splittedName[0];

  if (splittedName.length === 1) {
    return {
      firstname,
      lastname: "",
    };
  }

  const lastname = splittedName.slice(1).join(" ");

  return { firstname, lastname };
};

export const calculateTimeLeft = (endTime) => {
  let difference = endTime - Math.floor(new Date().getTime() / 1000);
  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (60 * 24 * 60)),
      hours: Math.floor((difference / (60 * 60)) % 24),
      minutes: Math.floor((difference / 60) % 60),
      seconds: Math.floor(difference % 60),
    };
  }

  return timeLeft;
};

export const pad = (value) => {
  return (value < 10) ? '0' + value.toString() : value.toString();
}

export const calculateDiscountedPrice = (realPrice, discount) => {
  if (!discount) {
    return realPrice;
  }

  return realPrice - realPrice * (discount / 100);
};

export const setBadgeColor = (userLevel) => {
  switch (userLevel?.toLowerCase()) {
    case "reguler":
      return "gray.400";
    case "reseller":
      return "orange.500";
    case "agent":
      return "red.600";
    default:
      return "gray.400";
  }
};

export const alreadyLogin = async (ctx) => {
  const userId = nookies.get(ctx);

  if (userId.user_id) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};
export const needForLogin = async (ctx) => {
  const userId = nookies.get(ctx);

  if (!userId.user_id) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: {},
  };
};

export const numberWithDot = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const currencyFormat = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * date: MM/DD/YYYY
 */
export const dateFormat = (date) => {
  return `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1 < 10
    ? "0" + (new Date(date).getMonth() + 1).toString()
    : new Date(date).getMonth() + 1
    }-${new Date(date).getDate() < 10
      ? "0" + new Date(date).getDate().toString()
      : new Date(date).getDate()
    }`;
};

export const titleCase = (str) => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
};

export const estimasiFormat = (estimasi) => {
  let tempResult = "";
  if (/\d/.test(estimasi)) {
    tempResult = estimasi.toLowerCase();
  } else {
    tempResult = "1" + estimasi.toLowerCase();
  }

  if (!estimasi.toLowerCase().includes("hari")) {
    tempResult += " hari";
  }

  return tempResult;
};

export const isNumber = (n) => {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
};

export const parseNumber = (str) => {
  try {
    return typeof str == "number" ? str : Number(str);
  } catch (_) {
    console.log(str);
  }
};

export const getDeviceId = () => {
  return JSON.parse(window.localStorage.getItem("device_id"));
};

export const getUserId = () => {
  if (document.cookie.indexOf("user_id") !== -1)
    return nookies.get(null, "user_id");
  return '';
};

export const getPriceAfterDiscount = (finalPrice, customerDiscount) => {
  return (parseNumber(finalPrice) * (100 - customerDiscount)) / 100;
};

export const logout = () => {
  localStorage.clear();
  deleteAllCookies();

  window.location.href = "/";
};

export const getImageLink = (link) => {
  if (link == '') {
    return 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
  } else {
    return IMAGE_HOST + link?.replace("images/media/", "");
  }
};

export const isValidJson = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}