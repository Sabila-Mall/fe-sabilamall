import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getSearchResult } from "../../api/Search";
import { Layout } from "../../components/Layout";
import LayoutProductList from "../../components/LayoutProductList";
import { isRequestSuccess } from "../../utils/api";

const Search = () => {
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
    getSearchResult(query, newPage)
      .then((res) => {
        if (isRequestSuccess(res)) {
          if ((res.data.data.constructor = Object)) {
            // Quick hack to check if the response is a dictionary instead of array
            let temp = Object.values(res.data.data);
            temp.pop();
            setSearch({
              data: search.data.concat(temp),
              loading: false,
              currentPage: newPage,
              lastPage: res.data.last_page,
            });
          } else {
            let temp = res.data.data;
            temp.pop();
            setSearch({
              data: search.data.concat(temp),
              loading: false,
              currentPage: newPage,
              lastPage: res.data.last_page,
            });
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    if (query) {
      getSearchResult(query, 1)
        .then((res) => {
          if (isRequestSuccess(res)) {
            if ((res.data.data.constructor = Object)) {
              // Quick hack to check if the response is a dictionary instead of array
              let temp = Object.values(res.data.data);
              temp.pop();
              setSearch({
                data: temp ?? [],
                loading: false,
                currentPage: 1,
                lastPage: res.data.last_page,
              });
            } else {
              let temp = res.data.data;
              temp.pop();
              setSearch({
                data: temp ?? [],
                loading: false,
                currentPage: 1,
                lastPage: res.data.last_page,
              });
            }
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
    }
  }, [query]);

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
