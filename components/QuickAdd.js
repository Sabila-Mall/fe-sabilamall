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
  Link,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
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
const QuickAdd = ({ products, isDrawerOpen, onDrawerClose }) => {
  const { cartData, loading } = useCartContext();
  const [dataValue, setdataValue] = useState(cartData[0]);
  const [loadingValue, setloadingValue] = useState(loading[0])
  const cartValue = dataValue.keranjang
  console.log(dataValue);
  console.log(cartValue);

  const total = "99.999.999";
  const size = useBreakpointValue({ base: "full", md: "md" });

  return (
    <>
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

          <DrawerBody px={"2rem"}>
            <QuickAddListItem products={dataValue} />
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
                Rp{total}
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
            >
              Checkout
            </Button>
            <Link
              textColor={"red.500"}
              fontWeight={"bold"}
              fontSize={"14px"}
              className={"primaryFont"}
              mt="0.5rem"
            >
              Lihat detail keranjang belanja
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default QuickAdd;
