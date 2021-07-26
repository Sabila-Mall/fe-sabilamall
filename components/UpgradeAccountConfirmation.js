import {
    Box,
    Flex,
    Text,
    Button,
    Grid,
    Input,
    Select
} from "@chakra-ui/react";
import NavbarProfile from "./NavbarProfile";

const KonfirmasiUpgradeAkun = ({ isMobile }) => {
    return (
        <>
            <Box h={{ base: "100vh", md: "fit-content" }} bgColor={{ base: "gray.50", md: "white" }} position="relative">
                {isMobile ? <NavbarProfile section={"Upgrade Akun"} /> : <></>}

                <Box pt={{ base: "5rem", md: "0" }} px={{ base: "1rem", md: "0" }}>
                    {isMobile ? <Text
                        className="primaryFont"
                        fontWeight="700"
                        fontSize="20px"
                        lineHeight="26px"
                        color="black"
                    >
                        Konfirmasi Pembayaran Upgrade
                    </Text> : <></>}

                    <Box
                        border="1px solid #CBD5E0"
                        borderRadius="8px"
                        mt="24px"
                        p="12px"
                        className="secondaryFont"
                        fontSize="0.75em"
                        fontWeight="500"
                        lineHeight="150%"
                        color="black"
                    >
                        <Flex>
                            <Text minW="115px">
                                Member ID
                            </Text>
                            <Text>
                                C5749
                            </Text>
                        </Flex>
                        <Flex>
                            <Text minW="115px">
                                Invoice ID
                            </Text>
                            <Text>
                                UP173864
                            </Text>
                        </Flex>
                        <Flex>
                            <Text minW="115px">
                                Tanggal Pesanan
                            </Text>
                            <Text>
                                24/05/2021
                            </Text>
                        </Flex>
                        <Flex>
                            <Text minW="115px">
                                Invoice ID
                            </Text>
                            <Text>
                                Request Upgrade to Agen for C5749
                            </Text>
                        </Flex>
                        <Flex>
                            <Text minW="115px">
                                Jumlah Tagihan
                            </Text>
                            <Text>
                                Rp 2.005.749
                            </Text>
                        </Flex>
                    </Box>
                </Box>
                <Grid
                    px={{ base: "1rem", md: "0" }}
                    templateColumns={{ base: "repeat(1. 1fr)", md: "repeat(2, 1fr)" }}
                    mt="24px"
                    gap={{ base: "8px", md: "24px" }}>
                    <Box>
                        <Text
                            className="secondaryFont"
                            fontWeight="500"
                            fontSize="0.875em"
                            lineHeight="150%"
                            color="black"
                        >
                            Nama Awal
                        </Text>
                        <Input placeholder="Masukkan nama awal penerima" color="#CBD5E0" bgColor="white" />
                    </Box>
                    <Box>
                        <Text
                            className="secondaryFont"
                            fontWeight="500"
                            fontSize="0.875em"
                            lineHeight="150%"
                            color="black"
                        >
                            Nama Akhir
                        </Text>
                        <Input placeholder="Masukkan nama akhir penerima" color="#CBD5E0" bgColor="white" />
                    </Box>
                    <Box>
                        <Text
                            className="secondaryFont"
                            fontWeight="500"
                            fontSize="0.875em"
                            lineHeight="150%"
                            color="black"
                        >
                            Jenis Kelamin
                        </Text>
                        <Select placeholder="Pilih jenis kelamin" color="#CBD5E0" bgColor="white">
                            <option value="laki-laki">Laki-laki</option>
                            <option value="perempuan">Perempuan</option>
                        </Select>
                    </Box>
                    <Box>
                        <Text
                            className="secondaryFont"
                            fontWeight="500"
                            fontSize="0.875em"
                            lineHeight="150%"
                            color="black"
                        >
                            Ponsel
                        </Text>
                        <Input placeholder="Masukkan nomor ponsel penerima" color="#CBD5E0" bgColor="white" />
                    </Box>
                </Grid>
                <Button
                    className="primaryFont"
                    fontWeight="700"
                    fontSize="1rem"
                    onClick={() => handleSubmit()}
                    p={{ base: "15px", md: "12.5px 24px" }}
                    mx={{ base: "5%", md: "0" }}
                    w={{ base: "90%", md: "fit-content" }}
                    color="white"
                    bg="orange.500"
                    pos="absolute"
                    right="0"
                    bottom={{ base: "1rem", md: "-5rem" }}
                    borderRadius={{ base: "20px", md: "6px" }}
                    _hover={{ bg: "orange.400" }}
                >
                    Konfirmasi
                </Button>
            </Box>
        </>
    );
};

export default KonfirmasiUpgradeAkun;
