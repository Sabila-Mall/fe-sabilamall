import { Box, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  getAllProductsByFilters,
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

  function handleLoadMore() {
    setProducts({ ...products, loading: true });

    const newPage = products.currentPage + 1;
    let response = null;
    if (type === "flash-sale") {
      response = getAllProductsByFilters(newPage, userId, 'flash_sale');
    } else if (type === "discount") {
      response = getAllProductsByFilters(newPage, userId, 'special');
    }

    if (response) {
      response
        .then((res) => {
          if (isRequestSuccess(res.data)) {
            setProducts({
              data: products.data.concat(Object.values(res.data.data.data)),
              currentPage: newPage,
              lastPage: res.data.data.last_page,
              loading: false,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          errorToast("Gagal menampilkan produk lebih");
        });
    }
  }

  useEffect(() => {
    if (type && !authIsLoading) {
      if (type === "discount" && discountProducts) {
        setProducts(discountProducts);
      } else if (type === "flash-sale" && flashSaleProducts) {
        setProducts(flashSaleProducts);
      }
    }
  }, [type, flashSaleProducts, discountProducts, authIsLoading, userLevel]);

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
            data={products}
            loading={products.loading}
            handleLoadMore={handleLoadMore}
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
