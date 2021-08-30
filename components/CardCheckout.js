import { Button } from "@chakra-ui/button";
import { Box, Divider, Flex, HStack, Text, VStack } from "@chakra-ui/layout";
import { css } from "@emotion/react";
import { useCartContext } from "../contexts/cartProvider";

export const CardCheckout = () => {
  const { totalDiscount, selectedPrice } = useCartContext();
  const idr = Intl.NumberFormat("id-ID");
  // const subtotal = subTotal.replace(/\./g, "");
  // const disc = totalDiscount.replace(/\./g, "");
  const total = Number(selectedPrice) - Number(totalDiscount);
  return (
    <Box
      width="full"
      borderRadius="12px"
      border="solid #CBD5E0 0.5px"
      px="1rem"
      py="12px"
    >
      <Flex flexDirection="column" color="gray.500" fontWeight="500">
        <Flex my="6px" justifyContent="space-between">
          <Text fontWeight="700">Subtotal</Text>
          <Text>Rp{selectedPrice}</Text>
        </Flex>
        {totalDiscount ? <Flex my="6px" justifyContent="space-between">
          <Text fontWeight="700">Diskon</Text>
          <Text>-Rp{totalDiscount}</Text>
        </Flex> : <></>}

        <Divider my="6px" />
        <Flex my="6px" justifyContent="space-between">
          <Text fontWeight="700">Total</Text>
          <Text fontSize="1.2rem" color="orange.500">
            Rp{idr.format(total)}
          </Text>
        </Flex>
        <Button
          my="3px"
          colorScheme="red"
          bgColor="red.500"
          size="md"
          color="white"
        >
          Proses ke Checkout
        </Button>
      </Flex>
    </Box>
  );
};
