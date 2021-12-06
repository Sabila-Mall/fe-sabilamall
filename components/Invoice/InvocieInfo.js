import { Text } from "@chakra-ui/react";

import { PAYMENT_METHOD } from "../../constants/paymentMethod";
import { useCheckoutContext } from "../../contexts/checkoutProvider";
import { InvoiceInfoCStore } from "./InvoiceCStore";
import { InvoiceInfoBankTransfer } from "./InvoiceInfoBankTransfer";
import { InvoiceInfoSMPay } from "./InvoiceInfoSMPay";
import { InvoiceInfoVAMandiri } from "./InvoiceInfoVAMandiri";
import { InvoiceInfoVirtualAccount } from "./InvoiceInfoVirtualAccount";
import { InvoiceInfoShopeePay } from "./PaymentInfoShopeePay";

export const InvoiceInfo = () => {
  const { checkoutResponse } = useCheckoutContext();
  const paymentMethod = checkoutResponse?.data?.payment_method || "";

  switch (paymentMethod) {
    case PAYMENT_METHOD.BANK_TRANSFER:
      return <InvoiceInfoBankTransfer checkoutResponse={checkoutResponse} />;
    case PAYMENT_METHOD.SM_PAY:
      return <InvoiceInfoSMPay />;
    case PAYMENT_METHOD.VA_MANDIRI:
      return <InvoiceInfoVAMandiri checkoutResponse={checkoutResponse} />;
    case PAYMENT_METHOD.SHOPEE_PAY:
      return <InvoiceInfoShopeePay checkoutResponse={checkoutResponse} />;
    case PAYMENT_METHOD.CSTORE:
      return <InvoiceInfoCStore checkoutResponse={checkoutResponse} />;
    default:
      if (paymentMethod.startsWith(PAYMENT_METHOD.VIRTUAL_ACCOUNT_PREFIX)) {
        return (
          <InvoiceInfoVirtualAccount checkoutResponse={checkoutResponse} />
        );
      }
      return <Text>...</Text>;
  }
};
