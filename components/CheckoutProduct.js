import { Box, Text } from "@chakra-ui/layout";
import { Grid, Heading, HStack, Image, Square, Stack, Editable, EditableInput, EditablePreview, useEditableControls, IconButton } from "@chakra-ui/react";
import { IoCreateOutline } from "react-icons/io5";

import { IMAGE_HOST } from "../constants/api";
import { useWindowSize } from "../hooks/useWindowSize";
import { formatNumber } from "../utils/functions";
const CheckoutProduct = ({ product }) => {
  const { width } = useWindowSize();
  const isSmartphone = width < 768;

  const gambarURL = product.products_image_path_medium;
  const discount = Number(product.customers_discount);
  const berat = Number(product.products_weight);
  const harga = Number(product.final_price);
  const nama = product.products_name;
  const varian = product?.varian;
  const jumlah = product.customers_basket_quantity;
  const catatan = product.customers_basket_notes

  let deskripsiArray = [];
  let deskripsi;

  if (varian) {
    varian.forEach((element) => {
      deskripsiArray.push(element.products_options_values_name);
    });
  }

  if (deskripsiArray.length) {
    deskripsi = deskripsiArray.join(", ");
  }

  const realPrice = discount === 0 ? harga : (harga * (100 - discount)) / 100;

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
            src={IMAGE_HOST + gambarURL}
            alt="Gambar produk"
            borderRadius={"0.625rem"}
            boxSize={"3rem"}
          />
          <Box>
            <Heading color="gray.700" isTruncated fontSize="1rem" mb="0.25rem">
              {nama}
            </Heading>
            <Text color="gray.500" fontSize="0.875rem" isTruncated>
              {deskripsi}
            </Text>
            <Text color="gray.500" fontSize="0.875rem">
              Berat: {formatNumber(berat)}gr
            </Text>
          </Box>
        </HStack>
        {catatan && <Editable
          mt="0.75rem"
          className="secondaryFont"
          color={"gray.400"}
          fontSize={"0.75rem"}
          isDisabled={true}
          isPreviewFocusable={false}
          placeholder={catatan}
        >
          <HStack spacing={"0.25rem"}>
            <EditableControls />
            <Box>
              <EditablePreview />
              <EditableInput color="black" />
            </Box>
          </HStack>
        </Editable>}

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
            {discount !== 0 && (
              <Text fontSize={"0.75rem"} as={"s"} color={"gray.400"}>
                Rp{formatNumber(harga)}
              </Text>
            )}
            <Text color={"gray.700"}>Rp{formatNumber(realPrice)}</Text>
          </Box>
          {discount !== 0 && (
            <Square
              color={"white"}
              bg={"red.500"}
              borderRadius={"0.25rem"}
              px={"0.5rem"}
              py={"0.25rem"}
              fontSize={{ base: "0.5rem", md: "0.875rem" }}
            >
              Diskon {discount}%
            </Square>
          )}
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
        <Text color={"gray.700"}>Rp{formatNumber(jumlah * harga)}</Text>
      </HStack>
    </Grid>
  );
};

export default CheckoutProduct;
