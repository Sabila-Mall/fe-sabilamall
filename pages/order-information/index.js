import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  Stack,
  Grid,
  Button,
  VStack,
  Spacer,
  Divider,
  Icon,
  Circle,
  useClipboard,
  Tooltip,
  Spinner,
  useToast
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoCopy } from "react-icons/io5";

import { apiGetSingleOrder, apiGetResi } from "../../api/GetOrder";
import { apiGetPaymentMekariPay, apiConfirmPaymentMekariPay } from "../../api/Payment";
import { CardProfile } from "../../components/CardProfile";
import { Layout } from "../../components/Layout";
import NavbarProfile from "../../components/NavbarProfile";
import OrderProductsTable, {
  OrderProductsTableMobile,
} from "../../components/OrderProductsTable";
import ScrollButton from "../../components/ScrollButton";
import { useAuthContext } from "../../contexts/authProvider";
import { useWindowSize } from "../../hooks/useWindowSize";
import { currencyFormat, getImageLink } from "../../utils/functions";

const TRANSFER_BANK = "Transfer Bank";

const OrderInformation = ({ order }) => {
  const { width } = useWindowSize();
  const { userData, loading } = useAuthContext();

  const authIsLoading = loading;

  const isMobile = width < 768;
  const sm = [
    { text: "SM Pay", value: currencyFormat(userData?.memberdeposit) },
    { text: "SM Point", value: userData?.smpoint },
  ];

  const [loadingOrderData, setLoadingOrderData] = useState(true);
  const [orderData, setOrderData] = useState({});
  useEffect(() => {
    !authIsLoading && getSingleOrder();
  }, [authIsLoading]);

  const getSingleOrder = () => {
    setLoadingOrderData(true);
    apiGetSingleOrder(userData?.id, order)
      .then((res) => {
        setOrderData(res.data.data[0]);
        setLoadingOrderData(false);
      })
      .catch((err) => console.error(err));
  }

  const [loadingResiData, setLoadingResiData] = useState(true);
  const [resiData, setResiData] = useState([]);
  useEffect(() => {
    // apiGetResi(2094, 65507)
    !authIsLoading && getResiData();
  }, [authIsLoading]);

  const getResiData = () => {
    setLoadingResiData(true);
    apiGetResi(userData?.id, order)
      .then((res) => {
        setResiData(res.data);
        setLoadingResiData(false);
      })
      .catch((err) => console.error(err));
  }

  const [loadingPaymentMekariPay, setLoadingPaymentMekariPay] = useState(true);
  const [paymentMekariPay, setPaymentMekariPay] = useState({});

  useEffect(() => {
    !authIsLoading && getPaymentMekariPay()
  }, [authIsLoading]);

  const getPaymentMekariPay = () => {
    setLoadingPaymentMekariPay(true);
    apiGetPaymentMekariPay(userData?.id, order)
      .then((res) => {
        setPaymentMekariPay(res);
        setLoadingPaymentMekariPay(false);
      })
      .catch((err) => console.error(err));
  }

  const router = useRouter();

  const status = orderData?.payment_status;
  const productDiscount = orderData?.level_discount;
  const voucherDiscount = orderData?.shipping_cost == 0 ? 0 : orderData?.shipping_promo_amount;
  const couponAmount = orderData?.coupon_amount;
  const notes = orderData?.order_notes;
  const resi = resiData?.waybill_cognote;

  const { hasCopied, onCopy } = useClipboard(resi ? resi : "");

  const steps = [];
  const [subTotalProduk, setSubTotalProduk] = useState(0);
  const [orderProducts, setOrderProducts] = useState([]);
  useEffect(() => {
    const temporaryProducts = orderData?.data;
    let tempOrderProducts = [];
    let tempSubtotal = 0;
    for (let i = 0; i < temporaryProducts?.length; i++) {
      tempSubtotal +=
        (temporaryProducts[i].final_price *
          (100 - temporaryProducts[i].customers_discount)) /
        100;

      let tempDetail =
        temporaryProducts[i].attributes?.[0].products_options_values;
      for (let j = 1; j < temporaryProducts[i].attributes?.length; j++) {
        tempDetail +=
          ", " + temporaryProducts[i].attributes?.[j].products_options_values;
      }
      tempOrderProducts = [
        ...tempOrderProducts,
        {
          name: temporaryProducts[i].products_name,
          details: tempDetail,
          weight: `${temporaryProducts[i].products_weight} gr`,
          notes: temporaryProducts[i].orders_products_notes,
          image: getImageLink(temporaryProducts[i].image),
          discount:
            temporaryProducts[i].customers_discount &&
            temporaryProducts[i].customers_discount !== 0 &&
            `${temporaryProducts[i].customers_discount}%`,
          price: currencyFormat(temporaryProducts[i].final_price),
          discountPrice: currencyFormat(
            (temporaryProducts[i].final_price *
              (100 - temporaryProducts[i].customers_discount)) /
            100,
          ),
          quantity: temporaryProducts[i].products_quantity,
          subTotal: currencyFormat(
            (temporaryProducts[i].final_price *
              (100 - temporaryProducts[i].customers_discount)) /
            100,
          ),
        },
      ];
    }
    setOrderProducts(tempOrderProducts);
    setSubTotalProduk(tempSubtotal);

    for (let i = 0; i < resiData.resulthistory?.length; i++) {
      steps.push({
        title: resiData.resulthistory?.[i].desc,
        timestamp: resiData.resulthistory?.[i].date,
      });
    }
  }, [orderData]);


  const ButtonCekKonfirmasi = () => {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false);

    const cekKonfirmasi = async () => {
      setIsLoading(true);

      const res = await apiConfirmPaymentMekariPay(userData?.id, order);

      if (res.success) {
        toast({
          position: "top",
          title: res.message,
          status: 'success',
          isClosable: true,
        })
        getPaymentMekariPay();
        getSingleOrder();
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
      w={{ base: "full", lg: "unset" }}
      mt="0.5rem"
      onClick={() => cekKonfirmasi()}
    >
      {isLoading ? <Spinner /> : 'Saya Sudah Bayar'}
    </Button>
  }

  const getButtonPaymentMekariPay = (item) => {
    if (item.success) {
      return <>
        <Button
          colorScheme="red"
          w={{ base: "full", lg: "unset" }}
          mt="0.5rem"
          onClick={() => window.open(item.data.url, "_blank")}
        >
          Klik Disini Pembayaran Virtual Account
        </Button>
        <ButtonCekKonfirmasi />
      </>
    } else {
      return <Text>
        {item.message}
      </Text>
    }
  }

  return <Box>
    {isMobile && (
      <NavbarProfile
        section="Informasi Pesanan"
        onClick={() => router.push("/profile")}
      />
    )}
    <Layout hasNavbar={!isMobile} hasPadding background="gray.50" sticky>
      <Flex
        mt={{ base: "4rem", md: 0 }}
        justify="center"
        pb="32px"
        bg="gray.50"
        px={{ base: "0", md: "10px", lg: "80px", xl: "120px" }}
      >
        <Flex display={{ base: "none", lg: "block" }}>
          <CardProfile sm={sm} />
        </Flex>
        <Stack
          border="1px solid #E2E8F0"
          borderRadius="20px"
          p={{ base: "20px", md: "32px" }}
          ml={{ base: "", md: "15px" }}
          boxShadow="0px 2px 4px -1px rgba(45, 55, 72, 0.06), 0px 4px 6px -1px rgba(45, 55, 72, 0.1)"
          bg="white"
          w={'full'}
          h={'fit-content'}
        >
          {isMobile ? (
            <></>
          ) : (
            <>
              <Flex
                onClick={() => router.push("/profile/pesanan-saya")}
                dir="column"
                w="fit-content"
                mb="12px"
                cursor="pointer"
              >
                <ChevronLeftIcon w={6} h={6} />
                <Text
                  className="secondaryFont"
                  fontSize="16px"
                  fontWeight="500"
                  color="gray.500"
                  lineHeight="150%"
                  ml="16px"
                >
                  Kembali
                </Text>
              </Flex>
              <Divider />
            </>
          )}

          {!loadingOrderData ? (
            <Stack>
              <Flex
                justify="space-between"
                direction={{ base: "column", md: "row" }}
              >
                <Box className="secondaryFont" fontWeight="500" lineHeight="150%">
                  <Box>
                    <Text color="gray.500" fontSize="0.75rem">
                      Nomor Pesanan
                    </Text>
                    <Text color="black" fontSize="0.875rem">
                      {orderData?.orders_number}
                    </Text>
                  </Box>
                  <Flex>
                    <Box w="140px">
                      <Text color="gray.500" fontSize="0.75rem">
                        Status Pesanan
                      </Text>
                      <Text color="black" fontSize="0.875rem">
                        {orderData?.orders_status}
                      </Text>
                    </Box>
                    <Box ml="16px">
                      <Text color="gray.500" fontSize="0.75rem">
                        Waktu Pemesanan
                      </Text>
                      <Text color="black" fontSize="0.875rem">
                        {orderData?.date_purchased}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex>
                    <Box w="140px">
                      <Text color="gray.500" fontSize="0.75rem">
                        Status Pembayaran
                      </Text>
                      <Text color="black" fontSize="0.875rem">
                        {orderData?.payment_status}
                      </Text>
                    </Box>
                    <Box ml="16px">
                      <Text color="gray.500" fontSize="0.75rem">
                        Waktu Pembayaran
                      </Text>
                      <Text color="black" fontSize="0.875rem">
                        {orderData?.payment_date}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
                <VStack
                  className="primaryFont"
                  fontWeight="700"
                  fontSize="1rem"
                  lineHeight="150%"
                  mt={{ base: "24px", md: "" }}
                  mb={{ base: "16px", md: "" }}
                  minW="186px"
                >
                  {(() => {
                    if (
                      status?.toLowerCase() == "pending" &&
                      orderData?.payment_method === TRANSFER_BANK && !([5, 6].includes(orderData?.orders_status_id))
                    ) {
                      return (
                        <>
                          <Button
                            color="white"
                            bgColor="red.500"
                            borderRadius="4px"
                            w="100%"
                            p="0px 16px"
                            onClick={() =>
                              router.push(
                                `/konfirmasi?order=${orderData?.orders_number.slice(
                                  3,
                                )}`,
                              )
                            }
                          >
                            Konfirmasi Pembayaran
                          </Button>
                          <Button
                            border="1px solid #E53E3E"
                            color="red.500"
                            bgColor="white"
                            w="100%"
                            borderRadius="4px"
                            onClick={() =>
                              router.push(
                                `/nota-pembayaran/${orderData?.orders_id}`,
                              )
                            }
                          >
                            Lihat Nota Pesanan
                          </Button>
                        </>
                      );
                    } else if (status?.toLowerCase() === "terbayar") {
                      return (
                        <>
                          <Button
                            border="1px solid #E53E3E"
                            color="orange.500"
                            bgColor="white"
                            w="100%"
                            borderRadius="4px"
                            onClick={() =>
                              router.push(
                                `/nota-pembayaran/${orderData?.orders_id}`,
                              )
                            }
                          >
                            Lihat Nota Pesanan
                          </Button>
                        </>
                      );
                    } else if (status?.toLowerCase() === "delivered") {
                      return (
                        <>
                          <Button
                            color="white"
                            bgColor="orange.500"
                            w="100%"
                            borderRadius="4px"
                            isDisabled={true}
                          >
                            Berikan Penilaian
                          </Button>
                          <Button
                            border="1px solid #DD6B20"
                            color="orange.500"
                            bgColor="white"
                            w="100%"
                            borderRadius="4px"
                            onClick={() =>
                              router.push(
                                `/nota-pembayaran/${orderData?.orders_id}`,
                              )
                            }
                          >
                            Lihat Nota Pesanan
                          </Button>
                        </>
                      );
                    } else if (status?.toLowerCase() === "reviewed") {
                      return (
                        <>
                          <Button
                            color="white"
                            bgColor="orange.500"
                            w="100%"
                            borderRadius="4px"
                            isDisabled={true}
                          >
                            Sudah Dinilai
                          </Button>
                          <Button
                            border="1px solid #DD6B20"
                            color="orange.500"
                            bgColor="white"
                            w="100%"
                            borderRadius="4px"
                            onClick={() =>
                              router.push(
                                `/nota-pembayaran/${orderData?.orders_id}`,
                              )
                            }
                          >
                            Lihat Nota Pesanan
                          </Button>
                        </>
                      );
                    }
                  })()}
                </VStack>
              </Flex>

              <Divider />

              {paymentMekariPay?.is_va && !loadingPaymentMekariPay && (
                <Box pb="1rem">
                  <Flex gridGap={2} direction={{ base: 'column', md: 'row' }}>
                    {
                      getButtonPaymentMekariPay(paymentMekariPay)
                    }
                  </Flex>
                  <Divider pt="1rem" />
                </Box>)}
              {
                loadingPaymentMekariPay && (
                  <Box pb="1rem" >
                    <Spinner />
                    <Divider pt="1rem" />
                  </Box>
                )
              }


              <VStack spacing="16px" pb="1rem" align="flex-start">
                <Box className="primaryFont" fontSize="1rem">
                  <Text color="black" fontWeight="700">
                    Data Pengirim
                  </Text>
                  <Text color="gray.600" fontWeight="700" mt="16px">
                    {orderData?.dropship_name}
                  </Text>
                  <Text color="gray.600" fontWeight="400">
                    {orderData?.dropship_phone}
                  </Text>

                  <Divider my="16px" />

                  <Text color="black" fontWeight="700">
                    Data Penerima
                  </Text>
                  <Text color="gray.600" fontWeight="700" mt="16px">
                    {orderData?.delivery_name}
                  </Text>
                  <Text color="gray.600" fontWeight="400">
                    {orderData?.delivery_phone}
                  </Text>
                  <Text
                    className="secondaryFont"
                    fontWeight="500"
                    fontSize="0.875rem"
                  >
                    {orderData?.delivery_street_address},{" "}
                    {orderData?.delivery_subsubdistrict},{" "}
                    {orderData?.delivery_subdistrict},{" "}
                    {orderData?.delivery_cityname}, {orderData?.delivery_province}
                    , {orderData?.delivery_country},{" "}
                    {orderData?.delivery_postcode}
                  </Text>
                </Box>
                <Divider />
                <Box pos="relative" w="100%" mt={{ base: "24px", md: "" }}>
                  <Flex>
                    <Box>
                      <Text
                        className="primaryFont"
                        fontSize="1rem"
                        color="black"
                        fontWeight="700"
                      >
                        Pengiriman
                      </Text>
                    </Box>
                    <Spacer />
                    <Box
                      className="secondaryFont"
                      fontWeight="500"
                      fontSize="0.75rem"
                      lineHeight="150%"
                      mt="16px"
                      color="gray.600"
                      textAlign="right"
                    >
                      <Text>{resiData?.found == 0 ? 'Kurir: -' : 'Kurir: ' + resiData?.waybill_courrier}</Text>
                      {resiData != null && (
                        <Flex alignItems="center">
                          <Text>{`No. Resi:  ${resiData?.found == 0 ? '-' : resi}`}</Text>
                          {resiData?.found != 0 && (
                            <Tooltip
                              label={hasCopied ? "Copied!" : "Copy"}
                              placement="top"
                              closeOnClick={false}
                            >
                              <Box ml="0.25rem">
                                <Icon
                                  as={IoCopy}
                                  color="orange.500"
                                  boxSize="1rem"
                                  cursor="pointer"
                                  onClick={onCopy}
                                />
                              </Box>
                            </Tooltip>
                          )}
                        </Flex>
                      )}
                    </Box>
                  </Flex>
                  <Divider
                    orientation="vertical"
                    pos="absolute"
                    border="1px solid gray.200"
                    h="calc(100% - 90px)"
                    transform="translateY(16px)"
                    my="16px"
                    ml="0.25rem"
                  />
                  <Stack
                    lineHeight="150%"
                    className="secondaryFont"
                    fontFamily="500"
                    key="steps"
                    mt="16px"
                    ml="0.25rem"
                  >
                    {steps.map((step, index) => {
                      return (
                        <Flex key={index}>
                          <Circle
                            bg={index === 0 ? "orange.400" : "gray.500"}
                            color="white"
                            size="12px"
                            transform="translate(-5px, 6px)"
                          ></Circle>
                          <Text
                            color="gray.400"
                            w={{ base: "6rem", lg: "fit-content" }}
                            minW={{ base: "6rem", lg: "fit-content" }}
                            fontSize={{ base: "0.8rem", md: "0.875rem" }}
                          >
                            {step?.timestamp}
                          </Text>
                          <Text
                            color={index === 0 ? "orange.400" : "gray.500"}
                            ml="0.5rem"
                            fontSize="1rem"
                          >
                            {step?.title}
                          </Text>
                        </Flex>
                      );
                    })}
                  </Stack>
                </Box>
              </VStack>
              {isMobile ? (
                <OrderProductsTableMobile products={orderProducts} />
              ) : (
                <OrderProductsTable products={orderProducts} />
              )}
              <Grid
                templateColumns={{ base: "repeat(1, fr)", md: "repeat(2, 1fr)" }}
                pt="16px"
                gap={4}
              >
                {notes ? (
                  <Box fontSize="0.875rem" lineHeight="150%">
                    <Text fontWeight="700" className="primaryFont">
                      Catatan Pesanan
                    </Text>
                    <Text
                      fontWeight="500"
                      className="secondaryFont"
                      mt="8px"
                      color="gray.700"
                      p="12px"
                      borderRadius="4px"
                      border="1px solid #E2E8F0"
                    >
                      {orderData?.order_notes}
                    </Text>
                  </Box>
                ) : (
                  <Box></Box>
                )}
                <Box
                  color="gray.500"
                  fontSize="0.75rem"
                  lineHeight="150%"
                  className="secondaryFont"
                  fontWeight="500"
                >
                  <Flex>
                    <Text>Subtotal Produk</Text>
                    <Spacer />
                    <Text>
                      {currencyFormat(
                        Number(subTotalProduk) + Number(productDiscount),
                      )}
                    </Text>
                  </Flex>
                  {orderData.handling_fee_admin != 0 && orderData?.handling_fee_admin != null ? (
                    <Flex mt="8px">
                      <Text>Admin Fee</Text>
                      <Spacer />
                      <Text>+ {currencyFormat(orderData.handling_fee_admin)}</Text>
                    </Flex>
                  ) : (
                    <></>
                  )}
                  <Flex mt="8px">
                    <Text>Biaya Pengiriman</Text>
                    <Spacer />
                    <Text>{currencyFormat(orderData?.shipping_cost)}</Text>
                  </Flex>
                  <Flex mt="8px">
                    <Text>Biaya Tambahan</Text>
                    <Spacer />
                    <Text>{currencyFormat(orderData?.addcostvalue)}</Text>
                  </Flex>
                  {productDiscount ? (
                    <Flex mt="8px">
                      <Text>Diskon Produk</Text>
                      <Spacer />
                      <Text>- {currencyFormat(productDiscount)}</Text>
                    </Flex>
                  ) : (
                    <></>
                  )}
                  {voucherDiscount ? (
                    <Flex mt="8px">
                      <Text>Diskon Voucher</Text>
                      <Spacer />
                      <Text>- {currencyFormat(voucherDiscount)}</Text>
                    </Flex>
                  ) : (
                    <></>
                  )}
                  {couponAmount ? (
                    <Flex mt="8px">
                      <Text>Diskon Kupon</Text>
                      <Spacer />
                      <Text>- {currencyFormat(couponAmount)}</Text>
                    </Flex>
                  ) : (
                    <></>
                  )}
                  <Flex mt="8px">
                    <Text>Total Pesanan</Text>
                    <Spacer />
                    <Text
                      color="orange.500"
                      fontSize="1rem"
                      fontWeight="700"
                      className="primaryFont"
                    >
                      {currencyFormat(
                        parseInt(orderData?.handling_fee_admin ?? 0) +
                        parseInt(subTotalProduk) +
                        parseInt(orderData?.shipping_cost) +
                        parseInt(orderData?.addcostvalue) -
                        parseInt(voucherDiscount) -
                        parseInt(couponAmount),
                      )}
                    </Text>
                  </Flex>
                  <Flex mt="8px">
                    <Text>Metode Pembayaran</Text>
                    <Spacer />
                    <Text>{orderData?.payment_method}</Text>
                  </Flex>
                </Box>
              </Grid>
            </Stack>
          ) : <Flex alignItems={'center'} justifyContent={'center'} pt={'5'}><Spinner></Spinner></Flex>}
        </Stack>
      </Flex>
    </Layout>
    {isMobile ? <ScrollButton /> : <></>}
  </Box>

};

OrderInformation.getInitialProps = async ({ query }) => {
  const { order } = query;

  return { order };
};

export default OrderInformation;
