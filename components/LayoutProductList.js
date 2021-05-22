import { Box, Heading, Grid, Icon } from "@chakra-ui/react";
import { IoFilterOutline } from "react-icons/io5";

import styles from "../styles/Product.module.scss";
import CardProduct from "./CardProduct";
import CountDownTimer from "./CountDownTimer";

const LayoutProductList = ({ headingText, bg, data, endTime }) => {
  let templateColumns = `repeat(${data.length}, 1fr)`;
  const isFlashSale = headingText.toLowerCase() === "flash sale";
  const isAllProduct = headingText.toLowerCase() === "semua produk";

  if (headingText.toLowerCase() === "semua produk")
    templateColumns = "repeat(2, 1fr)";

  return (
    <Box bg={bg} pt="32px" pb="64px" overflowX="auto">
      <Box px={[".7rem", "3rem", "2rem", "2rem", "5rem", "7.5rem"]}>
        <Box
          className={styles.secondaryFont}
          mb="32px"
          display={isAllProduct ? "flex" : "block"}
          alignItems="center"
          justifyContent="space-between"
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
            <Icon as={IoFilterOutline} fontSize="24px" mr={[".7rem", "2rem"]} />
          )}
          {isFlashSale && <CountDownTimer endTime={endTime} />}
        </Box>
        <Grid
          autoFlow={["column", "column", "column", "unset"]}
          templateColumns={[
            templateColumns,
            "repeat(3,1fr)",
            "repeat(4,1fr)",
            "repeat(5,1fr)",
            "repeat(6,1fr)",
          ]}
          rowGap={8}
          gap={{ base: 3, md: 6 }}
        >
          {data.map((item) => (
            <CardProduct {...item} key={item.id} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default LayoutProductList;
