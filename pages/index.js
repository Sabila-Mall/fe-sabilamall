import { Box, Circle, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { IoArrowUp } from "react-icons/io5";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Banner from "../components/Banner";
import { Layout } from "../components/Layout";
import LayoutCategoryList from "../components/LayoutCategoryList";
import LayoutProductList from "../components/LayoutProductList";
import LayoutSaleProducts from "../components/LayoutSaleProducts";
import SMCard from "../components/SMCard";
import { useAuthContext } from "../contexts/authProvider";
import {
  HomepageProvider,
  useHomePageContext,
} from "../contexts/homepageProvider";
import { useWindowSize } from "../hooks/useWindowSize";

const HomeDisplay = () => {
  const { isLoggedIn } = useAuthContext();
  const {
    products,
    flashSaleProducts,
    discountProducts,
    instalmentProducts,
    banner,
    category,
    handleLoadMoreProducts,
    handleFilterProducts,
    filter
  } = useHomePageContext();
  const [scrollVisible, setScrollVisible] = useState(false);
  const { width } = useWindowSize();

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
        <Head>
          <title>
            Distributor Grosir Supplier Nibras, Endomoda, Ethica - Open Reseller
          </title>
          <meta
            name="keywords"
            content="reseller baju muslim, supplier dropship, open reseller gamis, supplier hijab, dropship terpercaya"
          />
          <meta name="author" content="SabilaMall" />
          <meta name="DC.title" content="true" />
          <meta
            name="description"
            content="Distributor Grosir Supplier Baju Muslim, Gamis, Hijab Nibras, Endomoda, Ethica, Seply, Labella, Yasmeera. Dropship  Terpercaya & Murah Open Reseller."
          />
          <meta
            name="csrf-token"
            content="jpDOUlWRa9ZovRrM3JYK7D6McJnWKCeU19SmLZqV"
          />
        </Head>
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
          <Icon as={IoArrowUp} color="white" width="55%" height="55%" />
        </Circle>
        <Banner data={banner.data} loading={banner.loading} />
        <Flex
          flexDirection={{ base: "column", xl: "row" }}
          justifyContent="space-evenly"
          align="center"
          justify="center"
          marginY={{ base: "0", md: "2rem" }}
        >
          {isLoggedIn && <SMCard width={{ base: "90vw", md: "26rem" }} />}
          {width > 768 && (
            <Flex
              direction="column"
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
            </Flex>
          )}
        </Flex>
      </Layout>
      <Box justify="center" bg="orange.400">
        <Layout hasNavbar={false} noFooter={true} hasPadding={true}>
          <LayoutSaleProducts
            data={flashSaleProducts.data}
            headingText="Flash Sale"
            hasBackground={true}
            loading={flashSaleProducts.loading}
          />
        </Layout>
      </Box>
      <Layout hasNavbar={false} hasPadding={true}>
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
        <LayoutSaleProducts
          data={instalmentProducts.data}
          headingText="Cicilan"
          loading={instalmentProducts.loading}
        // url_detail={'/product-cicilan'}
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
          filterData={filter}
        />
      </Layout>
    </>
  );
};

const Home = () => (
  <HomepageProvider>
    <HomeDisplay />
  </HomepageProvider>
);

export default Home;
