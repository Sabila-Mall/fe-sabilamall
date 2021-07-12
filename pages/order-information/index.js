import {
    Box,
    Flex,
    Text,
    Stack,
    StackDivider,
    Grid,
    Button,
    VStack,
    Table,
    Tbody,
    Tr,
    Td,
    Center,
    Spacer
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons"

import { CardProfile } from "../../components/CardProfile";
import NavbarProfile from "../../components/NavbarProfile";
import { useRouter } from "next/router";
import OrderProduct from "../../components/OrderProduct";

const OrderInformation = () => {
    const sm = [
        { text: "SM Pay", value: "1000.000" },
        { text: "SM Point", value: 5 },
    ];
    const router = useRouter();

    const status = "pending"

    const orderProducts = [
        {
            name: "Nama Produk Croissant Tiramisu...",
            details: "Lengan panjang, Merah Cabe, XXXXXXXL",
            weight: "1000gr",
            notes: "ini produk yang punya catatan tambahan. kalo gaada catatannya gausah dirender.",
            image: "/images/productExample.svg",
            discount: "99%",
            price: "99.999.999",
            discountPrice: "Rp99.999.999",
            quantity: "999",
            subTotal: "Rp999.999.999"
        },
        {
            name: "Nama Produk Croissant Tiramisu...",
            details: "Lengan panjang, Merah Cabe, XXXXXXXL",
            weight: "1000gr",
            notes: "",
            image: "/images/productExample.svg",
            discount: "99%",
            price: "99.999.999",
            discountPrice: "Rp99.999.999",
            quantity: "999",
            subTotal: "Rp999.999.999"
        },
        {
            name: "Nama Produk Croissant Tiramisu...",
            details: "Lengan panjang, Merah Cabe, XXXXXXXL",
            weight: "1000gr",
            notes: "another produk yang pake catatan tambahan",
            image: "/images/productExample.svg",
            discount: "99%",
            price: "99.999.999",
            discountPrice: "Rp99.999.999",
            quantity: "999",
            subTotal: "Rp999.999.999"
        }
    ]



    return (
        <>
            <Box bg="gray.50" h="100%">
                <Flex
                    justify="center"
                    pt="64px"
                    pb="30px"
                    bg="gray.50"
                    px={{ md: "10px", lg: "80px", xl: "120px" }}
                >
                    <Box display={{ base: "block", md: "none" }} w="100%">
                        <NavbarProfile section="Informasi Pesanan" />
                    </Box>

                    <Flex display={{ base: "none", md: "block" }}>
                        <CardProfile sm={sm} />
                    </Flex>
                    <Stack
                        border="1px solid #E2E8F0"
                        borderRadius="20px"
                        p="32px"
                        w={{ base: "62vw", md: "100vw" }}
                        ml="15px"
                        boxShadow="0px 2px 4px -1px rgba(45, 55, 72, 0.06), 0px 4px 6px -1px rgba(45, 55, 72, 0.1)"
                        bg="white"
                    >
                        <Flex onClick={() => router.push("/profile")} dir="column" w="fit-content" mb="12px">
                            <ChevronLeftIcon w={6} h={6} />
                            <Text
                                className="secondaryFont"
                                fontSize="16px"
                                fontWeight="500"
                                color="gray.500"
                                lineHeight="150%"
                                ml="16px"
                            >
                                Kembali
                            </Text>
                        </Flex>
                        <Flex justify="space-between" my="12px">
                            <Box className="secondaryFont" fontWeight="500" lineHeight="150%">
                                <Box>
                                    <Text color="gray.500" fontSize="0.75rem">Nomor Pesanan</Text>
                                    <Text color="black" fontSize="0.875rem">SMC10101</Text>
                                </Box>
                                <Flex>
                                    <Box w="140px">
                                        <Text color="gray.500" fontSize="0.75rem">Status Pesanan</Text>
                                        <Text color="black" fontSize="0.875rem">Terkirim</Text>
                                    </Box>
                                    <Box ml="16px">
                                        <Text color="gray.500" fontSize="0.75rem">Waktu Pemesanan</Text>
                                        <Text color="black" fontSize="0.875rem">9 Juni 2002 13:11</Text>
                                    </Box>
                                </Flex>
                                <Flex>
                                    <Box w="140px">
                                        <Text color="gray.500" fontSize="0.75rem">Status Pembayaran</Text>
                                        <Text color="black" fontSize="0.875rem">Terkirim</Text>
                                    </Box>
                                    <Box ml="16px">
                                        <Text color="gray.500" fontSize="0.75rem">Waktu Pembayaran</Text>
                                        <Text color="black" fontSize="0.875rem">9 Juni 2021 13:11</Text>
                                    </Box>
                                </Flex>
                            </Box>
                            <VStack className="primaryFont" fontWeight="700" fontSize="1rem" lineHeight="150%" w="186px">
                                <Button color="white" bgColor="orange.500" w="100%" borderRadius="4px">
                                    Berikan Penilaian
                                </Button>
                                <Button border="1px solid #DD6B20" color="orange.500" bgColor="white" w="100%" borderRadius="4px">
                                    Lihat Nota Pesanan
                                </Button>
                            </VStack>

                        </Flex>
                        <Grid templateColumns="repeat(3, 1fr)" gap={6} my="12px">
                            <Box className="primaryFont" fontSize="1rem">
                                <Text color="black" fontWeight="700">
                                    Data Pengirim
                                </Text>
                                <Text color="gray.600" fontWeight="700" mt="16px">
                                    M Abdurahman Basyah
                                </Text>
                                <Text color="gray.600" fontWeight="400">
                                    08234234234
                                </Text>
                            </Box>
                            <Box className="primaryFont" fontSize="1rem">
                                <Text color="black" fontWeight="700">
                                    Data Pengirim
                                </Text>
                                <Text color="gray.600" fontWeight="700" mt="16px">
                                    M Abdurahman Basyah
                                </Text>
                                <Text color="gray.600" fontWeight="400">
                                    08234234234
                                </Text>
                                <Text className="secondaryFont" fontWeight="500" fontSize="0.875rem">
                                    Jl Kb Kacang Grand Indonesia Shopping Town East Mall Lt Ground 30, TANGERANG - CILEDUG, BANTEN, 15148
                                </Text>
                            </Box>
                            <Box>
                                <Text className="primaryFont" fontSize="1rem" color="black" fontWeight="700">
                                    Pengiriman
                                </Text>
                                <Box className="secondaryFont" fontWeight="500" fontSize="0.75rem" lineHeight="150%" mt="16px" color="gray.600">
                                    <Text>
                                        JNE Reguler
                                    </Text>
                                    <Text>
                                        No. Resi:  1010101010101
                                    </Text>
                                </Box>
                                <Button bgColor="white" border="1px solid #DD6B20" borderRadius="4px" color="orange.500" fontSize="1rem" fontWeight="700" className="primaryFont" mt="8px">
                                    Lacak
                                </Button>
                            </Box>
                        </Grid>
                        <Table variant="simple" my="16px">
                            <Tbody>
                                <Tr className="primaryFont" fontWeight="700" fontSize="16px" color="black">
                                    <Td>Produk</Td>
                                    <Td>Harga Satuan</Td>
                                    <Td>Jumlah</Td>
                                    <Td>
                                        <Center>
                                            Subtotal
                                        </Center>
                                    </Td>
                                </Tr>
                                {orderProducts.map((product, index) => {
                                    return (
                                        <Tr>
                                            <Td>
                                                <OrderProduct name={product.name} source={product.image} details={product.details} weight={product.weight} notes={product.notes} />
                                            </Td>
                                            <Td>
                                                {product.discount ? <Text as="del" color="gray.300" className="secondaryFont" fontSize="0.75rem">{product.price}</Text> : ""}

                                                <Text className="primaryFont" color="red.500" fontSize="1rem" fontWeight="bold">
                                                    {product.discountPrice}
                                                </Text>
                                                <Box>
                                                    {product.discount ? <Text className="secondaryFont"
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
                                                <Center color="gray.500" fontSize="1rem" className="secondaryFont">
                                                    999
                                                </Center>
                                            </Td>
                                            <Td color="gray.700" fontSize="1rem" className="secondaryFont" fontWeight="700">
                                                Rp999.999.999
                                            </Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>

                        </Table>
                        <Grid templateColumns="repeat(2, 1fr)" pt="16px" gap={4}>
                            <Box fontSize="0.875rem" lineHeight="150%">
                                <Text fontWeight="700" className="primaryFont">
                                    Catatan Pesanan
                                </Text>
                                <Text fontWeight="500" className="secondaryFont" mt="8px" color="gray.700" p="12px" borderRadius="4px" border="1px solid #E2E8F0">
                                    Ini catatan pesanan. Ice cream cake macaroon donut topping tiramisu tart bear claw lemon drops. Pastry lollipop cupcake lemon drops fruitcake gummies dragée liquorice. Halvah apple pie carrot cake gummi bears I love dragée I love marshmallow.
                                </Text>
                            </Box>
                            <Box color="gray.500" fontSize="0.75rem" lineHeight="150%" className="secondaryFont" fontWeight="500">
                                <Flex>
                                    <Text>Subtotal Produk</Text>
                                    <Spacer />
                                    <Text>Rp9.999.999</Text>
                                </Flex>
                                <Flex mt="8px">
                                    <Text>Biaya Pengiriman</Text>
                                    <Spacer />
                                    <Text>Rp99.999</Text>
                                </Flex>
                                <Flex mt="8px">
                                    <Text>Biaya Tambahan</Text>
                                    <Spacer />
                                    <Text>Rp0</Text>
                                </Flex>
                                <Flex mt="8px">
                                    <Text>Diskon Produk</Text>
                                    <Spacer />
                                    <Text>-Rp99.999</Text>
                                </Flex>
                                <Flex mt="8px">
                                    <Text>Diskon Voucher</Text>
                                    <Spacer />
                                    <Text>-Rp99.999</Text>
                                </Flex>
                                <Flex mt="8px">
                                    <Text>Total Pesanan</Text>
                                    <Spacer />
                                    <Text color="orange.500" fontSize="1rem" fontWeight="700" className="primaryFont">Rp999.999.999</Text>
                                </Flex>
                                <Flex mt="8px">
                                    <Text>Metode Pembayaran</Text>
                                    <Spacer />
                                    <Text>Transfer Bank BNI</Text>
                                </Flex>
                            </Box>
                        </Grid>
                    </Stack>
                </Flex>
            </Box>
        </>
    )
}

export default OrderInformation;