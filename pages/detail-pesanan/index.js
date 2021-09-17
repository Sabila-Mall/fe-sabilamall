import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  Button,
  Checkbox,
  Grid,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Select,
  Spinner,
  SimpleGrid,
  Spacer,
  StackDivider,
  Textarea,
  useOutsideClick,
  VStack,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaShippingFast } from "react-icons/fa";

import { getKurir, getPaymentMethod, apiPlaceOrder } from "../../api/Order";
import CheckoutBreadcrumb from "../../components/CheckoutBreadcrumb";
import CheckoutProduct from "../../components/CheckoutProduct";
import CheckoutStepper from "../../components/CheckoutStepper";
import CheckoutSummary from "../../components/CheckoutSummary";
import { Layout } from "../../components/Layout";
import {
  dataPenerima,
  dataPengirim,
  daftarMetodePembayaran,
  daftarProduk,
} from "../../constants/dummyData";
import { useAuthContext } from "../../contexts/authProvider";
import { useCheckoutContext } from "../../contexts/checkoutProvider";
import { useWindowSize } from "../../hooks/useWindowSize";
import { isRequestSuccess } from "../../utils/api";
import {
  currencyFormat,
  estimasiFormat,
  filterObject,
  formatNumber,
  formatPhoneNumber,
  isEmpty,
} from "../../utils/functions";

/**
 * @param {Object} dataPengirim
 *  @param {string} dataPengirim.nama Nama lengkap pengirim
 *  @param {string} dataPengirim.nomorHandphone Nomor handphone pengirim
 * @param {Object} dataPenerima
 *  @param {string} dataPenerima.nama Nama lengkap penerima
 *  @param {string} dataPenerima.nomorHandphone Nomor handphone penerima
 *  @param {string} dataPenerima.alamat Alamat penerima
 * @param {CheckoutProduct[]} daftarProduk
 */

const ACCEPTED_PAYMENT_METHODS = ["transferbank", "deposit"];

const RingkasanPesanan = () => {
  const { width } = useWindowSize();
  const isSmartphone = width < 768;

  const router = useRouter();
  const { checkoutData } = useCheckoutContext();

  let products = [];

  if (typeof window !== "undefined") {
    const localCheckout = JSON.parse(localStorage.getItem("selectedProduct"));
    if (localCheckout) {
      products = localCheckout.products;
    }
  }
  return (
    <>
      <Heading as="h3" fontSize="1.5rem" mb="1rem" className="primaryFont">
        Ringkasan Pesanan
      </Heading>
      <SimpleGrid spacing="1rem" columns={{ base: 1, md: 2 }} mb="1rem">
        <Box
          padding="1rem"
          borderRadius="0.5rem"
          border="1px"
          borderColor="gray.300"
        >
          <Flex justify="space-between" mb="1.5rem">
            <Text fontSize="1.25rem" className="primaryFont" fontWeight="bold">
              Data Pengirim
            </Text>
            <Button
              variant="outline"
              color="gray.400"
              size="sm"
              onClick={() => router.push("/alamat-penerima")}
            >
              Ubah
            </Button>
          </Flex>

          <Text fontWeight="bold" className="primaryFont">
            {checkoutData.namaPengirim}
          </Text>
          <Text className="primaryFont" fontWeight="normal">
            {formatPhoneNumber(checkoutData.nomorPengirim)}
          </Text>
        </Box>

        <Box
          padding="1rem"
          borderRadius="0.5rem"
          border="1px"
          borderColor="gray.300"
        >
          <Flex justify="space-between" mb="1.5rem">
            <Text fontSize="1.25rem" className="primaryFont" fontWeight="bold">
              Data Penerima
            </Text>
            <Button
              variant="outline"
              color="gray.400"
              size="sm"
              onClick={() => router.push("/alamat-penerima")}
            >
              Ubah
            </Button>
          </Flex>

          <Text fontWeight="bold" className="primaryFont">
            {checkoutData.namaPenerima}
          </Text>
          <Text className="primaryFont" fontWeight="normal">
            {formatPhoneNumber(checkoutData.nomorPenerima)}
          </Text>

          <Spacer h="0.5rem" />

          <Text className="secondaryFont">
            {(checkoutData.jalanPenerima ? checkoutData.jalanPenerima : "") +
              (checkoutData.kecamatanPenerima
                ? `, ${checkoutData.kecamatanPenerima}`
                : "") +
              (checkoutData.kotaPenerima
                ? `, ${checkoutData.kotaPenerima}`
                : "") +
              (checkoutData.provinsiPenerima
                ? `, ${checkoutData.provinsiPenerima}`
                : "") +
              (checkoutData.postcode ? `, ${checkoutData.postcode}` : "")}
          </Text>
        </Box>
      </SimpleGrid>
      <VStack
        className="secondaryFont"
        borderRadius="0.5rem"
        borderWidth={{ base: "0px", md: "1px" }}
        borderColor="gray.300"
        padding={{ base: "0rem", md: "1rem" }}
        spacing={{ base: "1rem", md: "0.875rem" }}
        divider={<StackDivider borderColor="gray.200" />}
        align="stretch"
      >
        {!isSmartphone && (
          <Grid
            gridTemplateColumns="3fr 1fr 1fr 1fr"
            className="primaryFont"
            fontWeight="bold"
            w="full"
            alignSelf="stretch"
          >
            <Text>Produk</Text>
            <Text>Harga Satuan</Text>
            <Text textAlign="center">Jumlah</Text>
            <Text textAlign="center">Subtotal</Text>
          </Grid>
        )}
        {products.map((produk) => (
          <CheckoutProduct key={produk.customers_basket_id} product={produk} />
        ))}
      </VStack>
    </>
  );
};

