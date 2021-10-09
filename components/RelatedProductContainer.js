import {
  Grid,
  GridItem,
  Stack,
  StackDivider,
  Link,
  Heading,
} from "@chakra-ui/react";

import RelatedProductCard from "../components/RelatedProductCard";
import CardProduct from "./CardProduct";

const RelatedProductContainer = ({ related_products, customers_id }) => {
  return (
    <Stack divider={<StackDivider borderColor="gray.200" />} mt="24px">
      <Stack direction="row" justify="space-between" w="100%" align="center">
        <Heading fontSize="24px" className="primaryFont">
          Produk Terkait
        </Heading>
      </Stack>
      <Grid
        templateColumns={`repeat(${related_products?.length}, 1fr)`}
        gap="24px"
        mt="16px"
        overflowX="auto"
      >
        {related_products.map(({ id, isLiked, ...product }, i) => (
          <CardProduct
            {...product}
            isWishlist={isLiked == 1}
            key={id}
            id={id}
            // responsive={true} comments
            liked_customers_id={customers_id}
          />
        ))}
      </Grid>
    </Stack>
  );
};
export default RelatedProductContainer;
