import { Button, DrawerCloseButton, Icon, StackDivider, Text, VStack } from "@chakra-ui/react";
import React from "react";
import QuickAddItem from "./QuickAddItem";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useCartContext } from "../contexts/cartProvider";

const QuickAddListItem = () => {

  const { cartData, loading } = useCartContext();
  console.log(cartData);
  if (cartData.length > 0) {
    return (
      <VStack spacing={6} divider={<StackDivider borderColor="gray.200" />} align={"start"}>
        {loading ? <Grid placeItems="center"><Spinner /></Grid> :
          cartData && cartData.map((product, index) => {
            return (
              <QuickAddItem key={index} product={product} />
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