import { Flex, HStack, IconButton, Input, Text, VStack, Image } from "@chakra-ui/react";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline, IoTrash } from "react-icons/io5";
import { IMAGE_HOST } from "../constants/api";
import { useAuthContext } from "../contexts/authProvider";
import { useCartContext } from "../contexts/cartProvider";

const formatPrice = (price) => {
  return new Intl.NumberFormat(
    "id-ID",
    { style: "decimal", currency: "IDR" })
    .format(price);
};

const QuickAddItem = ({ product }) => {
  const { userData } = useAuthContext();
  const userId = userData?.id;
  const { tempData, updateCart } = useCartContext();

  console.log(tempData[0]);
  console.log(product);

  const [quantity, setquantity] = useState(0)
  const stock = product.products_stok
  const handleModifyNumberOfItem = (event) => {
    if (event === "increase") {
      if (stock - quantity === 0) {
        setquantity(stock);
      } else {
        setquantity(quantity + 1);
      }
    } else if (event === "decrease") {
      if (quantity > 0) {
        setquantity(quantity - 1);
      } else {
        setquantity(0);
      }
    }
  };

  const handleDelete = (productId) => {
    updateCart(productId, userId)
  }

  return (
    <VStack align={"start"} w={"full"}>
      <HStack align={"top"} justify={"space-between"} spacing={"1rem"} w={"full"}>
        <HStack spacing={"1rem"}>
          <Image
            src={IMAGE_HOST + product.products_image_path}
            alt="Product Image"
            w={"3rem"} h={"3rem"}
          />

          <VStack flexDirection={"column"} align={"start"}>
            <Text
              noOfLines={1}
              fontSize={"1rem"}
              className={"secondaryFont"}
            >
              {product.products_name}
            </Text>
            {product.discount ? <Flex
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
            </Flex> : <></>}

          </VStack>
        </HStack>

        <IconButton
          justifySelf={"end"}
          aria-label={"delete"}
          color={"red.400"}
          icon={<IoTrash size={"1.25rem"} />}
          variant={"ghost"}
          h={5}
          onClick={() => handleDelete(product.products_id)}
        />
      </HStack>

      <Flex align={"center"} justify={"space-between"} w={"full"}>
        <VStack align={"start"} spacing={"0.25rem"} w={"full"}>
          <Text textColor={"gray.500"} fontSize={"0.75rem"} className={"secondaryFont"}>
            Jumlah
          </Text>
          <HStack align={"center"} justify={"space-between"} w={"full"} spacing={{ base: "2rem", md: "8rem" }}>
            <HStack>
              <IconButton
                aria-label={"Remove Item"}
                icon={<IoRemoveCircleOutline size={"1.5rem"} />}
                variant={"ghost"}
                color={"gray.400"}
                color={quantity === 0 ? "gray.200" : "gray.400"}
                _hover={{ cursor: "pointer" }}
                onClick={() => handleModifyNumberOfItem("decrease")}
              />
              <Input
                minW="3.5rem"
                maxW="5rem"
                placeholder={quantity}
                textAlign={"center"}
                borderColor={"gray.200"}
                textColor={"gray.300"}
              />
              <IconButton
                aria-label={"Add Item"}
                icon={<IoAddCircleOutline size={"1.5rem"} />}
                color={"gray.400"}
                variant={"ghost"}
                _hover={{ cursor: "pointer" }}
                onClick={() => handleModifyNumberOfItem("increase")}
              />
            </HStack>
            <Text fontSize={"1rem"} textColor={"gray.400"} className={"secondaryFont"}>
              Rp{formatPrice(product.final_price)}
            </Text>
          </HStack>
        </VStack>
      </Flex>
    </VStack>
  );
};

export default QuickAddItem;