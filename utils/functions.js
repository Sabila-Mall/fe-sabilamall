import { useToast } from "@chakra-ui/react";
import nookies from "nookies";

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
    .then(onSuccess ? onSuccess : () => {})
    .catch(() => console.error("Unable to copy", err));
};

export const formatNumber = (amount) => {
  return new Intl.NumberFormat("id-ID").format(amount);
};

export const formatPhoneNumber = (phoneNumber) => {
  return (
    phoneNumber.slice(0, 4) +
    "-" +
    phoneNumber.slice(4, 8) +
    "-" +
    phoneNumber.slice(7, 11)
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
  let difference = +endTime - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

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
  }).format(amount);
};

/**
 * date: MM/DD/YYYY
 */
export const dateFormat = (date) => {
  return `${new Date(date).getFullYear()}-${
    new Date(date).getMonth() + 1 < 10
      ? "0" + (new Date(date).getMonth() + 1).toString()
      : new Date(date).getMonth() + 1
  }-${
    new Date(date).getDate() < 10
      ? "0" + new Date(date).getDate().toString()
      : new Date(date).getDate()
  }`;
};
