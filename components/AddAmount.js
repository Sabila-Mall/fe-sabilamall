import { Input } from "@chakra-ui/input";
import { Box, HStack, Text, Flex } from "@chakra-ui/layout";
import { css } from "@emotion/react";
import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useAuthContext } from "../contexts/authProvider";
import { useCartContext } from "../contexts/cartProvider";

export const AddAmount = ({ maxQuantity, product }) => {

  const { userData } = useAuthContext();
  const { updateQuantity, totalPrice, settotalPrice, deleteCartItem } = useCartContext();
  const userId = userData?.id;
  const stock = product?.products_stok
  const [quantity, setquantity] = useState(product.customers_basket_quantity)
  const price = product.final_price

  const prices = parseInt(price?.replace(/\./g, ""));

  const handleModifyNumberOfItem = (event) => {
    let tempPrice = totalPrice
    if (event === "increase") {
      if (stock - quantity <= 0) {
        setquantity(stock);
        tempPrice = Number(price * quantity)
        settotalPrice(tempPrice)
        updateQuantity(userId, product.customers_basket_id, quantity)
      } else {
        setquantity(quantity + 1);
        tempPrice = Number(price * quantity)
        settotalPrice(tempPrice)
        updateQuantity(userId, product.customers_basket_id, quantity)
      }
    } else if (event === "decrease") {
      if (quantity > 1) {
        setquantity(quantity - 1);
        tempPrice = Number(price * quantity)
        settotalPrice(tempPrice)
        updateQuantity(userId, product.customers_basket_id, quantity)
      } else {
        setquantity(1);
        tempPrice = Number(price)
        settotalPrice(tempPrice)
        updateQuantity(userId, product.customers_basket_id, quantity)
      }
    }
    console.log(totalPrice)
  };

  const handleDelete = (productId) => {
    console.log(productId);
    deleteCartItem(userId, productId)
  }

  return (
    <>
      <Flex justifyContent="center">
        <HStack w="8rem" alignItems="center" justifyContent={{ lg: "center" }}>
          <Box
            css={css`
              :hover {
                cursor: pointer;
              }
            `}
          >
            <AiOutlineMinusCircle
              color={quantity === 1 ? "#E2E8F0" : "#A0AEC0"}
              size="1.5em"
              onClick={() => handleModifyNumberOfItem("decrease")}
            />
          </Box>

          <Input
            color="black"
            textAlign="center"
            isDisabled
            variant="outline"
            w="5.5rem"
            h="2rem"
            placeholder={String(quantity)}
          />
          <Box
            css={css`
              :hover {
                cursor: pointer;
              }
            `}
          >
            <AiOutlinePlusCircle
              color={quantity === stock ? "#E2E8F0" : "#A0AEC0"}
              size="1.5em"
              onClick={() => handleModifyNumberOfItem("increase")}
            />
          </Box>
        </HStack>
      </Flex>
      <Text
        fontSize="0.75rem"
        textAlign="center"
        color="gray.400"
        fontWeight="500"
        _hover={{
          cursor: "pointer",
        }}
        onClick={() => handleDelete(product.customers_basket_id)}
      >
        Hapus
      </Text>
    </>
  );
};
