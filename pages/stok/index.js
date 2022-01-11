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
  apiGetProductByNamePage,
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
  const [typeSearch, setTypeSearch] = useState("");
  const [sabiconSearch, setSabiconSearch] = useState(1);
  

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
      console.log(dataArray);
      dataArray.map((product) => {
        try {
          const supName = supplierName == "" ? product.manufacturer_name : supplierName;
          const stocksPush = fetchingStock(product, supName);
          setStocks((curr) => [...curr, stocksPush]);
          setLoading(false);
        } catch (err) {
          () => {};
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
        setNameSearch("");
        setSupplierName(supplierName);
      });
    }
  }, [brandId, currPage]);

  useEffect(() => {
    if (nameSearch != "") {
      setLoading(true);
      setStocks([]);
      setData([]);
      apiGetProductByNamePage(nameSearch, currPage).then((res) => {
        let d = res.data.data.data;

        if (d.length == 0) setNoProduct(true);
        else setNoProduct(false);

        setLastPage(res.data.data.last_page);
        setTotalProduct(res.data.data.total);
        setData(d);
        setLoading(false);
      });
    }
  }, [nameSearch, currPage]);

  useEffect(() => {
    if (typeSearch != "") {
      console.log(typeSearch);
    }
  }, [typeSearch]);

  function SelectBoxType() {
    return (
      <>
      <Select
        placeholder="Pilih Tipe Pencarian"
        w={typeSearch == "" ? { base: "100%", md: "100%" } : { base: "100%", md: "50%" }}
        value={typeSearch}
        onChange={(e) => {
          let val = e.target.value;
          setTypeSearch(val);
          setStocks([]);
          setData([]);
          setBrandId(0);
          setCurrPage(1);
          setLastPage(0);
          setSupplierName("");
          setFirstTime(true);
          if(val == 1){
            setSabiconSearch(1);
          } else {
            setSabiconSearch(2);
          }
        }}
      >
        <option key="1" value="1">Berdasarkan Brand</option>
        <option key="2" value="2">Input Nama Produk</option>
      </Select>
      {typeSearch == "1" && 
        <SelectBoxBrand/>
      }
      {typeSearch == "2" && 
        <InputKeyword/>
      }
      </>
    );
  }

  function SelectBoxBrand() {
    return (
      <>
      <Select
        disabled={loading}
        w={{ base: "100%", md: "49%" }}
        onChange={(e) => {
          let split = e.target.value.split(" ");
          setBrandId(Number(split[0]));
          setCurrPage(1);
          setSupplierName(split[1]);
          setFirstTime(false);
          setLoading(true);
        }}
      >
        <option value="" key="0">Pilih Brand</option>
        {supplier.length != 0 ? (
          supplier.map((child) => {
            const brandName = child.name;
            return (
              <option key={child.id} value={`${child.id} ${child.name}`} selected={brandName == supplierName ? "selected" : ""}>
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
      </>
    );
  }

  function InputKeyword() {
    return (
      <>
      <InputGroup
          w={{ base: "100%", md: "49%" }}
          mt={{ base: "1rem", md: "0rem" }}
        >
          <InputLeftElement children={<FiSearch color="red.500" />} />
          <Input
            placeholder={nameSearch == "" ? "Cari Produk" : nameSearch}
            fontSize="sm"
            onKeyPress={(e) => {
              if(e.key === 'Enter'){
                let val = e.target.value;
                setNameSearch(val);
                setFirstTime(false);
                setLoading(true);

                setBrandId(0);
                setCurrPage(1);
              }
            }}
          />
        </InputGroup>
      </>
    );
  }

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
            <SelectBoxType/>
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
                  {sabiconSearch == 1 ? "Silakan pilih brand berdasarkan nama produk untuk melihat data stok yang tersedia." : "Silakan input nama produk untuk melihat data stok yang tersedia." }
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
