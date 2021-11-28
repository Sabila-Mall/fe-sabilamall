import { Text } from "@chakra-ui/react";

import { PAYMENT_METHOD } from "../../constants/paymentMethod";
import { useCheckoutContext } from "../../contexts/checkoutProvider";
import { InvoiceInfoBankTransfer } from "./InvoiceInfoBankTransfer";
import { InvoiceInfoSMPay } from "./InvoiceInfoSMPay";
import { InvoiceShopeePay } from "./InvoiceInfoShopeePay";
import { InvoiceInfoVirtualAccount } from "./InvoiceInfoVirtualAccount";

export const InvoiceInfo = () => {
  const { checkoutResponse } = useCheckoutContext();
  const paymentMethod = checkoutResponse?.data?.payment_method || "";

  switch (paymentMethod) {
    case PAYMENT_METHOD.BANK_TRANSFER:
      return <InvoiceInfoBankTransfer checkoutResponse={checkoutResponse} />;
    case PAYMENT_METHOD.SM_PAY:
      return <InvoiceInfoSMPay />;
    default:
      if (paymentMethod.startsWith(PAYMENT_METHOD.VIRTUAL_ACCOUNT_PREFIX)) {
        return (
          <InvoiceInfoVirtualAccount checkoutResponse={checkoutResponse} />
        );
      }
      return <Text>...</Text>;
  }
};
