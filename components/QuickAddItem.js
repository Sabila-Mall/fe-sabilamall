import { Flex, HStack, IconButton, Input, Text, VStack, Image, Square } from "@chakra-ui/react";
import { IoAddCircleOutline, IoRemoveCircleOutline, IoTrash } from "react-icons/io5";

const formatPrice = (price) => {
  return new Intl.NumberFormat(
    "id-ID",
    { style: "decimal", currency: "IDR" })
    .format(price);
};

const QuickAddItem = ({ product }) => {
  return (
    <VStack align={"start"} w={"full"}>
      <HStack align={"top"} justify={"space-between"} spacing={"1rem"} w={"full"}>
        <HStack spacing={"1rem"}>
          <Image
            src={product.image}
            alt="Product Image"
            w={"3rem"} h={"3rem"}
          />

          <Flex flexDirection={"column"} align={"start"}>
            <Text
              noOfLines={1}
              fontSize={"1rem"}
            >
              {product.name}
            </Text>
            <Square
              backgroundColor={"red.500"}
              borderRadius={"0.25rem"}
              px={"0.5rem"}
              py={"0.25rem"}
            >
              <Text
                fontSize={"0.6rem"}
                textColor={"white"}
              >
                Diskon {product.discount}%
              </Text>
            </Square>
          </Flex>
        </HStack>

        <IconButton
          justifySelf={"end"}
          aria-label={"delete"}
          color={"red.400"}
          as={IoTrash}
          w={5} h={5}
        />
      </HStack>

      <Flex align={"center"} justify={"space-between"} w={"full"}>
        <VStack align={"start"} spacing={"0.25rem"} w={"full"}>
          <Text textColor={"gray.500"} fontSize={"0.75rem"}>Jumlah</Text>
          <HStack align={"center"} justify={"space-between"} w={"full"} spacing={"8rem"}>
            <HStack>
              <IconButton
                aria-label={"minus"}
                as={IoAddCircleOutline}
                w={6} h={6}
              />
              <Input />
              <IconButton
                aria-label={"plus"}
                as={IoRemoveCircleOutline}
                w={6} h={6}
              />
            </HStack>
            <Text fontSize={"1rem"} textColor={"gray.400"}>
              Rp{formatPrice(product.price)}
            </Text>
          </HStack>
        </VStack>
      </Flex>
    </VStack>
  );
};

export default QuickAddItem;