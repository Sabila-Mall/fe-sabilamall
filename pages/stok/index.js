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

import {
  apiGetProduct,
  apiGetProductBrand,
  apiGetProductBrandPage,
} from "../../api/GetProduct";
import { apiStock } from "../../api/Stock";
import Footer from "../../components/Footer";
import { Layout } from "../../components/Layout";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import StokItem from "../../components/StokItem";
import { stocks } from "../../constants/stokData";
import { fetchingStock } from "../../utils/stok/fetchStock";

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
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [firstTime, setFirstTime] = useState(true);
  const [supplierName, setSupplierName] = useState("");
  const [data, setData] = useState([]);
  const [totalProduct, setTotalProduct] = useState(-1);
  const [noProduct, setNoProduct] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [range, setRange] = useState([]);

  const objToArray = (d) => {
    if (typeof d === "object") {
      const key = Object.keys(d);
      let temp = [];
      key.map((k) => {
        temp.push(d[k]);
      });
      d = temp;
    }
    return d;
  };

  useEffect(() => {
    apiGetProduct().then((res) => {
      let d = res.data.data;
      setSupplier(d);
    });
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      let dataArray = objToArray(data);
      dataArray.map((product) => {
        try {
          const stocksPush = fetchingStock(product, supplierName);
          setStocks((curr) => [...curr, stocksPush]);
          setLoading(false);
        } catch (err) {
          () => {
            console.log(err);
          };
        }
      });
    }
  }, [data]);

  // fetch stock here
  useEffect(() => {
    if (brandId != 0) {
      setLoading(true);
      setStocks([]);
      setData([]);
      apiGetProductBrandPage(brandId, currPage).then((res) => {
        let d = res.data.data.data;

        if (d.length == 0) setNoProduct(true);
        else setNoProduct(false);

        setLastPage(res.data.data.last_page);
        setTotalProduct(res.data.data.total);
        setData(d);
        setLoading(false);
      });
    }
  }, [brandId, currPage]);

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
              disabled={loading}
              placeholder={firstTime && "Cari supplier"}
              w={{ base: "100%", md: "30%" }}
              onChange={(e) => {
                let split = e.target.value.split(" ");
                setBrandId(Number(split[0]));
                setCurrPage(1);
                setSupplierName(split[1]);
                setFirstTime(false);
                setLoading(true);
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
                <option key={"loading"} disabled value={"loading"}>
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
          <Flex w="full" justify="center" mt="1rem">
            <Pagination
              setCurrPage={setCurrPage}
              currPage={currPage}
              lastPage={lastPage}
              range={range}
              setRange={setRange}
            />
          </Flex>

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
                      link={`/product-detail/${stock.productId}`}
                      img={stock.img}
                      nama={stock.nama}
                      supplier={stock.supplier}
                      tag={stock.tag}
                      productId={stock.productId}
                    />
                  );
                }
              })
            ) : loading ? (
              <Box w="full" display="flex" justifyContent="center">
                <Spinner />
              </Box>
            ) : (
              noProduct && <h1>Tidak ada produk</h1>
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

          {lastPage !== 1 && (
            <Flex w="full" justify="center" mt="1rem">
              <Pagination
                setCurrPage={setCurrPage}
                currPage={currPage}
                lastPage={lastPage}
                range={range}
                setRange={setRange}
              />
            </Flex>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Stok;
