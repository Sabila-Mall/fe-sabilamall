import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { useState } from "react";

import { AddAmount } from "../../components/AddAmount";
import { CardCheckout } from "../../components/CardCheckout";
import { CartPrice } from "../../components/CartPrice";
import { Layout } from "../../components/Layout";
import { ProductCart } from "../../components/ProductCart";
import { TableContent } from "../../components/TableContent";
import { useCartContext } from "../../contexts/cartProvider";

const path = [
  {
    name: "Keranjang",
    link: "/cart-details",
    isOnPage: true,
  },
];

const cartDetails = () => {

  const { cartData, loading } = useCartContext();
  // const [priceValue, setpriceValue] = useState(totalPrice[0])
  // console.log(totalPrice);

  return (
    <Layout hasNavbar hasPadding hasBreadCrumb breadCrumbItem={path}>
      <Box w="full">
        <Box display={{ lg: "flex" }} justifyContent="space-between">
          <Box
            w={{ lg: "75%" }}
            mr={{ lg: "1rem", xl: "2rem" }}
            border={{ md: "1px solid #CBD5E0" }}
            borderRadius={{ md: "12px" }}
          >
            <Table size="md" display={{ base: "none", md: "block" }}>
              <Thead>
                <Tr>
                  <Th w="50%">Produk</Th>
                  <Th w="20%">Harga Satuan</Th>
                  <Th textAlign="center" pr={{ xl: "0.5rem" }} p="0" w="20%">
                    Jumlah
                  </Th>
                  <Th w="20%" textAlign="center" px="1em">
                    Subtotal
                  </Th>
                </Tr>
              </Thead>
              {cartData ?
                <Tbody>
                  {cartData.map((el, index) => {
                    return (
                      <TableContent product={el} />
                    )
                  })}
                </Tbody> : <></>
              }

            </Table>
          </Box>

          <Box display={{ base: "none", lg: "block" }} w={{ lg: "25%" }}>
            <CardCheckout discount="0" />
          </Box>
        </Box>

        <Box display={{ base: "block", md: "none" }}>
          <ProductCart isDiscount price={"9.999.999"} />
        </Box>
      </Box>

      <AddVoucher />
      <Box display={{ lg: "none" }}>
        <CardCheckout discount={"89.999.999"} />
      </Box>
    </Layout>
  );
};

const AddVoucher = () => {
  return (
    <Box w={{ lg: "75%" }} mt={{ md: "1.5rem" }} pr={{ lg: "1.9rem" }}>
      <Flex justifyContent={{ lg: "center" }}>
        <Button
          mt={{ base: "13px", lg: "0" }}
          mb={{ base: "2rem", lg: "0" }}
          w={{ base: "full", lg: "30%" }}
          variant="outline"
          colorScheme="orange"
          color="orange.400"
          fontWeight="700"
        >
          Belanja Produk Lainnya
        </Button>
      </Flex>
    </Box>
  );
};
export default cartDetails;