/**
 * @param {int} beratTotal Berat total semua produk
 * @param {Object[]} daftarJasaPengiriman
 *  @param {string} daftarJasaPengiriman[].id Id jasa pengiriman buat value di select
 *  @param {string} daftarJasaPengiriman[].nama Nama jasa pengiriman buat yg ditampilin di select
 * @param {Object} pengiriman Object pengiriman
 *  @param {string} pengiriman.nama Nama pengiriman
 *  @param {string} pengiriman.estimasi Estimasi pengiriman dalam hari (Misal. "1-2")
 *  @param {int} pengiriman.harga Harga pengiriman
 * @param {function} setPengiriman Function buat ngubah pengiriman
 */
const Pengiriman = ({ kurir, pengiriman, handler, loadingKurir }) => {
  let totalWeight = 0;

  if (typeof window !== "undefined") {
    const checkoutData = JSON.parse(localStorage.getItem("selectedProduct"));
    if (checkoutData) {
      totalWeight = checkoutData.weight;
    }
  }
  return (
    <>
      <Heading as="h3" mb="1rem" fontSize="1.5rem" className="primaryFont">
        Pengiriman
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing="2rem"
        padding="1rem"
        borderRadius="0.5rem"
        border="1px"
        borderColor="gray.300"
      >
        <Flex direction="column">
          <HStack className="primaryFont" color="gray.600">
            <Text fontWeight="bold">Total berat:</Text>
            <Text fontWeight="normal">{formatNumber(totalWeight)} gr</Text>
          </HStack>
          {loadingKurir ? (
            <Spinner m="3" />
          ) : (
            <Select
              className="secondaryFont"
              placeholder="Pilih jasa pengiriman"
              onChange={(event) => {
                handler(event.target.value);
              }}
            >
              {kurir.map((jasa, index) => (
                <option value={jasa.name} key={index}>
                  {jasa.name} ({currencyFormat(jasa.rate)})
                </option>
              ))}
            </Select>
          )}
        </Flex>
        <Flex justify="space-between">
          {!isEmpty(pengiriman) && (
            <>
              <Flex direction={"column"}>
                <Flex align="center">
                  <Text className="primaryFont" fontWeight="bold">
                    {pengiriman.nama}
                  </Text>
                  {pengiriman.shipping_promo !== null && (
                    <Icon
                      ml="0.5rem"
                      width="1.25em"
                      height="1.25em"
                      as={FaShippingFast}
                      color="green.400"
                    />
                  )}
                </Flex>
                <Text className="secondaryFont">
                  Estimasi {pengiriman.estimasi}
                </Text>
              </Flex>
              <Flex direction="column">
                {pengiriman.shipping_promo !== null && (
                  <Text className="secondaryFont" textDecor="line-through">
                    {currencyFormat(pengiriman.harga_original)}
                  </Text>
                )}
                <Text className="secondaryFont" fontWeight="700">
                  {currencyFormat(pengiriman.harga)}
                </Text>
              </Flex>
            </>
          )}
        </Flex>
      </SimpleGrid>
    </>
  );
};

