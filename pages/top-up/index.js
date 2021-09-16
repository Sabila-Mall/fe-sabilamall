import { Button } from "@chakra-ui/button";
import { Input, InputGroup } from "@chakra-ui/input";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  AvatarBadge,
  Center,
  Collapse,
  Heading,
  Icon,
  Image,
  InputLeftAddon,
  Link,
  NumberInput,
  NumberInputField,
  Select,
  SimpleGrid,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { IoHeart, IoWalletOutline, IoCamera } from "react-icons/io5";
import { VscPackage } from "react-icons/vsc";

import { topUpHistory, topUpList } from "../../api/Deposit";
import { CardProfile } from "../../components/CardProfile";
import Entry from "../../components/Entry";
import { Layout } from "../../components/Layout";
import Navbar from "../../components/Navbar";
import { useAuthContext } from "../../contexts/authProvider";
import { useWindowSize } from "../../hooks/useWindowSize";
import { currencyFormat } from "../../utils/functions";
import { formatNumber } from "../../utils/functions";

const sm = [
  { text: "SM Pay", value: "1000.000" },
  { text: "SM Point", value: 5 },
];

// Dummy data
const listBankTujuan = [
  {
    id: "bca",
    nama: "BCA",
  },
  {
    id: "bni",
    nama: "BNI",
  },
  {
    id: "jenius",
    nama: "JENIUS",
  },
  {
    id: "bri",
    nama: "BRi",
  },
  {
    id: "btpn",
    nama: "BTPN",
  },
];

const VERSI = "9.99.99";

const Nominal = ({ nominal, setNominal }) => {
  return (
    <VStack spacing={"0.5rem"} w={"full"} align={"start"}>
      <Text fontSize={"1rem"}>Nominal</Text>
      <Text color={"gray.500"} fontSize={"0.75rem"}>
        Minimal Rp10.000
      </Text>
      <InputGroup>
        <InputLeftAddon children={"Rp"} />
        <NumberInput
          value={nominal}
          min={10000}
          keepWithinRange={false}
          clampValueOnBlur={false}
          onChange={(value) => setNominal(value)}
        >
          <NumberInputField />
        </NumberInput>
      </InputGroup>
      <Wrap>
        <WrapItem>
          <Button
            onClick={() => setNominal(20000)}
            variant={"outline"}
            fontSize={"0.75rem"}
          >
            Rp20.000
          </Button>
        </WrapItem>
        <WrapItem>
          <Button
            onClick={() => setNominal(50000)}
            variant={"outline"}
            fontSize={"0.75rem"}
          >
            Rp50.000
          </Button>
        </WrapItem>
        <WrapItem>
          <Button
            onClick={() => setNominal(100000)}
            variant={"outline"}
            fontSize={"0.75rem"}
          >
            Rp100.000
          </Button>
        </WrapItem>
        <WrapItem>
          <Button
            onClick={() => setNominal(500000)}
            variant={"outline"}
            fontSize={"0.75rem"}
          >
            Rp500.000
          </Button>
        </WrapItem>
        <WrapItem>
          <Button
            onClick={() => setNominal(1000000)}
            variant={"outline"}
            fontSize={"0.75rem"}
          >
            Rp1.000.000
          </Button>
        </WrapItem>
      </Wrap>
    </VStack>
  );
};

const BankTujuan = () => {
  return (
    <VStack spacing={"0.5rem"} w={"full"} align={"start"}>
      <Text>Bank Tujuan</Text>
      <Select>
        {listBankTujuan.map((each, index) => (
          <option key={index} id={each.id}>
            {each.nama}
          </option>
        ))}
      </Select>
    </VStack>
  );
};

const TanggalTransfer = () => {
  return (
    <VStack spacing={"0.5rem"} w={"full"} align={"start"}>
      <Text>Tanggal Transfer</Text>
      <Input placeholder={"Masukan tanggal"} type={"date"} />
    </VStack>
  );
};

const NamaBankPengirim = () => {
  return (
    <VStack spacing={"0.5rem"} w={"full"} align={"start"}>
      <Text>Nama Bank Pengirim</Text>
      <Input placeholder={"Masukan Nama Bank Pengirim"} />
    </VStack>
  );
};

const NamaPemilikRekening = () => {
  return (
    <VStack spacing={"0.5rem"} w={"full"} align={"start"}>
      <Text>Nama Pemilik Rekening</Text>
      <Input placeholder={"Masukan Nama Pemilik Rekening"} />
    </VStack>
  );
};

const Konfirmasi = () => {
  return (
    <Button
      background={"orange.500"}
      color={"white"}
      w={{ base: "full", lg: "inherit" }}
    >
      Konfirmasi
    </Button>
  );
};

