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
import {
  IoFilterOutline,
  IoArrowForwardOutline,
  IoChevronDown,
} from "react-icons/io5";

import listSorting from "../constants/SortingProduct";
import styles from "../styles/Product.module.scss";
import CardProduct from "./CardProduct";

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

const LayoutProductList = ({
  headingText,
  bg,
  data,
  endTime,
  flashSaleRef,
}) => {
  const isFlashSale = headingText.toLowerCase() === "flash sale";
  const isDiscount = headingText.toLowerCase() === "discount";
  const isAllProduct = headingText.toLowerCase() === "semua produk";

  const [showOverlay, setShowOverlay] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);
  const [cursor, setCursor] = useState("pointer");

  const refSlider = useRef();

  const onMouseDownSlider = (e) => {
    setIsDown(true);
    setStartX(e.pageX - refSlider.current.offsetLeft);
    setScrollLeft(refSlider.current.scrollLeft);
    setCursor("grab");
  };

  const onMouseMoveSlider = (e) => {
    if (!isDown) return;

    e.preventDefault();
    const x = e.pageX - refSlider.current.offsetLeft;
    const walk = (x - startX) * 3;
    refSlider.current.scrollLeft = scrollLeft - walk;
  };

  let templateColumns = `repeat(${data.length}, 1fr)`;
  if (headingText.toLowerCase() === "semua produk")
    templateColumns = "repeat(2, 1fr)";

  const px = [".7rem", "3rem", "2rem", "2rem", "5rem", "7.5rem"];

  return (
    <>
      <Box
        bg={bg}
        pt="32px"
        pb="100px"
        overflowX="hidden"
        position="relative"
        ref={flashSaleRef}
      >
        <Box px={isAllProduct && px}>
          {isAllProduct && (
            <Divider
              orientation="horizontal"
              w="100%"
              colorScheme="gray"
              mb="30px"
            />
          )}
          {!isAllProduct && (
            <Box
              h="100%"
              w={px}
              position="absolute"
              zIndex={2}
              bg={bg}
              left={0}
              top={0}
            />
          )}
          <Box
            className={styles.secondaryFont}
            mb="32px"
            display={isAllProduct ? "flex" : "block"}
            alignItems="center"
            justifyContent="space-between"
            pr={{ lg: "40px" }}
          >
            <Heading
              className={styles.primaryFont}
              color={bg === "white" ? "black" : "white"}
              fontWeight={700}
              fontSize={{ base: "16px", md: "20px", lg: "24px" }}
              lineHeight={{ base: "20.8px", md: "26px", lg: "31.2px" }}
              px={!isAllProduct && px}
              mb={isFlashSale && { base: "8px" }}
            >
              {headingText}
            </Heading>
            {isAllProduct && (
              <Icon
                onClick={() => setShowOverlay(!showOverlay)}
                as={IoFilterOutline}
                fontSize="24px"
                display={{ base: "block", md: "none", lg: "none" }}
              />
            )}
            {isAllProduct && <MenuSorting />}
          </Box>
          <Grid
            w={!isAllProduct ? "100vw" : "100%"}
            overflowX="scroll"
            position="relative"
            cursor={cursor}
            className={styles.scrollX}
            onMouseMove={onMouseMoveSlider}
            onMouseDown={onMouseDownSlider}
            px={!isAllProduct && px}
            onMouseLeave={() => {
              setIsDown(false);
              setCursor("pointer");
            }}
            onMouseUp={() => {
              setIsDown(false);
              setCursor("pointer");
            }}
            ref={refSlider}
            templateColumns={
              isDiscount || isFlashSale
                ? "repeat(800,1fr)"
                : [
                    templateColumns,
                    "repeat(3,1fr)",
                    "repeat(4,1fr)",
                    "repeat(5,1fr)",
                    "repeat(6,1fr)",
                  ]
            }
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
            color={isDiscount ? "black" : "white"}
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
