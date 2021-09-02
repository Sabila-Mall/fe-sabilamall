import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { checkStock } from "../../api/Stock";
import { getProductDetail } from "../../api/product-details";
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
import { useAuthContext } from "../../contexts/authProvider";

const ProductDetails = () => {
  const { userData, isLoggedIn } = useAuthContext();

  const userId = userData?.id;
  const userLevel = userData?.user_level;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [stocks, setStocks] = useState(null);
  const [reviewedCustomers, setReviewedCustomers] = useState([]);

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    setLoading(true);
    setData(null);
    setQuantity(0);
    setStocks(null);

    const getData = async () => {
      let dataPost = {
        customers_id: isLoggedIn ? userId : null,
      };
      if (isNan(id)) {
        dataPost = {
          products_id: id,
          ...dataPost,
        };
      } else {
        dataPost = {
          products_id: Number(id),
          ...dataPost,
        };
      }

      try {
        const resProductDetails = await getProductDetail(dataPost);
        setData(resProductDetails);

        const resStock = await checkStock({
          products_id: Number(id),
        });
        setStocks(resStock);

        const stockData = Object.entries(resStock);
        let quantity = 0;
        stockData.forEach((d) => {
          d?.[1]?.forEach((ds) => {
            if (ds.stock && ds.ukuran !== "" && ds.stock > 0) {
              quantity += ds?.stock;
            }
          });
        });
        setQuantity(quantity);

        const resReview = await getReviewProduct(dataPost);
        setReviewedCustomers(resReview?.reviewed_customers?.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    id && getData();
  }, [id, userId]);

  if (loading || !data) {
    return <Loading />;
  }

  const {
    po_close_status,
    isHoliday,
    products_image,
    images,
    products_name,
    products_ordered,
    current_price,
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
    products_id,
    total_user_rated,
    one_ratio,
    two_ratio,
    three_ratio,
    four_ratio,
    five_ratio,
    related_products,
    discount_price,
    po_shippingdate,
    vendors_success_rate,
    products_jenis,
    isLiked,
    products_slug,
  } = data;

  const productImagesData = {
    images,
    products_image,
  };

  const productHeaderData = {
    po_close_status,
    libur: isHoliday === 1,
    preOrder: products_jenis === "po",
    po_close_status,
    products_ordered,
    vendors_name,
    rating,
    customerdiscount,
    current_price,
    products_quantity: quantity,
    isholidaydata,
    po_opendate,
    po_closedate,
    discount_price,
    po_shippingdate,
    products_name,
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
    attributes,
    products_quantity,
    customerdiscount,
    discount_price,
    current_price,
    user_level: userLevel,
    customers_id: userId,
    products_id: id,
    stocks,
    isLiked,
    po_close_status,
    preOrder: products_jenis === "po",
    products_slug,
    products_quantity: quantity,
  };

  const path = [
    {
      name: "Kategori",
      link: "/",
      isOnPage: false,
    },
    {
      name: "Supplier",
      link: "/",
      isOnPage: false,
    },
    {
      name: products_name,
      link: "/",
      isOnPage: true,
    },
  ];

  return (
    <Layout hasNavbar sticky hasBreadCrumb breadCrumbItem={path} hasPadding>
      <Box w="full" overflow="hidden">
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
              <ProductImages {...productImagesData} />
              <Box display={{ base: "none", lg: "block" }}>
                <ShareProduct />
              </Box>
            </Box>
          </Box>
          <Box
            w={{ base: "100%", lg: "fit-content" }}
            maxW="100vw"
            px={{ lg: "1rem", xl: "0.5rem", "2xl": "2rem" }}
            mx={{ lg: "1rem" }}
            // bg="blue"
            // added
            w="full"
          >
            <ProductHeader {...productHeaderData} />
            <Box display={{ base: "none", lg: "block" }}>
              <ProductInformation {...productInformationData} />
            </Box>
          </Box>
          <Box w={{ base: "100%", lg: "25%" }} maxW="100vw">
            <ProductCheckout {...productCheckoutData} />
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
