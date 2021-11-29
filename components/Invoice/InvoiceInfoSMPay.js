import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const InvoiceInfoSMPay = () => {
  const router = useRouter();
  return (
    <>
      <Text mb="0.5rem">
        Terima kasih telah melakukan pembelian menggunakan SM Pay, pembelian
        Anda akan segera diproses oleh sistem kami.
      </Text>
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
