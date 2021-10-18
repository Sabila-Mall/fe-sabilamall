import { Text } from "@chakra-ui/layout";
import { VStack, HStack, Link } from "@chakra-ui/layout";
import { Flex, Box } from "@chakra-ui/layout";
import { Checkbox, IconButton, Image } from "@chakra-ui/react";
import {
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
} from "@chakra-ui/react";
import { useState, createRef, useRef, useEffect } from "react";
import { IoCreateOutline } from "react-icons/io5";

import { useAuthContext } from "../contexts/authProvider";
import { useCartContext } from "../contexts/cartProvider";
import { getImageLink } from "../utils/functions";
import { CartPrice } from "./CartPrice";

export const ProductCart = ({ isDiscount, product }) => {
  const { userData } = useAuthContext();
  const userId = userData?.id;

  const {
    addToCheckout,
    deleteFromCheckout,
    editCartItemNotes,
  } = useCartContext();

  const productName = product?.products_name;
  const productPath = product?.products_image_path;
  const productPrice = product?.final_price;
  const customerBasket = product?.customers_basket_id;
  const productID = product?.products_id;

  const focusOut = useRef(null);

  const varian = product?.varian;
  let inputRef = createRef();
  const handleCheckbox = () => {
    if (inputRef.current.checked) {
      addToCheckout(product);
    } else {
      deleteFromCheckout(product);
    }
  };

  useEffect(() => {
    const onFocusOut = (event) => {
      editCartItemNotes(userId, customerBasket, event.target.value);
    };
    focusOut.current.addEventListener("focusout", onFocusOut);
    return () => {
      focusOut.current?.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const EditableControls = () => {
    const { getEditButtonProps } = useEditableControls();

    return (
      <IconButton
        icon={<IoCreateOutline />}
        variant={"ghost"}
        {...getEditButtonProps()}
      />
    );
  };
  return (
    <Box
      width="100%"
      px={{ base: "1rem", md: 0 }}
      onClick={() => handleCheckbox()}
    >
      <Flex
        alignItems="start"
        justifyContent={{ base: "center", md: "start" }}
        justifyContent="flex-start"
        as="label"
        _hover={{ cursor: "pointer" }}
      >
        <Checkbox
          alignSelf="center"
          mr="20px"
          size="lg"
          ref={inputRef}
        ></Checkbox>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          mr="8px"
        >
          <Box
            position="relative"
            w={{ base: "5em", sm: "8em", md: "6em" }}
            h={{ base: "5em", sm: "8em", md: "6em" }}
          >
            <Link
              _hover={{ textStyle: "none" }}
              href={`product-detail/${productID}`}
            >
              <Image h="100%" quality={100} src={getImageLink(productPath)} />
            </Link>
          </Box>
        </Flex>

        <Flex
          flexDirection="column"
          w={{ base: "70%", md: "9rem", xl: "100%" }}
          fontWeight="500"
        >
          <Link
            _hover={{ textStyle: "none" }}
            href={`product-detail/${productID}`}
            w="fit-content"
          >
            <Text
              as="h1"
              isTruncated
              maxW={{ base: "150px", sm: "300px" }}
              mb="8px"
            >
              {productName}
            </Text>
          </Link>

          <VStack spacing="3px" alignItems="start" mb="1rem">
            {varian &&
              varian.map((el, index) => {
                return (
                  <Text color="gray.500" fontSize="14px">
                    {`${el.products_options_name} : ${el.products_options_values_name}`}
                  </Text>
                );
              })}
          </VStack>
          <Box display={{ md: "none" }}>
            <CartPrice
              isDiscount={isDiscount}
              initialPrice={product?.final_price}
              discount={product?.customers_discount}
            />
          </Box>
        </Flex>
      </Flex>
      <Editable
        mt="0.75rem"
        className="secondaryFont"
        color={"gray.400"}
        fontSize={"0.75rem"}
        defaultValue={product?.customers_basket_notes || "tambahkan Catatan"}
        // isPreviewFocusable={false}
      >
        <HStack spacing={"0.25rem"}>
          <EditableControls />
          <Box>
            <EditablePreview cursor="pointer" />
            <EditableInput color="black" ref={focusOut} />
          </Box>
        </HStack>
      </Editable>
    </Box>
  );
};
