import { HStack, VStack } from "@chakra-ui/layout";
import {
  Button,
  Divider,
  Image,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

import Entry from "../../components/Entry";
import { Layout } from "../../components/Layout";
import Navbar from "../../components/Navbar";
import { useWindowSize } from "../../hooks/useWindowSize";
import { formatNumber } from "../../utils/functions";

// Dummy data
const listTopUp = [
  {
    nama: "Bank BNI",
    tanggal: "31-01-2099 13:31",
    kode: "1234",
    harga: 9999999,
    status: "tidak masalah",
  },
  {
    nama: "Bank Mandiri",
    tanggal: "31-01-2099 13:31",
    kode: "1234",
    harga: 9999999,
    status: "tidak masalah",
  },
  {
    nama: "Bank BNI",
    tanggal: "31-01-2099 13:31",
    kode: "1234",
    harga: 9999999,
    status: "tidak masalah",
  },
];

const listRiwayat = [
  {
    nama: "Top Up",
    tanggal: "31-01-2099 13:31",
    kode: "1234",
    harga: 9999999,
    status: "tidak masalah",
  },
  {
    nama: "Belanja",
    tanggal: "31-01-2099 13:31",
    kode: "1234",
    harga: 9999999,
    status: "tidak masalah",
  },
  {
    nama: "[Nama Transaksi]",
    tanggal: "31-01-2099 13:31",
    kode: "1234",
    harga: 9999999,
    status: "tidak masalah",
  },
];

const SMPoint = 5;

const SMPay = 99999999;

const Riwayat = () => {
  const { width } = useWindowSize();
  const router = useRouter();

  useEffect(() => {
    if (width >= 768) router.push("/top-up");
  }, [width]);

  return (
    <Layout pt="0" noFooter hasNavbar noMaxWidth>
      <VStack
        className={"secondaryFont"}
        paddingTop={"5rem"}
        paddingBottom={"1rem"}
        px={"2rem"}
        bg={"red.600"}
        color={"white"}
        align="center"
        mt={{ base: "1rem", md: "3rem" }}
      >
        <HStack
          color={"white"}
          justify={"space-between"}
          w={{ base: "100%", lg: "768px" }}
          mx="auto"
        >
          <Text fontSize={"0.875rem"}>SM Pay</Text>
          <Text
            className={"primaryFont"}
            fontSize={"1.5rem"}
            fontWeight={"bold"}
          >
            Rp{formatNumber(SMPay)}
          </Text>
        </HStack>

        <HStack
          color={"white"}
          justify={"space-between"}
          w={{ base: "100%", lg: "768px" }}
          mx="auto"
        >
          <Text fontSize={"0.875rem"}>SM Points</Text>
          <Text
            className={"primaryFont"}
            fontSize={"1.5rem"}
            fontWeight={"bold"}
          >
            {SMPoint}
          </Text>
        </HStack>

        <Button
          w={{ base: "100%", lg: "768px" }}
          mx="auto"
          leftIcon={<BsFillPlusCircleFill />}
          variant={"outline"}
          justify={"center"}
        >
          Top Up SM Pay
        </Button>
      </VStack>
      <Tabs
        isFitted
        colorScheme="orange"
        px={"1rem"}
        className={"secondaryFont"}
        w={{ base: "100%", md: "768px" }}
        mx="auto"
      >
        <TabList>
          <Tab>Riwayat</Tab>
          <Tab>Daftar Top Up</Tab>
        </TabList>

        <TabPanels pb="2rem">
          <TabPanel>
            <VStack
              spacing={"0.75rem"}
              align={"space-between"}
              divider={<StackDivider borderColor={"gray.200"} />}
            >
              {!listRiwayat.length ? (
                <VStack>
                  <Text>Belum ada riwayat transaksi</Text>
                  <Image
                    objectFit="cover"
                    src="images/emptyMascot.png"
                    alt="Riwayat kosong logo"
                  />
                </VStack>
              ) : (
                listRiwayat.map((topUp, index) => (
                  <Entry data={topUp} key={index} />
                ))
              )}
            </VStack>
            <Divider borderColor={"gray.200"} />
          </TabPanel>
          <TabPanel>
            <VStack
              spacing={"0.75rem"}
              align={"space-between"}
              divider={<StackDivider borderColor={"gray.200"} />}
            >
              {!listTopUp.length ? (
                <VStack>
                  <Text>Belum ada riwayat transaksi</Text>
                  <Image
                    objectFit="cover"
                    src="images/emptyMascot.png"
                    alt="Riwayat kosong mascot"
                  />
                </VStack>
              ) : (
                listTopUp.map((topUp, index) => (
                  <Entry data={topUp} key={index} />
                ))
              )}
            </VStack>
            <Divider borderColor={"gray.200"} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export default Riwayat;
