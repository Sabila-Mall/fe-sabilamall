import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Center, Grid, Spinner } from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { CardCheckout } from "../../components/CardCheckout";
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
  console.log(cartData.length);

  return (
    <Layout hasNavbar hasPadding hasBreadCrumb breadCrumbItem={path}>
      {loading ? <Grid placeItems="center">
        <Spinner></Spinner></Grid> :
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
                {cartData.length ?
                  <Tbody>
                    {cartData.map((el, index) => {
                      return (
                        <TableContent product={el} />
                      )
                    })}
                  </Tbody> :
                  <Box w="100%">
                    <Center w="100%" >
                      <Text
                        mt="1rem"
                        fontSize={"1rem"}
                        className={"secondaryFont"}>
                        Belum ada barang di dalam keranjang belanja
                      </Text>
                    </Center>
                    <Center w="100%">
                      <AddVoucher width={{ base: "full", lg: "50%" }} />
                    </Center>
                  </Box>
                }

              </Table>
            </Box>

            <Box display={{ base: "none", lg: "block" }} w={{ lg: "25%" }}>
              <CardCheckout />
            </Box>
          </Box>

          <Box display={{ base: "block", md: "none" }}>
            <ProductCart isDiscount price={"9.999.999"} />
          </Box>
        </Box>
      }

      {cartData.length ? <AddVoucher width={{ base: "full", lg: "30%" }} /> : <></>}
      <Box display={{ lg: "none" }}>
        <CardCheckout />
      </Box>
    </Layout>
  );
};

const AddVoucher = ({ width }) => {
  return (
    <Box w={{ lg: "75%" }} mt={{ md: "1.5rem" }} pr={{ lg: "1.9rem" }}>
      <Flex justifyContent={{ lg: "center" }}>
        <Button
          mt={{ base: "13px", lg: "0" }}
          mb={{ base: "2rem", lg: "0" }}
          w={width}
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
