import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  Button,
  Checkbox,
  Circle,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Select,
  SimpleGrid,
  Spacer,
  Square,
  Stack,
  StackDivider,
  Textarea,
  useEditableControls,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoCreateOutline, IoChevronForward } from "react-icons/io5";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Footer.module.scss";

// Helper function

export const formatNumber = (number) => {
  return number.toLocaleString("id-ID");
};

const formatPhoneNumber = (phoneNumber) => {
  return (
    phoneNumber.slice(0, 4) +
    "-" +
    phoneNumber.slice(4, 8) +
    "-" +
    phoneNumber.slice(7, 11)
  );
};

const isEmpty = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

// Just a placeholder function for checking if the voucher is valid
const checkVoucher = (voucherName, setVoucher) => {
  if (voucherName === "GRATISONGKIR2021") {
    setVoucher({
      nama: voucherName,
      harga: 4000,
    });
  } else {
    setVoucher({});
  }
};

// Dummmy data
const dataPengirim = {
  nama: "Tatang Sutarman",
  nomorHandphone: "085555555555",
};

const dataPenerima = {
  nama: "Hendra Setiawan Indradjaja ",
  nomorHandphone: "085555555555",
  alamat:
    "Jl Kb Kacang Grand Indonesia Shopping Town East Mall Lt Ground 30, TANGERANG - CILEDUG, BANTEN, 15148",
};

export const listProduk = [
  {
    gambar: "/images/produk.svg",
    nama: "Nama Produk Croissant",
    deskripsi: "Lengan panjang, merah cabe, XXXXXL",
    berat: 1000,
    diskon: 99,
    harga: 99999999,
    jumlah: 999,
  },
  {
    gambar: "/images/produk.svg",
    nama: "Nama Produk Croissant",
    deskripsi: "Lengan panjang, merah cabe, XXXXXL",
    berat: 1000,
    diskon: 99,
    harga: 99999999,
    jumlah: 999,
  },
  {
    gambar: "/images/produk.svg",
    nama: "Nama Produk Croissant",
    deskripsi: "Lengan panjang, merah cabe, XXXXXL",
    berat: 1000,
    diskon: 99,
    harga: 99999999,
    jumlah: 999,
  },
];

const listJasaPengiriman = [
  {
    id: "jne",
    nama: "JNE JTR",
    estimasi: "1 - 2",
    harga: 99999,
  },
  {
    id: "sicepat",
    nama: "SICEPAT",
    estimasi: "1 - 2",
    harga: 99999,
  },
  {
    id: "pos",
    nama: "POS INDONESIA",
    estimasi: "1 - 2",
    harga: 99999,
  },
];

const listMetodePembayaran = [
  {
    id: "bank",
    nama: "Transfer Bank",
    biaya: 4000,
  },
  {
    id: "deposit",
    nama: "Deposit",
    biaya: 3000,
  },
  {
    id: "cod",
    nama: "Cash On Delivery (COD)",
    biaya: 20,
  },
  {
    id: "gopay",
    nama: "Go-Pay",
    biaya: 4000,
  },
  {
    id: "alfamart",
    nama: "Alfamart",
    biaya: 10000,
  },
];

const dataSummary = {
  jumlah: 9999999,
  berat: 1000000,
  subtotal: 99999999,
  diskon: 99999999,
  pengiriman: 99999999,
  tambahan: 4000,
  voucher: 99999999,
};

// Separated each section into component

const Stepper = () => {
  return (
    <HStack className={styles.secondaryFont} justify={"center"}>
      <Circle bg={"gray.50"} size={"2rem"}>
        1
      </Circle>
      <Text color={"gray.500"}>Alamat penerima</Text>

      <Divider
        orientation="horizontal"
        color={"gray.500"}
        w={{ base: "5%", md: "25%" }}
        mx={"auto"}
      />

      <Circle bg={"orange.400"} size={"2rem"}>
        2
      </Circle>
      <Text>Detail pesanan</Text>
    </HStack>
  );
};

function EditableControls() {
  const { getEditButtonProps } = useEditableControls();

  return (
    <IconButton
      icon={<IoCreateOutline />}
      variant={"ghost"}
      {...getEditButtonProps()}
    />
  );
}

