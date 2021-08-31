import { useWindowSize } from "../hooks/useWindowSize";
import {
  Editable, EditableInput,
  EditablePreview,
  Grid,
  Heading,
  HStack,
  IconButton, Image,
  Square,
  Stack,
  useEditableControls,
} from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/layout";
import { formatNumber } from "../utils/functions";
import { IoCreateOutline } from "react-icons/io5";

const EditableControls = () => {
  const { getEditButtonProps } = useEditableControls();

  return (
    <IconButton
      icon={<IoCreateOutline />}
      variant={"ghost"}
      {...getEditButtonProps()}
    />
  );
};

/**
 * @param {string} id Id produk
 * @param {string} gambar Source path dari gambar produk
 * @param {string} nama Nama gambar
 * @param {string} deskripsi Deskripsi produk
 * @param {int} berat Berat produk
 * @param {int} diskon Diskon produk
 * @param {int} harga Harga produk
 * @param {int} jumlah Jumlah produk yang tersedia
 */


const CheckoutProduct = ({ gambar, nama, deskripsi, berat, diskon, harga, jumlah }) => {
  const { width } = useWindowSize();
  const isSmartphone = width < 768;

  const realPrice = diskon === 0 ? harga : (harga * (100 - diskon)) / 100;

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
      alignSelf="stretch"
    >
      <Box gridArea={"barang"}>
        <HStack spacing={"1rem"} align={"start"}>
          <Image
            src={gambar}
            alt="Gambar produk"
            borderRadius={"0.625rem"}
            boxSize={"3rem"}
          />
          <Box>
            <Heading color="gray.700" isTruncated fontSize="1rem" mb="0.25rem">
              {nama}
            </Heading>
            <Text color="gray.500" fontSize="0.875rem" isTruncated>{deskripsi}</Text>
            <Text color="gray.500" fontSize="0.875rem">
              Berat: {formatNumber(berat)}gr
            </Text>
          </Box>
        </HStack>
        {
          <Editable
            className="secondaryFont"
            color={"gray.400"}
            fontSize={"0.75rem"}
            defaultValue="Tambah catatan"
            isPreviewFocusable={false}
          >
            <HStack spacing={"0.25rem"}>
              <EditableControls />
              <Box>
                <EditablePreview />
                <EditableInput color="black" />
              </Box>
            </HStack>
          </Editable>
        }
      </Box>
      <Box
        gridArea={"harga"}
        justifySelf={{ base: "self-end", md: "self-start" }}
        alignSelf={{ md: "center" }}
      >
        <Stack
          spacing={"0.25rem"}
          align={{ base: "flex-end", md: "start" }}
          direction={{ base: "row-reverse", md: "column" }}
        >
          <Box textAlign={{ base: "right", lg: "left" }}>
            {
              diskon !== 0 &&
              <Text fontSize={"0.75rem"} as={"s"} color={"gray.400"}>
                Rp{formatNumber(harga)}
              </Text>
            }
            <Text color={"gray.700"}>Rp{formatNumber(realPrice)}</Text>
          </Box>
          {
            diskon !== 0 &&
            <Square
              color={"white"}
              bg={"red.500"}
              borderRadius={"0.25rem"}
              px={"0.5rem"}
              py={"0.25rem"}
              fontSize={{ base: "0.5rem", md: "0.875rem" }}
            >
              Diskon {diskon}%
            </Square>
          }
        </Stack>
      </Box>

      <HStack
        gridArea={"jumlah"}
        alignSelf={{ base: "self-end", md: "center" }}
        justifySelf={{ md: "center" }}
      >
        {isSmartphone && <Text>Jumlah:</Text>}
        <Text color={"gray.500"}>{formatNumber(jumlah)}</Text>
      </HStack>
      <HStack
        fontWeight={700}
        gridArea={"subtotal"}
        justify={"space-between"}
        justifySelf={{ md: "center" }}
      >
        {isSmartphone && <Text>Subtotal:</Text>}
        <Text color={"gray.700"}>
          Rp{formatNumber(jumlah * harga)}
        </Text>
      </HStack>
    </Grid>
  );
};

export default CheckoutProduct;