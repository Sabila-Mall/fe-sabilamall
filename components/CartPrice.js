import { Input } from "@chakra-ui/input";
import { Box, Flex, HStack, Text } from "@chakra-ui/layout";
import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

export const CartPrice = ({ isDiscount, price }) => {
  const idr = Intl.NumberFormat("id-ID");
  // price = Number(price.replace(/\./g, ""));
  return (
    <>
      {isDiscount ? (
        <>
          <Flex flexDirection="column">
            <Text
              textDecoration="line-through"
              fontSize="0.8rem"
              color="gray.500"
            >
              Rp99.999.999
            </Text>
            <Flex mb="12px" flexDir={{ base: "row", md: "column" }}>
              <Text
                fontSize="1.1rem"
                color="black"
                mr="10px"
                fontWeight="500"
                my={{ md: "0.5rem" }}
              >
                Rp99.999.999
              </Text>
              <Box
                w={{ lg: "6rem" }}
                bgColor="red.500"
                color="white"
                borderRadius="4px"
                py="2px"
                px="8px"
                fontWeight="500"
              >
                <Text as="h1" fontSize="14px" textAlign="center">
                  Diskon 99%
                </Text>
              </Box>
            </Flex>
          </Flex>
        </>
      ) : (
        <Text fontSize="1.1rem" mb="12px">
          Rp99.999.999
        </Text>
      )}
    </>
  );
};
