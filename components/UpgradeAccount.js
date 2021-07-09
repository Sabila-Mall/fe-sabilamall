import {
    Box,
    Text,
    Stack,
    Flex,
    Button,
    Radio,
    RadioGroup,
    FormControl,
    Center,
    Image
} from "@chakra-ui/react";
import NavbarProfile from "./NavbarProfile";
import { useState } from "react";

export const UpgradeAccount = ({ isMobile, currentAccount }) => {
    const [value, setValue] = useState(currentAccount);
    const [tempValue, settempValue] = useState(value)

    const handleSubmit = () => {
        console.log(tempValue);
        // setValue(tempValue)
    }

    const options = [
        {
            name: "Agen",
            value: "agen",
            price: "Rp 2.005.749",
            discount: "30%"
        },
        {
            name: "Reseller",
            value: "reseller",
            price: "Rp 505.749",
            discount: "20%"
        }
    ];

    return (
        <Box mx={isMobile ? "5%" : "0"}>
            <Text
                fontSize="16px"
                lineHeight="150%"
                className="secondaryFont"
                fontWeight="500"
                mt="30px"
                color={value === "agen" ? "orange.500" : "black"}>
                {value === "agen" ? "Akunmu sudah level tertinggi (Agen)!" : "Pilih level member yang ingin kamu ajukan"}
            </Text>

            {value === "agen" ?
                <Center mt={isMobile ? "50%" : "auto"}>
                    <Image src="/images/agentAccount.svg" alt="" />
                </Center> :
                <FormControl id="form"><RadioGroup
                    pos="relative">
                    <Stack
                        mt="20px"
                        spacing="16px">
                        {options.map((option) => {
                            return (
                                <Box
                                    key={option.value}
                                    border="2px solid #A0AEC0"
                                    borderRadius="20px"
                                    _focusWithin={{ borderColor: "orange.500" }}
                                    onClick={(e) => settempValue(e.target.value)}>
                                    <Radio
                                        value={option.value}
                                        p="32px 16px"
                                        w="100%"
                                        h="100%"
                                        _checked={{ bg: "orange.500" }}
                                        transform="translateY(-12px)">
                                        <Flex>
                                            <Text
                                                fontSize="16px"
                                                className="primaryFont"
                                                fontWeight="bold"
                                                color="orange.500">
                                                {option.name}
                                            </Text>
                                            <Text
                                                pos="absolute"
                                                right="32px"
                                                className="secondaryFont"
                                                fontSize="14px"
                                                fontWeight="500">
                                                {option.price}
                                            </Text>
                                        </Flex>
                                        {option.discount === "" ? "" :
                                            <Text
                                                fontSize="14px"
                                                className="secondaryFont"
                                                fontWeight="500" mt="6px">
                                                {`Diskon hingga ${option.discount}`}
                                            </Text>}
                                    </Radio>
                                </Box>
                            )
                        })}
                    </Stack>
                </RadioGroup>
                </FormControl >}
            <Flex justify="flex-end" w="100%">
                <Button
                    className="primaryFont"
                    fontWeight="700"
                    fontSize="18px"
                    onClick={() => handleSubmit()}
                    size="lg"
                    w={isMobile ? "90%" : "25%"}
                    ml="5%"
                    mt={isMobile ? "" : "72px"}
                    color="white"
                    bg="orange.500"
                    pos={isMobile ? "absolute" : ""}
                    bottom={isMobile ? "36px" : ""}
                    borderRadius={isMobile ? "20px" : "6px"}
                    _hover={{ bg: "orange.400" }}
                >
                    {isMobile ? "Konfirmasi Pesanan" : "Konfirmasi"}
                </Button>
            </Flex>
        </Box >


    )

};

export const UpgradeAccountMobile = () => (
    <Box display={{ base: "block", md: "none" }}>
        <NavbarProfile section={"Upgrade Akun"} />
        <Box>
            <UpgradeAccount isMobile={true} mt="16px" />
        </Box>
    </Box>
);
