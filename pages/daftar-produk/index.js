import { Box, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getProductsByCategory } from "../../api/DaftarProduk";
import { getAllProductsByFilters, getProducts } from "../../api/Homepage";
import { Layout } from "../../components/Layout";
import LayoutProductList from "../../components/LayoutProductList";
import { useAuthContext } from "../../contexts/authProvider";
import { isRequestSuccess } from "../../utils/api";


import { useInfiniteQuery, useQuery } from "react-query";


const DaftarProduk = () => {
  const router = useRouter();
  const categoryId = router.query.id;
  const categoryName = router.query.nama;

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

  const querySearchProducts = useInfiniteQuery(['products', categoryId, userLevel], async ({ pageParam = 0 }) => {
    try {
      const res = await getProducts(pageParam, userId, 'category', null, categoryId)
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
    initialData: {
      pages: [
        { data: new Array(20).fill(0) }
      ]
    },
    refetchOnWindowFocus: false,
    enabled: !authIsLoading && !!categoryId,
    getNextPageParam: (lastPage) => lastPage.current_page >= lastPage.last_page ? undefined : lastPage.current_page + 1,
  });

  return (
    <Layout hasNavbar hasPadding>
      <Box as="main" pb="12" d="flex" justifyContent="start" w="full">
        <Box paddingTop="1.8rem" minH="100vh" w="full">
          <Text
            className="primaryFont"
            fontWeight="semibold"
            fontSize="1.8rem"
            paddingBottom="1.5rem"
            textAlign="left"
          >
            Daftar produk dengan kategori {categoryName}
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

export default DaftarProduk;
