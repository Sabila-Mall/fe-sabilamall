import { Box } from "@chakra-ui/react";

import { Form, SummaryBox } from "../components/ConfirmComponents";
import { Layout } from "../components/Layout";

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
      <Box my="1.375rem">
        <SummaryBox dataSummary={dataSummary} />
      </Box>
      <Box>
        <Form />
      </Box>
    </Layout>
  );
};

export default Konfirmasi;
