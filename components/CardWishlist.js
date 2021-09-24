import { Box, Button, Text, Image, Icon } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

import { addWishlist, deleteWishlist } from "../api/wishlist";
import { useWishlistContext } from "../contexts/wishlistProvider";
import { getImageLink } from "../utils/functions";

const numberWithDot = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CardWishlist = ({
  image_path,
  name,
  discount,
  price,
  products_id: liked_products_id,
  liked_customers_id,
}) => {
  const [removed, setRemoved] = useState(false);
  // const removed = useRef(false);
  const realPriceString = numberWithDot(price.replace(/\.(.*?[0]{1,2})/g, ""));
  const priceAfterDiscount = discount
    ? numberWithDot(price - (price * discount) / 100)
    : null;
  const { addItem, deleteItem } = useWishlistContext();

  const handleClickWishlist = () => {
    setRemoved((prev) => !prev);
    if (!removed) {
      deleteItem(liked_products_id, liked_customers_id);
    } else {
      addItem(liked_products_id, liked_customers_id);
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
        h="calc(100% - 2rem)"
        w="50%"
        mx="1rem"
        my="1rem"
        d="flex"
        justifyContent="center"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
      >
        <Image
          borderRadius="0.25rem"
          src={getImageLink(image_path)}
          objectFit="cover"
        />
      </Box>
      <Box
        h="100%"
        w="55%"
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
            {name.toUpperCase()}
          </Text>

          {priceAfterDiscount && (
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
          )}
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
              onClick={() => {
                handleClickWishlist();
                // setRemoved((prev) => !prev);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardWishlist;
