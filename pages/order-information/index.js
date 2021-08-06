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
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoCopy } from "react-icons/io5";

import { CardProfile } from "../../components/CardProfile";
import NavbarProfile from "../../components/NavbarProfile";
import OrderProductsTable, {
  OrderProductsTableMobile,
} from "../../components/OrderProductsTable";
import ScrollButton from "../../components/ScrollButton";

const OrderInformation = () => {
  const [isMobile] = useMediaQuery("(max-width: 48em)");
  const sm = [
    { text: "SM Pay", value: "1000.000" },
    { text: "SM Point", value: 5 },
  ];
  const router = useRouter();

  const status = "pending";
  const productDiscount = "Rp-99.999";
  const voucherDiscount = "Rp-99.999";
  const notes =
    "Ini catatan pesanan. Ice cream cake macaroon donut topping tiramisu tart bear claw lemon drops. Pastry lollipop cupcake lemon drops fruitcake gummies dragée liquorice. Halvah apple pie carrot cake gummi bears I love dragée I love marshmallow.";
  const resi = "101010101";

  const orderProducts = [
    {
      name: "Nama Produk Croissant Tiramisu...",
      details: "Lengan panjang, Merah Cabe, XXXXXXXL",
      weight: "1000gr",
      notes:
        "ini produk yang punya catatan tambahan. kalo gaada catatannya gausah dirender.",
      image: "/images/productExample.svg",
      discount: "99%",
      price: "99.999.999",
      discountPrice: "Rp99.999.999",
      quantity: "999",
      subTotal: "Rp999.999.999",
    },
    {
      name: "Nama Produk Croissant Tiramisu...",
      details: "Lengan panjang, Merah Cabe, XXXXXXXL",
      weight: "1000gr",
      notes: "",
      image: "/images/productExample.svg",
      discount: "99%",
      price: "99.999.999",
      discountPrice: "Rp99.999.999",
      quantity: "999",
      subTotal: "Rp999.999.999",
    },
    {
      name: "Nama Produk Croissant Tiramisu...",
      details: "Lengan panjang, Merah Cabe, XXXXXXXL",
      weight: "1000gr",
      notes: "another produk yang pake catatan tambahan",
      image: "/images/productExample.svg",
      discount: "99%",
      price: "99.999.999",
      discountPrice: "Rp99.999.999",
      quantity: "999",
      subTotal: "Rp999.999.999",
    },
  ];

  const steps = [
    {
      title:
        "Transaksi selesai.Transaksi selesai.Transaksi selesai.Transaksi selesai.Transaksi selesai.Transaksi selesai.Transaksi selesai.",
      timestamp: "32 Jun 2021, 23:55 WIB ",
    },
    {
      title: "Transaksi selesai.",
      timestamp: "32 Jun 2021, 23:55 WIB ",
    },
    {
      title: "Transaksi selesai.",
      timestamp: "32 Jun 2021, 23:55 WIB ",
    },
    {
      title: "Transaksi selesai.",
      timestamp: "32 Jun 2021, 23:55 WIB ",
    },
    {
      title: "Transaksi selesai.",
      timestamp: "32 Jun 2021, 23:55 WIB ",
    },
    {
      title: "Transaksi selesai.",
      timestamp: "32 Jun 2021, 23:55 WIB ",
    },
    {
      title: "Transaksi selesai.",
      timestamp: "32 Jun 2021, 23:55 WIB ",
    },
    {
      title: "Transaksi selesai.",
      timestamp: "32 Jun 2021, 23:55 WIB ",
    },
    {
      title: "Transaksi selesai.",
      timestamp: "32 Jun 2021, 23:55 WIB ",
    },
  ];

  return (
    <Box>
      {isMobile ? (
        <NavbarProfile
          section="Informasi Pesanan"
          onClick={() => router.push("/profile")}
        />
      ) : (
        <></>
      )}
      <Box
        bg="gray.50"
        h="100%"
        px={{ base: "16px", md: "" }}
        pt={{ base: "66px", md: "84px" }}
        pb={{ base: "66px", md: "" }}
      >
        <Flex
          justify="center"
          pb="32px"
          bg="gray.50"
          px={{ base: "0", md: "10px", lg: "80px", xl: "120px" }}
        >
          <Flex display={{ base: "none", md: "block" }}>
            <CardProfile sm={sm} />
          </Flex>
          <Stack
            border="1px solid #E2E8F0"
            borderRadius="20px"
            p={{ base: "20px", md: "32px" }}
            ml={{ base: "", md: "15px" }}
            boxShadow="0px 2px 4px -1px rgba(45, 55, 72, 0.06), 0px 4px 6px -1px rgba(45, 55, 72, 0.1)"
            bg="white"
          >
            {isMobile ? (
              <></>
            ) : (
              <>
                <Flex
                  onClick={() => router.push("/profile")}
                  dir="column"
                  w="fit-content"
                  mb="12px"
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
                <Divider border="1px solid gray.200" />
              </>
            )}

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
                    SMC10101
                  </Text>
                </Box>
                <Flex>
                  <Box w="140px">
                    <Text color="gray.500" fontSize="0.75rem">
                      Status Pesanan
                    </Text>
                    <Text color="black" fontSize="0.875rem">
                      Terkirim
                    </Text>
                  </Box>
                  <Box ml="16px">
                    <Text color="gray.500" fontSize="0.75rem">
                      Waktu Pemesanan
                    </Text>
                    <Text color="black" fontSize="0.875rem">
                      9 Juni 2002 13:11
                    </Text>
                  </Box>
                </Flex>
                <Flex>
                  <Box w="140px">
                    <Text color="gray.500" fontSize="0.75rem">
                      Status Pembayaran
                    </Text>
                    <Text color="black" fontSize="0.875rem">
                      Terkirim
                    </Text>
                  </Box>
                  <Box ml="16px">
                    <Text color="gray.500" fontSize="0.75rem">
                      Waktu Pembayaran
                    </Text>
                    <Text color="black" fontSize="0.875rem">
                      9 Juni 2021 13:11
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
                  if (status == "pending") {
                    return (
                      <>
                        <Button
                          color="white"
                          bgColor="red.500"
                          borderRadius="4px"
                          w="100%"
                          p="0px 16px"
                        >
                          Konfirmasi Pembayaran
                        </Button>
                        <Button
                          border="1px solid #E53E3E"
                          color="red.500"
                          bgColor="white"
                          w="100%"
                          borderRadius="4px"
                        >
                          Lihat Nota Pesanan
                        </Button>
                      </>
                    );
                  } else if (status === "confirmed") {
                    return (
                      <>
                        <Button
                          border="1px solid #E53E3E"
                          color="orange.500"
                          bgColor="white"
                          w="100%"
                          borderRadius="4px"
                        >
                          Lihat Nota Pesanan
                        </Button>
                      </>
                    );
                  } else if (status === "delivered") {
                    return (
                      <>
                        <Button
                          color="white"
                          bgColor="orange.500"
                          w="100%"
                          borderRadius="4px"
                        >
                          Berikan Penilaian
                        </Button>
                        <Button
                          border="1px solid #DD6B20"
                          color="orange.500"
                          bgColor="white"
                          w="100%"
                          borderRadius="4px"
                        >
                          Lihat Nota Pesanan
                        </Button>
                      </>
                    );
                  } else if (status === "reviewed") {
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

            <VStack spacing="16px" pb="1rem">
              <Box className="primaryFont" fontSize="1rem">
                <Text color="black" fontWeight="700">
                  Data Pengirim
                </Text>
                <Text color="gray.600" fontWeight="700" mt="16px">
                  M Abdurahman Basyah
                </Text>
                <Text color="gray.600" fontWeight="400">
                  08234234234
                </Text>

                <Divider border="1px solid gray.200" my="16px" />

                <Text color="black" fontWeight="700">
                  Data Pengirim
                </Text>
                <Text color="gray.600" fontWeight="700" mt="16px">
                  M Abdurahman Basyah
                </Text>
                <Text color="gray.600" fontWeight="400">
                  08234234234
                </Text>
                <Text
                  className="secondaryFont"
                  fontWeight="500"
                  fontSize="0.875rem"
                >
                  Jl Kb Kacang Grand Indonesia Shopping Town East Mall Lt Ground
                  30, TANGERANG - CILEDUG, BANTEN, 15148
                </Text>
              </Box>
              <Divider />
              <Box pos="relative" mt={{ base: "24px", md: "" }}>
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
                    <Text>JNE Reguler</Text>
                    <Text>
                      {`No. Resi:  ${resi}`}
                      <Icon
                        as={IoCopy}
                        color="orange.500"
                        boxSize="1rem"
                        ml="0.25rem"
                        cursor="pointer"
                      />
                    </Text>
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
                          minW="fit-content"
                          fontSize={{ base: "0.8rem", md: "0.875rem" }}
                        >
                          {step.timestamp}
                        </Text>
                        <Text
                          color={index === 0 ? "orange.400" : "gray.500"}
                          ml="0.5rem"
                          fontSize="1rem"
                        >
                          {step.title}
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
                    Ini catatan pesanan. Ice cream cake macaroon donut topping
                    tiramisu tart bear claw lemon drops. Pastry lollipop cupcake
                    lemon drops fruitcake gummies dragée liquorice. Halvah apple
                    pie carrot cake gummi bears I love dragée I love
                    marshmallow.
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
                  <Text>Rp9.999.999</Text>
                </Flex>
                <Flex mt="8px">
                  <Text>Biaya Pengiriman</Text>
                  <Spacer />
                  <Text>Rp99.999</Text>
                </Flex>
                <Flex mt="8px">
                  <Text>Biaya Tambahan</Text>
                  <Spacer />
                  <Text>Rp0</Text>
                </Flex>
                {productDiscount ? (
                  <Flex mt="8px">
                    <Text>Diskon Produk</Text>
                    <Spacer />
                    <Text>{productDiscount}</Text>
                  </Flex>
                ) : (
                  <></>
                )}
                {voucherDiscount ? (
                  <Flex mt="8px">
                    <Text>Diskon Voucher</Text>
                    <Spacer />
                    <Text>{voucherDiscount}</Text>
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
                    Rp999.999.999
                  </Text>
                </Flex>
                <Flex mt="8px">
                  <Text>Metode Pembayaran</Text>
                  <Spacer />
                  <Text>Transfer Bank BNI</Text>
                </Flex>
              </Box>
            </Grid>
          </Stack>
        </Flex>
      </Box>
      {isMobile ? <ScrollButton /> : <></>}
    </Box>
  );
};

export default OrderInformation;
