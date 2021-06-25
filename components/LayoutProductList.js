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
import { useState } from "react";
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
  let templateColumns = `repeat(${data.length}, 1fr)`;
  const isFlashSale = headingText.toLowerCase() === "flash sale";
  const isDiscount = headingText.toLowerCase() === "discount";
  const isAllProduct = headingText.toLowerCase() === "semua produk";

  const [showOverlay, setShowOverlay] = useState(false);

  if (headingText.toLowerCase() === "semua produk")
    templateColumns = "repeat(2, 1fr)";

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
        <Box px={[".7rem", "3rem", "2rem", "2rem", "5rem", "7.5rem"]}>
          {isAllProduct && (
            <Divider
              orientation="horizontal"
              w="100%"
              colorScheme="gray"
              mb="30px"
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
            overflowX="auto"
            className={styles.scrollX}
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
            {data.map((item) => (
              <CardProduct {...item} key={item.id} />
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
        pl="16px"
        position="fixed"
        bg="white"
        zIndex="10"
        bottom="0"
        pt="8px"
        h={showOverlay ? "auto" : "0"}
        transition="height 2s linear 1s"
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
    </>
  );
};

export default LayoutProductList;
