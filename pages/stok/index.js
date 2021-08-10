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
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FiChevronRight, FiSearch } from "react-icons/fi";

import { apiGetProduct, apiGetProductBrand } from "../../api/GetProduct";
import { apiStock } from "../../api/Stock";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StokItem from "../../components/StokItem";
import { stocks } from "../../constants/stokData";
import { getImageUrl } from "../../utils/api";

const Stok = () => {
  const [supplierFilter, setSupplierFilter] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [supplier, setSupplier] = useState([]);
  const [brandId, setBrandId] = useState(0);
  const [products, setProducts] = useState(true);
  const [stocks, setStocks] = useState([]);
  const [firstTime, setFirstTime] = useState(true);
  const [supplierName, setSupplierName] = useState("");

  useEffect(() => {
    apiGetProduct().then((res) => {
      let d = res.data.data;
      setSupplier(d);
    });
  }, []);

  useEffect(() => {
    if (brandId != 0) {
      apiGetProductBrand(brandId).then((res) => {
        let d = res.data.data.data;
        if (d.length != 0) {
          setProducts(true);
          d.map((product) => {
            apiStock(product.id).then(async (res) => {
              const data = res.data;
              const listWarna = Object.keys(data);

              let variant = [];

              listWarna.map((warna) => {
                let ukuran = [];
                let stok = [];

                data[warna].map((el) => {
                  ukuran.push(el.ukuran);
                  stok.push(el.stock);
                });

                let ob = {
                  warna: warna,
                  ukuran: ukuran,
                  stok: stok,
                };
                variant.push(ob);
              });

              let stocksPush = {
                img: getImageUrl(product.image_path),
                nama: product.name,
                supplier: supplierName,
                tag: product.jenis,
                variant: variant,
              };

              setStocks((curr) => [...curr, stocksPush]);
            });
          });
        } else {
          setProducts(false);
        }
      });
    }
  }, [brandId]);

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
                <BreadcrumbLink as={Link} to="/">
                  <Text className="secondaryFont" fontWeight="500">
                    Home
                  </Text>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/stok">
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
              placeholder={firstTime && "Cari supplier"}
              w={{ base: "100%", md: "30%" }}
              onChange={(e) => {
                let split = e.target.value.split(" ");
                setBrandId(Number(split[0]));
                setSupplierName(split[1]);
                setFirstTime(false);
                setStocks([]);
              }}
            >
              {supplier.length != 0 ? (
                supplier.map((child) => {
                  return (
                    <option key={child.id} value={`${child.id} ${child.name}`}>
                      {child.name}
                    </option>
                  );
                })
              ) : (
                <option key={"loading"} value={"loading"}>
                  {"Loading..."}
                </option>
              )}
            </Select>
            <InputGroup
              w={{ base: "100%", md: "69%" }}
              mt={{ base: "1rem", md: "0rem" }}
            >
              <InputLeftElement children={<FiSearch color="red.500" />} />
              <Input
                disabled={firstTime}
                placeholder="Cari produk"
                fontSize="sm"
                onChange={(e) => {
                  setNameSearch(e.target.value);
                }}
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
            {stocks.length != 0 ? (
              stocks.map((stock) => {
                if (
                  stock.nama.toLowerCase().includes(nameSearch.toLowerCase()) &&
                  stock.supplier
                    .toLowerCase()
                    .includes(supplierFilter.toLowerCase())
                ) {
                  return (
                    <StokItem
                      link={"/product-details"}
                      img={stock.img}
                      nama={stock.nama}
                      supplier={stock.supplier}
                      tag={stock.tag}
                      variant={stock.variant}
                    />
                  );
                }
              })
            ) : !firstTime && products ? (
              <Spinner />
            ) : (
              !products && <h1>Tidak ada produk</h1>
            )}
            {firstTime && (
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
                  Silakan pilih supplier berdasarkan nama produk untuk melihat
                  data stok yang tersedia.
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
