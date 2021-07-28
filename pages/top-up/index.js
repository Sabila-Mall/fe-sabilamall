import {
  Heading,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  Tab,
  TabList, TabPanel, TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Input, InputGroup } from "@chakra-ui/input";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useState } from "react";

// Helper function
const formatNumber = () => {

};

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
    "namaBank": "Bank BNI",
  },
];

const Nominal = () => {
  const [nominal, setNominal] = useState(10000);
  return (
    <VStack spacing={"0.5rem"} align={"start"}>
      <Heading>Nominal</Heading>
      <InputGroup>
        <InputLeftAddon children={"Rp"} />
        <NumberInput defaultValue={10000} min={10000}>
          <NumberInputField value={nominal} />
        </NumberInput>
      </InputGroup>
      <HStack>
        <Button onClick={() => setNominal(10000)}>Rp20.000</Button>
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
    <VStack spacing={"0.5rem"}>
      <Heading>Bank Tujuan</Heading>
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
    <VStack spacing={"0.5rem"}>
      <Heading>Tanggal Transfer</Heading>
      <Input placeholder={"Masukan tanggal"} type={"date"} />
    </VStack>
  );
};

const NamaBankPengirim = () => {
  return (
    <VStack spacing={"0.5rem"}>
      <Heading>Nama Bank Pengirim</Heading>
      <Input placeholder={"Masukan Nama Bank Pengirim"} />
    </VStack>
  );
};

const NamaPemilikRekening = () => {
  return (
    <VStack spacing={"0.5rem"}>
      <Heading>Nama Pemilik Rekening</Heading>
      <Input placeholder={"Masukan Nama Pemilik Rekening"} />
    </VStack>
  );
};

const Konfirmasi = () => {
  return (
    <Button background={"orange.500"} color={"white"}>Konfirmasi</Button>
  );
};

const TopUp = () => {
  return (
    <Stack direction={"horizontal"} background={"gray.50"}>
      <VStack>

      </VStack>

      <VStack background={"white"} p={"4rem"}>
        <Tabs>
          <TabList>
            <Tab>Top Up</Tab>
            <Tab>Riwayat</Tab>
            <Tab>Daftar Top Up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel as={VStack} spacing={"3rem"} align={"start"}>
              <Heading>Top Up</Heading>
              <Nominal />
              <BankTujuan />
              <TanggalTransfer />
              <NamaBankPengirim />
              <NamaPemilikRekening />
              <Konfirmasi />
            </TabPanel>
            <TabPanel>
              <Heading>Riwayat</Heading>
            </TabPanel>
            <TabPanel>
              <Heading>Daftar Top Up</Heading>
              <VStack>
                {
                  listTopUp.map((topUp, index) => {

                  })
                }
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Stack>
  );
};

export default TopUp;
