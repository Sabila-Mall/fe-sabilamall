import { Text, Flex, Box, Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

import PaymentMethodStepsTabs from "./PaymentMethodStepsTabs";

export const InvoiceInfoGopay = ({ checkoutResponse }) => {
  const router = useRouter();

  const payment_due_date = checkoutResponse?.payment_gateways?.expiry_date;
  const paymentMethodSteps = checkoutResponse?.payment_gateways?.howtopaypage?.data?.map(
    (item) => ({
      title: item.method,
      steps: item.step,
    }),
  );
  const action_url =
    checkoutResponse?.payment_gateways?.merchant_data?.deeplink;

  return (
    <>
      <Text fontWeight="700" className="primaryFont" fontSize="1.15rem">
        QR Code
      </Text>
      <Box w="100%" d="flex" mb="0.6rem" justifyContent="center">
        <Image
          src={checkoutResponse?.payment_gateways?.payment_code}
          alt="qrcode"
          w="40%"
        />
      </Box>
      <Box mb="0.5rem" d={{ base: "block", lg: "none" }}>
        <Text className="secondaryFont">
          Silahkan melanjutkan pembayaran dengen menekan tombol berikut:
        </Text>
        <Flex flexDir="column" w={{ base: "60%", lg: "40%" }} my="1rem">
          <a href={action_url} target="_blank">
            <Button colorScheme="orange">Bayar Tagihan</Button>
          </a>
        </Flex>
      </Box>
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
