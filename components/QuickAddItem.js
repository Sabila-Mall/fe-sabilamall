import { Flex, HStack, IconButton, Input, Text, VStack, Image, Checkbox } from "@chakra-ui/react";
import { createRef, useState } from "react";
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

const QuickAddItem = ({ product, my }) => {
  const { userData } = useAuthContext();
  const userId = userData?.id;
  const { addToCheckout, deleteFromCheckout, updateQuantity, deleteCartItem, totalPrice, settotalPrice, totalDiscount, settotalDiscount } = useCartContext();
  // console.log(priceValue);

  const [quantity, setquantity] = useState(product.customers_basket_quantity)
  const price = product.final_price
  const stock = product.products_stok
  const discount = product?.products_discount
  const varian = product?.varian


  settotalPrice(price * quantity)

  const handleModifyNumberOfItem = (event) => {
    let tempDiscount = totalDiscount
    let tempPrice = totalPrice
    if (event === "increase") {
      if (stock - quantity <= 0) {
        setquantity(stock);
        updateQuantity(userId, product.customers_basket_id, quantity)
      } else {
        setquantity(quantity + 1);
        tempDiscount += Number(discount)
        settotalDiscount(tempDiscount)
        tempPrice = Number(price)
        settotalPrice(tempPrice)
        updateQuantity(userId, product.customers_basket_id, quantity)
      }
    } else if (event === "decrease") {
      if (quantity > 1) {
        setquantity(quantity - 1);
        tempDiscount -= Number(discount)
        settotalDiscount(tempDiscount)
        tempPrice = Number(price)
        settotalPrice(tempPrice)
        updateQuantity(userId, product.customers_basket_id, quantity)
      } else {
        setquantity(1);
        updateQuantity(userId, product.customers_basket_id, quantity)
      }
    }
    console.log(totalPrice)
  };

  const handleDelete = (productId) => {
    console.log(productId);
    deleteCartItem(userId, productId)
  }

  let inputRef = createRef()
  const handleCheckbox = () => {
    if (inputRef.current.checked) {
      addToCheckout(product)
    } else {
      deleteFromCheckout(product)
    }
  }

  return (
    <VStack align={"start"} w={"full"} my={my}>
      <HStack as="label" onClick={() => handleCheckbox()} align={"top"} justify={"space-between"} spacing={"1rem"} w={"full"}>
        <Flex>
          <Checkbox w="min-content" ref={inputRef}></Checkbox>
          <HStack spacing={"1rem"} ml="1rem">
            <Image
              src={IMAGE_HOST + product.products_image_path}
              alt="Product Image"
              w={"4rem"} h={"4rem"}
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
              </Flex>
                : <></>}
              {varian && varian.map((el, index) => {
                return (
                  <Text color="gray.500" fontSize="14px">
                    {`${el.products_options_name} : ${el.products_options_values_name}`}
                  </Text>
                )
              })}

            </VStack>
          </HStack>
        </Flex>

        <IconButton
          justifySelf={"end"}
          aria-label={"delete"}
          color={"red.400"}
          icon={<IoTrash size={"1.25rem"} />}
          variant={"ghost"}
          h={5}
          onClick={() => handleDelete(product.customers_basket_id)}
        />
      </HStack>

      <Flex align={"center"} justify={"space-between"} w={"full"}>
        <VStack align={"start"} spacing={"0.25rem"} w={"full"}>
          <Text textColor={"gray.500"} fontSize={"0.75rem"} className={"secondaryFont"} ml="66px">
            Jumlah
          </Text>
          <HStack align={"center"} justify={"space-between"} w={"full"} spacing={{ base: "2rem", md: "8rem" }}>
            <HStack>
              <IconButton
                aria-label={"Remove Item"}
                icon={<IoRemoveCircleOutline size={"1.5rem"} />}
                variant={"ghost"}
                color={"gray.400"}
                color={quantity === 1 ? "gray.200" : "gray.400"}
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