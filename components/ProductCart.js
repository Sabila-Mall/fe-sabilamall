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

export const ProductCart = ({ isDiscount, price }) => {
  const [amount, setAmount] = useState(1);
  const idr = Intl.NumberFormat("id-ID");
  price = Number(price.replace(/\./g, ""));

  return (
    <Box mb="1.75rem">
      <Flex w="full" alignItems="start" justifyContent="center" mb="1.75rem">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="fit-content"
          mr="8px"
        >
          <Box position="relative" w="100px" h="100px">
            <Image
              layout="fill"
              quality={100}
              src="/images/cart/cartimage.svg"
            />
          </Box>
          <HStack pt="9.25px" color="#A0AEC0">
            <RiPencilFill size="1.5em" />
            <IoTrash size="1.5em" />
          </HStack>
        </Flex>
        <Flex flexDirection="column" w="16.125rem" fontWeight="500">
          <Text as="h1" isTruncated mb="8px">
            Nama Produk Croissant Jujubes...
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
          {isDiscount ? (
            <>
              <Text
                textDecoration="line-through"
                fontSize="0.8rem"
                color="gray.500"
              >
                Rp99.999.999
              </Text>
              <Flex alignItems="center" mb="12px">
                <Text fontSize="1.1rem" color="black" mr="10px">
                  Rp99.999.999
                </Text>
                <Box
                  bgColor="red.500"
                  color="white"
                  borderRadius="4px"
                  py="2px"
                  px="8px"
                  fontWeight="500"
                >
                  <Text as="h1" fontSize="14px">
                    Diskon 99%
                  </Text>
                </Box>
              </Flex>
            </>
          ) : (
            <Text fontSize="1.1rem" mb="12px">
              Rp99.999.999
            </Text>
          )}
          <HStack alignItems="center">
            <AiOutlineMinusCircle
              color="#E2E8F0"
              size="1.5em"
              onClick={() => {
                if (amount > 0) setAmount(amount - 1);
              }}
            />
            <Input
              color="black"
              textAlign="center"
              isDisabled
              variant="outline"
              w="5rem"
              h="2rem"
              placeholder={String(amount)}
            />
            <AiOutlinePlusCircle
              size="1.5em"
              onClick={() => {
                setAmount(amount + 1);
              }}
            />
          </HStack>
          <Text pt="8px" fontSize="1.2rem" color="orange.400">
            Rp{idr.format(amount * price)}
          </Text>
        </Flex>
      </Flex>
      <Divider />
    </Box>
  );
};
