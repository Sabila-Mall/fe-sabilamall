import { Box, Grid, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getSearchResult } from "../../api/Search";
import CardProduct from "../../components/CardProduct";
import { Layout } from "../../components/Layout";
import { isRequestSuccess } from "../../utils/api";

const Search = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const query = router.query.q;

  useEffect(() => {
    if (query) {
      setLoading(true);
      getSearchResult(query)
        .then((res) => {
          if (isRequestSuccess(res)) setData(res.data.data);
        })
        .finally(() => setLoading(false));
    }
  }, [query]);

  return (
    <Layout hasNavbar hasPadding>
      <Box
        as="main"
        pt={{ base: "51px", md: "71px" }}
        pb="12"
        d="flex"
        justifyContent="start"
        w="full"
      >
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
          <Grid
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
                return <CardProduct {...item} key={item.id} />;
              })
            )}
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default Search;
