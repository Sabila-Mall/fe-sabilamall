import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, useDisclosure, Button, Text, Flex, Link, useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import QuickAddListItem from "./QuickAddListItem";


const QuickAdd = ({ products }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const total = "99.999.999";
  const size = useBreakpointValue({ base: "full", md: "md" })

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
        size={size}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={"gray.500"}/>
          <DrawerHeader textColor={"gray.500"} px={"2rem"} paddingTop={6}>
            <Text>Keranjang Saya</Text>
          </DrawerHeader>

          <DrawerBody px={"2rem"}>
            <QuickAddListItem products={products}/>
          </DrawerBody>

          <DrawerFooter borderTopWidth={"1px"} flexDirection={"column"}>
            <Flex align={"center"} justify={"space-between"} w={"full"}>
              <Text fontSize={"16px"} textColor={"gray.500"}>Total</Text>
              <Text textColor={"orange.400"} fontSize={"20"} fontWeight={"bold"}>
                Rp{total}
              </Text>
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