export const Produk = ({ produk, resi }) => {
  const [isSmartphone] = useMediaQuery("(max-width: 48em)");

  return (
    <Grid
      gridTemplateColumns={{
        base: "repeat(2, 1fr)",
        md: "3fr 1fr 1fr 1fr",
      }}
      gridTemplateRows={{
        base: `1fr fit-content(1fr) fit-content(1fr)`,
        md: `1fr`,
      }}
      gridTemplateAreas={{
        base: `'barang barang' 'jumlah harga' 'subtotal subtotal'`,
        md: `'barang harga jumlah subtotal'`,
      }}
      rowGap={"0.25rem"}
    >
      <Box gridArea={"barang"}>
        <HStack spacing={"1rem"} align={"start"}>
          <Image
            src={produk.gambar}
            alt="Gambar produk"
            borderRadius={"0.625rem"}
            boxSize={"3rem"}
          />
          <Box>
            <Heading color={"gray.700"} isTruncated fontSize={"1rem"}>
              {produk.nama}
            </Heading>
            <Text color={"gray.500"}>{produk.deskripsi}</Text>
            <Text color={"gray.500"}>
              Berat: {formatNumber(produk.berat)}gr
            </Text>
          </Box>
        </HStack>
        {!resi && (
          <Editable
            className={styles.secondaryFont}
            color={"gray.400"}
            fontSize={"0.75rem"}
            defaultValue="Tambah catatan"
            isPreviewFocusable={false}
          >
            <HStack spacing={"0.25rem"}>
              <EditableControls />
              <Box>
                <EditablePreview />
                <EditableInput />
              </Box>
            </HStack>
          </Editable>
        )}
      </Box>
      <Box
        gridArea={"harga"}
        justifySelf={{ base: "self-end", md: "self-start" }}
        alignSelf={{ md: "center" }}
      >
        <Stack
          spacing={"0.25rem"}
          align={"flex-end"}
          direction={{ base: "row-reverse", md: "column" }}
        >
          <Box textAlign={{ base: "right", lg: "left" }}>
            <Text fontSize={"0.75rem"} as={"s"} color={"gray.400"}>
              Rp{formatNumber(produk.harga)}
            </Text>
            <Text color={"gray.700"}>Rp{formatNumber(produk.harga)}</Text>
          </Box>
          <Square
            color={"white"}
            bg={"red.500"}
            borderRadius={"0.25rem"}
            px={"0.5rem"}
            py={"0.25rem"}
            fontSize={{ base: "0.5rem", md: "0.875rem" }}
          >
            Diskon {produk.diskon}%
          </Square>
        </Stack>
      </Box>

      <HStack
        gridArea={"jumlah"}
        alignSelf={{ base: "self-end", md: "center" }}
        justifySelf={{ md: "center" }}
      >
        {isSmartphone && <Text>Jumlah:</Text>}
        <Text color={"gray.500"}>{formatNumber(produk.jumlah)}</Text>
      </HStack>
      <HStack
        gridArea={"subtotal"}
        justify={"space-between"}
        justifySelf={{ md: "center" }}
      >
        {isSmartphone && <Text>Subtotal:</Text>}
        <Text color={"gray.700"}>
          Rp{formatNumber(produk.jumlah * produk.harga)}
        </Text>
      </HStack>
    </Grid>
  );
};

