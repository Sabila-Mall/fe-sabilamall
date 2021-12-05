import { Text, Box, Flex, Image, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

import PaymentMethodStepsTabs from "./PaymentMethodStepsTabs";

export const InvoiceInfoQRIS = ({ checkoutResponse }) => {
  const router = useRouter();
  const paymentMethodSteps = checkoutResponse?.payment_gateways?.howtopaypage?.data?.map(
    (item) => ({
      title: item.method,
      steps: item.step,
    }),
  );
  return (
    <>
      <Text fontWeight="700" className="primaryFont" fontSize="1.15rem">
        QR Code
      </Text>
      <Box w="100%" d="flex" justifyContent="center">
        <Image
          src={checkoutResponse?.payment_gateways?.payment_code}
          alt="qrcode"
          w="40%"
        />
      </Box>

      <Text mt="0.6rem" mb="0.4rem" className="secondaryFont">
        {/* {checkoutResponse?.payment_gateways?.howtopaypage.name} */}
        Pembayaran dapat dilakukan dengan melakukan langkah-langkah berikut:
      </Text>
      <PaymentMethodStepsTabs tabsData={paymentMethodSteps} />

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
