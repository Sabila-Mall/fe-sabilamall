import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { dateFormat } from "../../utils/functions";
import { Bank } from "./InvoiceInfoBank";

export const InvoiceInfoBCA = ({ checkoutResponse }) => {
  const router = useRouter();
  return (
    <>
      <Text mb="0.5rem">
        Pembayaran dilakukan dengan melakukan Transfer ke Rekening Virtual
        Account berikut:
      </Text>
      <Flex flexDir="column" w={{ base: "60%", lg: "40%" }} mb="0.5rem">
        <Bank
          key={checkoutResponse.bankname}
          bank={`${checkoutResponse.bankname?.toUpperCase()}`}
          number={checkoutResponse.va_number}
        />
      </Flex>
      <Text mb="0.5rem">
        Lakukan pembayaran sebelum{" "}
        {dateFormat(checkoutResponse.payment_due_date)}
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
