import { Box, Text, Stack, StackDivider, Flex } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { RiCalendarEventFill } from "react-icons/ri";

import { numberWithDot } from "../utils/functions";

const ProductHeader = ({
  libur,
  preOrder,
  products_name,
  vendors_name,
  products_ordered,
  rating,
  customerdiscount: discount,
  current_price,
  products_quantity: stock,
  isholidaydata,
  po_opendate,
  po_closedate,
  discount_price: discount_price_be,
  po_shippingdate,
  po_close_status,
}) => {
  const isClose = preOrder && po_close_status == 1;

  const discount_price = discount_price_be
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(Number(discount_price_be))
    : null;
  const price = current_price
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(Number(current_price))
    : null;

  return (
    <Box>
      <Text
        fontSize={{ base: "18px", md: "24px" }}
        fontWeight="500"
        className="secondaryFont"
      >
        {products_name}
      </Text>

      <Stack
        divider={
          <StackDivider borderColor={{ base: "white", md: "gray.200" }} />
        }
        flexWrap="wrap"
        alignItems="center"
        direction="row"
        lineHeight="1.5rem"
        spacing="8px"
        className="secondaryFont"
        fontSize="0.875rem"
        mt={{ base: "8px", md: "16px" }}
        mb={{ base: "0.5rem", md: "12px" }}
      >
        <Flex alignItems="center">
          <FaStar color="gray" as="span" size={"1em"} />
          <Text color="gray.500" pl="0.3rem">
            {Number(rating).toFixed(1)}
          </Text>
        </Flex>
        <Text color="gray.500">{vendors_name}</Text>
        <Text color="gray.500">Terjual {products_ordered}</Text>
        {libur ? (
          <Flex alignItems="center">
            <RiCalendarEventFill size="1.4em" color="#DD6B20" as="span" />
            <Text color="orange.400" pl="0.5rem">
              Toko Libur
            </Text>
          </Flex>
        ) : (
          <Stack
            color={stock > 0 ? "green.400" : "red.400"}
            direction="row"
            align="center"
          >
            <IoIosCheckmarkCircleOutline as="span" size="1.2em" />
            <Text alignSelf="center">
              {stock > 0 ? `Stok Tersedia (${stock})` : "Stok habis"}
            </Text>
          </Stack>
        )}
        {preOrder && (
          <Flex alignItems="center">
            <IoTimeOutline size="1.4em" color="#ECC94B" as="span" />
            <Text color="yellow.400" pl="0.5rem">
              Pre Order
            </Text>
          </Flex>
        )}
      </Stack>

      {libur && (
        <Box
          my="1rem"
          w={{ lg: "95%", xl: "full" }}
          bg="red.50"
          color="red.400"
          fontWeight="500"
          px="1rem"
          py={{ base: "0.5rem", xl: "1rem" }}
          border="1px red solid"
          borderRadius="8px"
          textAlign="center"
          fontSize="1rem"
        >
          Toko ini sedang libur. {isholidaydata ?? ""}
        </Box>
      )}

      {po_opendate && po_closedate && po_shippingdate && !isClose && (
        <Box
          my="1rem"
          w={{ lg: "95%", xl: "full" }}
          bg="orange.50"
          color="orange.400"
          fontWeight="500"
          px="1rem"
          py="0.5rem"
          border="1px red solid"
          borderRadius="8px"
          fontSize="1rem"
        >
          <Flex justifyContent="space-between" px="1rem">
            <Box>
              <Text>Periode Pemesanan</Text>
              <Text fontWeight="400" fontSize="1.2rem">
                {po_opendate} s.d. {po_closedate}
              </Text>
            </Box>
            <Box>
              <Text>Estimasi Pengiriman</Text>
              <Text fontWeight="400" fontSize="1.2rem">
                {po_shippingdate}
              </Text>
            </Box>
          </Flex>
        </Box>
      )}

      {isClose && (
        <Flex
          my="1rem"
          w={{ lg: "95%", xl: "full" }}
          bg="orange.50"
          color="orange.400"
          fontWeight="500"
          px="1rem"
          py="0.5rem"
          border="1px red solid"
          borderRadius="8px"
          fontSize="1rem"
          justify="center"
          align="center"
        >
          <Text>Pre Order Telah Berakhir</Text>
        </Flex>
      )}

      {discount_price ? (
        <Box>
          <Text
            as="del"
            color="gray.300"
            className="secondaryFont"
            fontSize="16px"
            h="24px"
          >
            {price}
          </Text>
        </Box>
      ) : (
        ""
      )}

      <Stack direction="row">
        <Text
          className="primaryFont"
          color="red.500"
          fontSize="36px"
          fontWeight="bold"
        >
          {discount_price ?? price}
        </Text>
        <Box alignSelf="center">
          {discount ? (
            <Text
              className="secondaryFont"
              color="white"
              bg="red.500"
              fontWeight="500"
              fontSize="14px"
              px="8px"
              py="4px"
              borderRadius="4px"
            >
              Diskon {discount}%
            </Text>
          ) : (
            ""
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductHeader;
