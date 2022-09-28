import { Box, Flex, Button, Text, Icon } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";

import { getStockData } from "../../api/Stock";
import { getProductDetail } from "../../api/product-detail";
import { getRelatedProduct } from "../../api/related-products";
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
import { isNumber, getPriceAfterDiscount } from "../../utils/functions";

const ProductDetails = () => {
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
      router.replace('/404');
    }
  }

  if (loading) {
    return (
      <>
        <Head>
          <title>{`Detail Produk - SabilaMall`}</title>
          <meta
            property="og:url"
            content={`https://sabilamall.co.id/product-detail`}
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={'test title'} />
          <meta property="og:description" content={'test description'} />
          <meta
            property="og:image"
            content={`https://i0.wp.com/www.lenterabisnis.com/wp-content/uploads/2018/07/atribut-produk.jpg`}
          />
          <meta name="keywords" content="test" />
          <meta name="author" content="SabilaMall" />
          <meta name="DC.title" content="test asd" />
          <meta
            name="description"
            content="Distributor Grosir Supplier Baju Muslim, Gamis, Hijab Nibras, Endomoda, Ethica, Seply, Labella, Yasmeera. Dropship  Terpercaya & Murah Open Reseller."
          />
          <meta
            name="csrf-token"
            content="jpDOUlWRa9ZovRrM3JYK7D6McJnWKCeU19SmLZqV"
          />
        </Head>
        <Loading />
      </>
    );
  }

  // ==== path
  let path = [];
  const breadCrumbItem = JSON.parse(dataProduct.categories ?? "[]");
  path.push(breadCrumbItem.find((i) => i.parent_id == 0));

  let count_item = breadCrumbItem.length;

  while (path.length != count_item) {
    const data = breadCrumbItem.find((i) => i.parent_id == path[path.length - 1].categories_id);
    if (data == null) {
      break;
    }
    path.push(data)
  }

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
  // const handleDownloadImage = () => {
  //   axios
  //     .get(downloadImage, {
  //       responseType: "blob",
  //     })
  //     .then((response) => {
  //       const url = window.URL.createObjectURL(new Blob([response.data]));

  //       const link = document.createElement("a");

  //       link.href = url;
  //       link.setAttribute("download", "image.jpg");

  //       document.body.appendChild(link);

  //       link.click();
  //     });
  // };


  return (
    <Layout hasNavbar sticky hasBreadCrumb breadCrumbItem={path} hasPadding>
      <Head>
        <title>{`${dataProduct.products_name} - SabilaMall`}</title>
        <meta
          property="og:url"
          content={`https://sabilamall.co.id/product-detail/${slug}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={dataProduct.products_name} />
        <meta property="og:description" content={dataProduct.products_description} />
        <meta
          property="og:image"
          content={`https://media.sabilamall.co.id/${headImage}`}
        />
        <meta name="keywords" content="" />
        <meta name="author" content="SabilaMall" />
        <meta name="DC.title" content="" />
        <meta
          name="description"
          content="Distributor Grosir Supplier Baju Muslim, Gamis, Hijab Nibras, Endomoda, Ethica, Seply, Labella, Yasmeera. Dropship  Terpercaya & Murah Open Reseller."
        />
        <meta
          name="csrf-token"
          content="jpDOUlWRa9ZovRrM3JYK7D6McJnWKCeU19SmLZqV"
        />
      </Head>
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

export default ProductDetails;