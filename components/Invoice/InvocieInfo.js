import { Text } from "@chakra-ui/react";

import { PAYMENT_METHOD } from "../../constants/paymentMethod";
import { useCheckoutContext } from "../../contexts/checkoutProvider";
import { InvoiceInfoBankTransfer } from "./InvoiceInfoBankTransfer";
import { InvoiceInfoQRIS } from "./InvoiceInfoQRIS";
import { InvoiceInfoSMPay } from "./InvoiceInfoSMPay";
import { InvoiceInfoVirtualAccount } from "./InvoiceInfoVirtualAccount";
import VAMandiri from "./VAMandiri";

export const InvoiceInfo = () => {
  const { checkoutResponse } = useCheckoutContext();
  const paymentMethod = checkoutResponse?.data?.payment_method || "";

  switch (paymentMethod) {
    case PAYMENT_METHOD.BANK_TRANSFER:
      return <InvoiceInfoBankTransfer checkoutResponse={checkoutResponse} />;
    case PAYMENT_METHOD.SM_PAY:
      return <InvoiceInfoSMPay />;
    case PAYMENT_METHOD.VA_MANDIRI:
      return <VAMandiri checkoutResponse={checkoutResponse} />;
    case PAYMENT_METHOD.QRIS:
      return <InvoiceInfoQRIS checkoutResponse={checkoutResponse} />;
    default:
      if (paymentMethod.startsWith(PAYMENT_METHOD.VIRTUAL_ACCOUNT_PREFIX)) {
        return (
          <InvoiceInfoVirtualAccount checkoutResponse={checkoutResponse} />
        );
      }
      return <Text>...</Text>;
  }
};
