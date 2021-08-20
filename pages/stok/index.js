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
import { Layout } from "../../components/Layout";
import Navbar from "../../components/Navbar";
import StokItem from "../../components/StokItem";
import { stocks } from "../../constants/stokData";
import { getImageUrl } from "../../utils/api";

const path = [
  {
    name: "Stok",
    link: "/stok",
    isOnPage: true,
  },
];
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
    <Layout hasNavbar hasPadding hasBreadCrumb breadCrumbItem={path}>
      <Box d="flex" justifyContent="center">
        <Box
          as="main"
          overflow="hidden"
          d="flex"
          flexDir="column"
          alignItems="center"
          w="full"
        >
          <Box
            w="full"
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
            w="full"
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
                  w={{ base: "26ch", md: "50ch" }}
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
    </Layout>
  );
};

export default Stok;
