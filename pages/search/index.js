import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllProductsByFilters } from "../../api/Homepage";

import { Layout } from "../../components/Layout";
import LayoutProductList from "../../components/LayoutProductList";
import { useAuthContext } from "../../contexts/authProvider";
import { isRequestSuccess } from "../../utils/api";

const Search = () => {
  const auth = useAuthContext();

  const userId = auth.userData?.id;
  const userLevel = auth.userData?.user_level;
  const adminId = auth.userData?.admin_id;
  const isLoggedIn = auth.isLoggedIn;
  const authIsLoading = auth.loading;

  const router = useRouter();
  const [search, setSearch] = useState({
    data: [],
    loading: true,
    currentPage: 1,
    lastPage: Number.MAX_SAFE_INTEGER,
  });

  const query = router.query.q ?? "";

  function handleLoadMoreProducts() {
    setSearch({ ...search, loading: true });

    const newPage = search.currentPage + 1;
    getAllProductsByFilters(newPage, userId, '', query)
      .then((res) => {
        if (isRequestSuccess(res.data)) {
          let temp = res.data.data.data;
          setSearch({
            data: search.data.concat(temp),
            loading: false,
            currentPage: newPage,
            lastPage: res.data.data.last_page,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    query && !authIsLoading && getAllProductsByFilters(1, userId, '', query)
      .then((res) => {
        if (isRequestSuccess(res.data)) {
          let temp = res.data.data.data;
          setSearch({
            data: temp ?? [],
            loading: false,
            currentPage: 1,
            lastPage: res.data.data.last_page,
          });
        } else {
          throw "Gagal mendapatkan hasil pencarian";
        }
      })
      .catch((err) => {
        console.error(err);
        setSearch({
          data: [],
          loading: false,
          ...search,
        });
      });
  }, [query, authIsLoading]);

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
            data={search}
            loading={search.loading}
            sorting={false}
            title={false}
            handleLoadMore={handleLoadMoreProducts}
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
