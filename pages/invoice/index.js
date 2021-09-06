import { Box, Button, Flex, Text, useToast, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";

import { Layout } from "../../components/Layout";
import { useCheckoutContext } from "../../contexts/checkoutProvider";
import { isRequestSuccess } from "../../utils/api";
import {
  copyToClipboard,
  currencyFormat,
  dateFormat,
} from "../../utils/functions";

const path = [
  {
    name: "Checkout",
    link: "/alamat-penerima",
    isOnPage: false,
  },
  {
    name: "Terima Kasih",
    link: "/invoice",
    isOnPage: true,
  },
];

const PAYMENT_METHOD = {
  BANK_TRANSFER: "Transfer Bank",
  SM_PAY: "Deposit",
  VA_BCA: "Midtrans - Virtual Account BCA",
};

const Invoice = () => {
  const { orderNumber, subtotal, checkoutResponse } = useCheckoutContext();

  const router = useRouter();

  return (
    <>
      <Layout
        hasNavbar
        hasBreadCrumb
        hasFooter
        breadCrumbItem={path}
        hasPadding
      >
        <Box
          maxW={{ base: "375px", lg: "568px" }}
          mx="auto"
          fontSize="0.85rem"
          minW="280px"
          minH="300px"
          border="1.5px solid #718096"
          borderRadius="8px"
          mt="1rem"
          p="1rem"
          fontWeight="500"
        >
          <Text as="h1" mb="1rem" fontWeight="700" fontSize="18px">
            Terima Kasih
          </Text>
          <Text mb="1rem" as="h1" fontWeight="500">
            Konfirmasi pembayaran di menu KONFIRMASI pada web ini. Jika sukses,
            tunggu beberapa jam akan menjadi PAID.
          </Text>
          <Flex justifyContent="space-between" w={{ base: "75%", lg: "60%" }}>
            <Text>Nomor Order/Invoice</Text>
            <Text fontWeight="bold">{checkoutResponse.orders_number}</Text>
          </Flex>
          <Flex
            mb="1rem"
            justifyContent="space-between"
            w={{ base: "75%", lg: "60%" }}
          >
            <Text>Total Tagihan</Text>
            <Text>{currencyFormat(checkoutResponse.subtotal)}</Text>
          </Flex>
          <InvoiceInfo router={router} />
        </Box>
      </Layout>
    </>
  );
};

export default Invoice;

const Bank = ({ bank, number }) => {
  const toast = useToast();

  const handleCopy = () => {
    copyToClipboard(
      number,
      () =>
        toast({
          title: "Berhasil menyalin nomor rekening",
          description: `Nomor rekening ${number} dari bank ${bank} berhasil disalin`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        }),
      () =>
        toast({
          title: "Gagal menyalin nomor rekening",
          description: "Silahkan menyalin nomor rekening secara manual",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        }),
    );
  };

  return (
    <Flex justifyContent="space-between" textAlign="left" my="1">
      <Text>{bank}</Text>
      <Flex alignItems="center">
        <Text mr="0.5rem">{number}</Text>
        <IoCopyOutline
          color="#DD6B20"
          size="1.3em"
          cursor="pointer"
          onClick={handleCopy}
        />
      </Flex>
    </Flex>
  );
};

const InvoiceInfo = ({ router }) => {
  const { checkoutResponse } = useCheckoutContext();

  switch (checkoutResponse?.data?.payment_method) {
    case PAYMENT_METHOD.BANK_TRANSFER:
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
                  "/konfirmasi?order=" +
                    checkoutResponse.orders_number.slice(3),
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
    case PAYMENT_METHOD.SM_PAY:
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
    case PAYMENT_METHOD.VA_BCA:
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
    default:
      return <Text>...</Text>;
  }
};