const SidePanel = ({ userData }) => {
  return (
    <VStack
      spacing={"3rem"}
      borderRadius={"1.25rem"}
      background={"white"}
      py={"1.125rem"}
      className={"secondaryFont"}
      boxShadow="md"
    >
      <VStack p={"1.125rem"}>
        <Avatar size={"xl"}>
          <AvatarBadge
            borderColor={"transparent"}
            boxSize="1.25em"
            color={"gray.500"}
          >
            <IoCamera />
          </AvatarBadge>
        </Avatar>
        <Text
          className={"primaryFont"}
          fontWeight={"bold"}
          fontSize={"1.125rem"}
        >
          {userData.nama}
        </Text>
        <Text fontSize={"0.875rem"}>{userData.email}</Text>
        <HStack fontSize={"0.75rem"}>
          <Text>{userData.memberId}</Text>
          <Box
            bg={"gray.400"}
            borderRadius={"1.875rem"}
            size="40px"
            px={"0.5rem"}
            py={"0.125rem"}
            color={"white"}
          >
            {userData.tipe}
          </Box>
        </HStack>
      </VStack>

      <SimpleGrid columns={2} px={"1rem"} spacing={"0.75rem"}>
        <VStack borderRadius={"0.5rem"} boxShadow={"base"}>
          <Center
            bg={"gray.100"}
            color={"orange.500"}
            px={"2rem"}
            py={"0.5rem"}
            borderTopRadius={"0.5rem"}
          >
            <Text>SM Pay</Text>
          </Center>
          <Center bg={"gray.50"} paddingBottom={"0.375rem"}>
            Rp{formatNumber(userData.SMPay)}
          </Center>
        </VStack>

        <VStack borderRadius={"0.5rem"} boxShadow={"base"}>
          <Center
            bg={"gray.100"}
            color={"orange.500"}
            px={"2rem"}
            py={"0.5rem"}
            borderTopRadius={"0.5rem"}
          >
            <Text>SM Pay</Text>
          </Center>
          <Center bg={"gray.50"} paddingBottom={"0.375rem"}>
            {userData.SMPoint}
          </Center>
        </VStack>
      </SimpleGrid>

      <Box alignSelf={"stretch"}>
        <Link href={""}>
          <HStack
            py={"1rem"}
            borderColor={"gray.200"}
            borderTopWidth={"1px"}
            borderBottomWidth={"1px"}
            paddingLeft={"1rem"}
          >
            <Icon as={FaUser} boxSize={"1.5rem"} />
            <Text>Akun Saya</Text>
          </HStack>
        </Link>

        <Link href={""}>
          <HStack
            py={"1rem"}
            borderTopWidth={"1px"}
            borderBottomWidth={"1px"}
            paddingLeft={"1rem"}
          >
            <Icon as={IoHeart} boxSize={"1.5rem"} />
            <Text>Wishlist</Text>
          </HStack>
        </Link>

        <Link href={""}>
          <HStack
            py={"1rem"}
            borderTopWidth={"1px"}
            borderBottomWidth={"1px"}
            paddingLeft={"1rem"}
          >
            <Icon as={VscPackage} boxSize={"1.5rem"} />
            <Text>Pesanan saya</Text>
          </HStack>
        </Link>

        <Link href={""}>
          <HStack
            py={"1rem"}
            borderTopWidth={"1px"}
            borderBottomWidth={"1px"}
            paddingLeft={"1rem"}
            color={"orange.500"}
          >
            <Icon as={IoWalletOutline} boxSize={"1.5rem"} />
            <Text>SM Pay</Text>
          </HStack>
        </Link>
      </Box>

      <Text color={"gray.400"} fontSize={"0.75rem"}>
        Sabilla Mall v{VERSI}
      </Text>
    </VStack>
  );
};

const SmartPhoneTopUp = ({ nominal, setNominal }) => {
  return (
    <>
      <Navbar />
      <VStack spacing={"1.5rem"} px={"1rem"} py={{ base: "3rem", md: "4rem" }}>
        <Collapse in={nominal < 10000} animateOpacity>
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>Nominal Top Up Minimal Rp10.000</AlertDescription>
          </Alert>
        </Collapse>
        <Nominal nominal={nominal} setNominal={setNominal} mt={"5rem"} />
        <BankTujuan />
        <TanggalTransfer />
        <NamaBankPengirim />
        <NamaPemilikRekening />
        <Konfirmasi />
      </VStack>
    </>
  );
};

