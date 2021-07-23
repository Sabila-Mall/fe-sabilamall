import { Box, Flex, Image, Text } from "@chakra-ui/react";

import { Form, SummaryBox } from "../../components/ConfirmComponents";
import { Layout } from "../../components/Layout";

const TextStyled = ({ text }) => (
  <Text
    fontWeight={700}
    fontSize="1.25rem"
    display={{ base: "none", lg: "block" }}
  >
    {text}
  </Text>
);

const Konfirmasi = () => {
  const breadcrumbItems = [
    { name: "Pesanan Saya", link: "/", isOnPage: false },
    { name: "Konfirmasi", link: "/konfirmasi", isOnPage: true },
  ];

  const dataSummary = [
    { info: "MemberID", value: "C5107" },
    { info: "Nomor Order", value: "SMC58172" },
    { info: "Tanggal Pemesanan", value: "28/06/2021" },
    { info: "Metode Pembayaran", value: "Transfer Bank" },
    { info: "Harga", value: "RP120.000" },
  ];

  return (
    <Layout sticky hasNavbar hasBreadCrumb breadCrumbItem={breadcrumbItems}>
      <Flex
        className="primaryFont"
        justifyContent="center"
        flexDirection={{ base: "column", lg: "row-reverse" }}
        pt={{ base: "0", lg: "4rem" }}
      >
        <Box my={{ base: "1.375rem", lg: "0" }} ml={{ base: "0", lg: "4rem" }}>
          <TextStyled text="Detail Pesanan" />
          <SummaryBox dataSummary={dataSummary} />
          <Image
            src="/images/mascot-confirm.svg"
            display={{ base: "none", lg: "block" }}
          />
        </Box>
        <Box>
          <TextStyled text="Form Konfirmasi Bayar" />
          <Form />
        </Box>
      </Flex>
    </Layout>
  );
};

export default Konfirmasi;
