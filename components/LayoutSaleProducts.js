import { Box, Divider, Flex, Heading, Skeleton, SkeletonText } from "@chakra-ui/react";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Slider from "react-slick";

import { useAuthContext } from "../contexts/authProvider";
import { useWindowSize } from "../hooks/useWindowSize";
import styles from "../styles/Product.module.scss";
import CardProduct from "./CardProduct";

const px = { base: "1rem", md: "1.5rem", lg: "3rem", xl: "50px" };

// TODO:
// Fix border flash sale yang warna orange
// Tambahin diskon di card product
// Tambahin slider di kategori

const LayoutSaleProducts = ({ data, loading, headingText, hasBackground }) => {
  const [display, setDisplay] = useState("none");
  const { userData } = useAuthContext();
  const { width } = useWindowSize();
  let ref = null;

  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: width >= 1440 ? 6 : width >= 768 ? width / 232 : width / 180,
    slidesToScroll: 3,
    initialSlid: 0,
  };

  return (
    <>
      <Box
        pt="1.5rem"
        pb="3.25rem"
        pl={px}
        position="relative"
        overflow="hidden"
        onMouseEnter={() => setDisplay("block")}
        onMouseLeave={() => setDisplay("none")}
        background={hasBackground ? "orange.400" : "none"}
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
                <CardProduct key={item.id} {...item} />
              ),
            )}
          </Slider>
        </Box>
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
        {/* Temporarily removed as the API loads all data without pages */}
        {/*<Flex*/}
        {/*  justify="flex-end"*/}
        {/*  mt="1rem"*/}
        {/*  mr="2rem"*/}
        {/*  color="black"*/}
        {/*  cursor="pointer"*/}
        {/*>*/}
        {/*  <Text*/}
        {/*    color={hasBackground ? "white" : "black"}*/}
        {/*    fontSize="16px"*/}
        {/*    lineHeight="24px"*/}
        {/*    fontWeight="500"*/}
        {/*    pr={px}*/}
        {/*  >*/}
        {/*    Lihat selengkapnya <Icon as={IoArrowForwardOutline} />*/}
        {/*  </Text>*/}
        {/*</Flex>*/}
      </Box>
      <Divider
        orientation="horizontal"
        w="100%"
        colorScheme="gray"
        my="1.5rem"
      />
    </>
  );
};

export default LayoutSaleProducts;
