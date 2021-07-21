import { Flex, HStack, IconButton, Input, Text, VStack, Image } from "@chakra-ui/react";
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

          <VStack flexDirection={"column"} align={"start"}>
            <Text
              noOfLines={1}
              fontSize={"1rem"}
              className={"secondaryFont"}
            >
              {product.name}
            </Text>
            <Flex
              backgroundColor={"red.500"}
              borderRadius={"0.25rem"}
              px={"0.5rem"}
              py={"0.25rem"}
              fontSize={"0.6rem"}
              textColor={"white"}
              align={"center"}
              justify={"center"}
              className={"secondaryFont"}
            >
              Diskon {product.discount}%
            </Flex>
          </VStack>
        </HStack>

        <IconButton
          justifySelf={"end"}
          aria-label={"delete"}
          color={"red.400"}
          icon={<IoTrash size={"1.25rem"}/>}
          variant={"ghost"}
          h={5}
        />
      </HStack>

      <Flex align={"center"} justify={"space-between"} w={"full"}>
        <VStack align={"start"} spacing={"0.25rem"} w={"full"}>
          <Text textColor={"gray.500"} fontSize={"0.75rem"} className={"secondaryFont"}>
            Jumlah
          </Text>
          <HStack align={"center"} justify={"space-between"} w={"full"} spacing={{ base: "2rem", md: "8rem"}}>
            <HStack>
              <IconButton
                aria-label={"Remove Item"}
                icon={<IoRemoveCircleOutline size={"1.5rem"}/>}
                variant={"ghost"}
                color={"gray.400"}
              />
              <Input />
              <IconButton
                aria-label={"Add Item"}
                icon={<IoAddCircleOutline size={"1.5rem"}/>}
                color={"gray.400"}
                variant={"ghost"}
              />
            </HStack>
            <Text fontSize={"1rem"} textColor={"gray.400"} className={"secondaryFont"}>
              Rp{formatPrice(product.price)}
            </Text>
          </HStack>
        </VStack>
      </Flex>
    </VStack>
  );
};

export default QuickAddItem;