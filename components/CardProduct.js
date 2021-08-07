import { Box, Image, Text, Icon } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { IoHeartOutline, IoTimeSharp, IoHeart } from "react-icons/io5";

import { addWishlist, deleteWishlist } from "../api/wishlist";
import { IMAGE_HOST } from "../constants/api";
import { useAuthContext } from "../contexts/authProvider";
import styles from "../styles/Product.module.scss";

// import { BsFilter } from "react-icons/bs";

// discount masukin angkanya aja, misalnya
// kalau diskonnya 10%, masukin 10 aja
// kalau gaada diskon, gak usah dimasukin angka

const calculateTimeLeft = (endTime) => {
  let difference = +endTime - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const numberWithDot = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CardProduct = ({
  image_path,
  name,
  endTime,
  discount,
  products_id: liked_products_id,
  price,
  responsive,
  isWishlist = false,
}) => {
  const [imageHeight, setImageHeight] = useState(144);
  const realPriceString = numberWithDot(price.replace(/\.(.*?[0]{1,2})/g, ""));
  const priceAfterDiscount = discount
    ? numberWithDot(price - (price * discount) / 100)
    : null;
  const timeLeft = endTime && calculateTimeLeft(endTime);

  const [liked, setLiked] = useState(isWishlist);

  const { userData } = useAuthContext();
  const liked_customers_id = userData?.id || 6089;

  const handleClickWishlist = () => {
    setLiked((prev) => !prev);
    if (liked) {
      deleteWishlist({ liked_products_id, liked_customers_id }).then((res) => {
        console.info("deleted");
      });
    } else {
      addWishlist({ liked_products_id, liked_customers_id }).then((res) => {
        console.info("added");
      });
    }
  };

  // useEffect(() => {
  //   return () => {
  //     if (liked) {
  //       console.log("send DELETE request ke backend");
  //     }
  //   };
  // }, []);

  useEffect(() => {
    function handleResize() {
      let width = responsive
        ? document.getElementsByClassName("card-product-responsive")[0]
            .clientWidth
        : document.getElementsByClassName("card-product")[0].clientWidth;
      setImageHeight(width);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <Box
      className={styles.secondaryFont}
      w={responsive ? "100%" : { base: "160px", md: "200px" }}
      border="1px solid #CBD5E0"
      borderRadius="8px"
      bg="white"
      className={responsive ? "card-product-responsive" : "card-product"}
      cursor="pointer"
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
        <Box
          h={`${imageHeight}px`}
          mb="8px"
          display="flex"
          justifyContent="center"
          w="100%"
          bgImage={`url(${IMAGE_HOST + image_path})`}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
        ></Box>
        <Box padding="2" w="100%">
          {endTime && timeLeft && (
            <Box
              px="4px"
              h="26px"
              bg="red.500"
              borderRadius="4px"
              boxSizing="border"
              color="red.50"
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb="8px"
              w="fit-content"
            >
              <Text
                as="p"
                fontSize={{ base: "10px", md: "12px" }}
                textAlign="center"
                lineHeight={{ base: "15px", md: "18px" }}
                fontWeight="500"
              >
                <Icon as={IoTimeSharp}></Icon>{" "}
                {`${timeLeft.hours} Jam ${timeLeft.minutes} Menit lagi`}
              </Text>
            </Box>
          )}
          <Box className={styles.productName} mb="8px">
            <Text fontSize="16px" fontWeight="500" lineHeight="24px">
              {name.toUpperCase()}
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
            <Icon
              onClick={() => {
                handleClickWishlist();
                // setLiked((prev) => !prev)
              }}
              as={liked ? IoHeart : IoHeartOutline}
              color={liked ? "red.500" : "black"}
            ></Icon>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardProduct;
