import {
  Grid,
  GridItem,
  Stack,
  StackDivider,
  Link,
  Heading,
} from "@chakra-ui/react";

import RelatedProductCard from "../components/RelatedProductCard";
import { IMAGE_HOST } from "../constants/api";
import CardProduct from "./CardProduct";

const RelatedProductContainer = ({ related_products, customers_id }) => {
  return (
    <Stack divider={<StackDivider borderColor="gray.200" />} mt="24px">
      <Stack direction="row" justify="space-between" w="100%" align="center">
        <Heading fontSize="24px" className="primaryFont">
          Produk Terkait
        </Heading>
        <Link href="/" color="orange.400" fontWeight="bold" fontSize="16px">
          Lihat Semua
        </Link>
      </Stack>
      <Grid
        templateColumns={`repeat(${related_products?.length}, 1fr)`}
        gap="24px"
        mt="16px"
        overflowX="auto"
      >
        {related_products.map(({ id, ...product }, i) => (
          <CardProduct
            {...product}
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
