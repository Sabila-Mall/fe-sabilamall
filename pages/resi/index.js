import { CardProfile } from "../../components/CardProfile";
import styles from "../../styles/Footer.module.scss";

const {
  Box,
  Text,
  Flex,
  Button,
  Divider,
  Image,
  Table,
  Grid,
  Stack,
  StackDivider,
  VStack,
  HStack,
} = require("@chakra-ui/react");
const { Layout } = require("../../components/Layout");
const { IoChevronBackOutline, IoCopy } = require("react-icons/io5");
const { TableContent } = require("../../components/TableContent");
const { ProductCart } = require("../../components/ProductCart");
const { Produk, listProduk, formatNumber } = require("../detail-pesanan");

const d = [
  {
    label: "Biaya Pengiriman",
    number: 9999999,
  },
  {
    label: "Total Diskon Produk",
    number: 9999999,
  },
  {
    label: "Total Diskon Pengiriman",
    number: 9999999,
  },
  {
    label: "Total Pesanan",
    number: 9999999,
    total: true,
  },
  {
    label: "Metode Pembayaran",
    desc: "Transfer Bank BNI",
  },
];

const sm = [
  { text: "SM Pay", value: "100.000.000" },
  { text: "SM Point", value: 5 },
];

const resi = () => {
  return (
    <>
      <ResiNavbar
        display={{ base: "flex", lg: "none" }}
        desc="Informasi Pesanan"
        boxShadow="0px 4px 10px 0px #00000040"
      />
      <Layout>
        <HStack mt={{ base: "-3rem", lg: "0" }} alignItems="start">
          <Box d={{ base: "none", lg: "block" }}>
            <CardProfile sm={sm} />
          </Box>
          <Box
            boxShadow={{
              base: "0px 4px 10px 0px #00000040",
              lg: "0px 1px 3px 0px #2D37481A,0px 1px 2px 0px #2D37480F",
            }}
            borderRadius="1rem"
            p={{ base: "0.75rem", lg: "2rem" }}
          >
            <ResiNavbar display={{ base: "none", lg: "flex" }} desc="Kembali" />
            <Divider
              display={{ base: "none", lg: "block" }}
              mb="1rem"
              orientation="horizontal"
              w="full"
            />
            <Flex
              flexDir={{ base: "column", lg: "row" }}
              justifyContent={{ lg: "space-between" }}
              fontWeight="500"
              w="full"
            >
              <Box minW="280px" maxW="280px">
                <TextWLabel title="Nomor Pesanan" desc="SMC10101" />
                <Box>
                  <Flex justifyContent="space-between">
                    <TextWLabel title="Status Pesanan" desc="Terkirim" />
                    <TextWLabel
                      title="Waktu Pemesanan"
                      desc="10 Juli 2021 13:11"
                    />
                  </Flex>
                  <Flex justifyContent="space-between" mb="1rem">
                    <TextWLabel title="Status Pembayaran" desc="Dikonfirmasi" />
                    <TextWLabel
                      title="Waktu Pembayaran"
                      desc="10 Juli 2021 13:11"
                    />
                  </Flex>
                </Box>
              </Box>
              <Flex flexWrap="wrap" mb="1rem" flexDir="column">
                <Button
                  w={{ base: "full", lg: "11.625rem" }}
                  colorScheme="orange"
                  w="full"
                  mb="0.5rem"
                >
                  Berikan Penilaian
                </Button>
                <Button
                  w={{ base: "full", lg: "11.625rem" }}
                  colorScheme="orange"
                  variant="outline"
                >
                  Lihat Invoice
                </Button>
              </Flex>
            </Flex>
            <Divider orientation="horizontal" w="full" />
            <Flex flexDir={{ base: "column", lg: "row" }}>
              <Box w={{ base: "full", lg: "40%" }}>
                <Text fontWeight="600" mb="1rem">
                  Data Pengirim
                </Text>
                <Box mb="1rem">
                  <Text fontWeight="bold" color="gray.600">
                    [Nama Lengkap Pengirim]
                  </Text>
                  <Text>[Nomor HP Pengirim]</Text>
                </Box>
                <Box>
                  <Text fontWeight="600" mb="0.5rem">
                    Data Penerima
                  </Text>
                  <Text fontWeight="700" color="gray.600">
                    Hendra Setiawan Indrajaja
                  </Text>
                  <Text mb="0.4rem">0855-5555-5555</Text>
                  <Text
                    fontWeight="500"
                    color="gray.600"
                    fontSize="0.85rem"
                    lineHeight="1.5"
                  >
                    Jl Kb Kacang Grand Indonesia Shopping Town East Mall Lt
                    Ground 30, TANGERANG - CILEDUG, BANTEN, 15418
                  </Text>
                </Box>
              </Box>

              <Box pl="0.5rem" w={{ base: "full", lg: "60%" }}>
                <Flex
                  mt="1rem"
                  justifyContent="space-between"
                  color="gray.600"
                  fontWeight="500"
                >
                  <Text fontWeight="700" color="black" fontSize="1.1rem">
                    Pengiriman
                  </Text>
                  <Box textAlign="right" fontSize="0.9rem">
                    <Text>JNE Reguler</Text>
                    <Flex alignItems="center">
                      <Text pr="0.5rem">No. Resi: 101010101010</Text>
                      <IoCopy color="#DD6B20" size="1.2em" />
                    </Flex>
                  </Box>
                </Flex>
                <Flex mt="1rem" justifyContent="center" w="full">
                  <Box
                    w={{ base: "90%", lg: "full" }}
                    maxW={{ base: "90%", lg: "full" }}
                  >
                    <ProgressCircle
                      time="23 Jun 2021, 23.55 WIB"
                      desc="Transaksi belum berhasil"
                    />
                    <ProgressCircle
                      time="23 Jun 2021, 23.55 WIB"
                      desc="Transaksi belum berhasil"
                    />
                    <ProgressCircle
                      time="23 Jun 2021, 23.55 WIB"
                      desc="Transaksi belum berhasil"
                    />
                    <ProgressCircle
                      time="23 Jun 2021, 23.55 WIB"
                      desc="Transaksi belum berhasil"
                    />
                  </Box>
                </Flex>
              </Box>
            </Flex>
            <Stack
              mt="1rem"
              mb="1rem"
              className={styles.secondaryFont}
              direction={"column"}
              borderRadius={"0.5rem"}
              borderWidth={{ base: "0px", md: "1px" }}
              borderColor="gray.300"
              padding={{ base: "0rem", md: "1rem" }}
              spacing={{ base: "1rem", md: "0.875rem" }}
            >
              <Box display={{ base: "none", lg: "block" }}>
                <Grid
                  gridTemplateColumns={"3fr 1fr 1fr 1fr"}
                  className={styles.primaryFont}
                >
                  <Text>Produk</Text>
                  <Text>Harga Satuan</Text>
                  <Text textAlign={"center"}>Jumlah</Text>
                  <Text textAlign={"center"}>Subtotal</Text>
                </Grid>
                <Divider my="1rem" borderColor="gray.200" />
              </Box>
              {listProduk.map((produk, i) => {
                return (
                  <>
                    <Produk produk={produk} key={i} resi={true} />
                  </>
                );
              })}
            </Stack>
            <Box>
              <Text fontWeight="700" color="black" mb="0.5rem">
                Catatan Pesanan
              </Text>
              <Box
                my="1rem"
                minH="9.75rem"
                border="1px solid #E2E8F0"
                borderRadius="8px"
                p="1rem"
              >
                <Text fontSize="14px" color="gray.700" fontWeight="500">
                  Ini catatan pesanan
                </Text>
              </Box>
              <Divider />
              <VStack mt="1rem" flexDir="column">
                {d.map((e, i) => {
                  return (
                    <TextDetail
                      key={i}
                      id={i}
                      label={e.label}
                      number={e.number ? e.number : false}
                      desc={e.desc ? e.desc : false}
                    />
                  );
                })}
              </VStack>
            </Box>
          </Box>
        </HStack>
      </Layout>
    </>
  );
};

