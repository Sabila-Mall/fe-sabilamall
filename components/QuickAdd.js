import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Text,
  Flex,
  useBreakpointValue,
  Spinner,
  Grid,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCartContext } from "../contexts/cartProvider";

import QuickAddListItem from "./QuickAddListItem";
/**
 * Component untuk drawer yang menampilkan isi barang sekarang, perlu ada button yang memanggil component ini
 * @param products list dari produk, dimana tiap produk memiliki:
 *  nama produk, path lokasi dari gambar produk, diskon, harga
 * @param isDrawerOpen stattus drawer sekarang apakah sedang terbuka atau tidak [dapatkan dari useDisclosure()]
 * @param onDrawerClose callback function yang dipanggil untuk close modal [dapatkan dari useDisclosure()]
 */
const QuickAdd = ({ isDrawerOpen, onDrawerClose }) => {
  const { loading, totalDiscount, selectedPrice, checkoutValidation } = useCartContext();

  const size = useBreakpointValue({ base: "full", md: "md" });

  const formatPrice = (price) => {
    return new Intl.NumberFormat(
      "id-ID",
      { style: "decimal", currency: "IDR" })
      .format(price);
  };

  const router = useRouter()

  const handleCheckout = () => {
    checkoutValidation()
  }

  return (
    <Drawer
      isOpen={isDrawerOpen}
      placement="right"
      onClose={onDrawerClose}
      size={size}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton
          color={"gray.500"}
          marginTop={"1rem"}
          marginRight={{ base: "2rem", xl: "2.5rem" }}
        />
        <DrawerHeader textColor={"gray.500"} px={"2rem"} paddingTop={6}>
          <Text className={"secondaryFont"}>Keranjang Saya</Text>
        </DrawerHeader>

        {loading ? <Grid placeItems="center">
          <Spinner></Spinner></Grid> : <>
          <DrawerBody px={"2rem"}>
            <QuickAddListItem />
          </DrawerBody>

          <DrawerFooter borderTopWidth={"1px"} flexDirection={"column"}>
            <Flex align={"center"} justify={"space-between"} w={"full"}>
              <Text
                className={"secondaryFont"}
                fontSize={"16px"}
                textColor={"gray.500"}
              >
                Total
              </Text>
              <Text
                className={"primaryFont"}
                textColor={"orange.400"}
                fontSize={"20"}
                fontWeight={"bold"}
              >
                Rp{formatPrice(selectedPrice)}
              </Text>
            </Flex>
            <Text
              fontSize={{ base: "12px", md: "14px" }}
              textColor={"gray.400"}
              className={"secondaryFont"}
              textAlign="center"
              my="0.5rem"
            >
              Ongkos kirim akan dihitung saat proses checkout
            </Text>
            <Button
              backgroundColor={"red.500"}
              color={"white"}
              fontSize={"16px"}
              className={"primaryFont"}
              width={"full"}
              onClick={() => handleCheckout()}
            >
              Checkout
            </Button>
            <Link
              href="/cart-details"
            >
              <Text
                mt="0.5rem"
                textColor={"red.500"}
                fontWeight={"bold"}
                fontSize={"14px"}
                className={"primaryFont"}
                cursor="pointer"
                onClick={() => router.push("/cart-details")}>
                Lihat detail keranjang belanja
              </Text>
            </Link>
          </DrawerFooter>
        </>}

      </DrawerContent>
    </Drawer>
  );
};

export default QuickAdd;
