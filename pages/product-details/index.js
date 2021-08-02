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

const ProductDetails = () => {
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
  return (
    <>
      <Navbar />

      <Box
        mt={{ base: "4.5rem", lg: "2.5rem" }}
        mx={["1.5rem", "3rem", "2rem", "2rem", "5rem", "7.5rem"]}
      >
        <Flex
          display={{ base: "none", md: "block" }}
          mt="5.5rem"
          justifyContent="center"
          w={{ base: "100%", md: "58%", lg: "38%", xl: "32%" }}
        >
          <BreadCrumb items={path} />
        </Flex>
        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent={{ md: "center" }}
          mt="2rem"
        >
          <Box
            w={{ base: "100%", lg: "32%", "2xl": "25%" }}
            mb={{ base: "0.5rem", lg: "5rem" }}
          >
            <Box h="fit-content" position={{ lg: "sticky" }} top="12.5%">
              <ProductImages />
              <Box display={{ base: "none", lg: "block" }}>
                <ShareProduct />
              </Box>
            </Box>
          </Box>
          <Box
            w={{ base: "100%", lg: "43%" }}
            px={{ lg: "1rem", xl: "0.5rem", "2xl": "2rem" }}
          >
            <ProductHeader preOrder />
            <Box display={{ base: "none", lg: "block" }}>
              <ProductInformation />
            </Box>
          </Box>
          <Box w={{ base: "100%", lg: "25%" }}>
            <ProductCheckout />
          </Box>
          <Box
            display={{ base: "block", lg: "none" }}
            mb={{ base: "2rem", lg: "0" }}
          >
            <ProductInformation />
            <Box mb="1rem" />
            <ShareProduct />
          </Box>
        </Flex>
        <Box w={{ lg: "75%" }}>
          <ProductReview />
        </Box>
        <RelatedProductContainer />
      </Box>
    </>
  );
};

export default ProductDetails;