const TextWLabel = ({ title, desc }) => {
  return (
    <>
      <Box mb="0.5rem">
        <Text color="gray.500" fontSize="0.8rem">
          {title}
        </Text>
        <Text color="black">{desc}</Text>
      </Box>
    </>
  );
};

const ProgressCircle = ({ time, desc }) => {
  return (
    <Flex alignItems="start">
      <Image mr="0.5rem" pt="0.2rem" src="/images/Pengiriman/dot.svg" />
      <Flex
        alignItems={{ lg: "center" }}
        flexDir={{ base: "column", lg: "row" }}
      >
        <Text color="gray.400" fontSize="0.875rem" fontWeight="500">
          {time}
        </Text>
        <Text pl={{ base: 0, lg: "1rem" }} color="gray.500">
          {desc}
        </Text>
      </Flex>
    </Flex>
  );
};

const TextDetail = ({ label, number, desc, id }) => {
  return (
    <Flex
      w="full"
      alignItems="center"
      fontWeight="500"
      color="gray.500"
      justifyContent="space-between"
      fontSize={"0.9rem"}
    >
      <Text>{label}</Text>
      {number && (
        <Text
          textAlign="right"
          color={id == 3 && "orange.500"}
          fontWeight={id == 3 && "700"}
          fontSize={id == 3 && "1.2rem"}
        >
          Rp{formatNumber(number)}
        </Text>
      )}
      {!number && <Text textAlign="right">{desc}</Text>}
    </Flex>
  );
};

const ResiNavbar = ({ display, desc, onClick, boxShadow }) => {
  return (
    <Box
      px="0.5rem"
      w="full"
      h="3.125rem"
      display={display}
      alignItems="center"
      boxShadow={boxShadow}
    >
      <Box as="span" pt="0.1rem" onClick={onClick}>
        <IoChevronBackOutline color="gray" size="1.2em" />
      </Box>
      <Text pl="0.5rem" fontWeight="700" color="gray.500">
        {desc}
      </Text>
    </Box>
  );
};
export default resi;
