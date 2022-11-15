import {
  Grid,
  GridItem,
  Stack,
  StackDivider,
  Link,
  Heading,
  Box,
} from "@chakra-ui/react";

import RelatedProductCard from "../components/RelatedProductCard";
import CardProduct from "./CardProduct";

const RelatedProductContainer = ({ relatedProducts }) => {
  return (
    <Stack divider={<StackDivider borderColor="gray.200" />} mt="24px">
      <Stack direction="row" justify="space-between" w="100%" align="center">
        <Heading fontSize="24px" className="primaryFont">
          Produk Terkait
        </Heading>
      </Stack>
      <Grid
        templateColumns={[
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
          "repeat(5, 1fr)",
          "repeat(6, 1fr)",
          "repeat(6, 1fr)",
        ]}
        columnGap={2}
        rowGap={4}
        display={'inline-grid'}
      >
        {relatedProducts.map((item, index) => {
          return (
            <CardProduct
              {...item}
              key={index}
            />
          )
        })}
      </Grid>
    </Stack>
  );
};
export default RelatedProductContainer;
