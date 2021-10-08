import {
  Grid,
  GridItem,
  Stack,
  StackDivider,
  Link,
  Heading,
} from "@chakra-ui/react";

import RelatedProductCard from "../components/RelatedProductCard";
// import CardProduct from "./CardProduct";
import RelatedCard from "./RelatedCard";

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
        w="100%"
        position="relative"
        columnGap={2}
        rowGap={4}
        
      >
        {related_products.map(({ id, isLiked, ...product }, i) => (
          <RelatedCard
            {...product}
            isWishlist={isLiked == 1}
            key={id}
            id={id}
            // responsive={true}
            liked_customers_id={customers_id}
          />
        ))}
      </Grid>
    </Stack>
  );
};
export default RelatedProductContainer;
