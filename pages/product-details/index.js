import { Box, Flex } from "@chakra-ui/react";

import ProductInformation from "../../components/ProductInformation";
import ProductHeader from "../../components/ProductHeader";
import ProductCheckout from "../../components/ProductCheckout";
import RelatedProductContainer from '../../components/RelatedProductContainer';

const ProductDetails = () => {
  return (
    <Box ml={{ base: "12px" }} mr={{ base: "12px" }}>
      <Flex flexDirection={{ base: "column", md: "row" }}>
        <Box w={{ base: "100%", md: "35%" }} >

        </Box>

        <Box w={{ base: "100%", md: "35%" }}>
          <ProductHeader />
          <ProductInformation />
        </Box>

        <Box w={{ base: "100%", md: "30%" }}>
          <ProductCheckout />
        </Box>
      </Flex>
      <RelatedProductContainer />
    </Box>
  );
};

export default ProductDetails;
