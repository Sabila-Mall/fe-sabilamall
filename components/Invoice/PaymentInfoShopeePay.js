import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { dateFormat } from "../../utils/functions";
import { Bank } from "./InvoiceInfoBank";
import PaymentMethodStepsTabs from "./PaymentMethodStepsTabs";

export const InvoiceInfoShopeePay = ({ checkoutResponse }) => {
  const router = useRouter();

  const bankname = checkoutResponse?.payment_gateways?.bankname;
  const va_number = checkoutResponse?.payment_gateways?.va_number;
  const payment_due_date = checkoutResponse?.payment_gateways?.expiry_date;
  const action_url = checkoutResponse?.payment_gateways?.action_url;

  const paymentMethodSteps = checkoutResponse?.payment_gateways?.howtopaypage?.data?.map(
    (item) => ({
      title: item.method,
      steps: item.step,
    }),
  );

  return (
    <>
      <Text mb="0.5rem">
        Silahkan melanjutkan pembayaran dengen menekan tombol berikut:
      </Text>
      <Flex flexDir="column" w={{ base: "60%", lg: "40%" }} my="1rem">
        <a href={action_url} target="_blank">
          <Button colorScheme="orange">Bayar Tagihan</Button>
        </a>
      </Flex>
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
