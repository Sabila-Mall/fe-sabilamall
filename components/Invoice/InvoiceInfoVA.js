import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import PaymentMethodStepsTabs from "./PaymentMethodStepsTabs";

export const InvoiceInfoVA = ({ checkoutResponse }) => {
  const router = useRouter();

  const payment_due_date = checkoutResponse?.payment_due_date;
  const confirmation = checkoutResponse?.confirmation;

  return (
    <>
      <Box mb="0.5rem">
        <Text >Lakukan pembayaran sebelum </Text>
        <Text>{payment_due_date}</Text>
      </Box>
      <Text>Pembayaran menggunakan metode <b>Virtual Account</b>, silakan klik tombol dibawah ini untuk melakukan pembayaran!</Text>
      <Button
        colorScheme="orange"
        w={{ base: "full", lg: "full" }}
        mt="0.5rem"
        onClick={() => window.open(confirmation.url, "_blank")}
      >
        {confirmation.text}
      </Button>


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
