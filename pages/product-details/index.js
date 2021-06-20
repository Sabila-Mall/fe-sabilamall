import { Box, Flex } from "@chakra-ui/react";

import ProductInformation from "../../components/ProductInformation";
import ProductHeader from "../../components/ProductHeader";
import ProductCheckout from "../../components/ProductCheckout";
import RelatedProductContainer from '../../components/RelatedProductContainer';
import ProductReview from "../../components/ProductReview";
import BreadCrumb from "../../components/Breadcrumb";

const ProductDetails = () => {
  const path = [
    {
      name: "Kategori",
      link: "/",
      isOnPage: false
    },
    {
      name: "Supplier",
      link: "/",
      isOnPage: false
    },
    {
      name: "Nama Produk",
      link: "/",
      isOnPage: true
    }
  ]
  return (
    <Box ml={{ base: "12px", md: "120px" }} mr={{ base: "12px", md: "120px" }} mt="24px">
      <BreadCrumb items={path} />
      <Flex flexDirection={{ base: "column", md: "row" }} mt="24px">
        <Box w={{ base: "100%", md: "32%" }} >

        </Box>

        <Box w={{ base: "100%", md: "43%" }} mr="16px">
          <ProductHeader />
          <ProductInformation />
        </Box>

        <Box w={{ base: "100%", md: "25%" }} ml="16px">
          <ProductCheckout />
        </Box>
      </Flex>
      <ProductReview />
      <RelatedProductContainer />
    </Box>
  );
};

export default ProductDetails;
