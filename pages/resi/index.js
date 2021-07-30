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
} = require("@chakra-ui/react");
const { Layout } = require("../../components/Layout");
const { IoChevronBackOutline, IoCopy } = require("react-icons/io5");
const { TableContent } = require("../../components/TableContent");
const { ProductCart } = require("../../components/ProductCart");
const { Produk, listProduk } = require("../detail-pesanan");

const resi = () => {
  return (
    <>
      <Box
        px="0.5rem"
        w="full"
        h="3.125rem"
        display="flex"
        alignItems="center"
        boxShadow="0px 4px 10px 0px #00000040"
      >
        <Box as="span" pt="0.1rem">
          <IoChevronBackOutline color="gray" size="1.2em" />
        </Box>
        <Text pl="0.5rem" fontWeight="700" color="gray.500">
          Informasi Pesanan
        </Text>
      </Box>
      <Layout>
        <Box
          mt="-3rem"
          boxShadow="0px 4px 10px 0px #00000040"
          borderRadius="1rem"
          p="0.75rem"
        >
          <Box fontWeight="500">
            <TextWLabel title="Nomor Pesanan" desc="SMC10101" />
            <Box maxW="280px">
              <Flex justifyContent="space-between">
                <TextWLabel title="Status Pesanan" desc="Terkirim" />
                <TextWLabel title="Waktu Pemesanan" desc="10 Juli 2021 13:11" />
              </Flex>
              <Flex justifyContent="space-between" mb="1rem">
                <TextWLabel title="Status Pembayaran" desc="Dikonfirmasi" />
                <TextWLabel
                  title="Waktu Pembayaran"
                  desc="10 Juli 2021 13:11"
                />
              </Flex>
            </Box>
            <Flex flexWrap="wrap" mb="1rem">
              <Button colorScheme="orange" w="full" mb="0.5rem">
                Berikan Penilaian
              </Button>
              <Button w="full" colorScheme="orange" variant="outline">
                Lihat Invoice
              </Button>
            </Flex>
            <Divider w="full" />
          </Box>
          <Box>
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
                Jl Kb Kacang Grand Indonesia Shopping Town East Mall Lt Ground
                30, TANGERANG - CILEDUG, BANTEN, 15418
              </Text>
            </Box>
          </Box>

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
            <Box w="90%" maxW="90%">
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
              <Stack
                className={styles.secondaryFont}
                direction={"column"}
                borderRadius={"0.5rem"}
                borderWidth={{ base: "0px", md: "1px" }}
                borderColor="gray.300"
                padding={{ base: "0rem", md: "1rem" }}
                spacing={{ base: "1rem", md: "0.875rem" }}
                divider={<StackDivider borderColor="gray.200" />}
              >
                <Box display={{ base: "none", md: "block" }}>
                  <Grid
                    gridTemplateColumns={"3fr 1fr 1fr 1fr"}
                    className={styles.primaryFont}
                  >
                    <Text>Produk</Text>
                    <Text>Harga Satuan</Text>
                    <Text textAlign={"center"}>Jumlah</Text>
                    <Text textAlign={"center"}>Subtotal</Text>
                  </Grid>
                </Box>
                {listProduk.map((produk, i) => {
                  return <Produk produk={produk} key={i} resi={true} />;
                })}
              </Stack>

              {/* <Produk produk={listProduk} /> */}
            </Box>
          </Flex>
        </Box>
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
      <Flex flexDir="column">
        <Text color="gray.400" fontSize="0.875rem" fontWeight="500">
          {time}
        </Text>
        <Text color="gray.500">{desc}</Text>
      </Flex>
    </Flex>
  );
};
export default resi;
