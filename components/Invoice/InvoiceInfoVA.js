import { Box, Button, Divider, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { route } from "next/dist/server/router";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthContext } from "../../contexts/authProvider";
import PaymentMethodStepsTabs from "./PaymentMethodStepsTabs";
import { apiGetPaymentMekariPay, apiConfirmPaymentMekariPay } from "../../api/Payment";

export const InvoiceInfoVA = ({ checkoutResponse }) => {
  const router = useRouter();

  const payment_due_date = checkoutResponse?.payment_due_date;
  const confirmation = checkoutResponse?.confirmation;
  const orders_number = checkoutResponse?.orders_number;
  const orders_id = orders_number.replaceAll('SMC', '')
  const { userData } = useAuthContext();


  const [step, setStep] = useState(0);

  const ButtonCekKonfirmasi = () => {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false);

    const cekKonfirmasi = async () => {
      setIsLoading(true);

      const res = await apiConfirmPaymentMekariPay(userData?.id, orders_id);

      if (res.success) {
        toast({
          position: "top",
          title: res.message,
          status: 'success',
          isClosable: true,
        })
        router.push(`/order-information?order=${orders_id}`)
      } else {
        toast({
          position: "top",
          title: res.message,
          status: 'error',
          isClosable: true,
        })
      }

      setIsLoading(false);
    }

    return <Button
      colorScheme="orange"
      w={{ base: "full" }}
      mt="0.5rem"
      onClick={() => cekKonfirmasi()}
      disabled={step <= 1}
    >
      {isLoading ? <Spinner /> : 'Saya Sudah Bayar'}
    </Button>
  }

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
        onClick={() => { window.open(confirmation.url, "_blank"); setStep(2) }}
      >
        {confirmation.text}
      </Button>
      <Text mt="0.5rem">Jika sudah melakukan pembayaran, silakan klik tombol dibawah ini untuk konfirmasi pembayaran. Jika tidak, maka sistem akan otomatis mengkonfirmasi per 5 menit sekali!</Text>
      <ButtonCekKonfirmasi />
      <Divider mt="1rem" />
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
