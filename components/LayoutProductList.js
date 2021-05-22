import { Box, Heading, Grid, useMediaQuery } from "@chakra-ui/react";

import styles from "../styles/LayoutProduct.module.scss";
import CardProduct from "./CardProduct";

const LayoutProductList = ({ headingText, bg, data }) => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  return (
    <Box bg={bg} pt="32px" pb="64px" overflowX="auto">
      <Box px={["1rem", "3rem", "2rem", "2rem", "5rem", "7.5rem"]}>
        <Box mb="32px">
          <Heading
            className={styles.cardFontPrimary}
            color={bg === "white" ? "black" : "white"}
            fontWeight={700}
            fontSize={{ base: "16px", md: "20px", lg: "24px" }}
            lineHeight={{ base: "20.8px", md: "26px", lg: "31.2px" }}
          >
            {headingText}
          </Heading>
        </Box>
        <Grid
          templateColumns={
            isLargerThan600 ? "repeat(6,1fr)" : `repeat(${data.length}, 1fr)`
          }
          rowGap={8}
          gap={isLargerThan600 ? 6 : 3}
        >
          {data.map((item) => (
            <CardProduct {...item} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default LayoutProductList;
