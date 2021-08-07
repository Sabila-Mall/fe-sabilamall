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
import Navbar from "../../components/Navbar";
import { HStack, VStack } from "@chakra-ui/layout";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Entry from "../../components/Entry";
import { formatNumber } from "../../utils/functions";

// Dummy data
const listTopUp = [
  {
    "nama": "Bank BNI",
    "tanggal": "31-01-2099 13:31",
    "kode": "1234",
    "harga": 9999999,
    "status": "tidak masalah",
  },
  {
    "nama": "Bank Mandiri",
    "tanggal": "31-01-2099 13:31",
    "kode": "1234",
    "harga": 9999999,
    "status": "tidak masalah",
  },
  {
    "nama": "Bank BNI",
    "tanggal": "31-01-2099 13:31",
    "kode": "1234",
    "harga": 9999999,
    "status": "tidak masalah",
  },
];

const listRiwayat = [
  {
    "nama": "Top Up",
    "tanggal": "31-01-2099 13:31",
    "kode": "1234",
    "harga": 9999999,
    "status": "tidak masalah",
  },
  {
    "nama": "Belanja",
    "tanggal": "31-01-2099 13:31",
    "kode": "1234",
    "harga": 9999999,
    "status": "tidak masalah",
  },
  {
    "nama": "[Nama Transaksi]",
    "tanggal": "31-01-2099 13:31",
    "kode": "1234",
    "harga": 9999999,
    "status": "tidak masalah",
  },
];

const SMPoint = 5;

const SMPay = 99999999;

const Riwayat = () => {
  return (
    <>
      <Navbar />
      <VStack
        className={"secondaryFont"} paddingTop={"4rem"} paddingBottom={"1rem"}
        px={"2rem"} bg={"red.600"} color={"white"} align={"spacing-between"}
      >
        <HStack color={"white"} justify={"space-between"}>
          <Text fontSize={"0.875rem"}>SM Pay</Text>
          <Text className={"primaryFont"} fontSize={"1.5rem"} fontWeight={"bold"}>
            Rp{formatNumber(SMPay)}
          </Text>
        </HStack>

        <HStack color={"white"} justify={"space-between"}>
          <Text fontSize={"0.875rem"}>SM Points</Text>
          <Text className={"primaryFont"} fontSize={"1.5rem"} fontWeight={"bold"}>
            {SMPoint}
          </Text>
        </HStack>

        <Button leftIcon={<BsFillPlusCircleFill />} variant={"outline"} justify={"center"}>
          Top Up SM Pay
        </Button>
      </VStack>
      <Tabs isFitted colorScheme="orange" px={"1rem"} className={"secondaryFont"}>
        <TabList>
          <Tab>Riwayat</Tab>
          <Tab>Daftar Top Up</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack
              spacing={"0.75rem"} align={"space-between"}
              divider={<StackDivider borderColor={"gray.200"} />}
            >
              {
                !listRiwayat.length ?
                  <VStack>
                    <Text>Belum ada riwayat transaksi</Text>
                    <Image
                      objectFit="cover"
                      src="images/emptyMascot.png"
                      alt="Riwayat kosong logo"
                    />
                  </VStack> :
                  listRiwayat.map((topUp, index) =>
                    <Entry data={topUp} key={index} />,
                  )
              }
            </VStack>
            <Divider borderColor={"gray.200"} />
          </TabPanel>
          <TabPanel>
            <VStack
              spacing={"0.75rem"} align={"space-between"}
              divider={<StackDivider borderColor={"gray.200"} />}
            >
              {
                !listTopUp.length ?
                  <VStack>
                    <Text>Belum ada riwayat transaksi</Text>
                    <Image
                      objectFit="cover"
                      src="images/emptyMascot.png"
                      alt="Riwayat kosong mascot"
                    />
                  </VStack> :
                  listTopUp.map((topUp, index) =>
                    <Entry data={topUp} key={index} />,
                  )
              }
            </VStack>
            <Divider borderColor={"gray.200"} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Riwayat;