import { Box, Flex } from "@chakra-ui/react";

import BreadCrumb from "../../components/Breadcrumb";
import { Layout } from "../../components/Layout";
import Navbar from "../../components/Navbar";
import ProductCheckout from "../../components/ProductCheckout";
import ProductHeader from "../../components/ProductHeader";
import { ProductImages } from "../../components/ProductImages";
import ProductInformation from "../../components/ProductInformation";
import ProductReview from "../../components/ProductReview";
import RelatedProductContainer from "../../components/RelatedProductContainer";
import { ShareProduct } from "../../components/ShareProduct";

const path = [
  {
    name: "Kategori",
    link: "/",
    isOnPage: false,
  },
  {
    name: "Supplier",
    link: "/",
    isOnPage: false,
  },
  {
    name: "Nama Produk",
    link: "/",
    isOnPage: true,
  },
];

const ProductDetails = () => {
  return (
    <Layout hasNavbar sticky hasBreadCrumb breadCrumbItem={path} hasPadding>
      <Box w="full">
        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent={{ md: "center" }}
          mt="2rem"
          w="full"
        >
          <Box
            w={{ base: "100%", lg: "32%", "2xl": "25%" }}
            mb={{ base: "0.5rem", lg: "5rem" }}
          >
            <Box h="fit-content" position={{ lg: "sticky" }} top="6rem">
              <ProductImages />
              <Box display={{ base: "none", lg: "block" }}>
                <ShareProduct />
              </Box>
            </Box>
          </Box>
          <Box
            w={{ base: "100%", lg: "fit-content" }}
            maxW="100vw"
            px={{ lg: "1rem", xl: "0.5rem", "2xl": "2rem" }}
            mx={{ lg: "1rem" }}
          >
            <ProductHeader preOrder />
            <Box display={{ base: "none", lg: "block" }}>
              <ProductInformation />
            </Box>
          </Box>
          <Box w={{ base: "100%", lg: "25%" }} maxW="100vw">
            <ProductCheckout />
          </Box>
          <Box
            display={{ base: "block", lg: "none" }}
            mb={{ base: "2rem", lg: "0" }}
            maxW="100vw"
          >
            <ProductInformation />
            <Box mb="1rem" />
            <ShareProduct />
          </Box>
        </Flex>
        <Box w={{ lg: "75%" }} maxW="100vw">
          <ProductReview />
        </Box>
        <Box maxW="100vw">
          <RelatedProductContainer />
        </Box>
      </Box>
    </Layout>
  );
};

export default ProductDetails;
