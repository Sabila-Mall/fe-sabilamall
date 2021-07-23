import {
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
  Select,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  Img,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiChevronRight, FiSearch } from "react-icons/fi";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StokItem from "../../components/StokItem";
import { supplier, stocks } from "../../constants/stokData";

const Stok = () => {
  const [supplierFilter, setSupplierFilter] = useState("");
  const [nameSearch, setNameSearch] = useState("");

  return (
    <>
      <Navbar />
      <Box d="flex" justifyContent="center">
        <Box
          as="main"
          pt={{ base: "51px", md: "71px" }}
          overflow="hidden"
          d="flex"
          flexDir="column"
          alignItems="center"
          w="100%"
          maxW="1536px"
          mt="2rem"
        >
          <Box w={{ base: "90%", md: "80%" }}>
            <Breadcrumb
              spacing="8px"
              separator={<FiChevronRight color="gray.500" />}
              fontSize={{ base: "sm", md: "md" }}
            >
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="#">
                  <Text className="secondaryFont" fontWeight="500">
                    Home
                  </Text>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="#">
                  <Text
                    className="primaryFont"
                    color="orange.400"
                    fontWeight="700"
                  >
                    Data Stok
                  </Text>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
          <Box
            w={{ base: "90%", md: "80%" }}
            marginTop="2rem"
            d="flex"
            flexDir={{ base: "column", md: "row" }}
            justifyContent="space-between"
          >
            <Select
              placeholder="Cari supplier"
              w={{ base: "100%", md: "30%" }}
              onChange={(e) => setSupplierFilter(e.target.value)}
            >
              {supplier &&
                supplier.map((child) => {
                  return (
                    <option key={child} value={child}>
                      {child}
                    </option>
                  );
                })}
            </Select>
            <InputGroup
              w={{ base: "100%", md: "69%" }}
              mt={{ base: "1rem", md: "0rem" }}
            >
              <InputLeftElement children={<FiSearch color="red.500" />} />
              <Input
                placeholder="Cari produk"
                fontSize="sm"
                onChange={(e) => setNameSearch(e.target.value)}
              />
            </InputGroup>
          </Box>
          <Box
            mb="2rem"
            w={{ base: "90%", md: "80%" }}
            marginTop="1rem"
            d="flex"
            flexDir="column"
            justifyContent="space-between"
          >
            {!(nameSearch === "" && supplierFilter === "") &&
              stocks &&
              stocks.map((stock) => {
                if (
                  stock.nama.toLowerCase().includes(nameSearch.toLowerCase()) &&
                  stock.supplier
                    .toLowerCase()
                    .includes(supplierFilter.toLowerCase())
                ) {
                  return (
                    <StokItem
                      img={stock.img}
                      nama={stock.nama}
                      supplier={stock.supplier}
                      tag={stock.tag}
                      variant={stock.variant}
                    />
                  );
                }
              })}
            {nameSearch === "" && supplierFilter === "" && (
              <Flex
                border="1px"
                borderColor="gray.300"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                py="1.5rem"
                borderRadius="md"
              >
                <Img src="/images/9.svg" boxSize="20rem" />
                <Text
                  color="gray.500"
                  w={{ base: "28ch", md: "50ch" }}
                  textAlign="center"
                  className="secondaryFont"
                >
                  Silakan pilih supplier atau cari berdasarkan nama produk untuk
                  melihat data stok yang tersedia.
                </Text>
              </Flex>
            )}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Stok;
