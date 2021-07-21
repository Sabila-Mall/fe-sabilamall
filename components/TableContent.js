import { Text } from "@chakra-ui/layout";
import { Td, Tr } from "@chakra-ui/table";
import { useState } from "react";

import { AddAmount } from "./AddAmount";
import { CartPrice } from "./CartPrice";
import { ProductCart } from "./ProductCart";

export const TableContent = ({ price, isDiscount }) => {
  const idr = Intl.NumberFormat("id-ID");
  const prices = parseInt(price.replace(/\./g, ""));

  const [total, setTotal] = useState(prices);

  return (
    <Tr>
      <Td pr={{ md: "0" }}>
        <ProductCart isDiscount={isDiscount} price={price} />
      </Td>
      <Td>
        <CartPrice isDiscount={isDiscount} price={price} />
      </Td>
      <Td p={{ md: "0", "2xl": "1.5rem" }}>
        <AddAmount total={total} price={price} setTotal={setTotal} />
      </Td>
      <Td
        textAlign="center"
        px={{ md: "1rem", xl: "1.5rem" }}
        pl={{ md: "0.5rem", xl: "1.5rem" }}
      >
        <Text color="orange.400" fontWeight="500" fontSize="1.2rem" mb="1.4rem">
          Rp{idr.format(prices)}
        </Text>
      </Td>
    </Tr>
  );
};
