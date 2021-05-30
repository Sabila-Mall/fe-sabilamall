import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";

import { CardCheckout } from "../../components/CardCheckout";
import { Layout } from "../../components/Layout";
import { ProductCart } from "../../components/ProductCart";

const cartDetails = () => {
  return (
    <Layout hasNavbar>
      <Box w="full">
        <ProductCart isDiscount price={"99.999.999"} />
        <ProductCart isDiscount price={"99.999.999"} />
        <ProductCart price={"99.999.999"} />
        <Flex justifyContent={{ lg: "justify-between" }} flexWrap="wrap">
          <InputGroup w="full">
            <Input placeholder="Masukkan kode voucher" />
            <InputRightAddon
              color="white"
              bgColor="orange.400"
              children="Terapkan"
              fontSize="0.875rem"
            />
          </InputGroup>
          <Button
            mt={{ base: "13px" }}
            mb={{ base: "2rem" }}
            w="full"
            variant="outline"
            colorScheme="orange"
            color="orange.400"
            fontWeight="700"
          >
            Belanja Produk Lainnya
          </Button>
        </Flex>
        <CardCheckout subTotal={"99.999.999"} discount={"89.999.999"} />
      </Box>
    </Layout>
  );
};
export default cartDetails;
