import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoCopy } from "react-icons/io5";

import { CardProfile } from "../../components/CardProfile";
import { Layout } from "../../components/Layout";
import Navbar from "../../components/Navbar";
import ProfileDesktop from "../../components/ProfileDesktop";

const sm = [
  { text: "SM Pay", value: "1000.000" },
  { text: "SM Point", value: 5 },
];

const CardPesanan = () => {
  return (
    <VStack
      p="1.5rem"
      boxShadow="0px 2px 4px -1px rgba(45, 55, 72, 0.06), 0px 4px 6px -1px rgba(45, 55, 72, 0.1)"
      borderRadius="20px"
      background="white"
      w="full"
      mb="0.5rem"
    >
      <Flex justifyContent="space-between" w="full" mb="0.5rem">
        <Flex alignItems="center">
          <Button mr="1rem" color="white" bg="orange.500">
            Cetak Nota
          </Button>
          <Text fontSize="1rem" fontWeight="500" mr="0.5rem">
            SMC10101
          </Text>
          <IoCopy size="1.25rem" color="#DD6B20" style={{ marginTop: "2px" }} />
          <Divider orientation="vertical" mx="1rem" />
          <Text fontSize="1rem" fontWeight="500" mr="0.5rem">
            4 Juli 2021
          </Text>
        </Flex>
        <Flex align="center">
          <Text fontSize="1rem" fontWeight="500" mr="0.5rem" color="orange.500">
            [Status Pesanan]
          </Text>
        </Flex>
      </Flex>
      <Divider />
      <Grid gridAutoColumns="50% 50%" w="full">
        <GridItem colSpan={1}>
          <Text color="gray.500" fontWeight="normal">
            Pengirim
          </Text>
          <Text fontSize="1rem" fontWeight="500">
            [Nama Pengirim]
          </Text>
          <Text color="gray.500" fontWeight="normal">
            Penerima
          </Text>
          <Text fontSize="1rem" fontWeight="500">
            [Nama Penerima]
          </Text>
        </GridItem>
        <GridItem colStart={2} colEnd={3}>
          <Text color="gray.500" fontWeight="normal">
            Status Pembayaran
          </Text>
          <Text fontSize="1rem" fontWeight="500">
            [Status Pembayaran]
          </Text>
        </GridItem>
      </Grid>
      <Divider />
      <Flex w="full" justify="flex-end">
        <Flex align="center">
          <Text color="gray.500" fontWeight="normal" mr="0.5rem">
            Total Pesanan:
          </Text>
          <Text fontSize="1.2rem" fontWeight="bold">
            Rp9.999.999
          </Text>
        </Flex>
      </Flex>
      <Flex w="full" justify="flex-end">
        <Flex>
          <Button
            color="orange.500"
            bg="transparent"
            borderWidth="1px"
            _hover={{ bg: "#EEE" }}
            borderColor="orange.500"
            mr="1rem"
          >
            Lihat Detail Transaksi
          </Button>
          <Button bg="red.600" color="white">
            Batalkan
          </Button>
        </Flex>
      </Flex>
    </VStack>
  );
};

const PesananSayaDesktop = () => {
  return (
    <Box bg="gray.50" minH="100vh">
      <Layout hasNavbar={true}>
        <Flex
          px={{ base: "1rem", md: "1.5rem", lg: "3rem", xl: "50px" }}
          w="full"
          align="flex-start"
        >
          <CardProfile sm={sm} cardProfileText="Pesanan Saya" />
          <VStack ml="1rem" w="full">
            <CardPesanan />
            <CardPesanan />
            <CardPesanan />
            <CardPesanan />
          </VStack>
        </Flex>
      </Layout>
    </Box>
  );
};

const PesananSaya = () => {
  return <PesananSayaDesktop />;
};

export default PesananSaya;
