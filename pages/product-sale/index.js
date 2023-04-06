import { Box, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  getAllProductsByFilters,
  getProducts
} from "../../api/Homepage";
import { Layout } from "../../components/Layout";
import LayoutProductList from "../../components/LayoutProductList";
import {
  HomepageProvider,
  useHomePageContext,
} from "../../contexts/homepageProvider";
import { isRequestSuccess } from "../../utils/api";
import { titleCase } from "../../utils/functions";
import { useAuthContext } from "../../contexts/authProvider";
import { useInfiniteQuery, useQuery } from "react-query";


const SaleProductsDisplay = () => {
  const router = useRouter();
  const type = router.query.type;

  const auth = useAuthContext();
  const userId = auth.userData?.id;
  const userLevel = auth.userData?.user_level;
  const adminId = auth.userData?.admin_id;
  const isLoggedIn = auth.isLoggedIn;
  const authIsLoading = auth.loading;

  const toast = useToast();
  const errorToast = (errMessage) => {
    toast({
      position: "top",
      title: errMessage,
      status: "error",
      isClosable: true,
    });
  };

  const querySearchProducts = useInfiniteQuery(['products', type, userLevel], async ({ pageParam = 0 }) => {
    const filterType = {
      'discount': 'special',
      'flash-sale': 'flash_sale',
      'cicilan': 'cicilan'
    };
    try {
      const res = await getProducts(pageParam, userId, filterType[type])
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
    enabled: !authIsLoading && !!type,
    getNextPageParam: (lastPage) => lastPage.current_page >= lastPage.last_page ? undefined : lastPage.current_page + 1,
  });

  return (
    <Layout
      hasNavbar={true}
      hasPadding={true}
      hasBreadCrumb
      breadCrumbItem={[
        { name: titleCase((type ?? "").replace("-", " ")), isOnPage: true },
      ]}
    >
      <Box as="main" pb="12" d="flex" justifyContent="start" w="full">
        <Box paddingTop="1.8rem" minH="100vh" w="full">
          <Text
            className="primaryFont"
            fontWeight="semibold"
            fontSize="1.8rem"
            paddingBottom="1.5rem"
            textAlign="left"
          >
            Daftar produk {titleCase((type ?? "").replace("-", " "))}
          </Text>
          <LayoutProductList
            queryProducts={querySearchProducts}
            sorting={false}
            title={false}
          />
        </Box>
      </Box>
    </Layout>
  );
};

const SaleProducts = () => (
  <HomepageProvider>
    <SaleProductsDisplay />
  </HomepageProvider>
);

export default SaleProducts;
