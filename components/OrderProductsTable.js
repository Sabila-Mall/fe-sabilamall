import {
    Box,
    Text,
    Table,
    Tbody,
    Tr,
    Td,
    Center,
    Flex,
    Spacer,
    Divider
} from "@chakra-ui/react";
import OrderProduct from "./OrderProduct";

export default function OrderProductsTable({ products }) {
    return (
        <Table variant="simple" my="16px">
            <Tbody>
                <Tr
                    className="primaryFont"
                    fontWeight="700"
                    fontSize="16px"
                    color="black">
                    <Td>Produk</Td>
                    <Td>Harga Satuan</Td>
                    <Td>Jumlah</Td>
                    <Td>
                        <Center>
                            Subtotal
                        </Center>
                    </Td>
                </Tr>
                {products.map((product, index) => {
                    return (
                        <Tr>
                            <Td>
                                <OrderProduct
                                    name={product.name}
                                    source={product.image}
                                    details={product.details}
                                    weight={product.weight}
                                    notes={product.notes} />
                            </Td>
                            <Td className="secondaryFont">
                                {product.discount ?
                                    <Text
                                        as="del"
                                        color="gray.300"
                                        fontSize="0.75rem">
                                        {product.price}
                                    </Text> : ""}

                                <Text
                                    fontSize="1rem">
                                    {product.discountPrice}
                                </Text>
                                <Box>
                                    {product.discount ? <Text
                                        color="white"
                                        bg="red.500"
                                        fontWeight="500"
                                        fontSize="14px"
                                        px="8px"
                                        py="4px"
                                        borderRadius="4px"
                                        w="fit-content">
                                        Diskon {product.discount}
                                    </Text> : ""}
                                </Box>
                            </Td>
                            <Td>
                                <Center
                                    color="gray.500"
                                    fontSize="1rem"
                                    className="secondaryFont">
                                    999
                                </Center>
                            </Td>
                            <Td
                                color="gray.700"
                                fontSize="1rem"
                                className="secondaryFont"
                                fontWeight="700">
                                Rp999.999.999
                            </Td>
                        </Tr>
                    )
                })}
            </Tbody>

        </Table>
    )
}

export function OrderProductsTableMobile({ products }) {
    return (
        <Box>
            {products.map((product, index) => {
                return (
                    <>
                        <OrderProduct
                            name={product.name}
                            source={product.image}
                            details={product.details}
                            weight={product.weight}
                            notes={product.notes} />
                        {product.discount ?
                            <Flex justify="flex-end">
                                <Text
                                    as="del"
                                    color="gray.300"
                                    fontSize="0.75rem">
                                    {product.price}
                                </Text>
                            </Flex>
                            : ""}
                        <Flex>
                            <Text
                                color="gray.500"
                                fontSize="1rem"
                                className="secondaryFont">
                                Jumlah: 999
                            </Text>
                            <Spacer />
                            <Flex lineHeight="100%">
                                <Box>
                                    {product.discount ? <Text
                                        color="white"
                                        bg="red.500"
                                        fontWeight="500"
                                        fontSize="0.625rem"
                                        px="6px"
                                        py="3px"
                                        borderRadius="4px"
                                        w="fit-content">
                                        Diskon {product.discount}
                                    </Text> : ""}
                                </Box>
                                <Text
                                    fontSize="1rem"
                                    ml="0.25rem"
                                    alignSelf="center">
                                    {product.discountPrice}
                                </Text>
                            </Flex>

                        </Flex>
                        <Flex>
                            <Text
                                color="black.600"
                                fontSize="1rem"
                                className="secondaryFont">
                                Subtotal: 999
                            </Text>
                            <Spacer />
                            <Text
                                color="gray.700"
                                fontSize="1rem"
                                className="secondaryFont">
                                Rp99.999.999
                            </Text>
                        </Flex>
                        <Divider border="1px solid gray.200" my="16px" />
                    </>
                )
            })}
        </Box>
    )
}