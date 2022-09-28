import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  Spacer,
  Text,
  useControllableState,
  VStack,
  Link,
  color,

} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosAddCircleOutline, IoIosHelpCircle } from "react-icons/io";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

import { checkStock } from "../api/Stock";
import { addToCart } from "../api/carts";
import { addWishlist, deleteWishlist } from "../api/wishlist";
import { useAuthContext } from "../contexts/authProvider";
import { useCartContext } from "../contexts/cartProvider";
import styles from "../styles/ProductDetails.module.scss";
import { isRequestSuccess } from "../utils/api";
import { calculateDiscountedPrice } from "../utils/functions";

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    currency: "IDR",
  }).format(price);
};

const ProductCheckout = ({
  products_attributes,
  products_type,
  warehouse,
  products_stock,
  stockData,
  price_after_discount,
  price,
  products_event,
  customers_discount,
  products_id,
  special_products_price,
  flash_sale_discount,
  flash_sale_price_after_discount,
  flash_sale_price,
  is_liked_product,
  products_slug,
}) => {

  const product_wa = products_slug?.replace("-", "+")

  const toast = useToast();

  const callToast = ({ isSuccess = false, title, description, ...others }) => {
    const configToast = {
      duration: 5000,
      isClosable: true,
      variant: "subtle",
      position: "top",
    };

    return isSuccess
      ? toast({
        title,
        description,
        status: "success",
        ...configToast,
        ...others,
      })
      : toast({
        title,
        description,
        status: "error",
        ...configToast,
        ...others,
      });
  };

  const router = useRouter();
  const auth = useAuthContext();
  const userId = auth.userData?.id ?? null;
  const userLevel = auth.userData?.user_level ?? 'null';
  const adminId = auth.userData?.admin_id;

  const { addCartItem } = useCartContext();

  const warehouseData = JSON.parse(warehouse ?? "[]");

  const [warehouseId, setWarehouseId] = useState(warehouseData.length == 1 ? String(warehouseData[0].id) : null);

  const [isLiked, setIsLiked] = useState(is_liked_product);

  const handleClickWishlist = () => {
    if (!auth.isLoggedIn)
      return callToast({ title: "Silakan login terlebih dahulu" });

    const dataPost = {
      liked_products_id: Number(products_id),
      liked_customers_id: Number(userId),
    };

    if (!isLiked) {
      return addWishlist(dataPost)
        .then(() => {
          callToast({
            isSuccess: true,
            title: "Berhasil",
            description: "Produk berhasil ditambahkan ke wishlist",
          });
          setIsLiked((prev) => !prev);
        })
        .catch(() =>
          callToast({
            title: "Gagal",
            description: "Produk gagal ditambahkan ke wishlist",
          }),
        );
    } else {
      return deleteWishlist(dataPost)
        .then(() => {
          callToast({
            isSuccess: true,
            title: "Berhasil",
            description: "Produk berhasil dihapus dari wishlist",
          });
          setIsLiked((prev) => !prev);
        })
        .catch(() =>
          callToast({
            title: "Gagal",
            description: "Produk gagal dihapus dari wishlist",
          }),
        );
    }
  };

  // promo ==========================================
  let isPromo = false;
  let pricePromo = 0;
  let discountPromo = 0;
  if (products_event == 'flash_sale') {
    isPromo = true;
    pricePromo = flash_sale_price;
    discountPromo = flash_sale_discount;
  } else if (products_event == 'special') {
    isPromo = true;
    pricePromo = special_products_price;
    discountPromo = (price - special_products_price) / price * 100;
  }
  // ==========================================

  if (products_type == 1) {
    const [itemQty, setItemQty] = useState(0);
    const [variantPrice, setVariantPrice] = useState(0);
    const [itemPrice, setItemPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalNormalPrice, setTotalNormalPrice] = useState(0);

    const [numberOfItem, setNumberOfItem] = useState(0);
    const [normalPrice, setNormalPrice] = useState(0);

    const [stock, setStock] = useState(products_stock);

    const productsAttributes = JSON.parse(products_attributes);
    const colorsData = productsAttributes.filter((item) => item.options_name.toLowerCase() === 'warna');
    const sizesData = productsAttributes.filter((item) => item.options_name.toLowerCase() === 'ukuran');

    const colorVariance = colorsData?.length;
    const sizeVariance = sizesData?.length;

    const [colorId, setColorId] = useState('');
    const [sizeId, setSizeId] = useState('');

    const [priceColor, setPriceColor] = useState(0);
    const [pricePrefixColor, setPricePrefixColor] = useState('+');
    const [priceSize, setPriceSize] = useState(0);
    const [pricePrefixSize, setPricePrefixSize] = useState('+');

    const changeAttributes = (id, type) => {
      if (type == 'color') {
        const color = colorsData.find((item) => item.options_values_id == id);
        setPricePrefixColor(color?.price_prefix ?? '+');
        setPriceColor(color?.options_values_price ?? 0);
        setColorId(id);
      } else if (type == 'size') {
        const size = sizesData.find((item) => item.options_values_id == id);
        setPricePrefixSize(size?.price_prefix ?? '+');
        setPriceSize(size?.options_values_price ?? 0);
        setSizeId(id);
      }
    }

    const getStock = () => {
      if (sizeId != '' && colorId != '') {
        const stock = stockData.find((item) => item.options_values_color_id == colorId && item.options_values_size_id == sizeId && item.warehouse_id == warehouseId);
        setStock(stock?.stock ?? 0);
        setNumberOfItem((stock?.stock ?? 0) == 0 ? 0 : 1);

        const variantPrice = Number(pricePrefixColor + priceColor) + Number(pricePrefixSize + priceSize);
        setVariantPrice(variantPrice);

        const itemPrice = isPromo ? (Number(pricePromo) + variantPrice) : (Number(price) + variantPrice);

        if (products_event != 'flash_sale') {
          itemPrice = itemPrice - (itemPrice * (customers_discount / 100))
        } else if (products_event == 'flash_sale') {
          itemPrice = itemPrice - (itemPrice * ((discountPromo + customers_discount) / 100))
        }

        const normalPrice = Number(price) + Number(variantPrice);

        setNormalPrice(normalPrice);
        setItemPrice(itemPrice);
      } else {
        setStock(0);
        setNumberOfItem(0);
        setVariantPrice(0);
        setNormalPrice(0);
        setItemPrice(0);
      }
    }

    const handleModifyNumberOfItem = (action) => {
      if (action === "increase") {
        if (stock <= numberOfItem) {
          setNumberOfItem(stock);
        } else {
          setNumberOfItem(numberOfItem + 1);
        }
      } else if (action === "decrease") {
        if (numberOfItem > 0) {
          setNumberOfItem(numberOfItem - 1);
        } else {
          setNumberOfItem(0);
        }
      }
    }

    const calculatePrice = () => {
      setTotalPrice(itemPrice * numberOfItem);
      setTotalNormalPrice(normalPrice * numberOfItem)
    }

    useEffect(() => {
      getStock();
    }, [sizeId, colorId, warehouseId]);

    useEffect(() => {
      calculatePrice();
    }, [numberOfItem, itemPrice, variantPrice]);

    return (
      <>
        <VStack minW={{ base: '100%', md: '300px' }} borderColor={"gray.300"} borderWidth={"1px"} spacing={'12px'} className={"secondaryFont"} p={'1rem'} borderRadius={"12px"}>

          {warehouseData && warehouseData.length > 1 && (
            <Box width={"full"}>
              <Text textColor={"gray.500"} fontSize={"16px"}>
                Gudang: {warehouseData.length} item
              </Text>
              <Spacer height={"10px"} />
              <Select
                placeholder={"Pilih Gudang"}
                borderColor={"gray.200"}
                textColor={"gray.400"}
                color={"gray.400"}
                onChange={(e) => {
                  setWarehouseId(e.target.value);
                }}
              >
                {warehouseData?.map(({ id, value }) => (
                  <option
                    key={id}
                    value={`${id}`}
                  >
                    {value}
                  </option>
                ))}
              </Select>
            </Box>
          )}

          {colorsData && (
            <Box width={"full"}>
              <Text textColor={"gray.500"} fontSize={"16px"}>
                Warna: {colorVariance} varian
              </Text>
              <Spacer height={"10px"} />
              <Select
                placeholder={"Pilih Warna"}
                borderColor={"gray.200"}
                textColor={"gray.400"}
                color={"gray.400"}
                onChange={(e) => changeAttributes(e.target.value, 'color')}
              >
                {colorsData?.map(({ options_values_name, options_values_id }) => (
                  <option
                    key={options_values_id}
                    value={options_values_id}
                  >
                    {options_values_name}
                  </option>
                ))}
              </Select>
            </Box>
          )
          }

          {sizesData && (
            <Box width={"full"}>
              <Text textColor={"gray.500"} fontSize={"16px"}>
                Ukuran: {sizeVariance} varian
              </Text>
              <Spacer height={"10px"} />
              <Select
                placeholder={"Pilih Ukuran"}
                borderColor={"gray.200"}
                textColor={"gray.400"}
                color={"gray.400"}
                onChange={(e) => changeAttributes(e.target.value, 'size')}
              >
                {sizesData?.map(({ options_values_name, options_values_id }) => (
                  <option
                    key={options_values_id}
                    value={options_values_id}
                  >
                    {options_values_name}
                  </option>
                ))}
              </Select>
            </Box>
          )
          }

          <Box width={"100%"}>
            <Text textColor={"gray.500"} fontSize={"16px"}>
              Jumlah
            </Text>
            <Spacer height={"10px"} />
            <HStack
              spacing={"1.5rem"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <HStack>
                <IconButton
                  aria-label={"Decrease number of items"}
                  as={IoRemoveCircleOutline}
                  w={"24px"}
                  h={"24px"}
                  bgColor="transparent"
                  color={"gray.400"}
                  disabled={numberOfItem == 0}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => handleModifyNumberOfItem("decrease")}
                />
                <Input
                  minW="3.5rem"
                  maxW="5rem"
                  placeholder={numberOfItem}
                  textAlign={"center"}
                  borderColor={"gray.200"}
                  textColor={"gray.300"}
                  readOnly={true}
                />
                <IconButton
                  aria-label={"Increase the number of item"}
                  as={IoIosAddCircleOutline}
                  color={"gray.400"}
                  disabled={numberOfItem == stock}
                  w={"24px"}
                  bgColor="transparent"
                  h={"24px"}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => handleModifyNumberOfItem("increase")}
                />
              </HStack>
              <HStack marginInlineStart="1rem !important" fontSize={"14px"}>
                <Text textColor={"gray.500"}>Stok:</Text>
                <Text textColor={"orange.300"}>{stock ?? "0"}</Text>
              </HStack>
            </HStack>
          </Box>
          <Divider orientation="horizontal" height={"1px"} />
          <Box w={'full'}>
            <Flex
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Text textColor={"gray.500"} fontSize={"14px"} mr="0.5rem">
                Tambahan Variasi
              </Text>
              <VStack alignItems={"flex-end"}>
                <Text
                  className={styles.subtotal}
                  color={"orange.400"}
                  fontSize="14px"
                  fontWeight={"bold"}
                >
                  Rp {formatPrice(variantPrice)}
                </Text>
              </VStack>
            </Flex>
            <Flex flexDirection={"row"} alignItems={'end'} justifyContent={'end'}>

              <VStack alignItems={"flex-end"}>
                <Text
                  className={styles.subtotal}
                  color={"gray.400"}
                  fontSize="14px"
                  as={'del'}
                >
                  Rp {formatPrice(totalNormalPrice)}
                </Text>
              </VStack>
            </Flex>
            {/* <Box height={'10px'} /> */}
            <Flex
              flexDirection={"row"}
              alignItems={"flex-end"}
              justifyContent={"space-between"}
            >
              <Text textColor={"gray.500"} fontSize={"16px"} mr="0.5rem">
                Subtotal
              </Text>
              <VStack alignItems={"flex-end"}>
                <Text
                  className={styles.subtotal}
                  color={"orange.400"}
                  fontSize="20px"
                  fontWeight={"bold"}
                >
                  Rp {formatPrice(totalPrice)}
                </Text>
              </VStack>
            </Flex>
          </Box>

          <Button
            backgroundColor={"red.500"}
            textColor={"white"}
            width={"full"}
            fontSize={"16px"}
            fontWeight={"bold"}
            className={"primaryFont"}
            _hover={{ bgColor: "red.600" }}
            isDisabled={(!stock || !numberOfItem)}
            onClick={() => {
              if (!auth.isLoggedIn)
                return callToast({ title: "Silakan login terlebih dahulu" });

              if (numberOfItem < 1) {
                return callToast({
                  title: "Gagal",
                  description: "Jumlah produk minimal satu.",
                });
              }

              let option_values_id = JSON.stringify([colorId, sizeId]);
              let option_id = JSON.stringify([2, 1]);

              addCartItem(
                userId,
                userLevel,
                products_id,
                numberOfItem,
                option_id,
                option_values_id,
                warehouseId,
                adminId,
              );
            }}
          >
            Masukkan ke Keranjang
          </Button>
        </VStack >
        <Footer handleClickWishlist={handleClickWishlist} isLiked={isLiked} product_wa={product_wa} />
      </>
    )
  } else if (products_type == 0) {

    const [numberOfItem, setNumberOfItem] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [itemPrice, setItemPrice] = useState(0);
    const [normalPrice, setNormalPrice] = useState(0);
    const [stock, setStock] = useState(products_stock);
    const [totalNormalPrice, setTotalNormalPrice] = useState(0);

    const getStock = () => {
      const stock = stockData.find((item) => item.warehouse_id == warehouseId);
      setStock(stock?.stock ?? 0);
      setNumberOfItem((stock?.stock ?? 0) <= 0 ? 0 : 1);

      const itemPrice = isPromo ? Number(pricePromo) : Number(price);

      if (auth.isLoggedIn && products_event != 'flash_sale') {
        itemPrice = itemPrice - (itemPrice * (customers_discount / 100))
      } else if (auth.isLoggedIn && products_event == 'flash_sale') {
        itemPrice = itemPrice - (itemPrice * ((discountPromo + customers_discount) / 100))
      }

      const normalPrice = Number(price);

      setNormalPrice(normalPrice);
      setItemPrice(itemPrice);
    }

    const handleModifyNumberOfItem = (action) => {
      if (action === "increase") {
        if (stock <= numberOfItem) {
          setNumberOfItem(stock);
        } else {
          setNumberOfItem(numberOfItem + 1);
        }
      } else if (action === "decrease") {
        if (numberOfItem > 0) {
          setNumberOfItem(numberOfItem - 1);
        } else {
          setNumberOfItem(0);
        }
      }
    }

    const calculatePrice = () => {
      setTotalPrice(itemPrice * numberOfItem);
      setTotalNormalPrice(normalPrice * numberOfItem);
    }

    useEffect(() => {
      getStock();
    }, [warehouseId]);

    useEffect(() => {
      calculatePrice();
    }, [numberOfItem, itemPrice, normalPrice]);

    return (
      <>
        <VStack minW={{ base: '100%', md: '300px' }} borderColor={"gray.300"} borderWidth={"1px"} spacing={'12px'} className={"secondaryFont"} p={'1rem'} borderRadius={"12px"}>
          {warehouseData && warehouseData.length > 1 && (
            <Box width={"full"}>
              <Text textColor={"gray.500"} fontSize={"16px"}>
                Gudang: {warehouseData.length} item
              </Text>
              <Spacer height={"10px"} />
              <Select
                placeholder={"Pilih Gudang"}
                borderColor={"gray.200"}
                textColor={"gray.400"}
                color={"gray.400"}
                onChange={(e) => {
                  setWarehouseId(e.target.value);
                }}
              >
                {warehouseData?.map(({ id, value }) => (
                  <option
                    key={id}
                    value={`${id}`}
                  >
                    {value}
                  </option>
                ))}
              </Select>
            </Box>
          )}
          <Box width={"100%"}>
            <Text textColor={"gray.500"} fontSize={"16px"}>
              Jumlah
            </Text>
            <Spacer height={"10px"} />
            <HStack
              spacing={"1.5rem"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <HStack>
                <IconButton
                  aria-label={"Decrease number of items"}
                  as={IoRemoveCircleOutline}
                  w={"24px"}
                  h={"24px"}
                  bgColor="transparent"
                  color={"gray.400"}
                  disabled={numberOfItem == 0}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => handleModifyNumberOfItem("decrease")}
                />
                <Input
                  minW="3.5rem"
                  maxW="5rem"
                  placeholder={numberOfItem}
                  textAlign={"center"}
                  borderColor={"gray.200"}
                  textColor={"gray.300"}
                  readOnly={true}
                />
                <IconButton
                  aria-label={"Increase the number of item"}
                  as={IoIosAddCircleOutline}
                  color={"gray.400"}
                  disabled={numberOfItem == stock}
                  w={"24px"}
                  bgColor="transparent"
                  h={"24px"}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => handleModifyNumberOfItem("increase")}
                />
              </HStack>
              <HStack marginInlineStart="1rem !important" fontSize={"14px"}>
                <Text textColor={"gray.500"}>Stok:</Text>
                <Text textColor={"orange.300"}>{stock ?? "0"}</Text>
              </HStack>
            </HStack>
          </Box>
          <Divider orientation="horizontal" height={"1px"} />
          <Box w={'full'}>
            <Flex flexDirection={"row"} alignItems={'end'} justifyContent={'end'}>
              <VStack alignItems={"flex-end"}>
                <Text
                  className={styles.subtotal}
                  color={"gray.400"}
                  fontSize="14px"
                  as={'del'}
                >
                  Rp {formatPrice(totalNormalPrice)}
                </Text>
              </VStack>
            </Flex>
            {/* <Box height={'10px'} /> */}
            <Flex
              flexDirection={"row"}
              alignItems={"flex-end"}
              justifyContent={"space-between"}
            >
              <Text textColor={"gray.500"} fontSize={"16px"} mr="0.5rem">
                Subtotal
              </Text>
              <VStack alignItems={"flex-end"}>
                <Text
                  className={styles.subtotal}
                  color={"orange.400"}
                  fontSize="20px"
                  fontWeight={"bold"}
                >
                  Rp {formatPrice(totalPrice)}
                </Text>
              </VStack>
            </Flex>
          </Box>

          <Button
            backgroundColor={"red.500"}
            textColor={"white"}
            width={"full"}
            fontSize={"16px"}
            fontWeight={"bold"}
            className={"primaryFont"}
            _hover={{ bgColor: "red.600" }}
            isDisabled={(!stock || !numberOfItem)}
            onClick={() => {
              if (!auth.isLoggedIn)
                return callToast({ title: "Silakan login terlebih dahulu" });

              if (numberOfItem < 1) {
                return callToast({
                  title: "Gagal",
                  description: "Jumlah produk minimal satu.",
                });
              }

              let option_values_id = JSON.stringify([colorId, sizeId]);
              let option_id = JSON.stringify([2, 1]);

              addCartItem(
                userId,
                userLevel,
                products_id,
                numberOfItem,
                option_id,
                option_values_id,
                warehouseId,
                adminId,
              );
            }}
          >
            Masukkan ke Keranjang
          </Button>
        </VStack >
        <Footer handleClickWishlist={handleClickWishlist} isLiked={isLiked} product_wa={product_wa} />

      </>
    )
  }
}

const Footer = ({ handleClickWishlist, isLiked, product_wa }) => {

  return (
    <Flex
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"full"}
      mt={2}
    >
      <HStack
        padding={"7px 12px"}
        onClick={() => handleClickWishlist()}
        cursor="pointer"
      >
        <Icon color={"red.500"} as={isLiked ? IoHeart : IoHeartOutline} />
        <Text
          textColor={"red.500"}
          fontSize={"14px"}
          fontWeight={"bold"}
          className={"primaryFont"}
        >
          Wishlist
        </Text>
      </HStack>

      <Link
        href={`https://office.sabilamall.com/warotator.php?pos=cso&produk=${product_wa}`}
        _hover={{ decoration: "none" }}
        isExternal
      >
        <HStack
          backgroundColor={"orange.400"}
          borderRadius={"4px"}
          padding={"7px 12px"}
          cursor="pointer"
        >
          <Icon color={"White"} as={FaWhatsapp} />
          <Text
            textColor={"white"}
            fontSize={"14px"}
            fontWeight={"bold"}
            className={"primaryFont"}
          >
            Chat Admin
          </Text>
        </HStack>
      </Link>
    </Flex>
  )
}

export default ProductCheckout;
