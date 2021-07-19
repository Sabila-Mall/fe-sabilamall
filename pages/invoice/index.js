import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { Layout } from "../../components/Layout";

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
          <Flex flexDir="column" w={{ base: "60%", lg: "45%" }} mb="0.5rem">
            <Bank bank="BCA" number="8691879542" />
            <Bank bank="Mandiri" number="1570007081186" />
            <Bank bank="BRI" number="954406744" />
            <Bank bank="BSI" number="716111613" />
          </Flex>
          <Text>a.n. SABILAMALL NIAGA DIGITAL PT</Text>
          <Button colorScheme="orange" w="full" mt="1rem">
            Konfirmasi Pembayaran
          </Button>
        </Box>
      </Layout>
    </>
  );
};

export default Invoice;

const Bank = ({ bank, number }) => {
  return (
    <Flex justifyContent="space-between" textAlign="left">
      <Text>{bank}</Text>
      <Text>{number}</Text>
    </Flex>
  );
};
