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
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { IoCamera, IoHeart, IoWalletOutline } from "react-icons/io5";
import { VscPackage } from "react-icons/vsc";

import { topUpHistory, topUpList } from "../../api/Deposit";
import { postPaymentConfirmation } from "../../api/Konfirmasi";
import { getAllBanks } from "../../api/banks";
import { confrimTopUp } from "../../api/topup";
import { CardProfile } from "../../components/CardProfile";
import Entry from "../../components/Entry";
import { Layout } from "../../components/Layout";
import Navbar from "../../components/Navbar";
import { ErrorToast, SuccessToast } from "../../components/Toast";
import { useAuthContext } from "../../contexts/authProvider";
import { useWindowSize } from "../../hooks/useWindowSize";
import { currencyFormat, formatNumber } from "../../utils/functions";

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

const userData = {
  nama: "Litha Cantik",
  email: "zulmusuydu@biyac.com",
  memberId: "1234567",
  tipe: "Reguler",
  SMPay: 100000000,
  SMPoint: 5,
};

const VERSI = "9.99.99";

const Nominal = ({ dataPost, setDataPost }) => {
  return (
    <VStack spacing={"0.5rem"} w={"full"} align={"start"}>
      <Text fontSize={"1rem"}>Nominal</Text>
      <Text color={"gray.500"} fontSize={"0.75rem"}>
        Minimal Rp10.000
      </Text>
      <InputGroup>
        <InputLeftAddon children={"Rp"} />
        <NumberInput
          value={dataPost.amount}
          min={10000}
          keepWithinRange={false}
          clampValueOnBlur={false}
          onChange={(value) =>
            setDataPost((prev) => ({ ...prev, amount: value }))
          }
        >
          <NumberInputField />
        </NumberInput>
      </InputGroup>
      <Wrap>
        <WrapItem>
          <Button
            onClick={() =>
              setDataPost((prev) => ({
                ...prev,
                amount: 20000,
              }))
            }
            variant={"outline"}
            fontSize={"0.75rem"}
          >
            Rp20.000
          </Button>
        </WrapItem>
        <WrapItem>
          <Button
            onClick={() =>
              setDataPost((prev) => ({
                ...prev,
                amount: 50000,
              }))
            }
            variant={"outline"}
            fontSize={"0.75rem"}
          >
            Rp50.000
          </Button>
        </WrapItem>
        <WrapItem>
          <Button
            onClick={() =>
              setDataPost((prev) => ({
                ...prev,
                amount: 100000,
              }))
            }
            variant={"outline"}
            fontSize={"0.75rem"}
          >
            Rp100.000
          </Button>
        </WrapItem>
        <WrapItem>
          <Button
            onClick={() =>
              setDataPost((prev) => ({
                ...prev,
                amount: 500000,
              }))
            }
            variant={"outline"}
            fontSize={"0.75rem"}
          >
            Rp500.000
          </Button>
        </WrapItem>
        <WrapItem>
          <Button
            onClick={() =>
              setDataPost((prev) => ({
                ...prev,
                amount: 1000000,
              }))
            }
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

const BankTujuan = ({ listBank, dataPost, setDataPost }) => {
  return (
    <VStack spacing={"0.5rem"} w={"full"} align={"start"}>
      <Text>Bank Tujuan</Text>
      <Select
        value={dataPost.banktujuan}
        onChange={(e) =>
          setDataPost((prev) => ({ ...prev, banktujuan: e.target.value }))
        }
      >
        {listBank?.bankTujuan.map((each, index) => (
          <option key={each.namabank} id={each.bankid} value={each.bankid}>
            {each.namabank} - {each.rekening}
          </option>
        ))}
      </Select>
    </VStack>
  );
};

const TanggalTransfer = ({ dataPost, setDataPost }) => {
  return (
    <VStack spacing={"0.5rem"} w={"full"} align={"start"}>
      <Text>Tanggal Transfer</Text>

      <Input
        placeholder={"Masukan tanggal"}
        type={"date"}
        value={dataPost.date}
        onChange={(e) => {
          setDataPost((prev) => ({ ...prev, date: e.target.value }));
        }}
      />
    </VStack>
  );
};

const NamaBankPengirim = ({ listBank, dataPost, setDataPost }) => {
  return (
    <VStack spacing={"0.5rem"} w={"full"} align={"start"}>
      <Text>Nama Bank Pengirim</Text>
      <Select
        value={dataPost.bankasal}
        onChange={(e) =>
          setDataPost((prev) => ({ ...prev, bankasal: e.target.value }))
        }
      >
        {listBank?.bankAsal.map((each, index) => (
          <option key={each.namabank} id={each.bankid} value={each.namabank}>
            {each.namabank}
          </option>
        ))}
      </Select>
    </VStack>
  );
};

const NamaPemilikRekening = ({ dataPost, setDataPost }) => {
  return (
    <VStack spacing={"0.5rem"} w={"full"} align={"start"}>
      <Text>Nama Pemilik Rekening</Text>
      <Input
        placeholder={"Masukan Nama Pemilik Rekening"}
        value={dataPost?.pemilik}
        onChange={(e) =>
          setDataPost((prev) => ({
            ...prev,
            pemilik: e.target.value,
          }))
        }
      />
    </VStack>
  );
};

const Konfirmasi = ({ dataPost }) => {
  const { userData } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { amount, bankasal, banktujuan, pemilik, date } = dataPost;

  const onClick = (e) => {
    e?.preventDefault();
    const dateIND = dataPost?.date?.split("-").reverse().join("-");
    setLoading(true);
    confrimTopUp({
      action: "confirm",
      memberid: userData.memberid,
      ...dataPost,
      date: dateIND,
      banktujuan: Number(dataPost.banktujuan),
      amount: Number(dataPost.amount),
    })
      .then(() => SuccessToast("Top Up Berhasil!"))
      .catch(() => ErrorToast("Top Up Gagal!"))
      .finally(() => setLoading(false));
  };
  return (
    <Button
      background={"orange.500"}
      color={"white"}
      w={{ base: "full", lg: "inherit" }}
      isDisabled={!amount || !bankasal || !date || !banktujuan || !pemilik}
      onClick={onClick}
      isLoading={loading}
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

const SmartPhoneTopUp = ({ listBank, dataPost, setDataPost }) => {
  return (
    <>
      <Navbar />
      <VStack spacing={"1.5rem"} px={"1rem"} py={{ base: "3rem", md: "4rem" }}>
        <Collapse in={dataPost.amount < 10000} animateOpacity>
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>Nominal Top Up Minimal Rp10.000</AlertDescription>
          </Alert>
        </Collapse>
        <Nominal dataPost={dataPost} setDataPost={setDataPost} mt={"5rem"} />
        <BankTujuan
          listBank={listBank}
          dataPost={dataPost}
          setDataPost={setDataPost}
        />
        <TanggalTransfer dataPost={dataPost} setDataPost={setDataPost} />
        <NamaBankPengirim
          listBank={listBank}
          dataPost={dataPost}
          setDataPost={setDataPost}
        />
        <NamaPemilikRekening dataPost={dataPost} setDataPost={setDataPost} />
        <Konfirmasi dataPost={dataPost} setDataPost={setDataPost} />
      </VStack>
    </>
  );
};

const DesktopTopUp = ({ listBank, dataPost, setDataPost, isAgent }) => {
  const { userData } = useAuthContext();
  const [listRiwayat, setListRiwayat] = useState([]);
  const [listTopUp, setListTopUp] = useState([]);
  useEffect(() => {
    if (userData?.memberid) {
      topUpHistory(userData?.memberid)
        .then((res) => {
          console.log(res);
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
          <CardProfile cardProfileText="SM Pay" />

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
                  <Collapse in={dataPost.amount < 10000} animateOpacity>
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
                    <Nominal setDataPost={setDataPost} dataPost={dataPost} />
                    <BankTujuan
                      listBank={listBank}
                      setDataPost={setDataPost}
                      dataPost={dataPost}
                    />
                    <TanggalTransfer
                      setDataPost={setDataPost}
                      dataPost={dataPost}
                    />
                    <NamaBankPengirim
                      listBank={listBank}
                      setDataPost={setDataPost}
                      dataPost={dataPost}
                    />
                    <NamaPemilikRekening
                      setDataPost={setDataPost}
                      dataPost={dataPost}
                    />
                    <Konfirmasi setDataPost={setDataPost} dataPost={dataPost} />
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
            {!isAgent && (
              <HStack mt={"1.125rem"} alignSelf={"center"}>
                <Text>Ingin upgrade akun untuk berjualan?</Text>
                <NextLink href="/profile/upgrade-account">
                  <Button
                    variant={"outline"}
                    color={"red.600"}
                    className={"primaryFont"}
                    borderColor={"red.600"}
                  >
                    Upgrade Akun
                  </Button>
                </NextLink>
              </HStack>
            )}
          </VStack>
        </HStack>
      </Layout>
    </Box>
  );
};

const TopUp = () => {
  const { userData } = useAuthContext();
  const [dataPost, setDataPost] = useState({
    amount: 10000,
    date: "",
    pemilik: "",
    bankasal: "",
    banktujuan: null,
  });

  const [listBank, setListBank] = useState({
    bankTujuan: [],
    bankAsal: [],
  });
  const [loading, setLoading] = useState(true);
  const { width } = useWindowSize();

  useEffect(() => {
    const getAllData = async () => {
      try {
        const banks = await getAllBanks({ action: "forconfirmation" });

        setListBank({
          bankTujuan: banks?.banktujuan,
          bankAsal: banks?.bankasal,
        });
        setDataPost((prev) => ({
          ...prev,
          banktujuan: banks?.banktujuan[0]?.bankid,
          bankasal: banks?.bankasal?.[0]?.namabank,
        }));
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };

    getAllData();
  }, [userData]);

  const isAgent = userData?.user_level?.toLowerCase() === "agent";

  if (loading) return null;

  return width < 768 ? (
    <SmartPhoneTopUp
      isAgent={isAgent}
      listBank={listBank}
      dataPost={dataPost}
      setDataPost={setDataPost}
    />
  ) : (
    <DesktopTopUp
      isAgent={isAgent}
      listBank={listBank}
      dataPost={dataPost}
      setDataPost={setDataPost}
    />
  );
};

export default TopUp;
