import { Divider, Text } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/layout";
import { Flex, Box } from "@chakra-ui/layout";
import { Checkbox, Image, Radio } from "@chakra-ui/react";
import { useState } from "react";
import { IMAGE_HOST } from "../constants/api";
import { useAuthContext } from "../contexts/authProvider";
import { useCartContext } from "../contexts/cartProvider";

import { CartPrice } from "./CartPrice";

export const ProductCart = ({ isDiscount, product }) => {
  const [isSelected, setisSelected] = useState(false)
  const { userData } = useAuthContext();
  const userId = userData?.id;
  const { addToCheckout, deleteFromCheckout } = useCartContext();

  const productName = product?.products_name
  const productPath = product?.products_image_path
  const productPrice = product?.final_price
  const varian = product?.varian

  const handleCheckbox = () => {
    setisSelected(!isSelected)
    if (isSelected) {
      addToCheckout(product)
    } else {
      deleteFromCheckout(product)
    }
  }

  console.log(product);
  return (
    <Box width="100%" px={{ base: "1rem", md: 0 }} as="label" onClick={(e) => handleCheckbox()}>
      <Flex
        alignItems="start"
        justifyContent={{ base: "center", md: "start" }}
        mb={{ base: "1.75rem", md: "0" }}
        justifyContent="flex-start"
      >
        <Checkbox alignSelf="center" mr="20px"></Checkbox>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          mr="8px"
        >
          <Box
            position="relative"
            w={{ base: "5em", sm: "8em", md: "6em" }}
            h={{ base: "5em", sm: "8em", md: "6em" }}
          >
            <Image
              layout="fill"
              quality={100}
              src={IMAGE_HOST + productPath}
            />
          </Box>
        </Flex>

        <Flex
          flexDirection="column"
          w={{ base: "70%", md: "9rem", xl: "100%" }}
          fontWeight="500"
        >
          <Text as="h1" isTruncated mb="8px">
            {productName}
          </Text>
          <VStack spacing="3px" alignItems="start" mb="1rem">
            {varian && varian.map((el, index) => {
              return (
                <Text color="gray.500" fontSize="14px">
                  {`${el.products_options_name} : ${el.products_options_values_name}`}
                </Text>
              )
            })}
          </VStack>
          <Box display={{ md: "none" }}>
            <CartPrice isDiscount={isDiscount} price={productPrice} />
          </Box>
        </Flex>
      </Flex>
      <Divider display={{ md: "none" }} />
    </Box>
  );
};
