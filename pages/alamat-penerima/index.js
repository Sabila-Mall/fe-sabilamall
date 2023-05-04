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
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";

import { apiKecamatan, apiKodePos, apiKota, apiProvinsi } from "../../api/Zone";
import { addAddress, getAddressByUserId } from "../../api/address";
import { getMyCart } from "../../api/cart";
import { Layout } from "../../components/Layout";
import Loading from "../../components/Loading";
import { Stepper } from "../../components/Stepper";
import { ErrorToast, SuccessToast } from "../../components/Toast";
import { useAddressContext } from "../../contexts/addressProvider";
import { useAuthContext } from "../../contexts/authProvider";
import { useCheckoutContext } from "../../contexts/checkoutProvider";
import {
  currencyFormat,
  extractName,
  getPriceAfterDiscount,
  isValidJson,
  numberWithDot,
} from "../../utils/functions";

const AlamatPenerima = () => {
  const { userData } = useAuthContext();
  const { addCheckoutData } = useCheckoutContext();
  const {
    addressDataPenerima,
    addressDataPengirim,
    loading: loadingAddress,
    getAllData,
  } = useAddressContext();
  const userId = userData?.id;
  const adminId = userData?.admin_id;
  const router = useRouter();
  // const userId = 6089;
  const [dataPengirim, setDataPengirim] = useState(null);
  const [dataPenerima, setDataPenerima] = useState(null);
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kodePos, setKodePos] = useState([]);
  const [subdistrictId, setSubsdistrictId] = useState("");

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

  let selectedProductJson;
  if (typeof window !== "undefined") selectedProductJson = localStorage.getItem("selectedProduct")

  if (
    typeof window !== "undefined" && isValidJson(selectedProductJson) &&
    !JSON.parse(selectedProductJson)
  )
    router.push("/");

  useEffect(() => {
    getAllData();
  }, []);

  let totalPrice = 0,
    totalQuantity = 0,
    totalDiscount = 0,
    priceAfterDiscount = 0,
    handlingFeeAdmin = 0,
    handlingFeeAdminDiscount = 0,
    handlingFee = 0,
    totalWeight = 0;

  if (typeof window !== "undefined") {
    const checkoutDataJSON = localStorage.getItem("selectedProduct")
    const checkoutData = isValidJson(checkoutDataJSON) && JSON.parse(checkoutDataJSON);
    if (checkoutData) {
      console.log(checkoutData);
      totalPrice = checkoutData.total_price;
      totalQuantity = checkoutData.quantity;
      totalWeight = checkoutData.weight;
      totalDiscount = checkoutData.discount;
      if (adminId != null) {
        handlingFeeAdmin = checkoutData.handling_fee_admin;
        handlingFeeAdminDiscount = checkoutData.handling_fee_admin_discount;
      }
      handlingFee = checkoutData.handling_fee;
      priceAfterDiscount = totalPrice - totalDiscount + handlingFeeAdmin;
    }
  }

  console.log(handlingFee);

  const [pengirimCurrentTab, setPengirimCurrentTab] = useState(0);
  const [penerimaCurrentTab, setPenerimaCurrentTab] = useState(0);

  const [pengirimSearch, setPengirimSearch] = useState("");
  const [penerimaSearch, setPenerimaSearch] = useState("");

  const [namaPengirim, setNamaPengirim] = useState("");
  const [nomorPengirim, setNomorPengirim] = useState("");
  const [addressIdPengirim, setAddressIdPengirim] = useState(null);

  const [ponselPengirim, setPonselPengirim] = useState("");

  const [namaPenerima, setNamaPenerima] = useState("");
  const [alamatPenerima, setAlamatPenerima] = useState("");
  const [addressIdPenerima, setAddressIdPenerima] = useState(null);
  const [nomorPenerima, setNomorPenerima] = useState("");

  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingAdding, setLoadingAdding] = useState(false);
  const [addressPenerima, setAddressPenerima] = useState({
    city_id: null,
    zone_id: null,
    district_id: null,
    subdistrict_id: null,
    postcode: null,
  });

  const [namaAwalPenerima, setNamaAwalPenerima] = useState("");
  const [namaAkhirPenerima, setNamaAkhirPenerima] = useState("");
  const [negaraPenerima, setNegaraPenerima] = useState("");
  const [provinsiPenerima, setProvinsiPenerima] = useState("");
  const [kotaPenerima, setKotaPenerima] = useState("");
  const [kecamatanPenerima, setKecamatanPenerima] = useState("");
  const [kodePosPenerima, setKodePosPenerima] = useState("");
  const [ponselPenerima, setPonselPenerima] = useState("");
  const [namaPengirimInput, setNamaPengirimInput] = useState("");
  const [provinsiOnFly, setProvinsiOnFly] = useState(false);
  const [kotaOnFly, setKotaOnFly] = useState(false);
  const [kecamatanOnFly, setKecamatanOnFly] = useState(false);
  const [kodeOnFly, setKodeOnFly] = useState(false);

  const addAddressPengirim = async () => {
    try {
      setLoadingAdding(true);
      const res = await addAddress({
        entry_firstname: extractName(namaPengirimInput)?.firstname,
        entry_lastname: extractName(namaPengirimInput)?.lastname,
        entry_phone: ponselPengirim,
        address_book_type: 2,
        customers_id: userId,
        is_default: 0,
      });
      setLoadingAdding(false);
      SuccessToast("Berhasil menambahkan alamat pengirim");

      return res;
    } catch (err) {
      throw new Error(err);
    }
  };

  const addAddressPenerima = async () => {
    try {
      setLoadingAdding(true);
      const res = await addAddress({
        entry_firstname: namaAwalPenerima,
        entry_lastname: namaAkhirPenerima,
        entry_phone: ponselPenerima,
        entry_country_id: 100,
        entry_zone_id: Number(provinsiPenerima?.split(" ")?.[0]),
        entry_city: Number(kotaPenerima?.split(" ")?.[0]),
        entry_district: Number(kecamatanPenerima?.split(" ")?.[0]),
        entry_postcode: Number(kodePosPenerima),
        entry_subdistrict: subdistrictId,
        address_book_type: 1,
        customers_id: userId,
        is_default: 0,
        entry_street_address: alamatPenerima,
      });
      setLoadingAdding(false);
      SuccessToast("Berhasil menambahkan alamat penerima");
      return res;
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    setProvinsiOnFly(true);
    const getDataPengirim = () => {
      try {
        setDataPengirim(
          addressDataPengirim
            ? [
              ...addressDataPengirim?.map((d) => ({
                nama: d.firstname + " " + (d.lastname ?? ""),
                nomor: d.phone,
                ...d,
              })),
            ]
            : [],
        );

        setDataPenerima(
          addressDataPenerima && Array.isArray(addressDataPenerima)
            ? [
              ...addressDataPenerima?.map((d) => ({
                delivery_id: d.address_id,
                nama: d.firstname + " " + (d.lastname ?? ""),
                nomor: d.phone,
                alamat: `${d.street}, ${d.subdistrict_type + " " + d.subdistrict_name
                  }, ${d.city_type + " " + d.city_name}, ${d.zone_name}`,
                address_id: d.address_id,
                city_id: d.city_id,
                zone_id: d.zone_apicityid,
                subdistrict_id: d.subdistrict_id,
                postcode: d.postcode,
                district_id: d.district,
              })),
            ]
            : [],
        );

        apiProvinsi().then((res) => {
          setProvinsi([...res.data.data]);
          setProvinsiOnFly(false);
          setKota([]);
          setKecamatan([]);
          setKodePos([]);
        });
      } catch (err) {
      } finally {
        setLoadingPage(false);
      }
    };

    userId && !loadingAddress && getDataPengirim();
  }, [userId, loadingAddress]);

  useEffect(() => {
    const getKota = () => {
      apiKota(Number(provinsiPenerima?.split(" ")?.[0]), setKotaOnFly)
        .then((res) => {
          setKota([...res.data.data]);
          setKotaOnFly(false);
          setKecamatan([]);
          setKodePos([]);
        })
        .catch(() => setKota([]));
    };

    provinsiPenerima && getKota();
  }, [provinsiPenerima]);

  useEffect(() => {
    const getKecamatan = () => {
      apiKecamatan(
        Number(kotaPenerima?.split(" ")?.[0]),
        setKecamatanOnFly,
      ).then((res) => {
        setKecamatan([...res.data.data]);
        setKecamatanOnFly(false);
        setKodePos([]);
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
        setKodeOnFly,
      )
        .then((res) => {
          const postalCodeList = res.data?.data;

          setKodePos(postalCodeList);
          setKodeOnFly(false);
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
    setAlamatPenerima(dataPenerima[e].alamat);
    setAddressIdPenerima(dataPenerima[e].address_id);
    setNomorPenerima(dataPenerima[e].nomor);
    setAddressPenerima({
      city_id: dataPenerima[e].city_id,
      zone_id: dataPenerima[e].zone_id,
      subdistrict_id: dataPenerima[e].subdistrict_id,
      district_id: dataPenerima[e].district_id,
      postcode: dataPenerima[e].postcode,
    });
  };

  const saveToContext = (data) => {
    try {
      addCheckoutData(data);
    } catch {
      () => { };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleDisable()) return;

    const splittedAlamatPenerima = alamatPenerima.split(", ");

    if (pengirimCurrentTab == 0 && penerimaCurrentTab == 0) {
      try {
        saveToContext({
          ...addressPenerima,
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
          handlingFeeAdmin,
        });
        router.push("/detail-pesanan");
      } catch (err) {
        console.error(err);
      }
    } else if (pengirimCurrentTab == 0 && penerimaCurrentTab == 1) {
      try {
        const res = await addAddressPenerima();
        saveToContext({
          userId,
          dropshipper_id: addressIdPengirim,
          delivery_id: res?.data?.address_id,
          namaPengirim,
          nomorPengirim,
          zone_id: Number(provinsiPenerima?.split(" ")?.[0]),
          city_id: Number(kotaPenerima?.split(" ")?.[0]),
          district_id: Number(kecamatanPenerima?.split(" ")?.[0]),
          subdistrict_id: Number(kecamatanPenerima?.split(" ")?.[0]),
          postcode: Number(kodePosPenerima),
          namaPenerima: namaAwalPenerima + " " + namaAkhirPenerima,
          provinsiPenerima: provinsiPenerima?.split(" ")?.[1],
          kotaPenerima: kotaPenerima?.split(" ")?.[1],
          kecamatanPenerima: kecamatanPenerima?.split(" ")?.[1],
          jalanPenerima: alamatPenerima,
          nomorPenerima: ponselPenerima,
        });

        router.push("/detail-pesanan");
      } catch (err) {
        ErrorToast("Gagal menambahkan alamat penerima");
      }
    } else if (pengirimCurrentTab == 1 && penerimaCurrentTab == 0) {
      try {
        const res = await addAddressPengirim();
        saveToContext({
          ...addressPenerima,
          userId,
          dropshipper_id: res?.data?.address_book_id,
          delivery_id: addressIdPenerima,
          namaPengirim: namaPengirimInput,
          nomorPengirim: ponselPengirim,
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
        ErrorToast("Gagal menambahkan alamat pengirim");
      }
    } else {
      try {
        const res1 = await addAddressPengirim();
        const res2 = await addAddressPenerima();
        saveToContext({
          userId,
          dropshipper_id: res1?.data?.address_book_id,
          delivery_id: res2?.data?.address_id,
          zone_id: Number(provinsiPenerima?.split(" ")?.[0]),
          city_id: Number(kotaPenerima?.split(" ")?.[0]),
          district_id: Number(kecamatanPenerima?.split(" ")?.[0]),
          subdistrict_id: Number(kecamatanPenerima?.split(" ")?.[0]),
          postcode: Number(kodePosPenerima),
          namaPengirim: namaPengirimInput,
          nomorPengirim: ponselPengirim,
          namaPenerima: namaAwalPenerima + " " + namaAkhirPenerima,
          provinsiPenerima: provinsiPenerima?.split(" ")?.[1],
          kotaPenerima: kotaPenerima?.split(" ")?.[1],
          kecamatanPenerima: kecamatanPenerima?.split(" ")?.[1],
          jalanPenerima: alamatPenerima,
          nomorPenerima: ponselPenerima,
        });

        router.push("/detail-pesanan");
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
        alamatPenerima !== ""
      ) {
        return false;
      } else {
        return true;
      }
    } else if (pengirimCurrentTab == 1 && penerimaCurrentTab == 0) {
      if (
        namaPengirimInput !== "" &&
        ponselPengirim !== "" &&
        namaPenerima !== ""
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      if (
        namaPengirimInput !== "" &&
        ponselPengirim !== "" &&
        namaAwalPenerima !== "" &&
        namaAkhirPenerima !== "" &&
        negaraPenerima !== "" &&
        provinsiPenerima !== "" &&
        kotaPenerima !== "" &&
        kecamatanPenerima !== "" &&
        kodePosPenerima !== "" &&
        ponselPenerima !== "" &&
        alamatPenerima !== ""
      ) {
        return false;
      } else {
        return true;
      }
    }
  };

  if (
    !Array.isArray(dataPenerima) ||
    !Array.isArray(dataPengirim) ||
    loadingAddress ||
    loadingPage
  )
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
                                data?.nama
                                  ?.toLowerCase()
                                  ?.includes(pengirimSearch.toLowerCase()) ||
                                data?.nomor?.includes(pengirimSearch)
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
                          onChange={(e) => setNamaPengirimInput(e.target.value)}
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
                                data?.nama
                                  ?.toLowerCase()
                                  ?.includes(penerimaSearch.toLowerCase()) ||
                                data?.nomor
                                  ?.toLowerCase()
                                  ?.includes(penerimaSearch.toLowerCase()) ||
                                data?.alamat
                                  ?.toLowerCase()
                                  ?.includes(penerimaSearch.toLowerCase())
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
                                      <Text>{`${data.alamat}`}</Text>
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
                          {provinsiOnFly ? (
                            <Spinner />
                          ) : (
                            <Select
                              // disabled={provinsi.length === 0}
                              placeholder="Pilih provinsi penerima"
                              marginTop="0.5rem"
                              fontSize="sm"
                              onChange={(e) => {
                                setProvinsiPenerima(e.target.value);
                              }}
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
                          )}
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
                          {kotaOnFly ? (
                            <Spinner />
                          ) : (
                            <Select
                              // disabled={kota.length === 0}
                              placeholder="Pilih kota tujuan penerima"
                              marginTop="0.5rem"
                              fontSize="sm"
                              onChange={(e) => {
                                setKotaPenerima(e.target.value);
                              }}
                            >
                              {kota.length > 0 &&
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
                          )}
                        </Box>
                        <Box w={{ base: "100%", lg: "47.5%" }} marginTop="1rem">
                          <Text
                            className="secondaryFont"
                            fontWeight="500"
                            fontSize="0.875rem"
                          >
                            Kecamatan
                          </Text>
                          {kecamatanOnFly ? (
                            <Spinner />
                          ) : (
                            <Select
                              // disabled={kecamatanPenerima.length === 0}
                              placeholder="Pilih kecamatan penerima"
                              marginTop="0.5rem"
                              fontSize="sm"
                              onChange={(e) => {
                                setKecamatanPenerima(e.target.value);
                              }}
                            >
                              {kecamatan.length > 0 ? (
                                kecamatan.map((data, index) => {
                                  return (
                                    <option
                                      key={data?.subdistrict_id || index}
                                      value={`${data?.subdistrict_id} ${data?.subdistrict_name}`}
                                    >
                                      {data?.subdistrict_name}
                                    </option>
                                  );
                                })
                              ) : (
                                <option>Pilih kecamatan penerima</option>
                              )}
                            </Select>
                          )}
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
                          {kodeOnFly ? (
                            <Spinner />
                          ) : (
                            <Select
                              placeholder="Pilih kode pos penerima"
                              // disabled={kodePosPenerima.length === 0}
                              marginTop="0.5rem"
                              fontSize="sm"
                              onChange={(e) => {
                                let filterKodePos = kodePos.filter(
                                  (data) =>
                                    data.subdistrict_name === e.target.value,
                                );
                                setKodePosPenerima(
                                  filterKodePos[0].postal_code,
                                );
                                setSubsdistrictId(filterKodePos[0].id);
                              }}
                            >
                              {kodePos.length > 0 ? (
                                kodePos.map((data, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={data.subdistrict_name}
                                    >
                                      {data.subdistrict_name} (
                                      {data.postal_code})
                                    </option>
                                  );
                                })
                              ) : (
                                <option>Pilih kode pos penerima</option>
                              )}
                            </Select>
                          )}
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
                      onChange={(e) => setAlamatPenerima(e.target.value)}
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
                  isLoading={loadingAdding}
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
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
                  {totalQuantity} pcs
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
                  {totalWeight} gr
                </Text>
              </Box>
              <Divider orientation="horizontal" marginY="0.5rem" />
              <Text
                className="primaryFont"
                fontSize="1.125rem"
                fontWeight="700"
                isTruncated
              >
                Tagihan
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
                  {currencyFormat(totalPrice)}
                </Text>
              </Box>
              {adminId != null ?
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
                    Fee Admin
                  </Text>
                  <Text
                    color="gray.500"
                    className="secondaryFont"
                    fontWeight="500"
                    isTruncated
                  >
                    {currencyFormat(handlingFeeAdmin)}
                  </Text>
                </Box>
                :
                <Box />
              }
              

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
                  {currencyFormat(totalDiscount)}
                </Text>
              </Box>
              {handlingFee > 0 ?
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
                    Handling Fee
                  </Text>
                  <Text
                    color="gray.500"
                    className="secondaryFont"
                    fontWeight="500"
                    isTruncated
                  >
                    {currencyFormat(handlingFee)}
                  </Text>
                </Box>
                :
                <Box />
              }
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
                  Belum dihitung
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
                  {currencyFormat(priceAfterDiscount + handlingFee)}
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
