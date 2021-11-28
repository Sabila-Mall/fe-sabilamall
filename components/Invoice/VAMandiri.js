import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { dateFormat } from "../../utils/functions";
import { Bank } from "./InvoiceInfoBank";
import PaymentMethodStepsTabs from "./PaymentMethodStepsTabs";

const VAMandiri = ({ checkoutResponse }) => {
  const router = useRouter();

  const bill_key = checkoutResponse?.payment_gateways?.bill_key;
  const biller_code = checkoutResponse?.payment_gateways?.biller_code;
  const payment_due_date = checkoutResponse?.payment_gateways?.expiry_date;

  const paymentMethodSteps = checkoutResponse?.payment_gateways?.howtopaypage?.data?.map(
    (item) => ({
      title: item.method,
      steps: item.step,
    }),
  );

  return (
    <>
      <Text mb="0.5rem">
        Pembayaran dilakukan dengan melakukan Transfer ke Rekening Virtual
        Account berikut:
      </Text>
      <Flex flexDir="column" w={{ base: "60%", lg: "40%" }} mb="0.5rem">
        <Bank
          key={"Kode Perusahaan"}
          bank={"Kode Perusahaan"}
          number={biller_code}
        />
        <Bank
          key={"Kode Pembayaran"}
          bank={"Kode Pembayaran"}
          number={bill_key}
        />
      </Flex>
      <Text mb="0.5rem">
        Lakukan pembayaran sebelum {dateFormat(payment_due_date)}
      </Text>

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

export default VAMandiri;
