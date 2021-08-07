import {
  Box,
  Button,
  Grid,
  Text,
  Image,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";

import { getWishlistByUserId } from "../../api/wishlist";
import CardProduct from "../../components/CardProduct";
import CardWishlist from "../../components/CardWishlist";
import Footer from "../../components/Footer";
import { Layout } from "../../components/Layout";
import Navbar from "../../components/Navbar";
import { useAuthContext } from "../../contexts/authProvider";

const Wishlist = () => {
  const { userData } = useAuthContext();
  const userId = userData?.id;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (userId) {
      getWishlistByUserId(userId)
        .then((res) => {
          setData(res);
          console.log(res);
        })
        .finally(() => setLoading(false));
    }
  }, [userData]);

  return (
    <Layout hasNavbar>
      <Flex direction="column">
        {loading ? (
          <Spinner />
        ) : (
          <Box
            as="main"
            pt={{ base: "51px", md: "71px" }}
            pb="12"
            d="flex"
            justifyContent="center"
          >
            {data.length > 0 && (
              <Box paddingTop="1.8rem" minH="100vh">
                <Text
                  className="primaryFont"
                  fontWeight="700"
                  fontSize={{ base: "1.8rem", md: "2.25rem" }}
                  paddingBottom="1.5rem"
                >
                  Wishlist
                </Text>
                <Box display={{ base: "none", md: "block" }}>
                  <Grid
                    templateColumns={{
                      base: "repeat(2, 200px)",
                      md: "repeat(3, 200px)",
                      lg: "repeat(4, 200px)",
                      xl: "repeat(5, 200px)",
                    }}
                    gap={6}
                  >
                    {data.map((item) => {
                      return (
                        <CardProduct
                          {...item}
                          key={item.id}
                          isWishlist={true}
                        />
                      );
                    })}
                  </Grid>
                </Box>
                <Box display={{ base: "block", md: "none" }} w="90vw">
                  {data.map((item) => {
                    return (
                      <CardWishlist
                        {...item}
                        key={item.id}
                        liked_customers_id={userId}
                      />
                    );
                  })}
                </Box>
              </Box>
            )}
            {data.length === 0 && (
              <Box
                w="100%"
                pt="3rem"
                d="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                px={3}
              >
                <Text
                  className="primaryFont"
                  fontWeight="700"
                  fontSize={{ base: "1.8rem", md: "2.25rem" }}
                  marginBottom="1.5rem"
                  w="100%"
                  ml={{ base: "30px", md: "80px", lg: "80px", xl: "120px" }}
                >
                  Wishlist
                </Text>
                <Box
                  d="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                  paddingBottom="5rem"
                >
                  <Image
                    src="/images/Wishlist/sabila-mall-wishlist-empty.png"
                    alt="sabila-mall-wishlist-empty"
                    w={{ base: "70%", md: "100%" }}
                  />
                  <Text className="primaryFont" fontWeight="700" align="center">
                    Sepertinya kamu belum punya wishlist.
                  </Text>
                  <Text className="primaryFont" fontWeight="500" align="center">
                    Gimana kalau belanja dulu
                  </Text>
                  <Button
                    bg="red.500"
                    color="white"
                    _hover={{ bg: "red.600" }}
                    isFullWidth
                    onClick={() => console.log("pencet")}
                    marginTop="1.5rem"
                  >
                    Mulai Belanja
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Flex>
    </Layout>
  );
};

export default Wishlist;
