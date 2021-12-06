import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import PaymentMethodStepsTabs from "./PaymentMethodStepsTabs";

export const InvoiceInfoCStore = ({ checkoutResponse }) => {
  const router = useRouter();

  const payment_due_date = checkoutResponse?.payment_gateways?.expiry_date;
  const payment_code = checkoutResponse?.payment_gateways?.payment_code;
  const subtotal = checkoutResponse?.subtotal;
  const paymentMethodSteps = checkoutResponse?.payment_gateways?.howtopaypage?.data?.map(
    (item) => ({
      title: item.method,
      steps: item.step,
    }),
  );

  return (
    <>
      <Text mb="0.5rem">Kode Pembayaran: {payment_code}</Text>
      <Text mb="0.5rem">Total Pembayaran: {subtotal}</Text>

      <Text mb="0.5rem">Lakukan pembayaran sebelum {payment_due_date}</Text>

      <Box marginTop={6}>
        <Text>Cara Membayar:</Text>
        <PaymentMethodStepsTabs tabsData={paymentMethodSteps} />
      </Box>

      <Flex justifyContent={{ lg: "flex-end" }} w="full">
        <Button
          colorScheme="orange"
          w={{ base: "full", lg: "15rem" }}
          mt="1rem"
          onClick={() => router.push("/")}
        >
          Kembali Berbelanja
        </Button>
      </Flex>
    </>
  );
};
