import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllProductsByFilters, getProducts } from "../../api/Homepage";

import { Layout } from "../../components/Layout";
import LayoutProductList from "../../components/LayoutProductList";
import { useAuthContext } from "../../contexts/authProvider";
import { isRequestSuccess } from "../../utils/api";

import { useInfiniteQuery, useQuery } from "react-query";


const Search = () => {
  const auth = useAuthContext();

  const userId = auth.userData?.id;
  const userLevel = auth.userData?.user_level;
  const adminId = auth.userData?.admin_id;
  const isLoggedIn = auth.isLoggedIn;
  const authIsLoading = auth.loading;
  const router = useRouter();
  const query = router.query.q;

  const querySearchProducts = useInfiniteQuery(['products', query], async ({ pageParam = 0 }) => {
    try {
      const res = await getProducts(pageParam, userId, '', query)
      if (isRequestSuccess(res.data)) {
        return res.data.data;
      } else {
        throw "Gagal mendapatkan produk";
      }
    } catch (err) {
      console.error(err);
      errorToast(err);
    }
  }, {
    refetchOnWindowFocus: false,
    enabled: !authIsLoading && !!query,
    getNextPageParam: (lastPage) => lastPage.current_page >= lastPage.last_page ? undefined : lastPage.current_page + 1,
  });

  return (
    <Layout hasNavbar hasPadding>
      <Box as="main" d="flex" justifyContent="start" w="full">
        <Box paddingTop="1.8rem" minH="100vh" w="full">
          <Text
            className="primaryFont"
            fontWeight="semibold"
            fontSize="1.8rem"
            paddingBottom="1.5rem"
            textAlign="left"
          >
            Hasil pencarian untuk {`"${query}"`}
          </Text>
          <LayoutProductList
            queryProducts={querySearchProducts}
            sorting={false}
            title={false}
          />
          {/* <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(5, 1fr)",
              "2xl": "repeat(6, 1fr)",
            }}
            gap={6}
            placeItems="center"
          >
            {loading ? (
              <Spinner />
            ) : (
              data.map((item) => {
                if (item.id) {
                  return <CardProduct {...item} key={item.id} />;
                }
              })
            )}
          </Grid> */}
        </Box>
      </Box>
    </Layout>
  );
};

export default Search;
