import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  Spacer,
  Text,
  useControllableState,
  VStack,
} from "@chakra-ui/react";
import { FaWhatsapp, FaRegHeart } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoRemoveCircleOutline } from "react-icons/io5";

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    currency: "IDR",
  }).format(price);
};

const ProductCheckout = () => {
  const colorVariance = 99;
  const sizeVariance = 99;
  const remainingStock = 9999;
  const discountedPrice = 999999999999;
  const realPrice = 99999999;

  const [numberOfItem, setNumberOfItem] = useControllableState({
    defaultValue: 0,
  });

  const handleModifyNumberOfItem = (event) => {
    if (event === "increase") {
      if (remainingStock - numberOfItem === 0) {
        setNumberOfItem(remainingStock);
      } else {
        setNumberOfItem(numberOfItem + 1);
      }
    } else if (event === "decrease") {
      if (numberOfItem > 0) {
        setNumberOfItem(numberOfItem - 1);
      } else {
        setNumberOfItem(0);
      }
    }
  };

  return (
    <VStack spacing={"12px"} className={"secondaryFont"}>
      <VStack
        spacing={"10px"}
        borderColor={"gray.300"}
        borderWidth={"1px"}
        padding={"12px 14px"}
        borderRadius={"12px"}
      >
        <Box width={"full"}>
          <Text textColor={"gray.500"} fontSize={"16px"}>
            Warna: {colorVariance} varian
          </Text>
          <Spacer height={"10px"} />
          <Select
            placeholder={"Pilih Warna"}
            borderColor={"gray.200"}
            textColor={"gray.400"}
            color={"gray.400"}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>

        <Box width={"full"}>
          <Text textColor={"gray.500"} fontSize={"16px"}>
            Ukuran: {sizeVariance} varian
          </Text>
          <Spacer height={"10px"} />
          <Select
            placeholder={"Pilih Ukuran"}
            borderColor={"gray.200"}
            textColor={"gray.400"}
            color={"gray.400"}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>

        <Box width={"100%"}>
          <Text textColor={"gray.500"} fontSize={"16px"}>
            Jumlah
          </Text>
          <Spacer height={"10px"} />
          <HStack
            spacing={"38px"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <HStack>
              <IconButton
                aria-label={"Decrease number of items"}
                as={IoRemoveCircleOutline}
                w={"24px"}
                h={"24px"}
                color={"gray.400"}
                onClick={() => handleModifyNumberOfItem("decrease")}
              />
              <Input
                placeholder={numberOfItem}
                textAlign={"center"}
                borderColor={"gray.200"}
                textColor={"gray.300"}
              />
              <IconButton
                aria-label={"Increase the number of item"}
                as={IoIosAddCircleOutline}
                color={"gray.400"}
                w={"24px"}
                h={"24px"}
                onClick={() => handleModifyNumberOfItem("increase")}
              />
            </HStack>
            <HStack fontSize={"14px"}>
              <Text textColor={"gray.500"}>Stok:</Text>
              <Text textColor={"orange.300"}>{remainingStock}</Text>
            </HStack>
          </HStack>
        </Box>

        <Divider orientation="horizontal" height={"1px"} />

        <Flex
          flexDirection={"row"}
          alignItems={"flex-end"}
          justifyContent={"space-between"}
          width={"full"}
        >
          <Text textColor={"gray.500"} fontSize={"16px"}>
            Subtotal
          </Text>
          <VStack alignItems={"flex-end"}>
            <Text as={"s"} color={"gray.400"} fontSize={"12px"}>
              Rp{formatPrice(realPrice)}
            </Text>
            <Text color={"orange.400"} fontSize={"20px"} fontWeight={"bold"}>
              Rp{formatPrice(discountedPrice)}
            </Text>
          </VStack>
        </Flex>

        <Button
          backgroundColor={"red.500"}
          textColor={"white"}
          width={"full"}
          fontSize={"16px"}
          fontWeight={"bold"}
          className={"primaryFont"}
        >
          Masukan ke Keranjang
        </Button>
      </VStack>

      <Flex
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"full"}
      >
        <HStack padding={"7px 12px"}>
          <Icon color={"red.500"} as={FaRegHeart} />
          <Text
            textColor={"red.500"}
            fontSize={"14px"}
            fontWeight={"bold"}
            className={"primaryFont"}
          >
            Wishlist
          </Text>
        </HStack>

        <HStack
          backgroundColor={"orange.400"}
          borderRadius={"4px"}
          padding={"7px 12px"}
        >
          <Icon color={"White"} as={FaWhatsapp} />
          <Text
            textColor={"white"}
            fontSize={"14px"}
            fontWeight={"bold"}
            className={"primaryFont"}
          >
            Chat Admin
          </Text>
        </HStack>
      </Flex>
    </VStack>
  );
};

export default ProductCheckout;
