import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  Spinner,
  useToast,
  useDisclosure,
  Link,
  InputRightAddon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { IoCopy } from "react-icons/io5";

import { apiCancelOrder } from "../../api/CancelOrder";
import { CancelOrder } from "../../components/CancelOrderModal";
import { CardProfile } from "../../components/CardProfile";
import Footer from "../../components/Footer";
import { Layout } from "../../components/Layout";
import Navbar from "../../components/Navbar";
import NavbarProfile from "../../components/NavbarProfile";
import { MONTH } from "../../constants/pesanan-saya";
import { useSmPayPointContext } from "../../contexts/SMPayPointProvider";
import { useAuthContext } from "../../contexts/authProvider";
import {
  MyOrderProvider,
  useMyOrderContext,
} from "../../contexts/customerOrderProvider";
import { useWindowSize } from "../../hooks/useWindowSize";
import styles from "../../styles/Pagination.module.scss";
import {
  copyToClipboard,
  currencyFormat,
  formatNumber,
} from "../../utils/functions";
import { needForLogin } from "../../utils/functions";

const getOrderStatusColor = (orderStatus) => {
  if (orderStatus === "Booking") {
    return "grey";
  } else if (orderStatus === "Dalam Pengiriman") {
    return "blue";
  } else if (orderStatus === "Selesai") {
    return "green";
  } else if (orderStatus === "Batal" || orderStatus === "Ditolak") {
    return "red";
  } else {
    return "orange.500";
  }
};

const handleSearch = (
  search,
  setFetchOrder,
  setOrderId,
  setData,
  cacheData,
  currentPage,
  setSearchState,
) => {
  const pattern = /\bSMC\d{1,}$/;
  if (search.match(pattern)) {
    const orderId = search.split("SMC")[1];
    setOrderId(orderId);
    setFetchOrder(true);
  } else {
    setData(cacheData[currentPage - 1]);
    setSearchState(false);
  }
};

const SearchBar = () => {
  const {
    setData,
    cacheData,
    currentPage,
    setFetchOrder,
    setOrderId,
    setSearchState,
  } = useMyOrderContext();
  const [search, setSearch] = useState("");
  const [submit, setSubmit] = useState("");

  useEffect(() => {
    if (search.length > 3) {
      handleSearch(
        search,
        setFetchOrder,
        setOrderId,
        setData,
        cacheData,
        currentPage,
        setSearchState,
      );
    } else {
      setOrderId("");
      setData(cacheData[currentPage - 1]);
      setSearchState(false);
    }
  }, [submit]);

  useEffect(() => {
    if (search.length < 3) {
      setSubmit(!submit);
    }
  }, [search]);

  return (
    <Flex w="full" justify="flex-end" zIndex="1">
      <InputGroup maxW="35rem">
        <Input
          focusBorderColor="orange.400"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Nomor Order"
          bg="white"
          value={search}
        />
        <InputRightAddon
          onClick={() => {
            setSubmit(search);
          }}
          bg="orange.400"
          _hover={{ cursor: "pointer", backgroundColor: "orange" }}
          children={<BiSearch />}
        />
      </InputGroup>
    </Flex>
  );
};

