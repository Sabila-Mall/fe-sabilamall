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

import { CartPrice } from "./CartPrice";

export const ProductCart = ({ isDiscount, price }) => {
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
            Nama Produk Croissant Jujubes asdadasdadadasd
          </Text>
          <VStack spacing="3px" alignItems="start" mb="1rem">
            <Text color="gray.500" fontSize="14px">
              Varian : Lengan Panjang
            </Text>
            <Text color="gray.500" fontSize="14px">
              Warna : Merah Cabe
            </Text>
            <Text color="gray.500" fontSize="14px">
              Ukuran : XXXXXXXL
            </Text>
          </VStack>
          <Box display={{ md: "none" }}>
            <CartPrice isDiscount={isDiscount} price={price} />
          </Box>
        </Flex>
      </Flex>
      <Divider display={{ md: "none" }} />
    </Box>
  );
};
