import {
  Button,
  DrawerCloseButton,
  Icon,
  StackDivider,
  Text,
  VStack,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { useCartContext } from "../contexts/cartProvider";
import QuickAddItem from "./QuickAddItem";

const QuickAddListItem = () => {
  const {
    cartDataByVendor,
    loading,
    vendorChecked,
    setVendorChecked,
    selectedItem,
    addToCheckout,
    deleteFromCheckout,
    setselectedItem,
  } = useCartContext();

  const handleOnChange = (e, vendorId) => {
    const checkboxes = document.querySelectorAll(`.vendor-id-${vendorId}`);

    if (e.target.checked) {
      setVendorChecked([...vendorChecked, vendorId]);
      checkboxes.forEach((el) => {
        if (!el.firstChild.checked) {
          el.click();
        }
      });
    } else {
      setVendorChecked(vendorChecked?.filter((id) => id !== vendorId));
      checkboxes.forEach((el) => {
        if (el.firstChild.checked) {
          el.click();
        }
      });
    }
  };

  console.log(selectedItem);
  console.log(vendorChecked);
  console.log(cartDataByVendor);

  if (cartDataByVendor.length > 0) {
    return (
      <VStack
        spacing={6}
        divider={<StackDivider borderColor="gray.200" />}
        align={"start"}
      >
        {loading ? (
          <Grid placeItems="center">
            <Spinner />
          </Grid>
        ) : (
          cartDataByVendor &&
          cartDataByVendor.map((el, index) => {
            return (
              <>
                <Flex mb="1rem">
                  <Checkbox
                    onChange={(e) => handleOnChange(e, el.vendors_id)}
                    mr="1rem"
                    size="lg"
                    defaultChecked={vendorChecked?.includes(el.vendors_id)}
                  />
                  <Text
                    className="secondaryFont"
                    fontSize="1rem"
                    fontWeight="700"
                  >
                    {el.vendors_name}
                  </Text>
                </Flex>
                {el.keranjang.map((elemenKeranjang, index) => {
                  return (
                    <QuickAddItem
                      key={index}
                      vendorId={el.vendors_id}
                      product={elemenKeranjang}
                      my="1rem"
                    />
                  );
                })}
              </>
            );
          })
        )}
      </VStack>
    );
  } else {
    return (
      <VStack justify={"center"} h={"full"}>
        <Text color={"gray.400"}>Keranjang belanja Anda masih kosong.</Text>
        <Button
          as={DrawerCloseButton}
          borderColor={"orange.400"}
          borderWidth={"2px"}
          backgroundColor={"transparent"}
          color={"orange.400"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Icon aria-label="Arrow Left" as={AiOutlineArrowLeft} w={4} h={4} />
          <Text marginLeft={2}>Kembali Belanja</Text>
        </Button>
      </VStack>
    );
  }
};

export default QuickAddListItem;