const RingkasanPesanan = () => {
  const [isSmartphone] = useMediaQuery("(max-width: 48em)");

  return (
    <Box>
      <Heading
        as={"h3"}
        fontSize={"1.5rem"}
        mb={"1rem"}
        className={styles.primaryFont}
      >
        Ringkasan Pesanan
      </Heading>
      <SimpleGrid spacing={"1rem"} columns={{ base: 1, md: 2 }} mb={"1rem"}>
        <Box
          padding={"1rem"}
          borderRadius={"0.5rem"}
          border={"1px"}
          borderColor={"gray.300"}
        >
          <Flex justify={"space-between"} mb={"1.5rem"}>
            <Text fontSize={"1.25rem"} className={styles.primaryFont}>
              Data Pengirim
            </Text>
            <Button variant="outline" color={"gray.400"} size={"sm"}>
              Ubah
            </Button>
          </Flex>

          <Text fontWeight={"bold"} className={styles.primaryFont}>
            {dataPengirim.nama}
          </Text>
          <Text className={styles.primaryFont} fontWeight={"normal"}>
            {formatPhoneNumber(dataPengirim.nomorHandphone)}
          </Text>
        </Box>

        <Box
          padding={"1rem"}
          borderRadius={"0.5rem"}
          border={"1px"}
          borderColor={"gray.300"}
        >
          <Flex justify={"space-between"} mb={"1.5rem"}>
            <Text fontSize={"1.25rem"} className={styles.primaryFont}>
              Data Penerima
            </Text>
            <Button variant="outline" color={"gray.400"} size={"sm"}>
              Ubah
            </Button>
          </Flex>

          <Text fontWeight={"bold"} className={styles.primaryFont}>
            {dataPenerima.nama}
          </Text>
          <Text className={styles.primaryFont} fontWeight={"normal"}>
            {formatPhoneNumber(dataPenerima.nomorHandphone)}
          </Text>

          <Spacer h={"0.5rem"} />

          <Text className={styles.secondaryFont}>{dataPenerima.alamat}</Text>
        </Box>
      </SimpleGrid>
      <Stack
        className={styles.secondaryFont}
        direction={"column"}
        borderRadius={"0.5rem"}
        borderWidth={{ base: "0px", md: "1px" }}
        borderColor="gray.300"
        padding={{ base: "0rem", md: "1rem" }}
        spacing={{ base: "1rem", md: "0.875rem" }}
        divider={<StackDivider borderColor="gray.200" />}
      >
        {!isSmartphone && (
          <Grid
            gridTemplateColumns={"3fr 1fr 1fr 1fr"}
            className={styles.primaryFont}
          >
            <Text>Produk</Text>
            <Text>Harga Satuan</Text>
            <Text textAlign={"center"}>Jumlah</Text>
            <Text textAlign={"center"}>Subtotal</Text>
          </Grid>
        )}
        {listProduk.map((produk, index) => (
          <Produk produk={produk} key={index} />
        ))}
      </Stack>
    </Box>
  );
};

const JasaPengiriman = ({ idJasaPengiriman }) => {
  const jasa = listJasaPengiriman.find((e) => e.id === idJasaPengiriman);
  return (
    <>
      <Flex direction={"column"}>
        <Text className={styles.primaryFont}>{jasa.nama}</Text>
        <Text className={styles.secondaryFont}>
          Estimasi {jasa.estimasi} hari
        </Text>
      </Flex>

      <Text className={styles.secondaryFont}>
        Rp. {formatNumber(jasa.harga)}
      </Text>
    </>
  );
};

const Pengiriman = ({ beratTotal }) => {
  const [idJasaPengiriman, setIdJasaPengiriman] = useState("");

  return (
    <Box>
      <Heading
        as={"h3"}
        mb={"1rem"}
        fontSize={"1.5rem"}
        className={styles.primaryFont}
      >
        Pengiriman
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={"2rem"}
        padding={"1rem"}
        borderRadius={"0.5rem"}
        border={"1px"}
        borderColor={"gray.300"}
      >
        <Flex direction={"column"}>
          <HStack className={styles.primaryFont} color={"gray.600"}>
            <Text>Total berat:</Text>
            <Text fontWeight={"normal"}>{formatNumber(beratTotal)} gr</Text>
          </HStack>
          <Select
            className={styles.secondaryFont}
            placeholder="Pilih jasa pengiriman"
            onChange={(event) => {
              setIdJasaPengiriman(event.target.value);
            }}
          >
            {listJasaPengiriman.map((jasa, index) => (
              <option value={jasa.id} key={index}>
                {jasa.nama}
              </option>
            ))}
          </Select>
        </Flex>
        <Flex justify={"space-between"}>
          {idJasaPengiriman && (
            <JasaPengiriman idJasaPengiriman={idJasaPengiriman} />
          )}
        </Flex>
      </SimpleGrid>
    </Box>
  );
};

const CatatanPesanan = () => {
  return (
    <Box>
      <Heading
        as={"h3"}
        mb={"1rem"}
        fontSize={"1.5rem"}
        className={styles.primaryFont}
      >
        Catatan Pesanan
      </Heading>
      <Textarea
        className={styles.secondaryFont}
        placeholder="Tuliskan catatan untuk penjual"
      />
    </Box>
  );
};