const DesktopTopUp = ({ nominal, setNominal }) => {
  const { userData } = useAuthContext();
  const [listRiwayat, setListRiwayat] = useState([]);
  const [listTopUp, setListTopUp] = useState([]);
  useEffect(() => {
    if (userData?.memberid) {
      topUpHistory(userData?.memberid)
        .then((res) => {
          let tempRiwayat = [];
          for (let i = 0; i < res.data.data.length; i++) {
            tempRiwayat.push({
              nama: res?.data?.data?.[i]?.transaction,
              tanggal: res?.data?.data?.[i]?.date,
              kode: res?.data?.data?.[i]?.trxid,
              harga: `${
                res?.data?.data?.[i]?.type == "CR" ? "+" : "-"
              }${currencyFormat(res?.data?.data?.[i]?.amount)}`,
            });
          }
          setListRiwayat(tempRiwayat);
        })
        .catch((err) => console.error(err));
    }
  }, [userData]);

  useEffect(() => {
    if (userData?.memberid) {
      topUpList(userData?.memberid)
        .then((res) => {
          let tempListTopUp = [];
          for (let i = 0; i < res.data.data.length; i++) {
            tempListTopUp.push({
              nama: `Bank ${res?.data?.data?.[i]?.bank.toUpperCase()}`,
              tanggal: res?.data?.data?.[i]?.date,
              kode: res?.data?.data?.[i]?.trxid,
              harga: currencyFormat(res?.data?.data?.[i]?.amount),
              status: res?.data?.data?.[i]?.status,
            });
          }
          setListTopUp(tempListTopUp);
        })
        .catch((err) => console.error(err));
    }
  }, [userData]);
  return (
    <Box bg="gray.50">
      <Layout hasNavbar={true} hasPadding>
        <HStack
          background={"gray.50"}
          align={"start"}
          spacing={"1rem"}
          paddingBottom={"4rem"}
          w="full"
        >
          <CardProfile sm={sm} cardProfileText="SM Pay" />

          <VStack
            background={"white"}
            px={"2rem"}
            py={"2rem"}
            borderRadius={"1.25rem"}
            className={"secondaryFont"}
            boxShadow="md"
            minW={{ xl: "65%" }}
            align={"start"}
            w="full"
          >
            <Tabs colorScheme={"orange"} w={{ lg: "full" }}>
              <TabList>
                <Tab>Top Up</Tab>
                <Tab>Riwayat</Tab>
                <Tab>Daftar Top Up</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Collapse in={nominal < 10000} animateOpacity>
                    <Alert status="error">
                      <AlertIcon />
                      <AlertDescription>
                        Nominal Top Up Minimal Rp10.000
                      </AlertDescription>
                    </Alert>
                  </Collapse>
                  <Heading className={"primaryFont"} my={"1rem"}>
                    Top Up
                  </Heading>
                  <VStack align={"start"} spacing={"3rem"}>
                    <Nominal nominal={nominal} setNominal={setNominal} />
                    <BankTujuan />
                    <TanggalTransfer />
                    <NamaBankPengirim />
                    <NamaPemilikRekening />
                    <Konfirmasi />
                  </VStack>
                </TabPanel>

                <TabPanel align={"start"} alignSelf={"stretch"}>
                  <Heading className={"primaryFont"}>Riwayat</Heading>
                  <VStack
                    align={"space-between"}
                    mt={"2rem"}
                    spacing={"1.5rem"}
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
                </TabPanel>

                <TabPanel>
                  <Heading className={"primaryFont"}>Daftar Top Up</Heading>
                  <VStack
                    align={"space-between"}
                    mt={"2rem"}
                    spacing={"1.5rem"}
                    divider={<StackDivider borderColor={"gray.200"} />}
                  >
                    {!listTopUp.length ? (
                      <VStack>
                        <Text>Belum ada riwayat top-up</Text>
                        <Image
                          objectFit="cover"
                          src="images/emptyMascot.png"
                          alt="Riwayat kosong logo"
                        />
                      </VStack>
                    ) : (
                      listTopUp.map((topUp, index) => (
                        <Entry data={topUp} key={index} />
                      ))
                    )}
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
            <HStack mt={"1.125rem"} alignSelf={"center"}>
              <Text>Ingin upgrade akun untuk berjualan?</Text>
              <Button
                variant={"outline"}
                color={"red.600"}
                className={"primaryFont"}
                borderColor={"red.600"}
              >
                Upgrade Akun
              </Button>
            </HStack>
          </VStack>
        </HStack>
      </Layout>
    </Box>
  );
};

const TopUp = () => {
  const [nominal, setNominal] = useState(10000);
  const { width } = useWindowSize();

  return width < 768 ? (
    <SmartPhoneTopUp nominal={nominal} setNominal={setNominal} />
  ) : (
    <DesktopTopUp nominal={nominal} setNominal={setNominal} />
  );
};

export default TopUp;
