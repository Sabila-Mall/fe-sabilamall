import { Box, Flex } from "@chakra-ui/react";

import ProductInformation from "../../components/ProductInformation";
import ProductHeader from "../../components/ProductHeader";
import ProductCheckout from "../../components/ProductCheckout";

const ProductDetails = () => {
  return (
    <Flex flexDirection={"row"}>
      <Box w={{ base: "100%", md: "35%" }} ml={{ base: "12px" }} mr={{ base: "12px" }}>
        <ProductHeader />
        <ProductInformation />
      </Box>

      <Box w={{ base: "100%", md: "35%" }}>

      </Box>

      <Box w={{ base: "100%", md: "30%" }}>
        <ProductCheckout />
      </Box>
    </Flex>
  );
};

export default ProductDetails;