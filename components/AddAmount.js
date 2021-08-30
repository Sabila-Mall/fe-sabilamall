import { Input } from "@chakra-ui/input";
import { Box, HStack, Text, Flex } from "@chakra-ui/layout";
import { css } from "@emotion/react";
import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useAuthContext } from "../contexts/authProvider";
import { useCartContext } from "../contexts/cartProvider";

export const AddAmount = ({ product, mb }) => {

  const { userData } = useAuthContext();
  const { updateQuantity, totalPrice, settotalPrice, deleteCartItem, totalDiscount, settotalDiscount } = useCartContext();
  const userId = userData?.id;
  const stock = product?.products_stok
  const [quantity, setquantity] = useState(product.customers_basket_quantity)
  const price = product.final_price
  const discount = product?.products_discount

  const handleModifyNumberOfItem = (event) => {
    let tempPrice = totalPrice
    let tempDiscount = totalDiscount
    if (event === "increase") {
      if (stock - quantity <= 0) {
        setquantity(stock);
        updateQuantity(userId, product.customers_basket_id, quantity)
      } else {
        setquantity(quantity + 1);
        tempDiscount += Number(discount)
        settotalDiscount(tempDiscount)
        tempPrice += Number(price)
        settotalPrice(tempPrice)
        updateQuantity(userId, product.customers_basket_id, quantity)
      }
    } else if (event === "decrease") {
      if (quantity > 1) {
        setquantity(quantity - 1);
        tempDiscount -= Number(discount)
        settotalDiscount(tempDiscount)
        tempPrice -= Number(price)
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

  return (
    <Box mb={mb}>
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
            _placeholder={{ color: "black", opacity: "1" }}
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
    </Box>
  );
};
