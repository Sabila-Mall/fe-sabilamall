import {
  Box,
  Heading,
  Grid,
  Icon,
  Divider,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { BiChevronRightCircle, BiChevronLeftCircle } from "react-icons/bi";
import {
  IoFilterOutline,
  IoArrowForwardOutline,
  IoChevronDown,
  IoChevronBackCircle,
  IoChevronForwardCircle,
} from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Slider from "react-slick";

import listSorting from "../constants/SortingProduct";
import styles from "../styles/Product.module.scss";
import CardProduct from "./CardProduct";

const px = [".7rem", "3rem", "2rem", "2rem", "5rem", "7.5rem"];

const MenuSorting = () => (
  <Menu display={{ base: "none", md: "block" }}>
    <MenuButton
      px={4}
      py={2}
      transition="all 0.2s"
      borderRadius="md"
      borderWidth="1px"
      borderColor="#E2E8F0"
      _hover={{ bg: "gray.200" }}
      _expanded={{ bg: "gray.300" }}
      _focus={{ boxShadow: "none" }}
      display={{ base: "none", md: "block" }}
    >
      Urutkan Berdasarkan <Icon ml="30px" as={IoChevronDown} />
    </MenuButton>
    <MenuList>
      {listSorting.map((item) => (
        <MenuItem key={item.id}>{item.text}</MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export const LayoutFlashSale = ({ data, flashSaleRef, headingText }) => {
  const [display, setDisplay] = useState("none");

  let ref = null;

  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    initialSlid: 0,
    responsive: [
      {
        breakpoint: 1256,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1055,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 855,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 543,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Box
        pl={px}
        position="relative"
        overflow="hidden"
        onMouseEnter={() => setDisplay("block")}
        onMouseLeave={() => setDisplay("none")}
        cursor="pointer"
      >
        <Heading
          className={styles.primaryFont}
          color="black"
          fontWeight={700}
          fontSize={{ base: "16px", md: "20px", lg: "24px" }}
          lineHeight={{ base: "20.8px", md: "26px", lg: "31.2px" }}
          mb="2.3rem"
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
          cursor="pointer"
          display={display}
        >
          <IoChevronBackCircle size="2em" color="black" />
        </Box>
        <Slider
          ref={(node) => {
            ref = node;
          }}
          {...settings}
        >
          {data.map((item) => (
            <Box key={item.id}>
              <CardProduct key={item.id} {...item} />
            </Box>
          ))}
        </Slider>
        <Box
          onClick={() => {
            if (ref !== null) {
              ref.slickNext();
            }
          }}
          position="absolute"
          zIndex={5}
          right={2}
          top="50%"
          cursor="pointer"
          display={display}
        >
          <IoChevronForwardCircle size="2em" color="black" />
        </Box>
        <Flex
          justify="flex-end"
          mt="1rem"
          mr="2rem"
          color="black"
          cursor="pointer"
        >
          <Text fontSize="16px" lineHeight="24px" fontWeight="500">
            Lihat selengkapnya <Icon as={IoArrowForwardOutline} />
          </Text>
        </Flex>
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

const LayoutProductList = ({ data, endTime, flashSaleRef }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <Box
        bg="white"
        pb="100px"
        overflowX="hidden"
        position="relative"
        ref={flashSaleRef}
      >
        <Box px={px}>
          <Box
            className={styles.secondaryFont}
            mb="32px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            pr={{ lg: "40px" }}
          >
            <Heading
              className={styles.primaryFont}
              color={"black"}
              fontWeight={700}
              fontSize={{ base: "16px", md: "20px", lg: "24px" }}
              lineHeight={{ base: "20.8px", md: "26px", lg: "31.2px" }}
              // px={px}
            >
              Semua Produk
            </Heading>

            <Icon
              onClick={() => setShowOverlay(!showOverlay)}
              as={IoFilterOutline}
              fontSize="24px"
              display={{ base: "block", md: "none", lg: "none" }}
            />

            <MenuSorting />
          </Box>
          <Grid
            w="100%"
            position="relative"
            templateColumns={[
              "repeat(2,1fr)",
              "repeat(3,1fr)",
              "repeat(4,1fr)",
              "repeat(5,1fr)",
              "repeat(6,1fr)",
            ]}
            columnGap={2}
            rowGap={4}
          >
            {data.map((item, index) => (
              <Box key={item.id}>
                <CardProduct {...item} />
              </Box>
            ))}
          </Grid>
          <Box
            position="absolute"
            right="159"
            bottom="10"
            color="black"
            cursor="pointer"
          >
            <Text fontSize="16px" lineHeight="24px" fontWeight="500">
              Lihat selengkapnya <Icon as={IoArrowForwardOutline} />
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        w="100vw"
        h={showOverlay ? "280px" : "0"}
        pl="16px"
        position="fixed"
        bg="white"
        zIndex="10"
        bottom="0"
        pt="8px"
        transition="all .2s linear"
        display={{ base: "block", md: "none" }}
      >
        {listSorting.map((item) => (
          <Text
            key={item.id}
            fontSize="16px"
            lineHeight="24px"
            fontWeight="500"
            mb="8px"
          >
            {item.text}
          </Text>
        ))}
      </Box>
      {showOverlay && (
        <Box
          w="100vw"
          h="100vh"
          position="fixed"
          zIndex="9"
          bottom="0"
          bg="transparent"
          onClick={() => setShowOverlay(false)}
        ></Box>
      )}
    </>
  );
};

export default LayoutProductList;
