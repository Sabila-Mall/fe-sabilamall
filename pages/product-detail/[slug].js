import { Box, Flex, Button, Text, Icon } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";

import { checkStock } from "../../api/Stock";
import { getProductDetail } from "../../api/product-detail";
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
  const { userData, isLoggedIn } = useAuthContext();

  const userId = userData?.id;
  const userLevel = userData?.user_level;
  const adminId = userData?.admin_id;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [stocks, setStocks] = useState(null);
  const [reviewedCustomers, setReviewedCustomers] = useState([]);
  const [id, setId] = useState(null);
  const [pricePerUnit, setPricePerUnit] = useState(null);
  const [discountPricePerUnit, setDiscountPricePerUnit] = useState(null);
  const [downloadImage, setDownloadImage] = useState("");

  const router = useRouter();
  const slug = router.query.slug;

  useEffect(() => {
    setLoading(true);
    setData(null);
    setQuantity(0);
    setStocks(null);

    const getData = async () => {
      let dataPost = {};
      if (isNumber(slug)) {
        dataPost = {
          customers_id: isLoggedIn ? userId : null,
          products_id: slug,
          admin_id: adminId,
        };
      } else {
        dataPost = {
          customers_id: isLoggedIn ? userId : null,
          products_slug: slug,
          admin_id: adminId,

        };
      }

      try {
        const resProductDetails = await getProductDetail(dataPost);
        const { current_price, discount_price } = resProductDetails;
        setPricePerUnit(current_price ? Number(current_price) : 0);
        setDiscountPricePerUnit(discount_price ? Number(discount_price) : null);
        if (isNumber(slug))
          router.replace(
            `/product-detail/${resProductDetails?.products_slug}`,
            undefined,
            {
              shallow: true,
            },
          );
        setData(resProductDetails);
        setId(Number(resProductDetails?.products_id));

        const dataPostReview = {
          customers_id: isLoggedIn ? userId : null,
          products_id: Number(resProductDetails?.products_id),
        };

        const resStock = await checkStock({
          products_id: Number(resProductDetails?.products_id),
        });

        setStocks(resStock);

        quantity = resProductDetails.defaultStock;

        setQuantity(quantity);

        const resReview = await getReviewProduct(dataPostReview);
        setReviewedCustomers(resReview?.reviewed_customers?.data);
      } catch (e) {
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    slug && getData();
  }, [slug, userId]);

  if (loading) {
    return <Loading />;
  }

  if (!data) router.replace("/404");
  const {
    po_close_status,
    isHoliday,
    products_image,
    images,
    products_name,
    products_ordered,
    vendors_name,
    rating,
    products_quantity,
    isholidaydata,
    po_opendate,
    po_closedate,
    reviewed_customers,
    products_description,
    customerdiscount,
    vendors_address,
    attributes,
    warehouse,
    products_id,
    total_user_rated,
    one_ratio,
    two_ratio,
    three_ratio,
    four_ratio,
    five_ratio,
    related_products,
    po_shippingdate,
    vendors_success_rate,
    products_jenis,
    isLiked,
    products_slug,
    normal_price,
    final_price,
    isfreeshipping,
    promos,
    manufacturer_name,
    products_video,
    admindiscount,
  } = data;

  const productImagesData = {
    images,
    products_image,
    products_video,
  };

  const productInformationData = {
    products_description,
    vendors_name,
    vendor_rating: vendors_success_rate, // still hardcode
    vendors_address,
    id,
    total_user_rated,
    rating,
    one_ratio,
    two_ratio,
    three_ratio,
    four_ratio,
    five_ratio,
  };

  const productCheckoutData = {
    warehouse,
    attributes,
    products_quantity,
    customerdiscount,
    discount_price: isLoggedIn
      ? getPriceAfterDiscount(final_price, customerdiscount)
      : final_price,
    current_price: isLoggedIn ? final_price : normal_price,
    user_level: userLevel,
    customers_id: userId,
    products_id: id,
    stocks,
    isLiked,
    po_close_status: null ? 1 : po_close_status,
    preOrder: products_jenis === "po",
    products_slug,
    products_quantity: quantity,
    admin_id: adminId,
  };

  const productHeaderData = {
    po_close_status: null ? 1 : po_close_status,
    libur: isHoliday === 1,
    preOrder: products_jenis === "po",
    po_close_status,
    products_ordered,
    vendors_name,
    rating,
    customerdiscount,
    current_price: pricePerUnit,
    products_quantity: quantity,
    isholidaydata,
    po_opendate,
    po_closedate,
    discount_price: discountPricePerUnit,
    po_shippingdate,
    products_name,
    isfreeshipping,
    promos,
    admindiscount,

  };

  const path = [
    {
      name: vendors_name,
      link: "/",
      isOnPage: false,
    },
    {
      name: manufacturer_name,
      link: "/",
      isOnPage: false,
    },
    {
      name: products_name,
      link: "/",
      isOnPage: true,
    },
  ];

  const tempHeadImage = products_image.split("/");
  const headImage = tempHeadImage.slice(2, tempHeadImage.length).join("/");
  const handleDownloadImage = () => {
    axios
      .get(downloadImage, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", "image.jpg");

        document.body.appendChild(link);

        link.click();
      });
  };

  return (
    <Layout hasNavbar sticky hasBreadCrumb breadCrumbItem={path} hasPadding>
      <Head>
        <title>{`${products_name} - SabilaMall`}</title>
        <meta
          property="og:url"
          content={`https://sabilamall.co.id/product-detail/${products_slug}`}
        />{" "}
        //TODO
        <meta property="og:type" content="website" />
        <meta property="og:title" content={products_name} /> //TODO
        <meta property="og:description" content={products_description} />
        <meta
          property="og:image"
          content={`https://media.sabilamall.co.id/${headImage}`}
        />{" "}
        //TODO
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
                {...productImagesData}
                setImgLink={setDownloadImage}
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
            <ProductHeader {...productHeaderData} />
            <Box display={{ base: "none", lg: "block" }}>
              <ProductInformation {...productInformationData} />
            </Box>
          </Box>
          <Box w={{ base: "100%", lg: "25%" }} maxW="100vw">
            <ProductCheckout
              {...productCheckoutData}
              setDiscountPricePerUnit={setDiscountPricePerUnit}
              setPricePerUnit={setPricePerUnit}
            />
          </Box>
          <Box
            display={{ base: "block", lg: "none" }}
            mb={{ base: "2rem", lg: "0" }}
            maxW="100vw"
          >
            <ProductInformation {...productInformationData} />
            <Box mb="1rem" />
            <ShareProduct />
          </Box>
        </Flex>
        <Box w={{ lg: "75%" }} maxW="100vw">
          <ProductReview reviewed_customers={reviewedCustomers} />
        </Box>
        <Box maxW="100vw">
          <RelatedProductContainer
            related_products={related_products}
            customers_id={userId}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default ProductDetails;
