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
import { useEffect } from "react";

import NavbarProfile from "../../components/NavbarProfile";
import { useWindowSize } from "../../hooks/useWindowSize";
import styles from "../../styles/InvoiceUpgradeTable.module.scss";

const InvoiceUpgradeAkunMobile = () => {
  const { width } = useWindowSize();
  const router = useRouter();

  useEffect(() => {
    if (width >= 768) router.push("/profile/upgrade-account");
  }, [width]);

  return (
    <Box display={{ base: "block", md: "none" }} h="100vh">
      <NavbarProfile section={"Invoice Upgrade Akun"} />
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
              <Tr>
                <Td>
                  <Radio
                    borderColor="gray.400"
                    colorScheme="gray"
                    value="0"
                    name="invoice"
                  ></Radio>
                </Td>
                <Td>
                  <Text fontWeight="bold" fontSize="0.7rem" mb="0.5rem">
                    UO121212
                  </Text>
                  <Text mb="0.25rem">Upgrade to Reseller</Text>
                  <Text fontSize="0.6rem">4 Juli 2021</Text>
                </Td>
                <Td>Rp9.999.999</Td>
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
                      Pending
                    </Text>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Radio
                    borderColor="gray.400"
                    colorScheme="gray"
                    value="1"
                    name="invoice"
                  ></Radio>
                </Td>
                <Td>
                  <Text fontWeight="bold" fontSize="0.7rem" mb="0.5rem">
                    UO121212
                  </Text>
                  <Text mb="0.25rem">Upgrade to Reseller</Text>
                  <Text fontSize="0.6rem">4 Juli 2021</Text>
                </Td>
                <Td>Rp9.999.999</Td>
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
                      Pending
                    </Text>
                  </Box>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
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
      >
        Konfirmasi Pembayaran
      </Button>
    </Box>
  );
};

export default InvoiceUpgradeAkunMobile;