const CardPesanan = ({
  isMobile,
  orderNum,
  datePurchased,
  orderStatus,
  paymentStatus,
  dropShip,
  deliverer,
  totalPrice,
  orderId,
  parentId,
  shippingResi,
  shippingMethod,
  totalPriceAgent,
}) => {
  const router = useRouter();
  const { width } = useWindowSize();
  const { userData } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const textColor = getOrderStatusColor(orderStatus);

  const date = datePurchased.split(" ")[0].split("-");
  const formatedDate = `${Number(date[2])} ${
    MONTH[Number(date[1]) - 1]
  } ${Number(date[0])}`;

  return (
    <VStack
      p={width >= 320 && "1.5rem"}
      boxShadow="0px 2px 4px -1px rgba(45, 55, 72, 0.06), 0px 4px 6px -1px rgba(45, 55, 72, 0.1)"
      borderRadius="20px"
      background="white"
      w="full"
      mb={{ base: "1rem", md: "0.5rem" }}
    >
      <Flex
        alignItems="center"
        direction={{ base: "column", md: "row" }}
        w="full"
      >
        <Link
          display="flex"
          alignItems="center"
          justifyContent={
            parentId == 0 && paymentStatus !== "Batal"
              ? "space-between"
              : "flex-end"
          }
          _hover={{ textDecoration: "none" }}
          mb={{ base: "1rem", md: "0" }}
          w="full"
          target="_blank"
          href={`${window.location.origin}/nota-pembayaran/${orderId}`}
        >
          {parentId == 0 && paymentStatus !== "Batal" && (
            <Button
              mr="1rem"
              color="white"
              bg="orange.500"
              alignSelf={{ base: "flex-start", md: "center" }}
            >
              Cetak Nota
            </Button>
          )}
        </Link>
        <Flex justifyContent="space-between" w="full" mb="0.5rem">
          <Flex alignItems="center">
            <Text fontSize="1rem" fontWeight="500" mr="0.5rem">
              {orderNum}
            </Text>
            <IoCopy
              size="1.25rem"
              color="#DD6B20"
              style={{ marginTop: "2px" }}
              cursor="pointer"
              onClick={() => {
                copyToClipboard(orderNum, "Nomor order berhasil disalin.");
                toast({
                  position: "top",
                  title: "Berhasil menyalin nomor order.",
                  status: "success",
                  isClosable: true,
                });
              }}
            />
            <Divider orientation="vertical" mx="1rem" />
            <Text fontSize="1rem" fontWeight="500" mr="0.5rem">
              {formatedDate}
            </Text>
          </Flex>
          <Flex align="center" display={{ base: "none", md: "flex" }}>
            <Text
              fontSize="1rem"
              fontWeight="700"
              mr="0.5rem"
              color={textColor}
            >
              {orderStatus}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Divider />
      <Grid gridAutoColumns={{ base: "100%", md: "50% 50%" }} w="full">
        <GridItem colSpan={1}>
          <Text color="gray.500" fontWeight="normal">
            Status Pesanan
          </Text>
          <Text fontSize="1rem" fontWeight="500" color={textColor}>
            {orderStatus}
          </Text>
          <Text color="gray.500" fontWeight="normal">
            Pengirim
          </Text>
          <Text fontSize="1rem" fontWeight="500">
            {dropShip}
          </Text>
          <Text color="gray.500" fontWeight="normal">
            Penerima
          </Text>
          <Text fontSize="1rem" fontWeight="500">
            {deliverer}
          </Text>
        </GridItem>
        <GridItem colStart={{ base: 0, md: 2 }} colEnd={{ base: 1, md: 5 }}>
          <Text color="gray.500" fontWeight="normal">
            Status Pembayaran
          </Text>
          <Text fontSize="1rem" fontWeight="500">
            {paymentStatus}
          </Text>
          <Text color="gray.500" fontWeight="normal">
            No. Resi
          </Text>
          <Flex alignItems="center">
            <Text fontSize="1rem" fontWeight="500" mr="0.5rem">
              {shippingResi == null ? "-" : shippingResi}
            </Text>
            {shippingResi != null && (
              <IoCopy
                size="1.25rem"
                color="#DD6B20"
                style={{ marginTop: "2px" }}
                cursor="pointer"
                onClick={() => {
                  copyToClipboard(shippingResi, "No. resi berhasil disalin.");
                  toast({
                    position: "top",
                    title: "No. resi berhasil disalin.",
                    status: "success",
                    isClosable: true,
                  });
                }}
              />
            )}
          </Flex>
          <Text fontSize="0.9rem" fontWeight="500" mr="0.5rem">
              {shippingResi == null ? '' : shippingMethod}
            </Text>
        </GridItem>
      </Grid>
      <Divider />
      <Flex w="full" justify="flex-end" flexWrap="wrap" py="0.5rem">
        <Flex align="center">
          <Text color="gray.700" fontWeight="normal" mr="0.5rem">
            {totalPriceAgent === 0 ? "Total Price :" : "Harga Agen :"}
          </Text>
          <Text fontSize="1.2rem" fontWeight="bold">
            {totalPriceAgent === 0
              ? currencyFormat(String(totalPrice))
              : currencyFormat(totalPriceAgent)}
          </Text>
        </Flex>
        {totalPriceAgent !== 0 && (
          <Flex ml="1rem" align="center">
            <Text color="gray.700" fontWeight="normal" mr="0.5rem">
              Harga Reseller :
            </Text>
            <Text fontSize="1.2rem" fontWeight="bold">
              {currencyFormat(String(totalPrice))}
            </Text>
          </Flex>
        )}
      </Flex>
      <Flex w="full" justify="flex-end">
        <Flex
          direction={width < 365 ? "column" : "row"}
          w={width < 365 ? "full" : "auto"}
        >
          <Link
            _hover={{ textDecoration: "none" }}
            target="_blank"
            href={`${
              window.location.origin
            }/order-information/?order=${orderNum.slice(3)}`}
          >
            <Button
              color="orange.500"
              bg="transparent"
              borderWidth="1px"
              _hover={{ bg: "#EEE" }}
              borderColor="orange.500"
              w={width < 365 ? "full" : "auto"}
              mb={width < 365 ? "0.25rem" : "0"}
            >
              Lihat Detail Transaksi
            </Button>
          </Link>
          {orderStatus === "Booking" &&
            paymentStatus === "Pending" &&
            parentId === 0 && (
              <>
                <Button
                  bg="red.600"
                  color="white"
                  ml={width > 365 && "1rem"}
                  w={width < 365 ? "full" : "auto"}
                  onClick={onOpen}
                >
                  Batalkan
                </Button>
                <CancelOrder
                  id={userData.id}
                  isOpen={isOpen}
                  onClose={onClose}
                  orderNum={orderNum}
                  orderId={orderId}
                />
              </>
            )}
          {orderStatus === "Selesai" && (
            <Button
              bg="orange.500"
              color="white"
              ml={width > 365 && "1rem"}
              w={width < 365 ? "full" : "auto"}
            >
              Berikan Penilaian
            </Button>
          )}
        </Flex>
      </Flex>
    </VStack>
  );
};

