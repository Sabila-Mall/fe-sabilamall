import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { IoCopyOutline } from "react-icons/io5";

import { Layout } from "../../components/Layout";
import { copyToClipboard } from "../../utils/functions";

const Invoice = () => {
  return (
    <>
      <Layout
        hasNavbar
        hasBreadCrumb
        hasFooter
        breadCrumbItem={[{ name: "Checkout" }, { name: "Terima Kasih" }]}
      >
        <Box
          maxW={{ base: "375px", lg: "568px" }}
          mx="1rem"
          fontSize="0.85rem"
          minW="300px"
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
            <Text fontWeight="bold">SMC58172</Text>
          </Flex>
          <Flex
            mb="1rem"
            justifyContent="space-between"
            w={{ base: "75%", lg: "60%" }}
          >
            <Text>Total Tagihan</Text>
            <Text>Rp.199.999</Text>
          </Flex>
          <Text>
            Pembayaran dilakukan dengan melakukan Transfer ke Rekening berikut:
          </Text>
          <Flex flexDir="column" w={{ base: "60%", lg: "40%" }} mb="0.5rem">
            <Bank bank="BCA" number="8691879542" />
            <Bank bank="Mandiri" number="1570007081186" />
            <Bank bank="BRI" number="954406744" />
            <Bank bank="BSI" number="716111613" />
          </Flex>
          <Text>a.n. SABILAMALL NIAGA DIGITAL PT</Text>
          <Flex justifyContent={{ lg: "flex-end" }} w="full">
            <Button
              colorScheme="orange"
              w={{ base: "full", lg: "15rem" }}
              mt="1rem"
            >
              Konfirmasi Pembayaran
            </Button>
          </Flex>
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
    <Flex justifyContent="space-between" textAlign="left">
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
