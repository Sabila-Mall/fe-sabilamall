import { Text } from "@chakra-ui/layout";
import { Grid, Spinner } from "@chakra-ui/react";
import { Td, Tr } from "@chakra-ui/table";
import { useState, useEffect } from "react";

import { useCartContext } from "../contexts/cartProvider";
import { AddAmount } from "./AddAmount";
import { CartPrice } from "./CartPrice";
import { ProductCart } from "./ProductCart";

export const TableContent = ({ isDiscount, product }) => {
  const { loading } = useCartContext();
  const idr = Intl.NumberFormat("id-ID");
  const discount = product?.products_discount;
  const productPrice = product?.final_price;
  const quantity = product?.customers_basket_quantity;
  // const isDiscount = productDetail?.products_discount

  const [totalPrice, settotalPrice] = useState(productPrice * quantity);

  useEffect(() => {
    return () => {
      settotalPrice(productPrice * quantity);
    };
  }, [quantity]);

  if (product) {
    return (
      <>
        {loading ? (
          <Grid placeItems="center">
            <Spinner></Spinner>
          </Grid>
        ) : (
          <Tr>
            <Td pr={{ md: "0" }}>
              <ProductCart isDiscount={isDiscount} product={product} />
            </Td>
            <Td>
              <CartPrice isDiscount={isDiscount} price={productPrice} />
            </Td>
            <Td p={{ md: "0", "2xl": "1.5rem" }}>
              <AddAmount product={product} />
            </Td>
            <Td
              textAlign="center"
              px={{ md: "1rem", xl: "1.5rem" }}
              pl={{ md: "0.5rem", xl: "1.5rem" }}
            >
              <Text
                color="orange.400"
                fontWeight="500"
                fontSize="1.2rem"
                mb="1.4rem"
              >
                Rp{idr.format(totalPrice)}
              </Text>
            </Td>
          </Tr>
        )}
      </>
    );
  } else {
    return <></>;
  }
};
