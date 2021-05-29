import { Box } from "@chakra-ui/react";

import { CardProductPlaceHolder } from "../../components/CardProductPlaceHolder";
import { Layout } from "../../components/Layout";
import ProductHeader from "../../components/ProductHeader";
import ProductInformation from "../../components/ProductInformation";
import ProductReview from "../../components/ProductReview";

const ProductDetails = () => {
  return (
    <>
      <Layout>
        <Box
          w={{ base: "100%", md: "35%" }}
          ml={{ base: "12px" }}
          mr={{ base: "12px" }}
        >
          <ProductHeader />
          <ProductInformation />
        </Box>
        <ProductReview />
        <CardProductPlaceHolder />
      </Layout>
    </>
  );
};

export default ProductDetails;
