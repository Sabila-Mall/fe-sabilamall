import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
  Text,
  Circle,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Divider,
  Select,
  Textarea,
  Button,
  RadioGroup,
  Radio,
  Grid,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";

import { getAddress } from "../../api/address";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import { useAuthContext } from "../../contexts/authProvider";

const AlamatPenerima = () => {
  const { userData } = useAuthContext();
  // const userId = userData?.id;
  const userId = 6089;
  const [dataPengirim, setDataPengirim] = useState(null);
  const [dataPenerima, setDataPenerima] = useState(null);

  useEffect(() => {
    const getDataPengirim = () => {
      getAddress({ customers_id: userId, address_book_type: 2 })
        .then((res) => {
          setDataPengirim(
            res
              ? [
                  ...res?.map((d) => ({
                    nama: d.firstname + " " + d.lastname,
                    nomor: d.phone,
                  })),
                ]
              : [],
          );

          getAddress({ customers_id: userId, address_book_type: 1 })
            .then((res) => {
              setDataPenerima(
                res
                  ? [
                      ...res?.map((d) => ({
                        nama: d.firstname + " " + d.lastname,
                        nomor: d.phone,
                        alamat: `Jl.${d.street}, ${d.subdistrict_name}, ${d.city_name}, ${d.zone_name}`,
                      })),
                    ]
                  : [],
              );
            })
            .catch(() => setDataPenerima([]));
        })
        .catch(() => setDataPengirim([]));
    };

    userId && getDataPengirim();
  }, [userId]);

  const negara = ["Indonesia"];
  const provinsi = ["DKI Jakarta", "Jawa Barat", "Jawa Tengah"];
  const kota = ["Bandung", "Jakarta Barat", "Jakarta Utara"];
  const kecamatan = ["Kedoya Utara", "Kedoya Barat", "Kedoya Tenggara"];
  const kodePos = ["18181", "27272", "89898"];

  const [pengirimCurrentTab, setPengirimCurrentTab] = useState(0);
  const [penerimaCurrentTab, setPenerimaCurrentTab] = useState(0);

  const [pengirimSearch, setPengirimSearch] = useState("");
  const [penerimaSearch, setPenerimaSearch] = useState("");

  const [namaPengirim, setNamaPengirim] = useState("");
  const [alamatPengirim, setAlamatPengirim] = useState("");

  const [namaTextPengirim, setNamaTextPengirim] = useState("");
  const [ponselPengirim, setPonselPengirim] = useState("");

  const [namaPenerima, setNamaPenerima] = useState("");
  const [nomorPenerima, setNomorPenerima] = useState("");
  const [alamatPenerima, setAlamatPenerima] = useState("");

  const [namaAwalPenerima, setNamaAwalPenerima] = useState("");
  const [namaAkhirPenerima, setNamaAkhirPenerima] = useState("");
  const [negaraPenerima, setNegaraPenerima] = useState("");
  const [provinsiPenerima, setProvinsiPenerima] = useState("");
  const [kotaPenerima, setKotaPenerima] = useState("");
  const [kecamatanPenerima, setKecamatanPenerima] = useState("");
  const [kodePosPenerima, setKodePosPenerima] = useState("");
  const [ponselPenerima, setPonselPenerima] = useState("");
  const [alamatTextPenerima, setAlamatTextPenerima] = useState("");

  const pengirimRadioHandler = (e) => {
    setNamaPengirim(dataPengirim[e].nama);
    setAlamatPengirim(dataPengirim[e].alamat);
  };

  const penerimaRadioHandler = (e) => {
    setNamaPenerima(dataPenerima[e].nama);
    setNomorPenerima(dataPenerima[e].nomor);
    setAlamatPenerima(dataPenerima[e].alamat);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pengirimCurrentTab == 0 && penerimaCurrentTab == 0) {
      console.log("submit type 0");
    } else if (pengirimCurrentTab == 0 && penerimaCurrentTab == 1) {
      console.log("submit type 1");
    } else if (pengirimCurrentTab == 1 && penerimaCurrentTab == 0) {
      console.log("submit type 2");
    } else {
      console.log("submit type 3");
    }
  };

  const handleDisable = () => {
    if (pengirimCurrentTab == 0 && penerimaCurrentTab == 0) {
      if (namaPengirim !== "" && namaPenerima !== "") {
        return false;
      } else {
        return true;
      }
    } else if (pengirimCurrentTab == 0 && penerimaCurrentTab == 1) {
      if (
        namaPengirim !== "" &&
        namaAwalPenerima !== "" &&
        namaAkhirPenerima !== "" &&
        negaraPenerima !== "" &&
        provinsiPenerima !== "" &&
        kotaPenerima !== "" &&
        kecamatanPenerima !== "" &&
        kodePosPenerima !== "" &&
        ponselPenerima !== "" &&
        alamatTextPenerima !== ""
      ) {
        return false;
      } else {
        return true;
      }
    } else if (pengirimCurrentTab == 1 && penerimaCurrentTab == 0) {
      if (
        namaTextPengirim !== "" &&
        ponselPengirim !== "" &&
        namaPenerima !== ""
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      if (
        namaTextPengirim !== "" &&
        ponselPengirim !== "" &&
        namaAwalPenerima !== "" &&
        namaAkhirPenerima !== "" &&
        negaraPenerima !== "" &&
        provinsiPenerima !== "" &&
        kotaPenerima !== "" &&
        kecamatanPenerima !== "" &&
        kodePosPenerima !== "" &&
        ponselPenerima !== "" &&
        alamatTextPenerima !== ""
      ) {
        return false;
      } else {
        return true;
      }
    }
  };

  if (!Array.isArray(dataPenerima) || !Array.isArray(dataPengirim))
    return <Loading />;

  return (
    <>
      <Navbar />
      <Box
        as="main"
        pt={{ base: "51px", md: "71px" }}
        d="flex"
        flexDir="column"
        alignItems="center"
        marginTop={{ base: "2rem", md: "3rem" }}
      >
        <Box w={{ base: "90vw", lg: "80vw" }}>
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
                <Text className="secondaryFont" fontWeight="500">
                  Checkout
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
                  Alamat Penerima
                </Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box
          w={{ base: "85%", md: "100%" }}
          d="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="2rem"
        >
          <Circle
            bg="orange.400"
            size={{ base: "1.8rem", md: "2.2rem" }}
            fontSize={{ base: "0.75rem", md: "0.85rem" }}
          >
            1
          </Circle>
          <Text
            className="secondaryFont"
            marginLeft="0.5rem"
            fontSize={{ base: "sm", md: "md" }}
          >
            Alamat Penerima
          </Text>
          <Box
            marginLeft="1rem"
            bg="gray.500"
            h={{ base: "1px", md: "1.2px" }}
            w="10rem"
          />
          <Circle
            bg="gray.50"
            marginLeft="1rem"
            size={{ base: "1.8rem", md: "2.2rem" }}
            fontSize={{ base: "0.75rem", md: "0.85rem" }}
            color="gray.500"
          >
            2
          </Circle>
          <Text
            className="secondaryFont"
            marginLeft="0.5rem"
            color="gray.500"
            fontSize={{ base: "sm", md: "md" }}
          >
            Detail Pesanan
          </Text>
        </Box>
        <Box
          w={{ base: "90vw", lg: "80vw" }}
          marginTop="2rem"
          d="flex"
          justifyContent="space-between"
          flexDir={{ base: "column-reverse", lg: "row" }}
        >
          <Box
            w={{ base: "100%", lg: "65%" }}
            d={{ base: "flex", lg: "inline" }}
            flexDir={{ base: "column", lg: "row" }}
            alignItems={{ base: "center", lg: "stretch" }}
          >
            <Box w="100%">
              <Text className="primaryFont" fontWeight="700" fontSize="1.25rem">
                Data Pengirim
              </Text>
              <Tabs
                variant="unstyled"
                marginTop="0.5rem"
                onChange={(e) => setPengirimCurrentTab(e)}
              >
                <TabList>
                  <Tab
                    color="gray.500"
                    className="secondaryFont"
                    borderBottom="2px solid"
                    borderBottomColor="gray.300"
                    fontSize={{ base: "xs", md: "md" }}
                    _selected={{
                      color: "black",
                      borderBottom: "2px solid",
                      borderBottomColor: "yellow.500",
                    }}
                  >
                    Gunakan alamat tersimpan
                  </Tab>
                  <Tab
                    marginLeft="1rem"
                    color="gray.500"
                    className="secondaryFont"
                    borderBottom="2px solid"
                    borderBottomColor="gray.300"
                    fontSize={{ base: "xs", md: "md" }}
                    _selected={{
                      color: "black",
                      borderBottom: "2px solid",
                      borderBottomColor: "yellow.500",
                    }}
                  >
                    Masukkan alamat baru
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <InputGroup
                      width={{ base: "100%", lg: "48%" }}
                      marginTop="0.5rem"
                      marginBottom="1rem"
                    >
                      <Input
                        placeholder="Cari alamat"
                        color="gray.500"
                        fontSize="sm"
                        onChange={(e) => setPengirimSearch(e.target.value)}
                      />
                      <InputRightElement
                        children={<BiSearch color="black" />}
                      />
                    </InputGroup>
                    <Box
                      height={{ base: "11.5rem", lg: "7.3rem" }}
                      overflowY="scroll"
                      css={
                        {
                          // "&::-webkit-scrollbar": {
                          //   width: "0px",
                          // },
                          // "&::-webkit-scrollbar-track": {
                          //   width: "10px",
                          // },
                          // "&::-webkit-scrollbar-thumb": {
                          //   width: "10px",
                          // },
                        }
                      }
                    >
                      <RadioGroup onChange={(e) => pengirimRadioHandler(e)}>
                        <Grid
                          templateColumns={{
                            base: "repeat(1,1fr)",
                            lg: "repeat(2,1fr)",
                          }}
                          gap={4}
                        >
                          {dataPengirim &&
                            dataPengirim.map((data, index) => {
                              if (
                                data.nama
                                  .toLowerCase()
                                  .includes(pengirimSearch.toLowerCase()) ||
                                data.nomor.includes(pengirimSearch)
                              ) {
                                return (
                                  <Box
                                    w="100%"
                                    border="1px solid"
                                    borderColor="gray.400"
                                    borderRadius="md"
                                    d="flex"
                                    flexDir="row"
                                    padding="5px 10px 5px 10px"
                                    as="label"
                                    key={index}
                                    htmlFor={index}
                                    cursor="pointer"
                                  >
                                    <Radio
                                      value={`${index}`}
                                      id={index}
                                      cursor="pointer"
                                    />
                                    <Box
                                      d="flex"
                                      flexDir="column"
                                      marginLeft="2ch"
                                      fontSize="0.8rem"
                                    >
                                      <Text>{data.nama}</Text>
                                      <Text>{data.nomor}</Text>
                                    </Box>
                                  </Box>
                                );
                              }
                            })}
                        </Grid>
                      </RadioGroup>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box
                      w="100%"
                      d="flex"
                      flexDir={{ base: "column", lg: "row" }}
                      justifyContent="space-between"
                    >
                      <Box w={{ base: "100%", lg: "47.5%" }}>
                        <Text
                          className="secondaryFont"
                          fontWeight="500"
                          fontSize="0.875rem"
                        >
                          Nama Pengirim
                        </Text>
                        <Input
                          placeholder="Masukkan nama pengirim"
                          marginTop="0.5rem"
                          fontSize="sm"
                          onChange={(e) => setNamaTextPengirim(e.target.value)}
                        />
                      </Box>
                      <Box w={{ base: "100%", lg: "47.5%" }}>
                        <Text
                          className="secondaryFont"
                          fontWeight="500"
                          fontSize="0.875rem"
                          marginTop={{ base: "1rem", lg: "0rem" }}
                        >
                          Ponsel Pengirim
                        </Text>
                        <Input
                          placeholder="Masukkan nomor ponsel pengirim"
                          marginTop="0.5rem"
                          fontSize="sm"
                          onChange={(e) => setPonselPengirim(e.target.value)}
                        />
                      </Box>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <Divider orientation="horizontal" />
              <Text
                className="primaryFont"
                fontWeight="700"
                fontSize="1.25rem"
                marginTop="1rem"
              >
                Data Alamat Penerima
              </Text>
              <Tabs
                variant="unstyled"
                marginTop="0.5rem"
                onChange={(e) => setPenerimaCurrentTab(e)}
              >
                <TabList>
                  <Tab
                    color="gray.400"
                    className="secondaryFont"
                    borderBottom="2px solid"
                    borderBottomColor="gray.300"
                    fontSize={{ base: "xs", md: "md" }}
                    _selected={{
                      color: "black",
                      borderBottom: "2px solid",
                      borderBottomColor: "yellow.500",
                    }}
                  >
                    Gunakan alamat tersimpan
                  </Tab>
                  <Tab
                    marginLeft="1rem"
                    color="gray.500"
                    className="secondaryFont"
                    borderBottom="2px solid"
                    borderBottomColor="gray.300"
                    fontSize={{ base: "xs", md: "md" }}
                    _selected={{
                      color: "black",
                      borderBottom: "2px solid",
                      borderBottomColor: "yellow.500",
                    }}
                  >
                    Masukkan alamat baru
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <InputGroup
                      width={{ base: "100%", lg: "48%" }}
                      marginTop="0.5rem"
                      marginBottom="1rem"
                    >
                      <Input
                        placeholder="Cari alamat"
                        color="gray.500"
                        fontSize="sm"
                        onChange={(e) => setPenerimaSearch(e.target.value)}
                      />
                      <InputRightElement
                        children={<BiSearch color="black" />}
                      />
                    </InputGroup>
                    <Box
                      height={{ base: "31rem", lg: "20rem" }}
                      overflowY="scroll"
                    >
                      <RadioGroup onChange={(e) => penerimaRadioHandler(e)}>
                        <Grid
                          templateColumns={{
                            base: "repeat(1,1fr)",
                            lg: "repeat(2,1fr)",
                          }}
                          gap={4}
                        >
                          {dataPenerima &&
                            dataPenerima.map((data, index) => {
                              if (
                                data.nama
                                  .toLowerCase()
                                  .includes(penerimaSearch.toLowerCase()) ||
                                data.nomor
                                  .toLowerCase()
                                  .includes(penerimaSearch.toLowerCase()) ||
                                data.alamat
                                  .toLowerCase()
                                  .includes(penerimaSearch.toLowerCase())
                              ) {
                                return (
                                  <Box
                                    w="100%"
                                    border="1px solid"
                                    borderColor="gray.400"
                                    borderRadius="md"
                                    d="flex"
                                    flexDir="row"
                                    padding="7px 10px 7px 10px"
                                    as="label"
                                    key={index}
                                    htmlFor={`-${index}`}
                                    cursor="pointer"
                                  >
                                    <Radio
                                      value={`${index}`}
                                      id={`-${index}`}
                                      cursor="pointer"
                                    />
                                    <Box
                                      d="flex"
                                      flexDir="column"
                                      marginLeft="2ch"
                                      fontSize="0.8rem"
                                    >
                                      <Text>{data.nama}</Text>
                                      <Text>{data.nomor}</Text>
                                      <Text>{data.alamat}</Text>
                                    </Box>
                                  </Box>
                                );
                              }
                            })}
                        </Grid>
                      </RadioGroup>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box w="100%" d="flex" flexDir="column">
                      <Box
                        w="100%"
                        d="flex"
                        justifyContent="space-between"
                        flexDir={{ base: "column", lg: "row" }}
                      >
                        <Box w={{ base: "100%", lg: "47.5%" }}>
                          <Text
                            className="secondaryFont"
                            fontWeight="500"
                            fontSize="0.875rem"
                          >
                            Nama Awal
                          </Text>
                          <Input
                            placeholder="Masukkan nama awal penerima"
                            marginTop="0.5rem"
                            fontSize="sm"
                            onChange={(e) =>
                              setNamaAwalPenerima(e.target.value)
                            }
                          />
                        </Box>
                        <Box
                          w={{ base: "100%", lg: "47.5%" }}
                          marginTop={{ base: "1rem", lg: "0rem" }}
                        >
                          <Text
                            className="secondaryFont"
                            fontWeight="500"
                            fontSize="0.875rem"
                          >
                            Nama Akhir
                          </Text>
                          <Input
                            placeholder="Masukkan nama akhir penerima"
                            marginTop="0.5rem"
                            fontSize="sm"
                            onChange={(e) =>
                              setNamaAkhirPenerima(e.target.value)
                            }
                          />
                        </Box>
                      </Box>
                      <Box
                        w="100%"
                        d="flex"
                        justifyContent="space-between"
                        flexDir={{ base: "column", lg: "row" }}
                        marginTop={{ base: "1rem", lg: "0rem" }}
                      >
                        <Box
                          w={{ base: "100%", lg: "47.5%" }}
                          marginTop={{ base: "0rem", lg: "1rem" }}
                        >
                          <Text
                            className="secondaryFont"
                            fontWeight="500"
                            fontSize="0.875rem"
                          >
                            Negara
                          </Text>
                          <Select
                            placeholder="Pilih negara penerima"
                            marginTop="0.5rem"
                            fontSize="sm"
                            onChange={(e) => setNegaraPenerima(e.target.value)}
                          >
                            {negara &&
                              negara.map((data, index) => {
                                return (
                                  <option key={index} value={data}>
                                    {data}
                                  </option>
                                );
                              })}
                          </Select>
                        </Box>
                        <Box w={{ base: "100%", lg: "47.5%" }} marginTop="1rem">
                          <Text
                            className="secondaryFont"
                            fontWeight="500"
                            fontSize="0.875rem"
                          >
                            Provinsi
                          </Text>
                          <Select
                            placeholder="Pilih provinsi penerima"
                            marginTop="0.5rem"
                            fontSize="sm"
                            onChange={(e) =>
                              setProvinsiPenerima(e.target.value)
                            }
                          >
                            {provinsi &&
                              provinsi.map((data, index) => {
                                return (
                                  <option key={index} value={data}>
                                    {data}
                                  </option>
                                );
                              })}
                          </Select>
                        </Box>
                      </Box>
                      <Box
                        w="100%"
                        d="flex"
                        justifyContent="space-between"
                        flexDir={{ base: "column", lg: "row" }}
                        marginTop={{ base: "1rem", lg: "0rem" }}
                      >
                        <Box
                          w={{ base: "100%", lg: "47.5%" }}
                          marginTop={{ base: "0rem", lg: "1rem" }}
                        >
                          <Text
                            className="secondaryFont"
                            fontWeight="500"
                            fontSize="0.875rem"
                          >
                            Kota Tujuan
                          </Text>
                          <Select
                            placeholder="Pilih kota tujuan penerima"
                            marginTop="0.5rem"
                            fontSize="sm"
                            onChange={(e) => setKotaPenerima(e.target.value)}
                          >
                            {kota &&
                              kota.map((data, index) => {
                                return (
                                  <option key={index} value={data}>
                                    {data}
                                  </option>
                                );
                              })}
                          </Select>
                        </Box>
                        <Box w={{ base: "100%", lg: "47.5%" }} marginTop="1rem">
                          <Text
                            className="secondaryFont"
                            fontWeight="500"
                            fontSize="0.875rem"
                          >
                            Kecamatan
                          </Text>
                          <Select
                            placeholder="Pilih kecamatan penerima"
                            marginTop="0.5rem"
                            fontSize="sm"
                            onChange={(e) =>
                              setKecamatanPenerima(e.target.value)
                            }
                          >
                            {kecamatan &&
                              kecamatan.map((data, index) => {
                                return (
                                  <option key={index} value={data}>
                                    {data}
                                  </option>
                                );
                              })}
                          </Select>
                        </Box>
                      </Box>
                      <Box
                        w="100%"
                        d="flex"
                        justifyContent="space-between"
                        flexDir={{ base: "column", lg: "row" }}
                        marginTop={{ base: "1rem", lg: "0rem" }}
                      >
                        <Box
                          w={{ base: "100%", lg: "47.5%" }}
                          marginTop={{ base: "0rem", lg: "1rem" }}
                        >
                          <Text
                            className="secondaryFont"
                            fontWeight="500"
                            fontSize="0.875rem"
                          >
                            Kode Pos
                          </Text>
                          <Select
                            placeholder="Pilih kode pos penerima"
                            marginTop="0.5rem"
                            fontSize="sm"
                            onChange={(e) => setKodePosPenerima(e.target.value)}
                          >
                            {kodePos &&
                              kodePos.map((data, index) => {
                                return (
                                  <option key={index} value={data}>
                                    {data}
                                  </option>
                                );
                              })}
                          </Select>
                        </Box>
                        <Box w={{ base: "100%", lg: "47.5%" }} marginTop="1rem">
                          <Text
                            className="secondaryFont"
                            fontWeight="500"
                            fontSize="0.875rem"
                          >
                            Ponsel
                          </Text>
                          <Input
                            placeholder="Pilih nomor ponsel penerima"
                            marginTop="0.5rem"
                            fontSize="sm"
                            onChange={(e) => setPonselPenerima(e.target.value)}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Text
                      className="secondaryFont"
                      fontWeight="500"
                      fontSize="0.875rem"
                      marginTop="1rem"
                    >
                      Alamat
                    </Text>
                    <Textarea
                      placeholder="Masukkan alamat penerima"
                      marginTop="0.5rem"
                      resize="none"
                      fontSize="sm"
                      onChange={(e) => setAlamatTextPenerima(e.target.value)}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <Divider orientation="horizontal" />
              <Box marginTop="1rem" w="100%" d="flex" justifyContent="flex-end">
                <Button
                  bg="red.500"
                  color="white"
                  _hover={{ bg: "red.600" }}
                  w={{ base: "100%", lg: "6rem" }}
                  marginBottom="2rem"
                  marginRight={{ base: "0rem", lg: "1rem" }}
                  isDisabled={handleDisable()}
                  onClick={(e) => handleSubmit(e)}
                >
                  Lanjutkan
                </Button>
              </Box>
            </Box>
          </Box>
          <Box w={{ base: "100%", lg: "30%" }}>
            <Box
              w="100%"
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
              paddingX="1.5ch"
              paddingY="1ch"
              position="sticky"
              top={{ base: "0px", lg: "calc(71px + 5rem)" }}
              marginBottom={{ base: "2rem", lg: "6.5rem" }}
            >
              <Text
                className="primaryFont"
                fontSize="1.125rem"
                fontWeight="700"
                isTruncated
              >
                Ringkasan
              </Text>
              <Box
                width="100%"
                d="flex"
                justifyContent="space-between"
                marginTop="0.5rem"
              >
                <Text
                  color="gray.500"
                  className="primaryFont"
                  fontWeight="700"
                  isTruncated
                >
                  Jumlah
                </Text>
                <Text
                  color="gray.500"
                  className="secondaryFont"
                  fontWeight="500"
                  isTruncated
                >
                  9.999.999 pcs
                </Text>
              </Box>
              <Box
                width="100%"
                d="flex"
                justifyContent="space-between"
                marginTop="0.3rem"
              >
                <Text
                  color="gray.500"
                  className="primaryFont"
                  fontWeight="700"
                  isTruncated
                >
                  Berat
                </Text>
                <Text
                  color="gray.500"
                  className="secondaryFont"
                  fontWeight="500"
                  isTruncated
                >
                  1.000.000 gr
                </Text>
              </Box>
              <Divider orientation="horizontal" marginY="0.5rem" />
              <Text
                className="primaryFont"
                fontSize="1.125rem"
                fontWeight="700"
                isTruncated
              >
                Pembayaran
              </Text>
              <Box
                width="100%"
                d="flex"
                justifyContent="space-between"
                marginTop="0.5rem"
              >
                <Text
                  color="gray.500"
                  className="primaryFont"
                  fontWeight="700"
                  isTruncated
                >
                  Subtotal
                </Text>
                <Text
                  color="gray.500"
                  className="secondaryFont"
                  fontWeight="500"
                  isTruncated
                >
                  Rp99.999.999
                </Text>
              </Box>
              <Box
                width="100%"
                d="flex"
                justifyContent="space-between"
                marginTop="0.3rem"
              >
                <Text
                  color="gray.500"
                  className="primaryFont"
                  fontWeight="700"
                  isTruncated
                >
                  Diskon
                </Text>
                <Text
                  color="gray.500"
                  className="secondaryFont"
                  fontWeight="500"
                  isTruncated
                >
                  Rp99.999.999
                </Text>
              </Box>
              <Box
                width="100%"
                d="flex"
                justifyContent="space-between"
                marginTop="0.3rem"
              >
                <Text
                  color="gray.500"
                  className="primaryFont"
                  fontWeight="700"
                  isTruncated
                >
                  Pengiriman
                </Text>
                <Text
                  color="gray.500"
                  className="secondaryFont"
                  fontWeight="500"
                  isTruncated
                >
                  Rp99.999.999
                </Text>
              </Box>
              <Divider orientation="horizontal" marginY="0.5rem" />
              <Box
                width="100%"
                d="flex"
                justifyContent="space-between"
                marginTop="0.3rem"
              >
                <Text
                  color="gray.500"
                  className="primaryFont"
                  fontWeight="700"
                  isTruncated
                >
                  Total
                </Text>
                <Text
                  color="orange.400"
                  className="secondaryFont"
                  fontWeight="500"
                  fontSize="1.25rem"
                  isTruncated
                >
                  Rp99.999.999
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box></Box>
      </Box>
      <Footer />
    </>
  );
};

export default AlamatPenerima;
