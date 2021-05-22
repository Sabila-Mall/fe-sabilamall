import { Box, Heading, Grid, useMediaQuery } from "@chakra-ui/react";

import styles from "../styles/LayoutProduct.module.scss";
import CardProduct from "./CardProduct";
import CountDownTimer from "./CountDownTimer";

const LayoutProductList = ({ headingText, bg, data, endTime }) => {
  const [isLargerThan600] = useMediaQuery("(min-width: 500px)");
  let templateColumns = `repeat(${data.length}, 1fr)`;
  const isFlashSale = headingText.toLowerCase() === "flash sale";

  if (headingText.toLowerCase() === "semua produk")
    templateColumns = "repeat(2, 1fr)";

  return (
    <Box bg={bg} pt="32px" pb="64px" overflowX="auto">
      <Box px={[".7rem", "3rem", "2rem", "2rem", "5rem", "7.5rem"]}>
        <Box mb="32px" className={styles.cardFontSecondary}>
          <Heading
            className={styles.cardFontPrimary}
            color={bg === "white" ? "black" : "white"}
            fontWeight={700}
            fontSize={{ base: "16px", md: "20px", lg: "24px" }}
            lineHeight={{ base: "20.8px", md: "26px", lg: "31.2px" }}
            mb={!isLargerThan600 && isFlashSale && "8px"}
          >
            {headingText}
          </Heading>
          {!isLargerThan600 && isFlashSale && (
            <CountDownTimer endTime={endTime} />
          )}
        </Box>
        <Grid
          templateColumns={isLargerThan600 ? "repeat(6,1fr)" : templateColumns}
          rowGap={8}
          gap={isLargerThan600 ? 6 : 3}
        >
          {data.map((item) => (
            <CardProduct
              {...item}
              isMobileSize={!isLargerThan600}
              key={item.id}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default LayoutProductList;
