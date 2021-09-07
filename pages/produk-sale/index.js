import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HomepageProvider, useHomePageContext } from "../../contexts/homepageProvider";
import { Box, Text } from "@chakra-ui/react";
import LayoutProductList from "../../components/LayoutProductList";
import { Layout } from "../../components/Layout";
import { getDiscountProducts, getFlashSaleProducts, getProducts } from "../../api/Homepage";
import { isRequestSuccess } from "../../utils/api";
import { useToast } from "@chakra-ui/toast";

const SaleProductsDisplay = () => {
  const router = useRouter();
  const { flashSaleProducts, discountProducts } = useHomePageContext();
  const [products, setProducts] = useState({
    data: [],
    loading: true,
    currentPage: 1,
    lastPage: Number.MAX_SAFE_INTEGER,
  });
  const type = router.query.type;

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
    let response = null;
    if (type === "flash-sale") {
      response = getFlashSaleProducts(newPage);
    } else if (type === "discount") {
      response = getDiscountProducts(newPage);
    }

    if (response) {
      response
        .then(res => {
          if (isRequestSuccess(res.data)) {
            setProducts(
              {
                data: products.data.concat(Object.values(res.data.data.data)),
                currentPage: newPage,
                lastPage: res.data.data.last_page,
                loading: false,
              });
          }
        })
        .catch(err => {
          console.error(err);
          errorToast("Gagal menampilkan produk lebih");
        });
    }
  }

  useEffect(() => {
    if (type) {
      if (type === "discount" && discountProducts) {
        setProducts(discountProducts);
      } else if (type === "flash-sale" && flashSaleProducts) {
        setProducts(flashSaleProducts);
      }
    }
  }, [type]);

  return (
    <Layout hasNavbar={true} hasPadding={true}>
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
            Daftar produk {(type ?? "").replace("-", " ")}
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

const SaleProducts = () =>
  <HomepageProvider>
    <SaleProductsDisplay />
  </HomepageProvider>;


export default SaleProducts;