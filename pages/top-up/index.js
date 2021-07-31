import {
  Alert, AlertDescription, AlertIcon,
  Avatar, AvatarBadge, Center, CloseButton,
  Flex,
  Heading, Icon, Image,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Select, SimpleGrid, Square,
  Stack, StackDivider,
  Tab,
  TabList, TabPanel, TabPanels,
  Tabs, Text,
} from "@chakra-ui/react";
import { Input, InputGroup } from "@chakra-ui/input";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useState } from "react";
import { IoHeart, IoWalletOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { VscPackage } from "react-icons/vsc";
import Navbar from "../../components/Navbar";

// Dummy data
const listBankTujuan = [
  {
    "id": "bca",
    "nama": "BCA",
  },
  {
    "id": "bni",
    "nama": "BNI",
  },
  {
    "id": "jenius",
    "nama": "JENIUS",
  },
  {
    "id": "bri",
    "nama": "BRi",
  },
  {
    "id": "btpn",
    "nama": "BTPN",
  },
];

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

const userData = {
  "nama": "Litha Cantik",
  "email": "zulmusuydu@biyac.com",
  "memberId": "1234567",
  "tipe": "Reguler",
  "SMPay": 100000000,
  "SMPoint": 5,
};

const VERSI = "9.99.99";

const Nominal = ({ nominal, setNominal }) => {
  return (
    <VStack spacing={"0.5rem"} w={"full"} align={"start"}>
      <Text>Nominal</Text>
      <Text>Minimal Rp10.000</Text>
      <InputGroup>
        <InputLeftAddon children={"Rp"} />
        <NumberInput
          value={nominal} min={10000} keepWithinRange={false} clampValueOnBlur={false}
          onChange={(value) => setNominal(value)}
        >
          <NumberInputField />
        </NumberInput>
      </InputGroup>
      <HStack>
        <Button onClick={() => setNominal(20000)}>Rp20.000</Button>
        <Button onClick={() => setNominal(50000)}>Rp50.000</Button>
        <Button onClick={() => setNominal(100000)}>Rp100.000</Button>
        <Button onClick={() => setNominal(500000)}>Rp500.000</Button>
        <Button onClick={() => setNominal(1000000)}>Rp1.000.000</Button>
      </HStack>
    </VStack>
  );
};

const BankTujuan = () => {
  return (
    <VStack spacing={"0.5rem"} w={"full"} align={"start"}>
      <Text>Bank Tujuan</Text>
      <Select>
        {
          listBankTujuan.map((each, index) =>
            <option key={index} id={each.id}>{each.nama}</option>,
          )
        }
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
      <Input placeholder={"Masukan Nama Bank Pengirim"}/>
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
    <Button background={"orange.500"} color={"white"}>Konfirmasi</Button>
  );
};

const Entry = ({ data }) => {
  return (
    <Flex justify={"space-between"}>
      <Box>
        <Text>{data.nama}</Text>
        <Text>{data.tanggal}</Text>
        <Text>kode: {data.kode}</Text>
      </Box>

      <Box>
        <Text>+Rp{data.harga}</Text>
        <Text>{data.status}</Text>
      </Box>
    </Flex>
  );
};

const SidePanel = ({ userData }) => {
  return (
    <VStack spacing={"3rem"} borderRadius={"1.25rem"} background={"green"} py={"1.125rem"}>
      <VStack p={"1.125rem"}>
        <Avatar size={"xl"}>
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
        <Text>{userData.nama}</Text>
        <Text>{userData.email}</Text>
        <HStack>
          <Text>{userData.memberId}</Text>
          <Square bg={"gray.40"} borderRadius={"1.875rem"}>{userData.tipe}</Square>
        </HStack>
      </VStack>

      <SimpleGrid columns={2} px={"2rem"}>
        <VStack borderRadius={"0.5rem"}>
          <Center bg={"gray.100"} color={"orange.500"}>SM Pay</Center>
          <Center bg={"gray.50"}>Rp{userData.SMPay}</Center>
        </VStack>

        <VStack>
          <Square bg={"gray.100"} color={"orange.500"}>SM Point</Square>
          <Text bg={"gray.50"}>{userData.SMPoint}</Text>
        </VStack>
      </SimpleGrid>

      <Box alignSelf={"stretch"}>
        <HStack py={"0.5rem"} borderColor={"gray.200"} borderTopWidth={"1px"} borderBottomWidth={"1px"}
                paddingLeft={"1rem"}>
          <Icon as={FaUser} />
          <Text>Akun Saya</Text>
        </HStack>

        <HStack py={"0.5rem"} borderTopWidth={"1px"} borderBottomWidth={"1px"} paddingLeft={"1rem"}>
          <Icon as={IoHeart} />
          <Text>Wishlist</Text>
        </HStack>

        <HStack py={"0.5rem"} borderTopWidth={"1px"} borderBottomWidth={"1px"} paddingLeft={"1rem"}>
          <Icon as={VscPackage} />
          <Text>Pesanan saya</Text>
        </HStack>

        <HStack py={"0.5rem"} borderTopWidth={"1px"} borderBottomWidth={"1px"} paddingLeft={"1rem"}>
          <Icon as={IoWalletOutline} />
          <Text>SM Pay</Text>
        </HStack>
      </Box>

      <Text>Sabilla Mall v{VERSI}</Text>
    </VStack>
  );
};

const TopUp = () => {
  const [nominal, setNominal] = useState(10000);

  return (
    <>
      <Navbar />
      <Stack
        direction={"row"} background={"gray.50"} mt={"7.5rem"} ml={"7.5rem"}
        spacing={"1rem"} align={"start"}
      >
        <SidePanel userData={userData} />

        <VStack background={"white"} px={"4rem"} py={"2rem"} borderRadius={"1.25rem"}>
          <Tabs colorScheme={"orange"}>
            <TabList>
              <Tab>Top Up</Tab>
              <Tab>Riwayat</Tab>
              <Tab>Daftar Top Up</Tab>
            </TabList>

            <TabPanels>
              <TabPanel as={VStack} spacing={"3rem"} align={"start"}>
                {
                  nominal < 10000 &&
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>Nominal Top Up Minimal Rp10.000</AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" />
                  </Alert>
                }
                <Heading>Top Up</Heading>
                <Nominal nominal={nominal} setNominal={setNominal} />
                <BankTujuan />
                <TanggalTransfer />
                <NamaBankPengirim />
                <NamaPemilikRekening />
                <Konfirmasi />
                <HStack mt={"1.125rem"}>
                  <Text>Ingin upgrade akun untuk berjualan?</Text>
                  <Button variant={"outline"} color={"red.600"}>
                    Upgrade Akun
                  </Button>
                </HStack>
              </TabPanel>
              <TabPanel>
                <Heading>Riwayat</Heading>
                <VStack
                  align={"start"} mt={"2rem"} spacing={"1.5rem"}
                  divider={<StackDivider borderColor={"gray.200"} />}
                >
                  {
                    !listRiwayat.length ?
                      <VStack>
                        <Text>Belum ada riwayat transaksi</Text>
                        <Image
                          objectFit="cover"
                          src="https://bit.ly/dan-abramov"
                          alt="Riwayat kosong logo"
                        />
                      </VStack> :
                      listRiwayat.map((topUp) =>
                      <Entry data={topUp} />,
                    )
                  }
                </VStack>
                <HStack>
                  <Text>Ingin upgrade akun untuk berjualan?</Text>
                  <Button variant={"outline"} color={"red.600"}>
                    Upgrade Akun
                  </Button>
                </HStack>
              </TabPanel>
              <TabPanel>
                <Heading>Daftar Top Up</Heading>
                <VStack
                  align={"start"} mt={"2rem"} spacing={"1.5rem"}
                  divider={<StackDivider borderColor={"gray.200"} />}
                >
                  {
                    listTopUp.map((topUp) =>
                      <Entry data={topUp} />,
                    )
                  }
                </VStack>
                <HStack mt={"1.125rem"}>
                  <Text>Ingin upgrade akun untuk berjualan?</Text>
                  <Button variant={"outline"} color={"red.600"}>
                    Upgrade Akun
                  </Button>
                </HStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Stack>
    </>
  );
};

export default TopUp;
