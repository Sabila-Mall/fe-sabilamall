import {
  Box,
  Text,
  Stack,
  Flex,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  Center,
  Image,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useState } from "react";

import styles from "../styles/UpgradeAccount.module.scss";
import NavbarProfile from "./NavbarProfile";

const TH_PROPERTIES = {
  fontFamily: "Work Sans",
  color: "black",
  fontWeight: "bold",
  fontSize: "14px",
  p: "1rem 0.75rem",
};

const TD_PROPERTIES = {
  p: "1rem 0.75rem",
  fontFamily: "Inter",
  fontWeight: "500",
  fontSize: "14px",
};

export const UpgradeAccount = ({ isMobile, currentAccount }) => {
  const [value, setValue] = useState(currentAccount);
  const [tempValue, settempValue] = useState(value);

  const handleSubmit = () => {
    console.log(tempValue);
    // setValue(tempValue)
  };

  const options = [
    {
      name: "Agen",
      value: "agen",
      price: "Rp 2.005.749",
      discount: "30%",
    },
    {
      name: "Reseller",
      value: "reseller",
      price: "Rp 505.749",
      discount: "20%",
    },
  ];

  return (
    <Box mx={isMobile ? "5%" : "0"}>
      <Text
        fontSize="16px"
        lineHeight="150%"
        className="secondaryFont"
        fontWeight="500"
        mt="30px"
        mb="1rem"
      >
        Invoice Upgrade Level Member
      </Text>
      <Box overflowX={{ base: "scroll", lg: "auto" }} minW="100%">
        <Box
          border="1px solid #CBD5E0"
          borderRadius="12px"
          overflow="hidden"
          minW="100%"
          width="fit-content"
          p="0.75rem"
          pb="0"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th {...TH_PROPERTIES}>Invoice ID</Th>
                <Th {...TH_PROPERTIES}>
                  Tanggal <br /> Pesanan
                </Th>
                <Th {...TH_PROPERTIES}>Deskripsi</Th>
                <Th {...TH_PROPERTIES}>
                  Jumlah <br /> Tagihan
                </Th>
                <Th {...TH_PROPERTIES}>
                  Status <br /> Pembayaran
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td {...TD_PROPERTIES}>UO121212</Td>
                <Td {...TD_PROPERTIES}>4 Juli 2021</Td>
                <Td {...TD_PROPERTIES}>Upgrade to Reseller</Td>
                <Td {...TD_PROPERTIES}>Rp9.999.999</Td>
                <Td {...TD_PROPERTIES}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text mr="2rem">Pending</Text>
                    <ConfirmButton />
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td {...TD_PROPERTIES}>UO121212</Td>
                <Td {...TD_PROPERTIES}>4 Juli 2021</Td>
                <Td {...TD_PROPERTIES}>Upgrade to Reseller</Td>
                <Td {...TD_PROPERTIES}>Rp9.999.999</Td>
                <Td {...TD_PROPERTIES}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text mr="2rem">Pending</Text>
                    <ConfirmButton />
                  </Box>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>

      <Text
        fontSize="16px"
        lineHeight="150%"
        className="secondaryFont"
        fontWeight="500"
        mt="30px"
        color={value === "agen" ? "orange.500" : "black"}
      >
        {value === "agen"
          ? "Akunmu sudah level tertinggi (Agen)!"
          : "Pilih level member yang ingin kamu ajukan"}
      </Text>

      {value === "agen" ? (
        <Center mt={isMobile ? "50%" : "auto"}>
          <Image src="/images/agentAccount.svg" alt="" />
        </Center>
      ) : (
        <FormControl id="form">
          <RadioGroup pos="relative">
            <Stack mt="20px" spacing="16px">
              {options.map((option) => {
                return (
                  <Box
                    key={option.value}
                    border="2px solid #A0AEC0"
                    borderRadius="20px"
                    _focusWithin={{ borderColor: "orange.500" }}
                    onClick={(e) => settempValue(e.target.value)}
                    className={styles.radioCard}
                  >
                    <Radio
                      value={option.value}
                      p="32px 16px"
                      w="100%"
                      h="100%"
                      _checked={{ bg: "orange.500" }}
                      transform="translateY(-12px)"
                    >
                      <Flex>
                        <Text
                          fontSize="16px"
                          className="primaryFont"
                          fontWeight="bold"
                          color="orange.500"
                        >
                          {option.name}
                        </Text>
                        <Text
                          pos="absolute"
                          right="32px"
                          className="secondaryFont"
                          fontSize="14px"
                          fontWeight="500"
                        >
                          {option.price}
                        </Text>
                      </Flex>
                      {option.discount === "" ? (
                        ""
                      ) : (
                        <Text
                          fontSize="14px"
                          className="secondaryFont"
                          fontWeight="500"
                          mt="6px"
                        >
                          {`Diskon hingga ${option.discount}`}
                        </Text>
                      )}
                    </Radio>
                  </Box>
                );
              })}
            </Stack>
          </RadioGroup>
        </FormControl>
      )}
      <Flex justify="flex-end" w="100%">
        <Button
          className="primaryFont"
          fontWeight="700"
          fontSize="18px"
          onClick={() => handleSubmit()}
          size="lg"
          w={isMobile ? "90%" : "25%"}
          ml="5%"
          mt={isMobile ? "" : "72px"}
          color="white"
          bg="orange.500"
          pos={isMobile ? "absolute" : ""}
          bottom={isMobile ? "36px" : ""}
          borderRadius={isMobile ? "20px" : "6px"}
          _hover={{ bg: "orange.400" }}
        >
          {isMobile ? "Konfirmasi Pesanan" : "Konfirmasi"}
        </Button>
      </Flex>
    </Box>
  );
};

export const UpgradeAccountMobile = () => (
  <Box display={{ base: "block", md: "none" }}>
    <NavbarProfile section={"Upgrade Akun"} />
    <Box>
      <UpgradeAccount isMobile={true} mt="16px" />
    </Box>
  </Box>
);

const ConfirmButton = () => {
  return (
    <Box
      px="0.5rem"
      py="0.2rem"
      borderRadius="0.25rem"
      border="1px solid #DD6B20"
      color="orange.500"
      fontFamily="Work Sans"
      fontSize="12px"
      fontWeight="bold"
    >
      Konfirmasi
    </Box>
  );
};
