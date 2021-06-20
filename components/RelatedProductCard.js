import { Box, Flex, Text } from "@chakra-ui/layout";
import { css } from "@emotion/react";
import { IoHeartOutline } from "react-icons/io5";

const RelatedProductCard = ({ name, isDiscount, discountAmount, price }) => {

    const productDiscountPrice = price * (100 - discountAmount) / 100

    const priceWithDot = (item) => {
        return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    return (
        <Box
            w="10.5rem"
            h="17.25rem"
            border="solid #CBD5E0 0.5px"
            borderRadius="8px"
            css={css`
        :hover {
          cursor: pointer;
        }
      `}
        >
            <Flex
                w="full"
                pos="relative"
                justifyContent="center"
                flexDirection="column"
            >
                <img layout="fill" src="/images/ProductDetail/products.svg" />
                <Box px="8px">
                    <Text w="full" h="48px" as="h1" fontWeight="500" fontSize="1rem">
                        {name}
                    </Text>
                    <Box pt="0.2rem">
                        {isDiscount && (
                            <>
                                <Flex alignItems="center" fontWeight="500">
                                    <Text
                                        mr="9px"
                                        as="h1"
                                        fontSize="0.825rem"
                                        textDecoration="line-through"
                                        color="gray.500"
                                        lineHeight="15px"
                                    >
                                        Rp {priceWithDot(price)}
                                    </Text>
                                    <Flex
                                        w="32px"
                                        h="22px"
                                        borderRadius="4px"
                                        fontSize="13px"
                                        bg="#FEB2B2"
                                        color="red.700"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        {discountAmount}%
                                    </Flex>
                                </Flex>
                                <Text as="h1" fontWeight="bold" fontSize="1.1rem">
                                    Rp {priceWithDot(productDiscountPrice)}
                                </Text>
                            </>
                        )}
                    </Box>
                </Box>
                <Box
                    pos="absolute"
                    right="1rem"
                    bottom="1.5px"
                    css={css`
            :hover {
              size: 1.5em;
            }
          `}
                >
                    <IoHeartOutline size="1.3em" />
                </Box>
            </Flex>
        </Box>
    );
};
export default RelatedProductCard;
