import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Bank } from "./InvoiceInfoBank";

export const InvoiceInfoBankTransfer = ({ checkoutResponse }) => {
  const router = useRouter();
  return (
    <>
      <Text mb="0.5rem">
        Pembayaran dilakukan dengan melakukan Transfer ke Rekening berikut:
      </Text>
      <Flex flexDir="column" w={{ base: "60%", lg: "40%" }} mb="0.5rem">
        {checkoutResponse.rekeningbank.map((bank) => (
          <Bank
            key={bank.namabank}
            bank={`${bank.namabank}`}
            number={bank.rekening}
          />
        ))}
      </Flex>
      <Flex justifyContent={{ lg: "flex-end" }} w="full">
        <Button
          onClick={() =>
            router.push(
              "/konfirmasi?order=" + checkoutResponse.orders_number.slice(3),
            )
          }
          colorScheme="orange"
          w={{ base: "full", lg: "15rem" }}
          mt="1rem"
        >
          Konfirmasi Pembayaran
        </Button>
      </Flex>
    </>
  );
};
