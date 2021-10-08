import { Box, Flex, Text } from "@chakra-ui/layout";
import { getPriceAfterDiscount } from "../utils/functions";

export const CartPrice = ({ discount, initialPrice }) => {
  const idr = Intl.NumberFormat("id-ID");
  const formatPrice = (price) => {
    return new Intl.NumberFormat(
      "id-ID",
      { style: "decimal", currency: "IDR" })
      .format(price);
  };
  return (
    <>
      {discount !== 0 ? (
        <>
          <Flex flexDirection="column">
            <Text
              textDecoration="line-through"
              fontSize="0.8rem"
              color="gray.500"
            >
              {`Rp${formatPrice(initialPrice ?? 0)}`}
            </Text>
            <Flex mb="12px" flexDir={{ base: "row", md: "column" }}>
              <Text
                fontSize={{ base: "1rem", md: "1.1rem" }}
                color="black"
                mr="10px"
                fontWeight="500"
                my={{ md: "0.5rem" }}
              >
                {`Rp${formatPrice(getPriceAfterDiscount(initialPrice ?? 0, discount ?? 0))}`}
              </Text>
              <Box
                w={{ lg: "6rem" }}
                bgColor="red.500"
                color="white"
                borderRadius="4px"
                py="2px"
                px="8px"
                fontWeight="500"
              >
                <Text
                  as="h1"
                  fontSize={{ base: "12px", md: "14px" }}
                  textAlign="center"
                >
                  {`Diskon ${discount}%`}
                </Text>
              </Box>
            </Flex>
          </Flex>
        </>
      ) : (
        <Text fontSize="1.1rem" mb="12px">
          {`Rp${formatPrice(getPriceAfterDiscount(initialPrice, discount))}`}
        </Text>
      )}
    </>
  );
};
