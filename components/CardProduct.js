import { Link } from "@chakra-ui/layout";
import { Box, Text, Icon, Flex, Image, Badge } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FaShippingFast } from "react-icons/fa";
import { IoHeartOutline, IoTimeSharp, IoHeart } from "react-icons/io5";

import { useAuthContext } from "../contexts/authProvider";
import { useWishlistContext } from "../contexts/wishlistProvider";
import styles from "../styles/Product.module.scss";
import { getImageLink } from "../utils/functions";
import {
  calculateTimeLeft,
  currencyFormat,
  getPriceAfterDiscount,
  parseNumber,
} from "../utils/functions";

const CardProduct = ({
  image_path,
  name,
  flash_end,
  products_id: liked_products_id,
  products_slug,
  normal_price,
  final_price,
  customerdiscount,
  responsive,
  isfreeshipping,
  jenis,
}) => {
  const { isLoggedIn, userData } = useAuthContext();
  const { wishlistData } = useWishlistContext();
  const [imageHeight, setImageHeight] = useState(144);
  const price = isLoggedIn
    ? parseNumber(final_price)
    : parseNumber(normal_price);
  const priceAfterDiscount = isLoggedIn
    ? getPriceAfterDiscount(final_price, customerdiscount)
    : parseNumber(final_price);
  const timeLeft = flash_end && calculateTimeLeft(flash_end);
  const discount =
    priceAfterDiscount && Math.round(100 - 100 * (priceAfterDiscount / price));

  const [liked, setLiked] = useState(
    wishlistData?.length > 0
      ? wishlistData?.map((e) => e.id).includes(liked_products_id)
      : false,
  );

  useEffect(() => {
    setLiked(
      wishlistData?.length > 0
        ? wishlistData?.map((e) => e.id).includes(liked_products_id)
        : false,
    );
  }, [wishlistData]);

  const { addItem, deleteItem } = useWishlistContext();
  const handleClickWishlist = () => {
    if (liked) {
      deleteItem(liked_products_id, userData?.id);
    } else {
      addItem(liked_products_id, userData?.id);
    }
    setLiked((prev) => !prev);
  };

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
    <Link
      _hover={{ textStyle: "none" }}
      href={`/product-detail/${products_slug}`}
      target="_blank"
    >
      <Box
        className={styles.secondaryFont}
        w={responsive ? "100%" : { base: "160px", md: "200px" }}
        h={flash_end ? "" : { base: "320px" }}
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
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
          >
            <Image src={getImageLink(image_path)} objectFit="cover" />
          </Box>
          <Box padding="2" w="100%">
            {jenis == "po" && (
            <Badge borderRadius="full" bg="#479af1" color="white">
              Pre Order
            </Badge>
            )}

            {flash_end && timeLeft && (
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
                  <Icon as={IoTimeSharp} />{" "}
                  {`${timeLeft.hours} Jam ${timeLeft.minutes} Menit lagi`}
                </Text>
              </Box>
            )}
            <Flex
              direction="column"
              justifyContent="flex-start"
              height="6.0rem"
            >
              <Box className={styles.productName} mb="8px">
                <Text fontSize="0.8em" fontWeight="400" lineHeight="16px">
                  {name.toUpperCase()}
                </Text>
              </Box>
              {priceAfterDiscount && priceAfterDiscount !== price && (
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
                  <Text as="del" color="gray.500">
                    {currencyFormat(price)}
                  </Text>
                  <Text
                    ml={priceAfterDiscount !== price ? "9px" : 0}
                    h="100%"
                    bg="red.200"
                    p="2px"
                    borderRadius="4px"
                    color="red.700"
                    display="flex"
                    alignItems="center"
                  >
                    {`${discount}%`}
                  </Text>
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
                <Text>{currencyFormat(priceAfterDiscount ?? price)}</Text>
                <Flex align="center">
                  {isfreeshipping !== 0 && (
                    <Icon
                      width="1.3em"
                      height="1.3em"
                      as={FaShippingFast}
                      color={"green.500"}
                    />
                  )}
                  {isLoggedIn && (
                    <Icon
                      width="1.15em"
                      height="1.15em"
                      ml={isfreeshipping !== 0 ? "0.5rem" : "0.25rem"}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleClickWishlist();
                      }}
                      as={liked ? IoHeart : IoHeartOutline}
                      color={liked ? "red.500" : "black"}
                    />
                  )}
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default CardProduct;
