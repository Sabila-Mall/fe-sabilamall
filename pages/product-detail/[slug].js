import { Box, Flex, Button, Text, Icon, useToast, Spinner, VStack } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";

import { getStockData, getProductStock } from "../../api/Stock";
import { getProductDetail } from "../../api/product-detail";
import { getRelatedProduct } from "../../api/related-products";
import { HOST } from "../../constants/api";
import { getReviewProduct } from "../../api/review";
import { Layout } from "../../components/Layout";
import Loading from "../../components/Loading";
import ProductCheckout from "../../components/ProductCheckout";
import ProductHeader from "../../components/ProductHeader";
import { ProductImages } from "../../components/ProductImages";
import ProductInformation from "../../components/ProductInformation";
import ProductReview from "../../components/ProductReview";
import RelatedProductContainer from "../../components/RelatedProductContainer";
import { ShareProduct } from "../../components/ShareProduct";
import { IMAGE_HOST } from "../../constants/api";
import { useAuthContext } from "../../contexts/authProvider";
import { isNumber, getPriceAfterDiscount, getImageLink } from "../../utils/functions";
import { getAllProductsByFilters, getProducts } from "../../api/Homepage";
import { useQuery } from "react-query";
import { init } from "@sentry/nextjs";
import { isRequestSuccess } from "../../utils/api";

