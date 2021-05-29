import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { css } from "@emotion/react";
import Image from "next/image";
import { useState } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

export const CardProduct = ({ isDiscount, discountAmount }) => {
  const [onWishList, setOnWishList] = useState(false);

  return (
    <Box
      w="10.5rem"
      h="17.25rem"
      border="solid #CBD5E0 0.5px"
      borderRadius="8px"
      css={css`
        transition: 0.3s;
        :hover {
          cursor: pointer;

          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
        }
      `}
    >
      <Flex
        w="full"
        pos="relative"
        justifyContent="center"
        flexDirection="column"
      >
        <img layout="fill" src="/images/ProductDetail/products.svg" />
        <Box px="8px">
          <Text w="full" h="48px" as="h1" fontWeight="500" fontSize="1rem">
            ALEA GAMIS CASUAL
          </Text>
          <Box pt="0.2rem">
            {isDiscount && (
              <>
                <Flex alignItems="center" fontWeight="500">
                  <Text
                    mr="9px"
                    as="h1"
                    fontSize="0.825rem"
                    textDecoration="line-through"
                    color="gray.500"
                    lineHeight="15px"
                  >
                    Rp 180.000
                  </Text>
                  <Flex
                    w="32px"
                    h="22px"
                    borderRadius="4px"
                    fontSize="13px"
                    bg="#FEB2B2"
                    color="red.700"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {discountAmount}
                  </Flex>
                </Flex>
                <Text as="h1" fontWeight="bold" fontSize="1.1rem">
                  Rp 168.000
                </Text>
              </>
            )}
          </Box>
        </Box>
        <Box
          pos="absolute"
          right="1rem"
          bottom="1.7px"
          onClick={() => setOnWishList(!onWishList)}
        >
          {!onWishList ? (
            <IoHeartOutline size="1.3em" />
          ) : (
            <IoHeart size="1.3em" color="red" />
          )}
        </Box>
      </Flex>
    </Box>
  );
};
