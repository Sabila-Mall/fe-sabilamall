import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Layout } from "../../components/Layout";
import { getProductsByCategory } from "../../api/DaftarProduk";
import LayoutProductList from "../../components/LayoutProductList";
import { useToast } from "@chakra-ui/toast";

const DaftarProduk = () => {
  const router = useRouter();
  const [products, setProducts] = useState({
    data: new Array(8).fill(0),
    loading: true,
    currentPage: 1,
    lastPage: Number.MAX_SAFE_INTEGER,
  });
  const categoryId = router.query.id;
  const categoryName = router.query.nama;

  const toast = useToast();
  const errorToast = (errMessage) => {
    toast({
      position: "top",
      title: errMessage,
      status: "error",
      isClosable: true,
    });
  };

  function handleLoadMore() {
    setProducts({ ...products, loading: true });

    const newPage = products.currentPage + 1;
    getProductsByCategory(387, newPage)
      .then((res) => {
        setProducts({
          data: products.data.concat(res.data.data),
          loading: false,
          currentPage: newPage,
          lastPage: res.data.last_page,
        });
      })
      .catch(err => {
        console.error(err);
        errorToast("Gagal mengambil produk");
        setProducts({ ...products, loading: false, data: [] });
      });
  }

  useEffect(() => {
    if (categoryId) {
      getProductsByCategory(categoryId, 1)
        .then((res) => {
          setProducts({
            data: res.data.data,
            loading: false,
            currentPage: 1,
            lastPage: res.data.last_page,
          });
        })
        .catch(err => {
          console.error(err);
          setProducts({ ...products, loading: false });
        });
    }
  }, [categoryId]);

  return (
    <Layout hasNavbar hasPadding>
      <Box
        as="main"
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
            Daftar produk dengan kategori {categoryName}
          </Text>

          <LayoutProductList
            data={products} loading={products.loading}
            handleLoadMore={handleLoadMore} sorting={false} title={false}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default DaftarProduk;