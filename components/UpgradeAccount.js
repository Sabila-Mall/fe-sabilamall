import {
  Box,
  Text,
  Stack,
  Flex,
  Spinner,
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
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import {
  getInvoiceUpgradeAkun,
  getUpgradeOptions,
  postUpgradeLevel,
} from "../api/users";
import { useAuthContext } from "../contexts/authProvider";
import { useWindowSize } from "../hooks/useWindowSize";
import styles2 from "../styles/InvoiceUpgradeTable.module.scss";
import styles from "../styles/UpgradeAccount.module.scss";
import { numberWithDot } from "../utils/functions";
import NavbarProfile from "./NavbarProfile";

export const UpgradeAccount = ({ isMobile, currentAccount }) => {
  const { userData } = useAuthContext();
  const userId = userData?.id;
  // const userId = 6089;
  const toast = useToast();

  const [value, setValue] = useState(currentAccount);
  const [dataInvoice, setDataInvoice] = useState(null);
  const [options, setOptions] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [tempValue, settempValue] = useState(value);
  const { width } = useWindowSize();
  const handleSubmit = () => {
    setLoadingBtn(true);

    postUpgradeLevel({
      customers_id: userId,
      level: Number(tempValue),
    })
      .then((res) => {
        console.log(res);
        toast({
          title: "Berhasil mengupgrade akun",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch(() =>
        toast({
          title: "Gagal mengupgrade akun",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        }),
      )
      .finally(() => setLoadingBtn(false));
  };

  useEffect(() => {
    const getInvoiceData = () => {
      setLoading(true);
      getInvoiceUpgradeAkun(userId)
        .then((res) => {
          if (Array.isArray(res) && res.length > 0)
            setDataInvoice([
              ...res?.map(
                ({
                  description,
                  invoiceid,
                  payment_status,
                  amount,
                  upgrades_date,
                }) => ({
                  description,
                  invoiceid,
                  payment_status,
                  amount,
                  upgrades_date,
                }),
              ),
            ]);

          getUpgradeOptions({
            user_id: userId,
          })
            .then((res) => {
              if (res && Array.isArray(res) && res.length > 0)
                setOptions([
                  ...res?.map(({ level_name, level_price, level_id }) => ({
                    name: level_name,
                    price: `Rp${level_price}`,
                    value: level_name,
                    level_id,
                  })),
                ]);
            })
            .catch(() => setOptions([]));
        })
        .catch(() => setDataInvoice(null))
        .finally(() => setLoading(false));
    };

    userId && getInvoiceData();
  }, [userId]);

  if (loading) {
    return (
      <Flex justify="center" align="center" h="100vh" w="full">
        <Spinner />
      </Flex>
    );
  }

  return (
    <Box mx={isMobile ? "5%" : "0"} pt={{ base: "3rem", md: "0" }}>
      {dataInvoice && (
        <>
          <Text
            fontSize="16px"
            lineHeight="150%"
            className="secondaryFont"
            fontWeight="500"
            mt="30px"
            mb="1rem"
            display={{ base: "none", md: "block" }}
          >
            Invoice Upgrade Level Member
          </Text>
          <Box
            overflowX={{ base: "scroll", lg: "auto" }}
            minW="100%"
            display={{ base: "none", md: "block" }}
          >
            <Box
              border="1px solid #CBD5E0"
              borderRadius="12px"
              overflow="hidden"
              minW="100%"
              width="fit-content"
              p="0.75rem"
              pb="0"
            >
              <Table variant="simple" className={styles2.invoiceTable}>
                <Thead>
                  <Tr>
                    {width >= 1200 ? (
                      <>
                        <Th>Invoice ID</Th>
                        <Th>
                          Tanggal <br /> Pesanan
                        </Th>
                        <Th>Deskripsi</Th>
                      </>
                    ) : (
                      <Th>Deskripsi</Th>
                    )}

                    <Th>
                      Jumlah <br /> Tagihan
                    </Th>
                    <Th>
                      Status <br /> Pembayaran
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataInvoice?.map(
                    ({
                      invoiceid,
                      upgrades_date,
                      description,
                      amount,
                      payment_status,
                    }) => (
                      <Tr>
                        {width >= 1200 ? (
                          <>
                            <Td>{invoiceid}</Td>
                            <Td>{upgrades_date}</Td>
                            <Td>{description}</Td>
                          </>
                        ) : (
                          <Td>
                            <Text fontWeight="bold" mb="0.5rem">
                              {invoiceid}
                            </Text>
                            <Text mb="0.25rem">{description}</Text>
                            <Text fontSize="0.75rem">{upgrades_date}</Text>
                          </Td>
                        )}
                        <Td>Rp{numberWithDot(amount)}</Td>
                        <Td>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems={{ base: "flex-start", lg: "center" }}
                            flexDirection={{ base: "column", lg: "row" }}
                          >
                            <Text
                              mr={{ base: 0, lg: "2rem" }}
                              mb={{ base: "1rem", lg: 0 }}
                            >
                              {payment_status}
                            </Text>
                            <ConfirmButton invoiceId={invoiceid} />
                          </Box>
                        </Td>
                      </Tr>
                    ),
                  )}
                </Tbody>
              </Table>
            </Box>
          </Box>{" "}
        </>
      )}

      <Text
        fontSize="16px"
        lineHeight="150%"
        className="secondaryFont"
        fontWeight="500"
        mt="30px"
        color={options.length === 0 ? "orange.500" : "black"}
      >
        {userData?.user_level?.toLowerCase() === "agent"
          ? "Akunmu sudah level tertinggi (Agen)!"
          : "Pilih level member yang ingin kamu ajukan"}
      </Text>

      {options.length === 0 ? (
        <Center mt={isMobile ? "50%" : "auto"}>
          <Image src="/images/agentAccount.svg" alt="" />
        </Center>
      ) : (
        <FormControl id="form">
          <RadioGroup pos="relative">
            <Stack mt="20px" spacing="16px">
              {options &&
                options.map((option) => {
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
                        value={option.level_id}
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
                            textTransform="capitalize"
                          >
                            {option.name}
                          </Text>
                          {/* <Text
                            pos="absolute"
                            right="32px"
                            className="secondaryFont"
                            fontSize="14px"
                            fontWeight="500"
                          >
                            {option.price}
                          </Text> */}
                        </Flex>
                        {!option.discount || option.discount === "" ? (
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
      {options.length !== 0 && (
        <Flex justify="flex-end" w="100%">
          <Button
            className="primaryFont"
            fontWeight="semibold"
            fontSize="15px"
            onClick={() => handleSubmit()}
            size="lg"
            w={isMobile ? "100%" : "25%"}
            ml="5%"
            mt={isMobile ? "2rem" : "72px"}
            mx={isMobile && "auto"}
            mb={isMobile && "2rem"}
            color="white"
            bg="orange.500"
            borderRadius="6px"
            _hover={{ bg: "orange.400" }}
            isLoading={loadingBtn}
          >
            {isMobile ? "Konfirmasi Pesanan" : "Konfirmasi"}
          </Button>
        </Flex>
      )}
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

const ConfirmButton = ({ invoiceId }) => {
  const router = useRouter();
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
      cursor="pointer"
      onClick={() => router.push(`konfirmasi-upgrade-akun/${invoiceId}`)}
    >
      Konfirmasi
    </Box>
  );
};