const MetodePembayaran = () => {
  const [biaya, setBiaya] = useState("");
  const [isCod, setCod] = useState(false);

  const metodePembayaranCOD = () => (
    <InputGroup className={styles.secondaryFont}>
      <InputLeftAddon children="Diskon Pelanggan" />
      <NumberInput
        defaultValue={biaya}
        min={0}
        max={100}
        allowMouseWheel
        textAlign={"right"}
      >
        <NumberInputField textAlign={"right"} />
      </NumberInput>
      <InputRightAddon children="%" />
    </InputGroup>
  );

  return (
    <VStack spacing={"1rem"} align={"stretch"}>
      <Heading as={"h3"} fontSize={"1.5rem"} className={styles.primaryFont}>
        Metode Pembayaran
      </Heading>
      <Select
        className={styles.secondaryFont}
        placeholder="Pilih metode pembayaran"
        onChange={(event) => {
          const idMetodePembayaran = event.target.value;
          if (idMetodePembayaran === "cod") {
            setCod(true);
          } else {
            const metode = listMetodePembayaran.find(
              (element) => element.id === idMetodePembayaran,
            );
            setBiaya(formatNumber(metode.biaya));
          }
        }}
      >
        {listMetodePembayaran.map((metode, index) => (
          <option value={metode.id} key={index}>
            {metode.nama}
          </option>
        ))}
      </Select>
      {biaya && (
        <Flex
          justify={"space-between"}
          color={"gray.600"}
          className={styles.primaryFont}
        >
          {isCod ? (
            metodePembayaranCOD()
          ) : (
            <>
              <Text>Biaya Tambahan:</Text>
              <Text>Rp{biaya}</Text>
            </>
          )}
        </Flex>
      )}
    </VStack>
  );
};

const VoucherResult = ({ nama, harga }) => {
  return (
    <Box
      padding={"1rem"}
      borderRadius={"0.5rem"}
      border={"1px"}
      borderColor={"orange.200"}
      bg={"orange.50"}
      color={"orange.500"}
      className={styles.primaryFont}
    >
      <HStack justify={"space-between"}>
        <Box>
          <Text color={"orange.700"} fontSize={"0.75rem"} fontWeight={"normal"}>
            Voucher berhasil di klaim!
          </Text>
          <Text>{nama}</Text>
        </Box>
        <Text>Rp{formatNumber(harga)}</Text>
      </HStack>
    </Box>
  );
};

const Voucher = () => {
  const [voucher, setVoucher] = useState({});
  const [value, setValue] = useState("");
  return (
    <VStack spacing={"1rem"} align={"stretch"}>
      <Heading as={"h3"} fontSize={"1.5rem"} className={styles.primaryFont}>
        Voucher
      </Heading>
      <InputGroup>
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className={styles.secondaryFont}
          placeholder="Masukan kode voucher"
        />
        <InputRightElement w={"4rem"}>
          <Button
            className={styles.secondaryFont}
            fontWeight={"normal"}
            fontSize={"0.875rem"}
            onClick={() => checkVoucher(value, setVoucher)}
          >
            Klaim
          </Button>
        </InputRightElement>
      </InputGroup>
      {!isEmpty(voucher) && (
        <VoucherResult nama={voucher.nama} harga={voucher.harga} />
      )}
    </VStack>
  );
};

const Confirmation = () => {
  return (
    <Box
      padding={"1rem"}
      borderRadius={"0.5rem"}
      border={"1px"}
      borderColor={"gray.300"}
    >
      <Checkbox defaultIsChecked colorScheme={"red"} isRequired>
        Saya menyetujui bahwa biaya pengiriman bersifat final. Apabila terjadi
        selisih maka tidak ada penagihan/pengembalian.
      </Checkbox>
    </Box>
  );
};

