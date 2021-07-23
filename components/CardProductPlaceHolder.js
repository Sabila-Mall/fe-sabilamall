import { Box, Divider, Flex, HStack, Text } from "@chakra-ui/react";

import { CardProduct } from "../components/CardProduct";

export const CardProductPlaceHolder = () => {
  return (
    <Box mt="26px" mb="3rem">
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text as="h1" fontWeight="bold" fontSize="1.5rem">
          Produk Terkait
        </Text>
        <Text
          as="h1"
          cursor="pointer"
          fontWeight="bold"
          fontSize="1rem"
          color="orange.400"
        >
          Lihat Semua
        </Text>
      </Flex>
      <Divider mb="24px" mt="9px" />
      <HStack flexDirection="row">
        <CardProduct isDiscount={true} discountAmount={"10%"} />
        <CardProduct isDiscount={true} discountAmount={"10%"} />
        <CardProduct isDiscount={true} discountAmount={"10%"} />
        <CardProduct isDiscount={true} discountAmount={"10%"} />
      </HStack>
    </Box>
  );
};
