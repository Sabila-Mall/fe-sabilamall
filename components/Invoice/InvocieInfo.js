import { Text } from "@chakra-ui/react";

import { PAYMENT_METHOD } from "../../constants/paymentMethod";
import { useCheckoutContext } from "../../contexts/checkoutProvider";
import { InvoiceInfoBCA } from "./InvoiceInfoBCA";
import { InvoiceInfoBankTransfer } from "./InvoiceInfoBankTransfer";
import { InvoiceInfoSMPay } from "./InvoiceInfoSMPay";

export const InvoiceInfo = () => {
  const { checkoutResponse } = useCheckoutContext();

  switch (checkoutResponse?.data?.payment_method) {
    case PAYMENT_METHOD.BANK_TRANSFER:
      return <InvoiceInfoBankTransfer checkoutResponse={checkoutResponse} />;
    case PAYMENT_METHOD.SM_PAY:
      return <InvoiceInfoSMPay />;
    case PAYMENT_METHOD.VA_BCA:
      return <InvoiceInfoBCA checkoutResponse={checkoutResponse} />;
    default:
      return <Text>...</Text>;
  }
};