const Summary = ({ data }) => {
  return (
    <VStack
      padding={"1rem"}
      align={"stretch"}
      borderRadius={"0.5rem"}
      border={"1px"}
      borderColor={"gray.300"}
      className={styles.primaryFont}
      spacing={"0.75rem"}
      divider={<StackDivider borderColor="gray.200" />}
      maxW={{ xl: "25%" }}
      w={"full"}
    >
      <VStack spacing={"0.625rem"} align={"stretch"} color={"gray.500"}>
        <Heading
          className={styles.primaryFont}
          fontSize={"1.125rem"}
          color={"gray.700"}
        >
          Ringkasan
        </Heading>
        <Flex justify={"space-between"}>
          <Text>Jumlah</Text>
          <Text className={styles.secondaryFont}>
            {formatNumber(data.jumlah)} pcs
          </Text>
        </Flex>
        <Flex justify={"space-between"}>
          <Text>Berat</Text>
          <Text className={styles.secondaryFont}>
            {formatNumber(data.berat)} gr
          </Text>
        </Flex>
      </VStack>

      <VStack spacing={"0.625rem"} align={"stretch"} color={"gray.500"}>
        <Heading
          className={styles.primaryFont}
          fontSize={"1.125rem"}
          color={"gray.700"}
        >
          Pembayaran
        </Heading>
        <Flex justify={"space-between"}>
          <Text>Subtotal</Text>
          <Text className={styles.secondaryFont}>
            Rp{formatNumber(data.subtotal)}
          </Text>
        </Flex>
        <Flex justify={"space-between"}>
          <Text>Pengiriman</Text>
          <Text className={styles.secondaryFont}>
            Rp{formatNumber(data.pengiriman)}
          </Text>
        </Flex>
        {data.tambahan !== 0 && (
          <Flex justify={"space-between"}>
            <Text>Tambahan</Text>
            <Text className={styles.secondaryFont}>
              Rp{formatNumber(data.tambahan)}
            </Text>
          </Flex>
        )}
        {data.diskon !== 0 && (
          <Flex justify={"space-between"}>
            <Text>Diskon</Text>
            <Text className={styles.secondaryFont}>
              -Rp{formatNumber(data.diskon)}
            </Text>
          </Flex>
        )}
        {data.voucher !== 0 && (
          <Flex justify={"space-between"}>
            <Text>Voucher</Text>
            <Text className={styles.secondaryFont}>
              -Rp{formatNumber(data.voucher)}
            </Text>
          </Flex>
        )}
      </VStack>

      <VStack align={"stretch"} spacing={"1.125rem"}>
        <Flex justify={"space-between"}>
          <Text color={"gray.500"}>Total</Text>
          <Text color={"orange.400"} className={styles.secondaryFont}>
            Rp
            {formatNumber(
              data.subtotal +
                data.pengiriman +
                data.tambahan -
                data.diskon -
                data.voucher,
            )}
          </Text>
        </Flex>

        <Button bg={"red.500"} color={"white"}>
          Pesan Sekarang
        </Button>
      </VStack>
    </VStack>
  );
};

const DetailPesanan = () => {
  const [isSmartphone] = useMediaQuery("(max-width: 48em)");
  const [isTablet] = useMediaQuery("(max-width: 62em)");

  return (
    <>
      <Navbar />
      <Breadcrumb
        separator={<IoChevronForward />}
        ml={{ base: "2rem", md: "7.5rem" }}
        className={styles.secondaryFont}
        mb={"1.5rem"}
        mt={{ base: "4rem", md: "5.5rem" }}
        p={"0.625rem"}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="#">Checkout</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem
          isCurrentPage
          color={"orange.400"}
          className={styles.primaryFont}
        >
          <BreadcrumbLink href="#">Detail Pesanan</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Stack
        align={"start"}
        direction={{ base: "column", md: "row" }}
        spacing={{ md: "1.5rem" }}
        px={{ base: "2rem", md: "7rem" }}
      >
        <Box>
          <Stepper />
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={"1.5rem"}
            align={"stretch"}
            my={"2rem"}
          >
            <RingkasanPesanan />
            <Pengiriman beratTotal={999} />
            <CatatanPesanan />

            <SimpleGrid spacing={"1.5rem"} columns={{ base: 1, md: 2 }}>
              <MetodePembayaran />
              <Voucher />
            </SimpleGrid>

            <VStack align={"stretch"} spacing={"1.5rem"}>
              <Confirmation />

              {(isSmartphone || isTablet) && <Summary data={dataSummary} />}

              <Flex justify={"space-between"}>
                <Button
                  className={styles.primaryFont}
                  borderColor={"gray.500"}
                  variant={"outline"}
                  color={"gray.500"}
                  flexGrow={{ base: 1, xl: 0 }}
                >
                  Sebelumnya
                </Button>
                {!isSmartphone && !isTablet && (
                  <Button
                    className={styles.primaryFont}
                    bg={"red.500"}
                    color={"white"}
                  >
                    Pesan Sekarang
                  </Button>
                )}
              </Flex>
            </VStack>
          </VStack>
        </Box>

        {!isSmartphone && !isTablet && <Summary data={dataSummary} />}
      </Stack>
      <Footer />
    </>
  );
};

export default DetailPesanan;
