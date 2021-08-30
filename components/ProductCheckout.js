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
  toast,
  useControllableState,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

import { checkStock } from "../api/Stock";
import { addToCart } from "../api/carts";
import { addWishlist, deleteWishlist } from "../api/wishlist";
import { useAuthContext } from "../contexts/authProvider";
import styles from "../styles/ProductDetails.module.scss";
import { calculateDiscountedPrice } from "../utils/functions";

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    currency: "IDR",
  }).format(price);
};

const ProductCheckout = ({
  attributes,
  customerdiscount,
  current_price,
  user_level,
  customers_id,
  products_id,
  stocks: stockss,
  discount_price,
  isLiked: is_liked,
  po_close_status,
  preOrder,
  products_slug,
  products_quantity,
}) => {
  const toast = useToast();
  const router = useRouter();
  const isHidden = preOrder && po_close_status == 1;
  const productwa = products_slug && products_slug?.replace("-", "+");
  const { isLoggedIn } = useAuthContext();
  const { register, getValues } = useForm();

  const [stocks, setStocks] = useState(stockss);
  const [stock, setStock] = useState(null);
  const [filterStock, setFilterStock] = useState({ warna: null, ukuran: null });

  const [isLiked, setIsLiked] = useState(is_liked == "1");

  const colorsData = attributes.filter(
    (attr) => attr?.option?.name === "Warna",
  )[0];
  const sizesData = attributes.filter(
    (attr) => attr?.option?.name === "Ukuran",
  )[0];

  const colors = colorsData?.values;
  const sizes = sizesData?.values;

  const colorId = colorsData?.option?.id;
  const sizeId = sizesData?.option?.id;

  let option_id = [];
  if (colorId && sizeId) {
    option_id = [colorId, sizeId];
  } else if (colorId && !sizeId) {
    option_id = colorId;
  } else if (!colorId && sizeId) {
    option_id = sizeId;
  }

  const colorVariance = colors?.length;
  const sizeVariance = sizes?.length;

  const [numberOfItem, setNumberOfItem] = useControllableState({
    defaultValue: 0,
  });

  const realPrice = current_price * numberOfItem;

  const checkStockCl = (dataFilter) => {
    if (!sizes || !colors) return setStock(products_quantity);
    if (!dataFilter) return;

    const { warna, ukuran } = dataFilter;

    if (!warna || !ukuran) return;

    const data = stocks?.[warna]?.find((stock) => stock?.ukuran == ukuran);

    setStock(data?.stock);
  };

  const handleModifyNumberOfItem = (event) => {
    if (event === "increase") {
      if ((stock ?? 0) - numberOfItem === 0) {
        setNumberOfItem(stock ?? 0);
      } else {
        setNumberOfItem(numberOfItem + 1);
      }
    } else if (event === "decrease") {
      if (numberOfItem > 0) {
        setNumberOfItem(numberOfItem - 1);
      } else {
        setNumberOfItem(0);
      }
    }
  };

  const handleClickWishlist = () => {
    if (!isLoggedIn)
      return callToast({ title: "Silakan login terlebih dahulu" });

    const dataPost = {
      liked_products_id: Number(products_id),
      liked_customers_id: Number(customers_id),
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

  useEffect(() => {
    checkStockCl();
  }, []);

  return (
    <VStack
      display={isHidden ? "none" : "block"}
      maxW={{ "2xl": "300px" }}
      pl={{ "2xl": "2rem" }}
      pt={{ base: "1rem", sm: "inherit" }}
      spacing={"12px"}
      className={"secondaryFont"}
    >
      <VStack
        w={{ base: "full", lg: "inherit" }}
        spacing={"10px"}
        borderColor={"gray.300"}
        borderWidth={"1px"}
        padding={"12px 14px"}
        borderRadius={"12px"}
      >
        {colors && (
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
              {...register("warna")}
              onChange={(e) => {
                setFilterStock((prev) => ({
                  ...prev,
                  warna: e.target.value?.split(" ")?.[1],
                }));
                checkStockCl({
                  ...filterStock,
                  warna: e.target.value?.split(" ")?.[1],
                });
              }}
            >
              {colors?.map(({ value, id }) => (
                <option key={id} value={`${id} ${value}`}>
                  {value}
                </option>
              ))}
            </Select>
          </Box>
        )}

        {sizes && (
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
              {...register("ukuran")}
              onChange={(e) => {
                setFilterStock((prev) => ({
                  ...prev,
                  ukuran: e.target.value?.split(" ")?.[1],
                }));
                checkStockCl({
                  ...filterStock,
                  ukuran: e.target.value?.split(" ")?.[1],
                });
              }}
            >
              {sizes?.map(({ value, id }) => (
                <option key={id} value={`${id} ${value}`}>
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
                color={numberOfItem === 0 ? "gray.200" : "gray.400"}
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
              />
              <IconButton
                aria-label={"Increase the number of item"}
                as={IoIosAddCircleOutline}
                color={"gray.400"}
                w={"24px"}
                bgColor="transparent"
                h={"24px"}
                _hover={{ cursor: "pointer" }}
                onClick={() => handleModifyNumberOfItem("increase")}
              />
            </HStack>
            <HStack marginInlineStart="1rem !important" fontSize={"14px"}>
              {/* {stock !== null ? (
                <>
                  <Text textColor={"gray.500"}>Stok:</Text>
                  <Text textColor={"orange.300"}>{stock}</Text>
                </>
              ) : (
                ""
              )} */}
              <Text textColor={"gray.500"}>Stok:</Text>
              <Text textColor={"orange.300"}>{stock ?? ""}</Text>
            </HStack>
          </HStack>
        </Box>

        <Divider orientation="horizontal" height={"1px"} />

        <Flex
          flexDirection={"row"}
          alignItems={"flex-end"}
          justifyContent={"space-between"}
          width={"full"}
        >
          <Text textColor={"gray.500"} fontSize={"16px"} mr="0.5rem">
            Subtotal
          </Text>
          <VStack alignItems={"flex-end"}>
            {discount_price && (
              <Text as={"s"} color={"gray.400"} fontSize={"12px"}>
                Rp{formatPrice(realPrice)}
              </Text>
            )}
            <Text
              className={styles.subtotal}
              color={"orange.400"}
              fontSize="20px"
              fontWeight={"bold"}
            >
              Rp
              {discount_price
                ? formatPrice(Number(discount_price) * numberOfItem)
                : formatPrice(realPrice)}
            </Text>
          </VStack>
        </Flex>

        <Button
          backgroundColor={"red.500"}
          textColor={"white"}
          width={"full"}
          fontSize={"16px"}
          fontWeight={"bold"}
          className={"primaryFont"}
          _hover={{ bgColor: "red.600" }}
          isDisabled={(!stock || !numberOfItem) && colors && sizes}
          onClick={() => {
            if (!isLoggedIn)
              return callToast({ title: "Silakan login terlebih dahulu" });

            if (numberOfItem < 1) {
              return callToast({
                title: "Gagal",
                description: "Jumlah produk minimal satu.",
              });
            }

            const { warna, ukuran } = getValues();

            let option_values_id = [];
            if (warna && ukuran) {
              option_values_id = [
                Number(warna.split(" ")[0]),
                Number(ukuran.split(" ")[0]),
              ];
            } else if (warna && !ukuran) {
              option_values_id = Number(warna.split(" ")[0]);
            } else if (!warna && ukuran) {
              option_values_id = Number(ukuran.split(" ")[0]);
            }

            if (Array.isArray(option_values_id)) {
              option_values_id = JSON.stringify(option_values_id);
            }

            if (Array.isArray(option_id)) {
              option_id = JSON.stringify(option_id);
            }

            const dataPost = {
              option_values_id,
              quantity: numberOfItem,
              user_level,
              customers_id,
              products_id,
              option_id,
            };

            addToCart(dataPost)
              .then(() =>
                callToast({
                  isSuccess: true,
                  title: "Berhasil",
                  description:
                    "Produk anda telah ditambahkan ke keranjang belanja.",
                }),
              )
              .catch(() =>
                callToast({
                  title: "Gagal",
                  description:
                    "Produk anda gagal ditambahkan ke keranjang belanja.",
                }),
              );
          }}
        >
          Masukkan ke Keranjang
        </Button>
      </VStack>

      <Flex
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"full"}
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

        <HStack
          backgroundColor={"orange.400"}
          borderRadius={"4px"}
          padding={"7px 12px"}
          cursor="pointer"
          onClick={() =>
            router.push(
              `https://office.sabilamall.com/warotator.php?pos=cso&produk=${productwa}`,
            )
          }
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
      </Flex>
    </VStack>
  );
};

export default ProductCheckout;
