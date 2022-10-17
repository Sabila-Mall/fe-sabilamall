import { Box, Flex, Button, Text, Icon } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";

import { getStockData } from "../../api/Stock";
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

const ProductDetails = ({ initialData }) => {
  const auth = useAuthContext();

  const userId = auth.userData?.id;
  const userLevel = auth.userData?.user_level;
  const adminId = auth.userData?.admin_id;
  const isLoggedIn = auth.isLoggedIn;
  const authIsLoading = auth.loading;

  const [loading, setLoading] = useState(true);
  const [dataProduct, setDataProduct] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const router = useRouter();
  const slug = router.query.slug;

  useEffect(() => {
    slug && !authIsLoading && getProductDetails();
  }, [slug, authIsLoading, userLevel]);

  const getProductDetails = async () => {
    setLoading(true);
    try {
      const res = await getProductDetail({
        customers_id: isLoggedIn ? userId : null,
        products_slug: slug,
        admin_id: adminId,
      });
      setDataProduct(res);
    } catch (e) {
      router.replace('/404');
    }
    setLoading(false);
  }

  useEffect(() => {
    slug && getStockDatas();
  }, [slug])

  const getStockDatas = async () => {
    try {
      const res = await getStockData({ products_slug: slug });
      setStockData(res);
    } catch (e) {
      router.replace('/404');
    }
  }

  useEffect(() => {
    slug && !authIsLoading && getRelatedProducts();
  }, [slug, authIsLoading])

  const getRelatedProducts = async () => {
    try {
      const res = await getRelatedProduct({ products_slug: slug, customers_id: userId });
      setRelatedProducts(res);
    } catch (e) {
    }
  }

  if (loading) {
    return (
      <>
        <CustomHead initialData={initialData} />
        <Loading />
      </>
    );
  }

  // ==== path
  let path = [];
  const breadCrumbItem = JSON.parse(dataProduct.categories ?? "[]");
  let count_item = breadCrumbItem.length;

  if (count_item > 0) {
    path.push(breadCrumbItem.find((i) => i.parent_id == 0));
  }

  let while_count = count_item * count_item;
  while (path.length != count_item || while_count != 0) {
    const data = breadCrumbItem.find((i) => i.parent_id == path[path.length - 1].categories_id);
    if (data == null) {
      break;
    }
    path.push(data)
    while_count--;
  }

  console.log(path);

  path = path.map((item) => {
    return {
      name: item.categories_name,
      link: "/",
      isOnPage: false,
    }
  });
  // ========================

  const tempHeadImage = dataProduct.products_image.split("/");
  const headImage = tempHeadImage.slice(2, tempHeadImage.length).join("/");

  //price

  return (
    <Layout hasNavbar sticky hasBreadCrumb breadCrumbItem={path} hasPadding>
      <CustomHead initialData={initialData} />
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
                {...dataProduct}
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
            <ProductHeader {...dataProduct} />
            <Box display={{ base: "none", lg: "block" }}>
              <ProductInformation {...dataProduct} />
            </Box>
          </Box>
          <Box w={{ base: "100%", lg: "25%" }} maxW="100vw" mt={{ base: '3', lg: '0' }}>
            <ProductCheckout
              {...dataProduct} stockData={stockData}
            />
          </Box>
          <Box
            display={{ base: "block", lg: "none" }}
            mb={{ base: "2rem", lg: "0" }}
            maxW="100vw"
          >
            <ProductInformation {...dataProduct} />
            <Box mb="1rem" />
            <ShareProduct />
          </Box>
        </Flex>
        <Box w={{ lg: "75%" }} maxW="100vw">
          <ProductReview {...dataProduct} />
        </Box>
        <Box maxW="100vw">
          <RelatedProductContainer
            relatedProducts={relatedProducts}
          />
        </Box>
      </Box>
    </Layout>
  );
};

const CustomHead = ({ initialData }) => {
  return (
    <Head>
      <title>{`${initialData?.products_name} - SabilaMall`}</title>
      <meta
        property="og:url"
        content={initialData?.products_link}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={initialData?.products_name} />
      <meta property="og:description" content={initialData?.products_description} />
      <meta
        property="og:image"
        content={initialData?.products_image}
      />
      <meta name="keywords" content={initialData?.products_keywords} />
      <meta name="author" content="SabilaMall" />
      <meta name="DC.title" content={initialData?.products_name} />
      <meta
        name="description"
        content={initialData?.products_description}
      />
    </Head>

  )
}

export async function getServerSideProps(context) {
  const products_slug = context.params.slug;
  const res = await axios.post(HOST + "/api/product/get_products_info", { products_slug: products_slug });

  let initialData = res.data.data;

  initialData.products_image = getImageLink(initialData.products_image);
  initialData.products_link = `https://www.sabilamall.co.id/product-detail/${initialData.products_slug}`;

  initialData.products_keywords = `reseller baju muslim, supplier dropship, open reseller gamis, supplier hijab, dropship terpercaya, ${initialData.products_name}, ${initialData.manufacturer_name}, ${JSON.parse(initialData.categories ?? "[]").join(', ')}, ${initialData.origin_city}`;

  initialData.products_description = initialData.products_description == '' ? initialData.products_keywords : initialData.products_description;

  return {
    props: { initialData },
  }
}

export default ProductDetails;