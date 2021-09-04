import { Box, Circle, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoArrowUp } from "react-icons/io5";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import LayoutCategoryList from "../components/LayoutCategoryList";
import SMCard from "../components/SMCard";
import { useAuthContext } from "../contexts/authProvider";
import { Layout } from "../components/Layout";
import Banner from "../components/Banner";
import { HomepageProvider, useHomePageContext } from "../contexts/homepageProvider";
import LayoutSaleProducts from "../components/LayoutSaleProducts";
import LayoutProductList from "../components/LayoutProductList";

const HomeDisplay = () => {
  const { isLoggedIn } = useAuthContext();
  const {
    products, flashSaleProducts, discountProducts,
    banner, category, handleLoadMoreProducts, handleFilterProducts,
  } = useHomePageContext();
  const [scrollVisible, setScrollVisible] = useState(false);

  useEffect(() => {
    const scrollLogger = () => {
      if (window.pageYOffset > window.innerHeight / 3) {
        setScrollVisible(true);
      } else {
        setScrollVisible(false);
      }
    };

    window.addEventListener("scroll", scrollLogger);
    return () => {
      window.removeEventListener("scroll", scrollLogger);
    };
  }, []);

  return (
    <>
      <Layout hasNavbar={true} hasPadding={false} noFooter={true}>
        <Circle
          bg="red.600"
          size="40px"
          position="fixed"
          zIndex="9999"
          bottom={{ base: "75px", md: "20px" }}
          right="20px"
          d={scrollVisible ? "flex" : "none"}
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onClick={() => window.scroll({ top: 0, behavior: "smooth" })}
        >
          <Icon
            as={IoArrowUp}
            color="white"
            width="55%"
            height="55%"
          />
        </Circle>
        <Banner data={banner.data} loading={banner.loading} />
        <Flex
          flexDirection={{ base: "column", xl: "row" }}
          justifyContent="space-evenly"
          align="center" justify="center"
          marginY="2rem"
        >
          {isLoggedIn && (
            <SMCard width={{ base: "90vw", md: "26rem" }} />
          )}
          <Box
            d={{ base: "none", md: "flex" }}
            flexDirection="column"
            alignItems="center"
            paddingTop={{ base: "2rem", xl: "0px" }}
            marginTop={isLoggedIn ? "0rem" : "2rem"}
            marginBottom={isLoggedIn ? "1rem" : "1.5rem"}
          >
            <Text
              className="primaryFont"
              fontWeight="700"
              fontSize="1.5rem"
              marginBottom="2rem"
            >
              Kategori
            </Text>
            <LayoutCategoryList
              isLoggedIn={isLoggedIn}
              data={category.data}
              loading={category.loading}
            />
          </Box>
        </Flex>
      </Layout>
      <Flex justify="center" bg="orange.400">
        <Box maxW="1440px">
          <LayoutSaleProducts
            data={flashSaleProducts.data}
            headingText="Flash Sale"
            hasBackground={true}
            loading={flashSaleProducts.loading}
          />
        </Box>
      </Flex>
      <Layout hasNavbar={false}>
        <LayoutSaleProducts
          data={discountProducts.data}
          headingText="Discount"
          loading={discountProducts.loading}
        />
        <Divider
          orientation="horizontal"
          w="100%"
          colorScheme="gray"
          my="1.5rem"
        />
        <LayoutProductList
          headingText="Semua Produk"
          bg="white"
          data={products}
          loading={products.loading}
          handleLoadMore={handleLoadMoreProducts}
          handleFilter={handleFilterProducts}
        />
      </Layout>
    </>
  );
};

const Home = () =>
  <HomepageProvider>
    <HomeDisplay />
  </HomepageProvider>;

export default Home;
