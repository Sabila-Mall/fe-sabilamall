import { Box, Image, Text, Icon } from "@chakra-ui/react";
import { IoHeartOutline } from "react-icons/io5";

import styles from "../styles/Product.module.scss";

// discount masukin angkanya aja, misalnya
// kalau diskonnya 10%, masukin 10 aja
// kalau gaada diskon, gak usah dimasukin angka

const numberWithDot = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CardProduct = ({
  imageUrl,
  productName,
  remainingDays,
  discount,
  realPrice,
}) => {
  const realPriceString = numberWithDot(realPrice);
  const priceAfterDiscount = discount
    ? numberWithDot(realPrice - (realPrice * discount) / 100)
    : null;

  return (
    <Box
      className={styles.secondaryFont}
      p="8px 8px 16px 8px"
      w="160px"
      border=" 1px solid #CBD5E0"
      borderRadius="8px"
      bg="white"
    >
      <Box
        bg="white"
        w="100%"
        overflowX="hidden"
        overflowY="visible"
        display="flex"
        flexDirection="column"
        alignItems="start"
        borderRadius="8px"
      >
        <Box h="144px" w="144px" bg="yellow.100" mb="8px">
          <Image src={imageUrl} h="100%" w="100%" />
        </Box>
        {remainingDays && (
          <Box
            // className={styles.remainingDays}
            w="117px"
            h="26px"
            bg="red.500"
            borderRadius="4px"
            boxSizing="border"
            color="red.50"
            display={{ base: "none", md: "flex" }}
            justifyContent="center"
            alignItems="center"
            mb="8px"
          >
            <Text
              as="p"
              fontSize="12px"
              textAlign="center"
              lineHeight="18px"
              fontWeight="500"
            >
              Berakhir {remainingDays} hari lagi
            </Text>
          </Box>
        )}
        <Box className={styles.productName} mb="8px">
          <Text fontSize="16px" fontWeight="500" lineHeight="24px">
            {productName.toUpperCase()}
          </Text>
        </Box>
        {discount && (
          <Box
            w="100%"
            h="18px"
            display="flex"
            alignItems="center"
            fontSize="12px"
            fontWeight="500"
            lineHeight="18px"
            mb="8px"
          >
            <Text as="del" color="gray.500">{`Rp ${realPriceString}`}</Text>
            <Text
              ml="9px"
              h="100%"
              bg="red.200"
              p="2px"
              borderRadius="4px"
              color="red.700"
              display="flex"
              alignItems="center"
            >{`${discount}%`}</Text>
          </Box>
        )}
        <Box
          className={styles.primaryFont}
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          fontWeight="700"
          fontSize="16px"
          lineHeight="20.8px"
        >
          <Text>Rp {priceAfterDiscount ?? realPriceString}</Text>
          <Icon as={IoHeartOutline}></Icon>
        </Box>
      </Box>
    </Box>
  );
};

export default CardProduct;