const ProductDetails = () => {
  const auth = useAuthContext();
  const router = useRouter();
  const { slug } = router.query;

  const userId = auth.userData?.id;
  const userLevel = auth.userData?.user_level;
  const adminId = auth.userData?.admin_id;
  const isLoggedIn = auth.isLoggedIn;
  const authIsLoading = auth.loading;

  const [loading, setLoading] = useState(true);
  const [stockData, setStockData] = useState([]);

  const toast = useToast();
  const errorToast = (errMessage) => {
    toast({
      position: "top",
      title: errMessage,
      status: "error",
      isClosable: true,
    });
  };


  const queryProductDetail = useQuery(['product_detail', slug, userLevel], async () => {
    try {
      const res = await getProductDetail(userId, slug, null)
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
    enabled: !authIsLoading && !!slug,
  })

  const queryProductStok = useQuery(['product_stock', slug], async () => {
    try {
      // await new Promise((resolve, reject) => {
      //   setTimeout(() => resolve(), 5000)
      // })
      const res = await getProductStock({ products_slug: slug });
      if (isRequestSuccess(res.data)) {
        return res.data.data;
      } else {
        throw "Gagal mendapatkan stok produk";
      }
    } catch (err) {
      console.error(err);
      errorToast(err);
    }
  }, {
    refetchOnWindowFocus: false,
    enabled: !authIsLoading && !!slug,
  });

  const queryRelatedProduct = useQuery(['related_product', slug], async () => {
    try {
      const res = await getProducts(1, userId, 'related', null, null, slug, 0, 999999999, 6);
      if (isRequestSuccess(res.data)) {
        return res.data.data.data;
      } else {
        throw "Gagal mendapatkan related produk";
      }
    } catch (err) {
      console.error(err);
      errorToast(err);
    }
  }, {
    refetchOnWindowFocus: false,
    enabled: !authIsLoading && !!slug,
  });

  if (!queryProductDetail.isFetched) {
    return (
      <>
        <Loading />
      </>
    );
  }

  // ==== path
  let path = [];
  const breadCrumbItem = JSON.parse(queryProductDetail.data?.categories ?? "[]");
  let count_item = breadCrumbItem.length;

  if (count_item > 0) {
    path.push(breadCrumbItem.find((i) => i.parent_id == 0));
  }

  if (path.length > 0) {
    let while_count = count_item * count_item;
    while (while_count != 0) {
      const data = breadCrumbItem.find((i) => i.parent_id == path[path.length - 1].categories_id);
      if (data != null) {
        path.push(data);
      }
      if (path.length == count_item) {
        break;
      }
      while_count--;
    }
    path = path.map((item) => {
      return {
        name: item.categories_name,
        link: "/",
        isOnPage: false,
      }
    });
  } else {
    path = [{
      name: 'Home',
      link: "/",
      isOnPage: false,
    }]
  }

  const tempHeadImage = queryProductDetail.data?.products_image.split("/");
  const headImage = tempHeadImage?.slice(2, tempHeadImage.length).join("/");

  //price

  return (
    <Layout hasNavbar sticky hasBreadCrumb breadCrumbItem={path} hasPadding>
      <CustomHead queryProductDetail={queryProductDetail} />
      <Box w="full">
        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent={{ md: "center" }}
          mt="2rem"
          w="full"
        >
          <Box
            w={{ base: "100%", lg: "32%", "2xl": "25%" }}
            mb={{ base: "0.5rem", lg: "5rem" }}
          >
            <Box h="fit-content" position={{ lg: "sticky" }} top="6rem">
              <ProductImages
                {...queryProductDetail.data}
              />
              <Box display={{ base: "none", lg: "block" }}>
                <ShareProduct />
              </Box>
            </Box>
          </Box>
          <Box
            w={{ base: "100%" }}
            maxW="100vw"
            px={{ lg: "1rem", xl: "0.5rem", "2xl": "2rem" }}
            mx={{ lg: "1rem" }}
          >
            <ProductHeader {...queryProductDetail.data} />
            <Box display={{ base: "none", lg: "block" }}>
              <ProductInformation {...queryProductDetail.data} />
            </Box>
          </Box>
          <Box w={{ base: "100%", lg: "25%" }} maxW="100vw" mt={{ base: '3', lg: '0' }}>
            {queryProductStok.isFetched ?
              (<ProductCheckout
                productDetail={queryProductDetail.data}
                productStock={queryProductStok.data}
              />
              ) : (
                <VStack minW={{ base: '100%', md: '300px' }} borderColor={"gray.300"} borderWidth={"1px"} spacing={'12px'} className={"secondaryFont"} p={'2rem'} borderRadius={"12px"}>
                  <Spinner color="gray.500" />
                </VStack>
              )
            }
          </Box>
          <Box
            display={{ base: "block", lg: "none" }}
            mb={{ base: "2rem", lg: "0" }}
            maxW="100vw"
          >
            <ProductInformation {...queryProductDetail.data} />
            <Box mb="1rem" />
            <ShareProduct />
          </Box>
        </Flex>
        <Box w={{ lg: "75%" }} maxW="100vw">
          <ProductReview {...queryProductDetail.data} />
        </Box>
        <Box maxW="100vw">
          <RelatedProductContainer
            queryRelatedProduct={queryRelatedProduct}
          />
        </Box>
      </Box>
    </Layout>
  );
};

const CustomHead = ({ queryProductDetail }) => {

  console.log(queryProductDetail.data);

  if(queryProductDetail.status == 'success') {
    const products_image = getImageLink(queryProductDetail.data?.products_image);
    const products_link = `https://www.sabilamall.co.id/product-detail/${queryProductDetail.data?.products_slug}`;
    const products_keywords = `reseller baju muslim, supplier dropship, open reseller gamis, supplier hijab, dropship terpercaya, ${queryProductDetail.data?.products_name}, ${queryProductDetail.data?.manufacturers_name}, ${JSON.parse(queryProductDetail.data?.categories ?? "[]").map((item) => item.categories_name).join(', ')}`;
    const products_description = queryProductDetail.data?.products_description == '' ? products_keywords : queryProductDetail.data?.products_description;
    const products_slug = queryProductDetail.data?.products_slug;
    const products_name = queryProductDetail.data?.products_name;

    return (
      <Head>
        <title>{`${products_name} - SabilaMall`}</title>
        <meta
          property="og:url"
          content={products_link}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={products_name} />
        <meta property="og:description" content={products_description} />
        <meta
          property="og:image"
          content={products_image}
        />
        <meta name="keywords" content={products_keywords} />
        <meta name="author" content="SabilaMall" />
        <meta name="DC.title" content={products_name} />
        <meta
          name="description"
          content={products_description}
        />
      </Head>
    )
  } 

  return <></>;
  
}

// export async function getServerSideProps(context) {
//   const products_slug = context.params.slug;
//   const res = await axios.get(`https://smapi.sabilamall.co.id/api/product/info?products_slug=${products_slug}`);

//   let initialData = res.data.data;

//   initialData.products_image = getImageLink(initialData.products_image);
//   initialData.products_link = `https://www.sabilamall.co.id/product-detail/${initialData.products_slug}`;

//   initialData.products_keywords = `reseller baju muslim, supplier dropship, open reseller gamis, supplier hijab, dropship terpercaya, ${initialData.products_name}, ${initialData.manufacturer_name}, ${JSON.parse(initialData.categories ?? "[]").join(', ')}, ${initialData.origin_city}`;

//   initialData.products_description = initialData.products_description == '' ? initialData.products_keywords : initialData.products_description;

//   initialData.products_slug = products_slug;

//   return {
//     props: { initialData },
//   }
// }

export default ProductDetails;