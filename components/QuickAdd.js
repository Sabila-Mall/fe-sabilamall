import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, useDisclosure, Button, Text, Flex, Link
} from "@chakra-ui/react";
import React from "react";
import QuickAddListItem from "./QuickAddListItem";

const formatPrice = (price) => {
  return new Intl.NumberFormat(
    "id-ID",
    { style: "decimal", currency: "IDR" })
    .format(price);
};

const QuickAdd = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const price = "99.999.999";

  const products = [
    {
      "name": "Nama Produk Croissant Jujubes Sweet Sweet Powder Tiramisu Caramels",
      "image": "",
      "discount": 0,
    },
    {
      "name": "Nama Produk Croissant Jujubes Sweet Sweet Powder Tiramisu Caramels",
      "image": "",
      "discount": 0,
    },
    {
      "name": "Nama Produk Croissant Jujubes Sweet Sweet Powder Tiramisu Caramels",
      "image": "",
      "discount": 0,
    },
  ];

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textColor={"gray.500"} marginTop={6} marginLeft={8}>
            <Text>Keranjang Saya</Text>
          </DrawerHeader>

          <DrawerBody mx={8}>
            <QuickAddListItem products={products}/>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px" flexDirection={"column"}>
            <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Text fontSize={"16px"} textColor={"gray.500"} flex={1}>Total</Text>
              <Text textColor={"orange.400"} fontSize={"20"} fontWeight={"bold"} flex={1}>Rp${price}</Text>
            </Flex>
            <Text fontSize={"14px"} textColor={"gray.400"} className={"secondaryFont"}>
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