const PesananSayaDesktop = () => {
  const {
    data,
    loading,
    setCurrentPage,
    currentPage,
    searchState,
    orderId,
    tidakDitemukan,
    setTidakDitemukan,
    setData,
    cacheData,
    setSearchState,
  } = useMyOrderContext();
  const { width } = useWindowSize();

  const { smPay, smPoint } = useSmPayPointContext();

  const sm = [
    { text: "SM Pay", value: smPay },
    { text: "SM Point", value: smPoint },
  ];

  return (
    <Box bg="gray.50" minH="100vh">
      <Layout hasNavbar={true}>
        <Flex
          px={{ base: "1rem", md: "1.5rem", lg: "3rem", xl: "50px" }}
          w="full"
          align="flex-start"
        >
          <CardProfile sm={sm} cardProfileText="Pesanan Saya" />
          <VStack
            maxW={width > 768 && width < 1024 && "478px"}
            minW={width > 768 && width < 1024 && "478px"}
            alignItems="flex-start"
            pl="1rem"
            w="full"
            mx={{ base: "1rem", md: 0 }}
            spacing="1rem"
          >
            <Flex
              justifyContent={!searchState ? "space-between" : "flex-end"}
              w="full"
              alignItems="center"
            >
              <Text
                fontWeight="500"
                fontSize="1.1rem"
                w={{ base: "65%", "2xl": "35%" }}
                pl={{ base: "0.5rem" }}
              >
                {!searchState
                  ? `Halaman : ${currentPage}`
                  : `Hasil Pencarian : SMC${orderId}`}
              </Text>

              <SearchBar />
            </Flex>
            {!searchState && !loading && (
              <NextPrevPages
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
            {searchState && (
              <Kembali
                setData={setData}
                setSearchState={setSearchState}
                setTidakDitemukan={setTidakDitemukan}
                cacheData={cacheData}
                currentPage={currentPage}
              />
            )}
            <Box w="full" d="flex" alignItems="center" flexDir="column">
              {loading ? (
                <Spinner />
              ) : tidakDitemukan ? (
                <Box mt="10rem">
                  <Text>
                    Hasil Pencarian Order : <b>{`SMC${orderId}`}</b> tidak
                    ditemukan
                  </Text>
                </Box>
              ) : (
                data.map((dataPesanan, i) => {
                  if (Array.isArray(dataPesanan)) {
                    dataPesanan = dataPesanan[i];
                  }
                  let totalPriceAgent = 0;
                  if (dataPesanan.parent_id) {
                    totalPriceAgent = dataPesanan.total_price_agent;
                  }
                  return (
                    <CardPesanan
                      key={i}
                      orderId={dataPesanan.orders_id}
                      orderNum={dataPesanan.orders_number}
                      datePurchased={dataPesanan.date_purchased}
                      orderStatus={dataPesanan.orders_status}
                      shippingResi={dataPesanan.shipping_resi}
                      shippingMethod={dataPesanan.shipping_method}
                      paymentStatus={dataPesanan.payments_status}
                      dropShip={dataPesanan.dropship_name}
                      deliverer={dataPesanan.delivery_name}
                      totalPrice={dataPesanan.total_price}
                      parentId={dataPesanan.parent_id}
                      totalPriceAgent={totalPriceAgent}
                    />
                  );
                })
              )}
            </Box>
            {!searchState && !loading && (
              <Box w="full" mb="3rem">
                <Pages
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </Box>
            )}
          </VStack>
        </Flex>
      </Layout>
    </Box>
  );
};

const PesananSayaMobile = () => {
  const {
    data,
    loading,
    currentPage,
    setCurrentPage,
    searchState,
    tidakDitemukan,
    setTidakDitemukan,
    setData,
    cacheData,
    setSearchState,
    orderId,
  } = useMyOrderContext();
  const { width } = useWindowSize();

  return (
    <Box minH="100vh" bg="gray.50">
      <NavbarProfile section={"Pesanan Saya"} />
      <Layout hasPadding>
        <Flex pt="2rem" flexDir="column" width="100%" my="1rem">
          <SearchBar />
          {!searchState ? (
            <Box w="full">
              <Pages
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Box>
          ) : (
            <Kembali
              setData={setData}
              setSearchState={setSearchState}
              setTidakDitemukan={setTidakDitemukan}
              cacheData={cacheData}
              currentPage={currentPage}
            />
          )}
        </Flex>
        <VStack spacing="1rem" mb="1rem">
          {loading ? (
            <Spinner />
          ) : tidakDitemukan ? (
            <Box mt="1rem" pl="0.5rem">
              <Text>
                Hasil Pencarian Order : <b>{`SMC${orderId}`}</b> tidak ditemukan
              </Text>
            </Box>
          ) : (
            data.map((dataPesanan, i) => {
              if (Array.isArray(dataPesanan)) {
                dataPesanan = dataPesanan[i];
              }
              let totalPriceAgent = 0;
              if (dataPesanan.parent_id) {
                totalPriceAgent = dataPesanan.total_price_agent;
              }
              return (
                <>
                  {searchState && (
                    <Text>
                      Hasil Pencarian Order : <b>{`SMC${orderId}`}</b>{" "}
                    </Text>
                  )}
                  <CardPesanan
                    key={i}
                    orderId={dataPesanan.orders_id}
                    orderNum={dataPesanan.orders_number}
                    datePurchased={dataPesanan.date_purchased}
                    orderStatus={dataPesanan.orders_status}
                    shippingResi={dataPesanan.shipping_resi}
                    paymentStatus={dataPesanan.payments_status}
                    dropShip={dataPesanan.dropship_name}
                    deliverer={dataPesanan.delivery_name}
                    totalPrice={dataPesanan.total_price}
                    parentId={dataPesanan.parent_id}
                    totalPriceAgent={totalPriceAgent}
                  />
                </>
              );
            })
          )}
        </VStack>
        {!searchState && !loading && (
          <Box w="full" mb="3rem">
            <Pages currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </Box>
        )}
      </Layout>
    </Box>
  );
};

const Pages = ({ currentPage, setCurrentPage }) => {
  const { loading, lastPage, tidakDitemukan } = useMyOrderContext();

  return (
    <>
      {!loading && !tidakDitemukan && (
        <>
          <Text
            my="1rem"
            fontWeight="500"
            fontSize="1.1rem"
            w="full%"
            pl="0.5rem"
          >
            Halaman : {currentPage}
          </Text>

          <NextPrevPages
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
};

const NextPrevPages = ({ currentPage, setCurrentPage }) => {
  const { lastPage, tidakDitemukan } = useMyOrderContext();
  const { width } = useWindowSize();
  return (
    !tidakDitemukan && (
      <Flex
        justifyContent={currentPage !== 1 ? "space-between" : "flex-end"}
        w="full"
        fontWeight="500"
        textDecoration="underline"
        color="orange.500"
        px="0.5rem"
        fontSize={width < 325 && "0.9rem"}
      >
        {currentPage > 1 && (
          <Text
            cursor="pointer"
            onClick={() => {
              setCurrentPage((curr) => curr - 1);
            }}
          >
            Halaman Sebelumnya
          </Text>
        )}
        {!(lastPage === currentPage) && (
          <Text
            cursor="pointer"
            textAlign="right"
            onClick={() => {
              setCurrentPage((curr) => curr + 1);
              window.scrollTo(0, 0);
            }}
          >
            Halaman Selanjutnya
          </Text>
        )}
      </Flex>
    )
  );
};

const PesananSayaComponent = () => {
  const { width } = useWindowSize();
  const { userData } = useAuthContext();
  const { data } = useMyOrderContext();

  return userData == null || data.length == 0 ? (
    <>
      <Navbar />
      <Box
        d="flex"
        w="100vw"
        h="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Box>
    </>
  ) : width >= 768 ? (
    <PesananSayaDesktop />
  ) : (
    <PesananSayaMobile />
  );
};

const Kembali = ({
  setData,
  setSearchState,
  setTidakDitemukan,
  cacheData,
  currentPage,
}) => {
  return (
    <Text
      mt="1rem"
      pl="0.5rem"
      fontWeight="500"
      display="inline"
      textDecoration="underline"
      color="orange.500"
      cursor="pointer"
      onClick={() => {
        setData(cacheData[currentPage - 1]);
        setSearchState(false);
        setTidakDitemukan(false);
      }}
    >
      Kembali
    </Text>
  );
};

const PesananSaya = () => {
  return (
    <MyOrderProvider>
      <PesananSayaComponent />
    </MyOrderProvider>
  );
};

export default PesananSaya;

export const getServerSideProps = needForLogin;
