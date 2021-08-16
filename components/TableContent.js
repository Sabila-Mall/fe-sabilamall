import { Text } from "@chakra-ui/layout";
import { Td, Tr } from "@chakra-ui/table";
import { useState } from "react";

import { AddAmount } from "./AddAmount";
import { CartPrice } from "./CartPrice";
import { ProductCart } from "./ProductCart";

export const TableContent = ({ isDiscount, product }) => {
  const idr = Intl.NumberFormat("id-ID");
  const productDetail = product.keranjang[0]
  const discount = productDetail.products_discount
  const productPrice = productDetail?.final_price
  const productStock = productDetail?.products_stok
  // const isDiscount = productDetail?.products_discount
  console.log(discount);

  const [total, setTotal] = useState(99999999);

  return (
    <Tr>
      <Td pr={{ md: "0" }}>
        <ProductCart isDiscount={isDiscount} product={productDetail} />
      </Td>
      <Td>
        <CartPrice isDiscount={isDiscount} price={productPrice} />
      </Td>
      <Td p={{ md: "0", "2xl": "1.5rem" }}>
        <AddAmount total={total} setTotal={setTotal} maxQuantity={productStock} />
      </Td>
      <Td
        textAlign="center"
        px={{ md: "1rem", xl: "1.5rem" }}
        pl={{ md: "0.5rem", xl: "1.5rem" }}
      >
        <Text color="orange.400" fontWeight="500" fontSize="1.2rem" mb="1.4rem">
          Rp{idr.format(99999999)}
        </Text>
      </Td>
    </Tr>
  );
};
