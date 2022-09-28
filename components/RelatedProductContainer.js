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
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)' }}
        gap="24px"
        mt="16px"
        overflowX="auto"
      >
        {relatedProducts.map((item, index) => {
          const data = {
            image_path: item.image_medium,
            name: item.products_name,
            flash_end: item.flash_sale_expires_date,
            products_id: item.products_id,
            products_slug: item.products_slug,
            normal_price: item.price,
            final_price: item.price_after_discount,
            customerdiscount: item.customers_discount,
            isfreeshipping: item.is_free_shipping,
            jenis: item.products_jenis,
          };
          return (
            <>
              <CardProduct
                {...data}
                key={index}
              />
            </>
          )
        })}
      </Grid>
    </Stack>
  );
};
export default RelatedProductContainer;
