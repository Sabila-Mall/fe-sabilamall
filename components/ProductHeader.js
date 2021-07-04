import { Box, Text, Stack, StackDivider } from "@chakra-ui/react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const ProductHeader = () => {
  const stock = 999;
  const discount = 99;
  return (
    <Box ml="0.5rem">
      <Text
        fontSize={{ base: "18px", md: "24px" }}
        fontWeight="500"
        className="secondaryFont"
      >
        Nama Produk Croissant Jujubes Sweet Sweet Powder Tiramisu Caramels
      </Text>

      <Stack
        divider={
          <StackDivider borderColor={{ base: "white", md: "gray.200" }} />
        }
        alignItems="center"
        direction="row"
        spacing="8px"
        className="secondaryFont"
        fontSize="0.875rem"
        mt={{ base: "8px", md: "16px" }}
        mb={{ base: "0.5rem", md: "12px" }}
      >
        <Text color="gray.500">Nama Supplier</Text>
        <Text color="gray.500">Terjual 9999</Text>
        <Stack
          color={stock > 0 ? "green.400" : "red.400"}
          direction="row"
          align="center"
        >
          <IoIosCheckmarkCircleOutline as="span" />
          <Text alignSelf="center">
            {stock > 0 ? `Stok Tersedia (${stock})` : "Stok habis"}
          </Text>
        </Stack>
      </Stack>

      {discount ? (
        <Box d={{ base: "none", md: "block" }}>
          <Text
            as="del"
            color="gray.300"
            className="secondaryFont"
            fontSize="16px"
            h="24px"
          >
            Rp999.999
          </Text>
        </Box>
      ) : (
        ""
      )}

      <Stack direction="row">
        <Text
          className="primaryFont"
          color="red.500"
          fontSize="36px"
          fontWeight="bold"
        >
          Rp999.999
        </Text>
        <Box alignSelf="center">
          {discount ? (
            <Text
              className="secondaryFont"
              color="white"
              bg="red.500"
              fontWeight="500"
              fontSize="14px"
              px="8px"
              py="4px"
              borderRadius="4px"
            >
              Diskon {discount}%
            </Text>
          ) : (
            ""
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductHeader;
