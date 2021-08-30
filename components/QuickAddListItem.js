import { Button, DrawerCloseButton, Icon, StackDivider, Text, VStack } from "@chakra-ui/react";
import React from "react";
import QuickAddItem from "./QuickAddItem";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useCartContext } from "../contexts/cartProvider";

const QuickAddListItem = () => {

  const { cartDataByVendor, loading } = useCartContext();
  if (cartDataByVendor.length > 0) {
    return (
      <VStack spacing={6} divider={<StackDivider borderColor="gray.200" />} align={"start"}>
        {loading ? <Grid placeItems="center"><Spinner /></Grid> :
          cartDataByVendor && cartDataByVendor.map((el, index) => {
            return (
              <>
                <Text
                  className="secondaryFont"
                  fontSize="1rem"
                  fontWeight="700"
                  mb="1rem"
                >
                  {el.vendors_name}
                </Text>
                {el.keranjang.map((elemenKeranjang, index) => {
                  return (
                    <QuickAddItem key={index} product={elemenKeranjang} my="1rem" />

                  )
                })}
              </>
            )
          }
          )}
      </VStack>
    );
  } else {
    return (
      <VStack justify={"center"} h={"full"}>
        <Text color={"gray.400"}>Keranjang belanja Anda masih kosong.</Text>
        <Button
          as={DrawerCloseButton}
          borderColor={"orange.400"}
          borderWidth={"2px"}
          backgroundColor={"transparent"}
          color={"orange.400"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Icon
            aria-label="Arrow Left"
            as={AiOutlineArrowLeft}
            w={4}
            h={4}
          />
          <Text marginLeft={2}>Kembali Belanja</Text>
        </Button>
      </VStack>
    );
  }
};

export default QuickAddListItem;