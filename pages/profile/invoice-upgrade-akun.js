import {
  Box,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  Radio,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { getInvoiceUpgradeAkun } from "../../api/users";
import Loading from "../../components/Loading";
import NavbarProfile from "../../components/NavbarProfile";
import { useAuthContext } from "../../contexts/authProvider";
import { useWindowSize } from "../../hooks/useWindowSize";
import styles from "../../styles/InvoiceUpgradeTable.module.scss";

const InvoiceUpgradeAkunMobile = () => {
  const { userData } = useAuthContext();
  const userId = userData?.id;
  const router = useRouter();

  const [dataInvoice, setDataInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { register, getValues, trigger } = useForm();
  const { width } = useWindowSize();

  useEffect(() => {
    const getInvoiceData = () => {
      getInvoiceUpgradeAkun(userId)
        .then((res) => {
          if (res && Array.isArray(res) && res.length > 0)
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
        })
        .finally(() => setLoading(false));
    };
    userId && getInvoiceData();
  }, [userId]);

  useEffect(() => {
    if (width >= 768) router.push("/profile/upgrade-account");
  }, [width]);

  if (loading) {
    return <Loading />;
  }

  if (!loading && !dataInvoice) {
    router.push("/404");
  }

  const handleSubmit = async () => {
    setLoadingBtn(true);
    if (!(await trigger())) return setLoadingBtn(false);

    router.push(`/profile/konfirmasi-upgrade-akun/${getValues().invoice}`);
    setLoadingBtn(false);
  };

  return (
    <Box display={{ base: "block", md: "none" }} h="100vh">
      <NavbarProfile section={"Invoice Upgrade Akun"} />
      {dataInvoice && (
        <Box pt="5rem" px="1rem">
          <Text
            fontFamily="Inter"
            fontWeight="500"
            fontSize="1rem"
            lineHeight="150%"
            mb="1rem"
          >
            Invoice Upgrade Level Member
          </Text>
          <Box
            bg="white"
            borderWidth="1px"
            borderColor="gray.400"
            borderRadius="12px"
            p="0.25rem"
          >
            <Table
              variant="simple"
              className={`${styles.invoiceTable} ${styles.invoiceTableMobile}`}
            >
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Deskripsi</Th>
                  <Th>
                    Jumlah <br /> Tagihan
                  </Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataInvoice?.map(
                  ({
                    description,
                    invoiceid,
                    payment_status,
                    amount,
                    upgrades_date,
                  }) => (
                    <Tr>
                      <Td>
                        <Radio
                          borderColor="gray.400"
                          colorScheme="gray"
                          value={invoiceid}
                          name="invoice"
                          {...register("invoice", { required: true })}
                        ></Radio>
                      </Td>
                      <Td>
                        <Text fontWeight="bold" fontSize="0.7rem" mb="0.5rem">
                          {invoiceid}
                        </Text>
                        <Text mb="0.25rem">{description}</Text>
                        <Text fontSize="0.6rem">{upgrades_date}</Text>
                      </Td>
                      <Td>Rp{amount}</Td>
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
                        </Box>
                      </Td>
                    </Tr>
                  ),
                )}
              </Tbody>
            </Table>
          </Box>
        </Box>
      )}
      <Button
        className="primaryFont"
        fontWeight="700"
        fontSize="1rem"
        onClick={() => handleSubmit()}
        size="lg"
        w="90%"
        ml="5%"
        color="white"
        bg="orange.500"
        pos="absolute"
        bottom="1rem"
        borderRadius="6px"
        _hover={{ bg: "orange.400" }}
        isLoading={loadingBtn}
      >
        Konfirmasi Pembayaran
      </Button>
    </Box>
  );
};

export default InvoiceUpgradeAkunMobile;
