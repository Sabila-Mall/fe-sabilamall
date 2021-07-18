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
} from "@chakra-ui/react";
import { FiChevronRight, FiSearch } from "react-icons/fi";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StokItem from "../../components/StokItem";
import { supplier, stocks } from "../../constants/stokData";

const Stok = () => {
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
          <Box w={{ base: "90%", lg: "80%" }}>
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
            w={{ base: "90%", lg: "80%" }}
            marginTop="2rem"
            d="flex"
            flexDir="row"
            justifyContent="space-between"
          >
            <Select placeholder="Cari supplier" w="30%">
              {supplier &&
                supplier.map((child) => {
                  return (
                    <option key={child} value={child}>
                      {child}
                    </option>
                  );
                })}
            </Select>
            <InputGroup w="69%">
              <InputLeftElement children={<FiSearch color="red.500" />} />
              <Input placeholder="Cari produk" fontSize="sm" />
            </InputGroup>
          </Box>
          <Box
            mb="2rem"
            w={{ base: "90%", lg: "80%" }}
            marginTop="1rem"
            d="flex"
            flexDir="column"
            justifyContent="space-between"
          >
            {stocks &&
              stocks.map((stock) => {
                return (
                  <StokItem
                    img={stock.img}
                    nama={stock.nama}
                    supplier={stock.supplier}
                    tag={stock.tag}
                    variant={stock.variant}
                  />
                );
              })}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Stok;
