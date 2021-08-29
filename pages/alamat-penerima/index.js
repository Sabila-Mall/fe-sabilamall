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
import { default as NextLink } from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";

import { apiKecamatan, apiKodePos, apiKota, apiProvinsi } from "../../api/Zone";
import { addAddress, getAddress } from "../../api/address";
import { getMyCart } from "../../api/cart";
import Footer from "../../components/Footer";
import { Layout } from "../../components/Layout";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import { Stepper } from "../../components/Stepper";
import { ErrorToast, SuccessToast } from "../../components/Toast";
import { useAuthContext } from "../../contexts/authProvider";
import { useCheckoutContext } from "../../contexts/checkoutProvider";
import { extractName, numberWithDot } from "../../utils/functions";

const AlamatPenerima = () => {
  const { userData } = useAuthContext();
  const { addCheckoutData } = useCheckoutContext();
  const userId = userData?.id;
  const router = useRouter();
  // const userId = 6089;
  const [dataPengirim, setDataPengirim] = useState(null);
  const [dataPenerima, setDataPenerima] = useState(null);
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kodePos, setKodePos] = useState([]);

  const negara = ["Indonesia"];

  const path = [
    {
      name: "Checkout",
      link: "/alamat-penerima",
      isOnPage: false,
    },
    {
      name: "Alamat Penerima",
      link: "/alamat-penerima",
      isOnPage: true,
    },
  ];

  const [refetch, setRefetch] = useState(null);

  const [pengirimCurrentTab, setPengirimCurrentTab] = useState(0);
  const [penerimaCurrentTab, setPenerimaCurrentTab] = useState(0);

  const [pengirimSearch, setPengirimSearch] = useState("");
  const [penerimaSearch, setPenerimaSearch] = useState("");

  const [namaPengirim, setNamaPengirim] = useState("");
  const [nomorPengirim, setNomorPengirim] = useState("");
  const [addressIdPengirim, setAddressIdPengirim] = useState(null);

  const [namaTextPengirim, setNamaTextPengirim] = useState("");
  const [ponselPengirim, setPonselPengirim] = useState("");

  const [namaPenerima, setNamaPenerima] = useState("");
  const [nomorPenerima, setNomorPenerima] = useState("");
  const [alamatPenerima, setAlamatPenerima] = useState("");
  const [addressIdPenerima, setAddressIdPenerima] = useState(null);

  const [ringkasan, setRingkasan] = useState({
    pcs: 0,
    weight: 0,
    subTotal: 0,
    discount: 0,
    vendors_id: null,
  });

  const [namaAwalPenerima, setNamaAwalPenerima] = useState("");
  const [namaAkhirPenerima, setNamaAkhirPenerima] = useState("");
  const [negaraPenerima, setNegaraPenerima] = useState("");
  const [provinsiPenerima, setProvinsiPenerima] = useState("");
  const [kotaPenerima, setKotaPenerima] = useState("");
  const [kecamatanPenerima, setKecamatanPenerima] = useState("");
  const [kodePosPenerima, setKodePosPenerima] = useState("");
  const [ponselPenerima, setPonselPenerima] = useState("");
  const [alamatTextPenerima, setAlamatTextPenerima] = useState("");

  const clearInputPenerima = () => {
    setNamaAwalPenerima("");
    setNamaAkhirPenerima("");
    setNegaraPenerima("");
    setProvinsiPenerima("");
    setKotaPenerima("");
    setKecamatanPenerima("");
    setKodePosPenerima("");
    setPonselPenerima("");
    setAlamatTextPenerima("");
  };

  const clearInputPengirim = () => {
    setNamaTextPengirim("");
    setPonselPengirim("");
  };

  const addAddressPengirim = async () => {
    try {
      const res = await addAddress({
        entry_firstname: extractName(namaTextPengirim)?.firstname,
        entry_lastname: extractName(namaTextPengirim)?.lastname,
        entry_phone: ponselPengirim,
        address_book_type: 2,
        customers_id: userId,
        is_default: 0,
      });
      SuccessToast("Berhasil menambahkan alamat pengirim");

      return res;
    } catch (err) {
      throw new Error(err);
    }
  };

  const addAddressPenerima = async () => {
    try {
      const res = await addAddress({
        entry_firstname: namaAwalPenerima,
        entry_lastname: namaAkhirPenerima,
        entry_phone: ponselPenerima,
        entry_country_id: 100,
        entry_zone_id: Number(provinsiPenerima?.split(" ")?.[0]),
        entry_city: Number(kotaPenerima?.split(" ")?.[0]),
        entry_district: Number(kecamatanPenerima?.split(" ")?.[0]),
        entry_postcode: Number(kodePosPenerima),
        address_book_type: 1,
        customers_id: userId,
        is_default: 0,
        entry_street_address: alamatTextPenerima,
      });

      SuccessToast("Berhasil menambahkan alamat penerima");
      return res;
    } catch (err) {
      throw new Error(err);
    }
  };

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
                    ...d,
                  })),
                ]
              : [],
          );
        })
        .catch(() => setDataPengirim([]));

      apiProvinsi().then((res) => {
        setProvinsi([...res.data.data]);
      });

      getAddress({ customers_id: userId, address_book_type: 1 })
        .then((res) => {
          setDataPenerima(
            res && Array.isArray(res)
              ? [
                  ...res?.map((d) => ({
                    nama: d.firstname + " " + d.lastname,
                    nomor: d.phone,
                    alamat: `${d.street}, ${d.subdistrict_name}, ${d.city_name}, ${d.zone_name}`,
                    address_id: d.address_id,
                  })),
                ]
              : [],
          );
        })
        .catch(() => setDataPenerima([]));

      getMyCart(userId)
        .then((res) => {
          // console.log(res, "RSSSS");
          let pcs = 0;
          let weight = 0;
          let subTotal = 0;
          let discount = 0;
          res?.forEach((d) => {
            pcs += d?.keranjang?.length;
            d.keranjang.forEach((k) => {
              weight += Number(k.products_weight);
              subTotal += Number(k.products_price);
              discount +=
                (JSON.parse(k.customers_discount_schema)[k.customers_level] /
                  100) *
                Number(k.products_price);
            });
          });
          const d = {
            pcs,
            weight,
            subTotal,
            discount,
            vendors_id: res?.[0]?.vendors_id,
          };
          setRingkasan({ ...d });
        })
        .catch(() => console.error("err"));
    };

    userId && getDataPengirim();
  }, [userId, refetch]);

  useEffect(() => {
    const getKota = () => {
      apiKota(Number(provinsiPenerima?.split(" ")?.[0]))
        .then((res) => {
          setKota([...res.data.data]);
        })
        .catch(() => setKota([]));
    };

    provinsiPenerima && getKota();
  }, [provinsiPenerima, kota]);

  useEffect(() => {
    const getKecamatan = () => {
      apiKecamatan(Number(kotaPenerima?.split(" ")?.[0])).then((res) => {
        setKecamatan([...res.data.data]);
      });
    };

    kotaPenerima && getKecamatan();
  }, [kotaPenerima]);

  useEffect(() => {
    const getKodePos = () => {
      apiKodePos(
        Number(kotaPenerima?.split(" ")?.[0]),
        Number(kecamatanPenerima?.split(" ")?.[0]),
        Number(provinsiPenerima?.split(" ")?.[0]),
      )
        .then((res) => {
          setKodePos([...res.data.data]);
        })
        .catch((err) => console.error(err));
    };

    kecamatanPenerima && getKodePos();
  }, [kecamatanPenerima]);

  const pengirimRadioHandler = (e) => {
    setNamaPengirim(dataPengirim[e].nama);
    setNomorPengirim(dataPengirim[e].nomor);
    setAddressIdPengirim(dataPengirim[e].address_id);
  };

  const penerimaRadioHandler = (e) => {
    setNamaPenerima(dataPenerima[e].nama);
    setNomorPenerima(dataPenerima[e].nomor);
    setAlamatPenerima(dataPenerima[e].alamat);
    setAddressIdPenerima(dataPenerima[e].address_id);
  };

  const saveToContext = (data) => {
    try {
      addCheckoutData(data);
    } catch {
      console.log("EERRRRR");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleDisable()) return;

    const splittedAlamatPenerima = alamatPenerima.split(", ");

    if (pengirimCurrentTab == 0 && penerimaCurrentTab == 0) {
      try {
        saveToContext({
          ...ringkasan,
          userId,
          dropshipper_id: addressIdPengirim,
          delivery_id: addressIdPenerima,
          namaPengirim,
          nomorPengirim,
          namaPenerima,
          nomorPenerima,
          provinsiPenerima:
            splittedAlamatPenerima[splittedAlamatPenerima.length - 1],
          kotaPenerima:
            splittedAlamatPenerima[splittedAlamatPenerima.length - 2],
          kecamatanPenerima:
            splittedAlamatPenerima[splittedAlamatPenerima.length - 3],
          jalanPenerima: splittedAlamatPenerima
            .slice(0, splittedAlamatPenerima.length - 3)
            .join(", "),
        });
        router.push("/detail-pesanan");
      } catch (err) {
        console.error(err);
      }
    } else if (pengirimCurrentTab == 0 && penerimaCurrentTab == 1) {
      try {
        const res = await addAddressPenerima();
        saveToContext({
          ...ringkasan,
          userId,
          dropshipper_id: addressIdPengirim,
          delivery_id: res.address_id,
          namaPengirim,
          nomorPengirim,
          namaPenerima: namaAwalPenerima + namaAkhirPenerima,
          provinsiPenerima: provinsiPenerima?.split(", ")?.[1],
          kotaPenerima: kotaPenerima?.split(", ")?.[1],
          kecamatanPenerima: kecamatanPenerima?.split(", ")?.[1],
          jalanPenerima: alamatTextPenerima,
          nomorPenerima: ponselPenerima,
        });

        setRefetch(res);
        clearInputPenerima();
      } catch (err) {
        ErrorToast("Gagal menambahkan alamat penerima");
      }
    } else if (pengirimCurrentTab == 1 && penerimaCurrentTab == 0) {
      try {
        const res = await addAddressPengirim();
        saveToContext({
          ...ringkasan,
          userId,
          dropshipper_id: res.address_id,
          delivery_id: addressIdPenerima,
          namaPengirim: namaTextPengirim,
          nomorPengirim: ponselPengirim,
          namaPenerima: namaAwalPenerima + namaAkhirPenerima,
          nomorPenerima,
          provinsiPenerima:
            splittedAlamatPenerima[splittedAlamatPenerima.length - 1],
          kotaPenerima:
            splittedAlamatPenerima[splittedAlamatPenerima.length - 2],
          kecamatanPenerima:
            splittedAlamatPenerima[splittedAlamatPenerima.length - 3],
          jalanPenerima: splittedAlamatPenerima
            .slice(0, splittedAlamatPenerima.length - 3)
            .join(", "),
        });

        setRefetch(res);
        clearInputPengirim();
      } catch (err) {
        ErrorToast("Gagal menambahkan alamat pengirim");
      }
    } else {
      try {
        const res1 = await addAddressPengirim();
        const res2 = await addAddressPenerima();
        saveToContext({
          ...ringkasan,
          userId,
          dropshipper_id: res1.address_id,
          delivery_id: res2.address_id,
          namaPengirim: namaTextPengirim,
          nomorPengirim: ponselPengirim,
          namaPenerima: namaAwalPenerima + namaAkhirPenerima,
          provinsiPenerima: provinsiPenerima?.split(", ")?.[1],
          kotaPenerima: kotaPenerima?.split(", ")?.[1],
          kecamatanPenerima: kecamatanPenerima?.split(", ")?.[1],
          jalanPenerima: alamatTextPenerima,
          nomorPenerima: ponselPenerima,
        });

        // router.push("/alamat-penerima");
        // router.reload(window.location.pathname);
        setRefetch(res);
        clearInputPengirim();
        clearInputPenerima();
      } catch (err) {
        ErrorToast("Gagal menambahkan alamat pengirim / penerima");
      }
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
    <Layout hasNavbar hasBreadCrumb breadCrumbItem={path} hasPadding sticky>
      <Box as="main" d="flex" flexDir="column" alignItems="center">
        <Stepper step={1} />
        <Box
          w="full"
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
                      maxH={{ base: "11.5rem", lg: "7.3rem" }}
                      overflowY="auto"
                      pb="0.25rem"
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
                    <Box overflowY="auto" maxH="20rem">
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
                                  <option
                                    key={index}
                                    value={`${data.zone_apicityid} ${data.zone_name}`}
                                  >
                                    {data.zone_name}
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
                                  <option
                                    key={index}
                                    value={`${data.city_id} ${data.city_name}`}
                                  >
                                    {data.city_name}
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
                                  <option
                                    key={data?.subdistrict_id || index}
                                    value={`${data?.subdistrict_id} ${data?.subdistrict_name}`}
                                  >
                                    {data?.subdistrict_name}
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
                                  <option
                                    key={data?.id || index}
                                    value={data?.postal_code}
                                  >
                                    {data?.postal_code}
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
                  {ringkasan.pcs} pcs
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
                  {ringkasan.weight} gr
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
                  Rp{numberWithDot(ringkasan.subTotal)}
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
                  Rp{numberWithDot(ringkasan.discount)}
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
                  Rp{0}
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
                  Rp{numberWithDot(ringkasan.subTotal - ringkasan.discount)}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box></Box>
      </Box>
    </Layout>
  );
};

export default AlamatPenerima;