const CatatanPesanan = ({ setCatatanPesanan }) => {
  const ref = useRef();
  const { register, getValues } = useForm();

  useOutsideClick({
    ref: ref,
    handler: () => setCatatanPesanan(getValues("catatan-pesanan")),
  });

  return (
    <>
      <Heading as="h3" mb="1rem" fontSize="1.5rem" className="primaryFont">
        Catatan Pesanan
      </Heading>
      <Textarea
        ref={ref}
        className="secondaryFont"
        placeholder="Tuliskan catatan untuk penjual"
        {...register("catatan-pesanan")}
      />
    </>
  );
};

/**
 *
 * @param{Object[]} daftarMetodePembayaran
 *  @param {string} daftarMetodePembayaran[].id Id metode pembayaran buat value di select
 *  @param {string} daftarMetodePembayaran[].nama Nama metode pembayaran buat yg ditampilin di select
 * @param {Object} metodePembayaran Object metode pembayaran
 *  @param {string} metodePembayaran.nama Nama metode pembayaran
 *  @param {int} metodePembayaran.biaya Harga metode pembayaran
 *  @param {boolean} metodePembayaran.isCod Status apakah metode pembayaran menggunakan COD
 *  @param {int} metodePembayaran.diskon Diskon metode pembayaran (hanya berlaku untuk cod)
 * @param {function} setPengiriman Function buat ngubah metode pembayaran
 */
const MetodePembayaran = ({
  metodePembayaran,
  handler,
  handleDiskonPengiriman,
  paymentMethod,
  loadingPayment,
}) => {
  return (
    <VStack spacing="1rem" align="stretch">
      <Heading as="h3" fontSize="1.5rem" className="primaryFont">
        Metode Pembayaran
      </Heading>
      {loadingPayment ? (
        <Spinner m="5" />
      ) : (
        <Select
          className="secondaryFont"
          placeholder="Pilih metode pembayaran"
          onChange={(event) => handler(event.target.value)}
        >
          {paymentMethod
            .filter((e) => ACCEPTED_PAYMENT_METHODS.includes(e.method))
            .map((method, index) => {
              return (
                <option value={method.payment_method} key={index}>
                  {method.method === "deposit"
                    ? `${method.name} (${currencyFormat(method.memberdeposit)})`
                    : method.name}
                </option>
              );
            })}
        </Select>
      )}

      {!isEmpty(metodePembayaran) && (
        <Flex justify="space-between" color="gray.600" className="primaryFont">
          {metodePembayaran.isCod ? (
            <InputGroup className="secondaryFont">
              <InputLeftAddon children="Diskon Pelanggan" />
              <NumberInput
                defaultValue={metodePembayaran.diskon}
                min={0}
                max={100}
                allowMouseWheel
                textAlign="right"
                onChange={(e) => handleDiskonPengiriman(e)}
                // isDisabled={true}
              >
                <NumberInputField textAlign="right" />
              </NumberInput>
              <InputRightAddon children="%" />
            </InputGroup>
          ) : (
            <>
              <Text fontWeight="bold">Biaya Tambahan:</Text>
              <Text fontWeight="bold">
                Rp{formatNumber(metodePembayaran.biaya)}
              </Text>
            </>
          )}
        </Flex>
      )}
    </VStack>
  );
};

