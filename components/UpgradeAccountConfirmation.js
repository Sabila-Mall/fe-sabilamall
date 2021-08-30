import {
  Box,
  Flex,
  Text,
  Button,
  Grid,
  Input,
  Select,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { getAllBanks } from "../api/banks";
import { getInvoiceUpgradeAkun, upgradeConfirmation } from "../api/users";
import { useAuthContext } from "../contexts/authProvider";
import NavbarProfile from "./NavbarProfile";

const KonfirmasiUpgradeAkun = ({ isMobile }) => {
  const { userData } = useAuthContext();
  const userId = userData?.id;
  // const userId = 6089;
  const memberId = userData?.memberid;

  const toast = useToast();

  const { register, getValues, trigger } = useForm();

  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const router = useRouter();
  const invoiceid = router.query?.invoiceId;

  useEffect(() => {
    const getData = () => {
      getAllBanks({ action: "forconfirmation" }).then((res) => {
        if (res) setBanks([...res?.banktujuan.map((d) => d)]);
      });

      getInvoiceUpgradeAkun(userId).then((res) => {
        setInvoice(res.find((d) => d.invoiceid === invoiceid));
      });
    };

    userId && getData();
  }, [userId]);

  if (!invoice)
    return (
      <Flex justify="center" align="center" h="100vh" w="full">
        <Spinner />
      </Flex>
    );

  const handleSubmit = async () => {
    if (!(await trigger())) {
      return toast({
        title: "Konfirmasi Gagal",
        description: "Silakan isi semua field",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setLoadingBtn(true);
    upgradeConfirmation({ ...getValues(), invoice: invoiceid })
      .then(() =>
        toast({
          title: "Konfirmasi Berhasil",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        }),
      )
      .catch(() =>
        toast({
          title: "Konfirmasi Gagal",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        }),
      )
      .finally(() => setLoadingBtn(false));
  };
  return (
    <>
      <Box
        h={{ base: "100vh", md: "fit-content" }}
        bgColor={{ base: "gray.50", md: "white" }}
        position="relative"
      >
        {isMobile ? <NavbarProfile section={"Upgrade Akun"} /> : <></>}

        <Box pt={{ base: "5rem", md: "0" }} px={{ base: "1rem", md: "0" }}>
          {isMobile ? (
            <Text
              className="primaryFont"
              fontWeight="700"
              fontSize="20px"
              lineHeight="26px"
              color="black"
            >
              Konfirmasi Pembayaran Upgrade
            </Text>
          ) : (
            <></>
          )}

          <Box
            border="1px solid #CBD5E0"
            borderRadius="8px"
            mt="24px"
            p="12px"
            className="secondaryFont"
            fontSize="0.75em"
            fontWeight="500"
            lineHeight="150%"
            color="black"
          >
            <Flex>
              <Text minW="115px">Member ID</Text>
              <Text>{memberId}</Text>
            </Flex>
            <Flex>
              <Text minW="115px">Invoice ID</Text>
              <Text>{invoiceid}</Text>
            </Flex>
            <Flex>
              <Text minW="115px">Tanggal Pesanan</Text>
              <Text>
                {invoice?.upgrades_date
                  ?.split(" ")[0]
                  .split("-")
                  .reverse()
                  .join("/")}
              </Text>
            </Flex>
            <Flex>
              <Text minW="115px">Deskripsi</Text>
              <Text>{invoice.description}</Text>
            </Flex>
            <Flex>
              <Text minW="115px">Jumlah Tagihan</Text>
              <Text>{`Rp${invoice.amount}`}</Text>
            </Flex>
          </Box>
        </Box>
        <Grid
          px={{ base: "1rem", md: "0" }}
          templateColumns={{ base: "repeat(1. 1fr)", md: "repeat(2, 1fr)" }}
          mt="24px"
          gap={{ base: "8px", md: "24px" }}
        >
          <Box>
            <Text
              className="secondaryFont"
              fontWeight="500"
              fontSize="0.875em"
              lineHeight="150%"
              color="black"
            >
              Bank Tujuan
            </Text>
            <Select
              placeholder="Pilih Bank"
              {...register("bank", { required: true })}
            >
              {banks.map(({ bankid, namabank }) => (
                <option value={bankid}>{namabank}</option>
              ))}
            </Select>
            {/* <Input
              placeholder="Masukkan nama awal penerima"
              color="#CBD5E0"
              bgColor="white"
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
            /> */}
          </Box>
          <Box>
            <Text
              className="secondaryFont"
              fontWeight="500"
              fontSize="0.875em"
              lineHeight="150%"
              color="black"
            >
              Tanggal Transfer
            </Text>
            <Input
              placeholder="Tanggal Transfer"
              bgColor="white"
              type="date"
              {...register("tgl", { required: true })}
            />
          </Box>
        </Grid>
        <Button
          className="primaryFont"
          fontWeight="700"
          fontSize="1rem"
          onClick={() => handleSubmit()}
          p={{ base: "15px", md: "12.5px 24px" }}
          mx={{ base: "5%", md: "0" }}
          w={{ base: "90%", md: "fit-content" }}
          color="white"
          bg="orange.500"
          pos="absolute"
          right="0"
          bottom={{ base: "1rem", md: "-5rem" }}
          borderRadius={{ base: "20px", md: "6px" }}
          _hover={{ bg: "orange.400" }}
          isLoading={loadingBtn}
        >
          Konfirmasi
        </Button>
      </Box>
    </>
  );
};

export default KonfirmasiUpgradeAkun;
