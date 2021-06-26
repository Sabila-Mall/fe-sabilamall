import { Box, Flex } from "@chakra-ui/react";

import BreadCrumb from "../../components/Breadcrumb";
import { Layout } from "../../components/Layout";
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
    <Layout hasNavbar>
      <Box>
        <BreadCrumb items={path} />
        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent={{ md: "center" }}
          mt="24px"
        >
          <Box w={{ base: "100%", lg: "32%" }}>
            <ProductImages />
            <Box display={{ base: "none", lg: "block" }}>
              <ShareProduct />
            </Box>
          </Box>
          <Box w={{ base: "100%", lg: "43%" }} mr={{ lg: "1rem" }}>
            <ProductHeader />
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
    </Layout>
  );
};

export default ProductDetails;