const Voucher = ({ voucher, setVoucher }) => {
  const { register, handleSubmit } = useForm();

  const checkVoucher = (voucher) => {
    // Handle logic untuk ngecek apa vouchernya valid atau engga
    return voucher === "GRATISONGKIR21";
  };

  const onSubmit = (input) => {
    if (checkVoucher(input.voucher)) {
      // Kalo voucher valid, ambil nama voucher sama harga vouchernya
      // Ganti juga nama sama harganya di setValue
      setVoucher({ nama: input.voucher, harga: 10000 });
    } else {
      // Kalo vouchernya ga valid set voucher jadi empty object,
      // penting buat logic nampilin banner vouchernya
      setVoucher({});
    }
  };

  return (
    <VStack spacing="1rem" align="stretch">
      <Heading as="h3" fontSize="1.5rem" className="primaryFont">
        Voucher
      </Heading>
      <InputGroup>
        <Input
          className="secondaryFont"
          placeholder="Masukan kode voucher"
          {...register("voucher")}
        />
        <InputRightElement w="4rem">
          <Button
            className="secondaryFont"
            fontWeight="normal"
            fontSize="0.875rem"
            onClick={handleSubmit(onSubmit)}
          >
            Klaim
          </Button>
        </InputRightElement>
      </InputGroup>
      {!isEmpty(voucher) && (
        <Box
          padding="1rem"
          borderRadius="0.5rem"
          border="1px"
          borderColor="orange.200"
          bg="orange.50"
          color="orange.500"
          className="primaryFont"
        >
          <HStack justify="space-between">
            <Box fontWeight="bold">
              <Text color="orange.700" fontSize="0.75rem" fontWeight="bold">
                Voucher berhasil di klaim!
              </Text>
              <Text>{voucher.nama}</Text>
            </Box>
            <Text fontWeight="bold">Rp{formatNumber(voucher.harga)}</Text>
          </HStack>
        </Box>
      )}
    </VStack>
  );
};

const Confirmation = ({ setPersetujuan }) => {
  return (
    <Box
      padding="1rem"
      borderRadius="0.5rem"
      border="1px"
      mb="1.5rem"
      borderColor="gray.300"
    >
      <Checkbox
        defaultIsChecked={false}
        colorScheme="red"
        onChange={(e) => setPersetujuan(e.target.checked)}
      >
        Saya menyetujui bahwa biaya pengiriman bersifat final. Apabila terjadi
        selisih maka tidak ada penagihan/pengembalian.
      </Checkbox>
    </Box>
  );
};

