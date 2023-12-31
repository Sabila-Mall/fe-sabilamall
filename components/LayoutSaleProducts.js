import { Box, Flex, Heading, Icon, Skeleton, SkeletonText, Text, } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Slider from "react-slick";

import { useWindowSize } from "../hooks/useWindowSize";
import styles from "../styles/Product.module.scss";
import CardProduct from "./CardProduct";

const px = { base: "1rem", md: "1.5rem", lg: "3rem", xl: "50px" };

const LayoutSaleProducts = ({ data, loading, headingText, hasBackground, url_detail }) => {
  const [display, setDisplay] = useState("none");
  const url_detail_2 = url_detail ?? `/product-sale?type=${headingText.toLowerCase().replace(" ", "-")}`;
  const { width } = useWindowSize();
  const width_2 = width ?? 768;
  let ref = null;

  const totalData = data.length

  const enoughItem = () => {
    // This function will return True if the carousel cannot hold item number and need a show more button,
    // false otherwise

    if (width_2 >= 1440) {
      return totalData > 6;
    } else if (width_2 >= 768) {
      return width_2 > width_2 / 232;
    } else if (width_2 >= 560) {
      return totalData > width_2 / 190;
    } else {
      return totalData > width_2 / 200;
    }
  }

  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow:
      width_2 >= 1440
        ? 6
        : width_2 >= 768
          ? width_2 / 232
          : width_2 >= 560
            ? width_2 / 190
            : width_2 / 200,
    slidesToScroll: 3,
    initialSlid: 0,
  };

  return (
    <Box
      pt="1.5rem"
      position="relative"
      overflow="hidden"
      onMouseEnter={() => setDisplay("block")}
      onMouseLeave={() => setDisplay("none")}
    >
      <Heading
        className={styles.primaryFont}
        color={hasBackground ? "white" : "black"}
        fontWeight={700}
        fontSize={{ base: "16px", md: "20px", lg: "24px" }}
        lineHeight={{ base: "20.8px", md: "26px", lg: "31.2px" }}
        mb="0.75rem"
        textShadow={hasBackground ? "0 0 2px white" : "none"}
      >
        {headingText}
      </Heading>
      {
        enoughItem() &&
        <Box
          onClick={() => {
            if (ref !== null) {
              ref.slickPrev();
            }
          }}
          position="absolute"
          zIndex={5}
          top="50%"
          transform="translateX(0.4em)"
          cursor="pointer"
          display={display}
        >
          <Box
            borderRadius="50%"
            bg="white"
            boxShadow="0px 2px 6px rgba(0, 0, 0, 0.25);"
          >
            <MdChevronLeft size="2em" />
          </Box>
        </Box>
      }
      <Box overflow="hidden">
        <Slider
          ref={(node) => {
            ref = node;
          }}
          {...settings}

        >
          {data.map((item, index) =>
            loading ? (
              <Flex key={index}>
                <Box
                  key={index}
                  bg="white"
                  mr="1rem"
                  borderRadius="8px"
                  border="1px solid #CBD5E0"
                >
                  <Skeleton h="12rem" />
                  <Box padding="1.5rem">
                    <SkeletonText noOfLines={2} mb="1rem" />
                    <SkeletonText noOfLines={1} />
                  </Box>
                </Box>
              </Flex>
            ) : (
              <Box pr={'20px'} key={index}>
                <CardProduct  {...item} />
              </Box>
            ),
          )}

        </Slider>
      </Box>
      {
        enoughItem() &&
        <Box
          onClick={() => {
            if (ref !== null) {
              ref.slickNext();
            }
          }}
          position="absolute"
          zIndex={5}
          right={6}
          top="50%"
          cursor="pointer"
          display={display}
        >
          <Box
            borderRadius="50%"
            bg="white"
            boxShadow="0px 2px 6px rgba(0, 0, 0, 0.25);"
          >
            <MdChevronRight size="2em" />
          </Box>
        </Box>
      }
      {
        enoughItem() &&
        <Flex
          justify="flex-end"
          mt="1rem"
          mr="2rem"
          color="black"
          cursor="pointer"
        >
          <Link
            href={url_detail_2}
          >
            <Text
              color={hasBackground ? "white" : "black"}
              fontSize="16px"
              lineHeight="24px"
              fontWeight="500"
              pr={px}
            >
              Lihat selengkapnya <Icon as={IoArrowForwardOutline} />
            </Text>
          </Link>
        </Flex>
      }
    </Box>
  );
};

export default LayoutSaleProducts;
