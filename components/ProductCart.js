import { Input } from "@chakra-ui/input";
import { Divider, Text } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/layout";
import { Flex, Box } from "@chakra-ui/layout";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { IoTrash } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import { IMAGE_HOST } from "../constants/api";
import { useAuthContext } from "../contexts/authProvider";
import { useCartContext } from "../contexts/cartProvider";

import { CartPrice } from "./CartPrice";

export const ProductCart = ({ isDiscount, product }) => {
  const { userData } = useAuthContext();
  const userId = userData?.id;
  const { tempData, updateCart } = useCartContext();

  const productName = product?.products_name
  const productPath = product?.products_image_path
  const productPrice = product?.final_price

  const varian = product?.varian

  console.log(product);
  return (
    <Box width="100%" px={{ base: "1rem", md: 0 }}>
      <Flex
        alignItems="start"
        justifyContent={{ base: "center", md: "start" }}
        mb={{ base: "1.75rem", md: "0" }}
        justifyContent="flex-start"
      >
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
              src="/images/cart/cartimage.svg"
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
