import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getMyOrder } from "../../api/Konfirmasi";
import { Form, SummaryBox } from "../../components/ConfirmComponents";
import { Layout } from "../../components/Layout";
import { useAuthContext } from "../../contexts/authProvider";
import { isRequestSuccess } from "../../utils/api";
import { formatNumber } from "../../utils/functions";

const breadcrumbItems = [
  { name: "Pesanan Saya", link: "/profile/pesanan-saya", isOnPage: false },
  { name: "Konfirmasi", link: "/konfirmasi", isOnPage: true },
];

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
  const { userData } = useAuthContext();
  const memberId = userData?.memberid;
  const userId = userData?.id;

  const toast = useToast();
  const errorToast = (errMessage) => {
    toast({
      position: "top",
      title: errMessage,
      status: "error",
      isClosable: true,
    });
  };

  const router = useRouter();
  const orderId = router.query.order;

  const [orderInformation, setOrderInformation] = useState({
    number: "",
    date: "",
    price: 0,
    loading: true,
  });

  useEffect(() => {
    if (orderId && userId) {
      getMyOrder(userId, orderId)
        .then((res) => {
          if (isRequestSuccess(res)) {
            setOrderInformation({
              number: res.data[0].orders_number,
              date: res.data[0].date_purchased.split(" ")[0],
              price: res.data[0].order_price,
              loading: false,
            });
          } else {
            errorToast(res.message ?? "Request gagal");
          }
        })
        .catch((err) => {
          console.error(err);
          errorToast(err);
          setOrderInformation({ ...orderInformation, loading: false });
        });
    }
  }, [orderId, userId]);

  const dataSummary = [
    { info: "Member ID", value: memberId },
    { info: "Nomor Order", value: orderInformation.number },
    { info: "Tanggal Pemesanan", value: orderInformation.date },
    { info: "Metode Pembayaran", value: "Transfer Bank" },
    { info: "Harga", value: `Rp ${formatNumber(orderInformation.price)}` },
  ];

  return (
    <Layout
      sticky
      hasNavbar
      hasPadding
      hasBreadCrumb
      breadCrumbItem={breadcrumbItems}
    >
      <Flex
        className="primaryFont"
        justifyContent="center"
        flexDirection={{ base: "column", lg: "row-reverse" }}
        pt={{ base: "0", lg: "4rem" }}
      >
        <Box my={{ base: "1.375rem", lg: "0" }} ml={{ base: "0", lg: "4rem" }}>
          <TextStyled text="Detail Pesanan" />
          <SummaryBox
            dataSummary={dataSummary}
            loading={orderInformation.loading}
          />
          <Image
            src="/images/mascot-confirm.svg"
            display={{ base: "none", lg: "block" }}
          />
        </Box>
        <Box>
          <TextStyled text="Form Konfirmasi Bayar" />
          <Form orderNumber={orderInformation.number} />
        </Box>
      </Flex>
    </Layout>
  );
};

export default Konfirmasi;
