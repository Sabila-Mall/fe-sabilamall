import { Box } from "@chakra-ui/react";

import ProductHeader from "../../components/ProductHeader";
import ProductInformation from "../../components/ProductInformation";
import ProductReview from "../../components/ProductReview";
import { CardProduct } from "./card";

const ProductDetails = () => {
  return (
    <>
      {/* <Box w={{ base: "100%", md: "35%" }} ml={{ base: "12px" }} mr={{ base: "12px" }}>
        <ProductHeader />
        <ProductInformation />
      </Box>
      <ProductReview /> */}
      <CardProduct isDiscount={true} discountAmount={"10%"} />
    </>
  );
};

export default ProductDetails;