const DetailPesanan = () => {
  const { width } = useWindowSize();
  const isDesktop = width >= 1024;
  const router = useRouter();

  const { userData } = useAuthContext();
  const {
    checkoutData,
    setOrderNumber,
    setSubtotal,
    setCheckoutResponse,
  } = useCheckoutContext();

  const [catatanPesanan, setCatatanPesanan] = useState("");
  const [pengiriman, setPengiriman] = useState({});
  const [metodePembayaran, setMetodePembayaran] = useState({});
  const [voucher, setVoucher] = useState({});
  const [persetujuan, setPersetujuan] = useState(false);

  const [kurir, setKurir] = useState([]);
  const [loadingKurir, setLoadingKurir] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentDesc, setPaymentDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  let arrayOfCustomerBasket = [];
  let weight, vendors_id, vendor_origin, totalOrder, products_jenis;

  if (typeof window !== "undefined") {
    const products = JSON.parse(localStorage.getItem("selectedProduct"));
    const productItems = products.products;
    if (productItems) {
      productItems.forEach((element) => {
        arrayOfCustomerBasket.push(element.customers_basket_id);
      });
      weight = products.weight;
      totalOrder = products.total_price;
      vendors_id = productItems[0].vendors_id;
      vendor_origin = productItems[0].vendors_origin;
      products_jenis = productItems[0].products_jenis;
    }
  }

  useEffect(() => {
    let device_id = window.localStorage.getItem("device_id");
    device_id = JSON.parse(device_id);
    if (userData !== null && checkoutData) {
      setLoadingKurir(true);
      getKurir(
        userData?.id,
        checkoutData?.postcode,
        checkoutData?.city_id,
        checkoutData?.zone_id,
        checkoutData?.district_id,
        checkoutData?.subdistrict_id,
        weight,
        vendors_id,
        vendor_origin,
        device_id,
      )
        .then((res) => {
          setKurir(res.data.data.kurirIndonesia.services);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoadingKurir(false));
    }
  }, [checkoutData, userData]);

  useEffect(() => {
    setLoadingPayment(true);
    getPaymentMethod(
      vendors_id,
      userData?.id,
      products_jenis,
      totalOrder,
      pengiriman.name,
    )
      .then((res) => {
        setPaymentMethod(res.data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingPayment(false));
  }, []);

  const handleSelectedPengirman = (selected) => {
    // Ambil data tegantung id pengiriman yg dipilih, setPengiriman ke data yg didapet dari server
    if (selected === "") {
      setPengiriman({});
    } else {
      const tempPengiriman = kurir.filter((data) => data.name === selected)[0];
      const estimasi = tempPengiriman.destination.split("|")[2];
      setPengiriman({
        nama: tempPengiriman.name,
        estimasi: estimasiFormat(estimasi),
        harga_original: tempPengiriman.rate,
        harga:
          tempPengiriman.rate -
          (tempPengiriman.shipping_promo?.shipping_promo_amount ?? 0),
        destination: tempPengiriman.destination,
        shipping_promo: tempPengiriman.shipping_promo,
      });
    }
  };
  const handleSelectedMetodePembayaran = (selected) => {
    // Ambil data tergantung metode pembayaran yg dipilih, terus pake setMetodePembayaran
    // Kalo misalkan metode pembayaran cod, setCod ubah jadi true

    const tempPayment = paymentMethod.filter(
      (data) => data.payment_method === selected,
    )[0];
    if (selected === "cod") {
      setMetodePembayaran({
        nama: tempPayment.name,
        biaya: tempPayment?.payment_cost_amount
          ? tempPayment.payment_cost_amount
          : "0",
        isCod: true,
        diskon: 10,
        payment_method: tempPayment?.payment_method,
      });
    } else if (selected === "") {
      setMetodePembayaran({});
    } else {
      setMetodePembayaran({
        nama: tempPayment.name,
        biaya: tempPayment?.payment_cost_amount
          ? tempPayment.payment_cost_amount
          : "0",
        isCod: false,
        diskon: 10,
        payment_method: tempPayment?.payment_method,
      });
    }
  };

  const handleDiskonPengiriman = (diskon) => {
    let temp = metodePembayaran;
    temp.diskon = diskon;
    setMetodePembayaran(temp);
  };

  let totalPrice = 0,
    totalQuantity = 0,
    totalDiscount = 0,
    totalWeight = 0;

  if (typeof window !== "undefined") {
    const checkoutData = JSON.parse(localStorage.getItem("selectedProduct"));
    if (checkoutData) {
      totalPrice = checkoutData.total_price;
      totalQuantity = checkoutData.quantity;
      totalWeight = checkoutData.weight;
      totalDiscount = checkoutData.discount;
    }
  }
  const onSubmit = () => {
    // Values udah berisi semua input yang dimasukin user dalam bentuk object
    // Buat liat bentuknya bisa di cek di console
    if (
      metodePembayaran.payment_method === "deposit" &&
      totalPrice + pengiriman.harga - totalDiscount >
        paymentMethod.filter((e) => e.method === "deposit")[0].memberdeposit
    ) {
      toast({
        title: "Saldo SM Pay tidak mencukupi",
        position: "top",
        status: "error",
      });
    } else if (Object.keys(pengiriman).length === 0) {
      toast({
        title: "Pilih metode pengiriman",
        position: "top",
        status: "error",
      });
    } else if (Object.keys(metodePembayaran).length === 0) {
      toast({
        title: "Pilih metode pembayaran",
        position: "top",
        status: "error",
      });
    } else {
      setLoading(true);
      apiPlaceOrder(
        vendors_id,
        arrayOfCustomerBasket,
        pengiriman.destination,
        checkoutData.userId,
        checkoutData.delivery_id,
        checkoutData.dropshipper_id,
        metodePembayaran.payment_method,
        false,
        0,
        0,
        catatanPesanan,
        "1.0.2",
        "",
        0,
      )
        .then((res) => {
          if (isRequestSuccess(res.data)) {
            setCheckoutResponse(res.data);
            router.push("/invoice");
          } else {
            toast({
              title: res.data.message,
              position: "top",
              status: "error",
            });
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Layout hasNavbar>
      <Flex
        as="main"
        direction="column"
        alignItems="center"
        marginTop={{ base: "2rem", md: "3rem" }}
      >
        <CheckoutBreadcrumb
          breadCrumbText="Detail Pesanan"
          breadCrumbLink="/detail-pesanan"
        />
        <CheckoutStepper currentStep={2} />
        <Box
          w={{ base: "90vw", lg: "80vw" }}
          mt="2rem"
          display="flex"
          justifyContent="space-between"
          flexDir={{ base: "column", lg: "row" }}
        >
          <Box
            w={{ base: "100%", lg: "70%" }}
            display={{ base: "flex", lg: "inline" }}
            flexDir={{ base: "column", lg: "row" }}
            alignItems={{ base: "center", lg: "stretch" }}
            mb="2rem"
          >
            <VStack
              w="100%"
              spacing="1.5rem"
              align="stretch"
              divider={<StackDivider borderColor="gray.200" />}
            >
              <RingkasanPesanan daftarProduk={daftarProduk} />
              <Pengiriman
                pengiriman={pengiriman}
                handler={handleSelectedPengirman}
                kurir={kurir}
                loadingKurir={loadingKurir}
              />
              <CatatanPesanan setCatatanPesanan={setCatatanPesanan} />
              <SimpleGrid spacing="1.5rem" columns={{ base: 1, md: 2 }}>
                <MetodePembayaran
                  loadingPayment={loadingPayment}
                  metodePembayaran={metodePembayaran}
                  handler={handleSelectedMetodePembayaran}
                  paymentMethod={paymentMethod}
                  handleDiskonPengiriman={handleDiskonPengiriman}
                />
                <Voucher voucher={voucher} setVoucher={setVoucher} />
              </SimpleGrid>
              <Confirmation setPersetujuan={setPersetujuan} />
              <Flex
                justify="space-between"
                direction={{ base: "column", md: "row" }}
              >
                <Button
                  className="primaryFont"
                  borderColor="gray.500"
                  variant="outline"
                  color="gray.500"
                  // flexGrow={{ base: 1, xl: 0 }}
                  onClick={() => router.push("/alamat-penerima")}
                >
                  Sebelumnya
                </Button>
                <Button
                  mt={{ base: "1rem", md: "0" }}
                  className="primaryFont"
                  bg="red.500"
                  color="white"
                  onClick={onSubmit}
                  disabled={!persetujuan}
                  isLoading={loading}
                >
                  Pesan Sekarang
                </Button>
              </Flex>
            </VStack>
          </Box>
          <CheckoutSummary
            jumlah={totalQuantity}
            berat={totalWeight}
            subtotal={totalPrice}
            tambahan={metodePembayaran.biaya}
            pengiriman={pengiriman.harga}
            diskon={totalDiscount}
            voucher={voucher.harga}
          />
        </Box>
      </Flex>
    </Layout>
  );
};

export default DetailPesanan;
