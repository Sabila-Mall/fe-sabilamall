import { Box, Flex, Text } from "@chakra-ui/react";

import { InvoiceInfo } from "../../components/Invoice/InvocieInfo";
import { Layout } from "../../components/Layout";
import { path } from "../../constants/breadcrumbInvoice";
import { useCheckoutContext } from "../../contexts/checkoutProvider";
import { currencyFormat } from "../../utils/functions";

const Invoice = () => {
  const { orderNumber, subtotal, checkoutResponse } = useCheckoutContext();

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
          <InvoiceInfo />
        </Box>
      </Layout>
    </>
  );
};

export default Invoice;
