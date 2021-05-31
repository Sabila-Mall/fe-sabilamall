import { Box, Button, Text, Image, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

const numberWithDot = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CardWishlist = ({ imageUrl, productName, discount, realPrice }) => {
  const [removed, setRemoved] = useState(false);

  const realPriceString = numberWithDot(realPrice);
  const priceAfterDiscount = discount
    ? numberWithDot(realPrice - (realPrice * discount) / 100)
    : null;

  const handleRemove = () => {
    if (removed) {
      console.log("delete request ke backend");
      setRemoved(false);
    } else {
      console.log("post request ke backend");
      setRemoved(true);
    }
  };

  return (
    <Box
      w="100%"
      h="12rem"
      borderColor="gray.300"
      borderRadius="lg"
      borderWidth={1}
      d="flex"
      flexDir="row"
      mb="1.5rem"
    >
      <Box
        h="100%"
        w="45%"
        d="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={imageUrl} h="90%" w="90%" />
      </Box>
      <Box
        h="100%"
        w="55%"
        // bg="green"
        d="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box w="90%">
          <Text
            className="secondaryFont"
            fontWeight="500"
            fontSize="0.95rem"
            mt="0.8rem"
          >
            {productName.toUpperCase()}
          </Text>
          <Box d="flex" flexDir="row" alignItems="center" pt="0.3rem">
            <Text as="del" color="gray.500" fontSize="0.9rem">
              {`Rp ${realPriceString}`}
            </Text>
            <Box px="0.5ch" py={1} bg="red.200" borderRadius="lg" ml="0.6rem">
              <Text color="red.700" fontSize="0.85rem">
                {`${discount}%`}
              </Text>
            </Box>
          </Box>
          <Text
            pt="0.3rem"
            className="primaryFont"
            fontSize="1.1rem"
            fontWeight="700"
          >
            Rp {priceAfterDiscount ?? realPriceString}
          </Text>
        </Box>
        <Box mb="0.5rem" w="100%" d="flex" flexDir="row">
          <Button
            color="red.500"
            bg="white"
            borderWidth="1.5px"
            height="2.3rem"
            w="80%"
            borderColor="red.500"
          >
            Lihat Produk
          </Button>
          <Box
            d="flex"
            h="2.3rem"
            alignItems="center"
            justifyContent="center"
            w="20%"
          >
            <Icon
              as={removed ? IoHeartOutline : IoHeart}
              color="red.500"
              h="60%"
              w="60%"
              onClick={() => handleRemove()}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardWishlist;
