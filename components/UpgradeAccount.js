import {
    Box,
    Text,
    Stack,
    Flex,
    Button,
    Radio,
    RadioGroup,
    FormControl
} from "@chakra-ui/react";
import NavbarProfile from "./NavbarProfile";
import { useState, useEffect } from "react";
import { ButtonSubmit } from "./ButtonProfile";
import router from "next/router";

export const UpgradeAccount = ({ isMobile }) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(value)
    }, [value])

    const option = [
        {
            name: "Agen",
            value: "agen"
        },
        {
            name: "Reseller",
            value: "reseller"
        }
    ];

    return (
        <Box mx={isMobile ? "5%" : "0"}>
            <Text fontSize="16px" lineHeight="150%" className="secondaryFont" fontWeight="500" mt="16px">Pilih level member yang ingin kamu ajukan</Text>
            <FormControl id="form">
                <RadioGroup onChange={setValue} value={value} pos="relative">
                    <Stack mt="20px" spacing="16px">
                        <Box border="2px solid #A0AEC0" borderRadius="20px" _focusWithin={{ borderColor: "orange.500" }}>
                            <Radio value={option[0].value} p="32px 16px" w="100%" h="100%" _checked={{ bg: "orange.500" }} transform="translateY(-12px)">
                                <Flex>
                                    <Text fontSize="16px" className="primaryFont" fontWeight="bold" color="orange.500">Reseller</Text>
                                    <Text pos="absolute" right="32px" className="secondaryFont" fontSize="14px" fontWeight="500">Rp 505.749</Text>
                                </Flex>
                                <Text fontSize="14px" className="secondaryFont" fontWeight="500" mt="6px">Diskon hingga 20%</Text>
                            </Radio>
                        </Box>
                        <Box border="2px solid #A0AEC0" borderRadius="20px" _focusWithin={{ borderColor: "orange.500" }}>
                            <Radio value={option[1].value} p="32px 16px" w="100%" h="100%" _checked={{ bg: "orange.500" }} transform="translateY(-12px)">
                                <Flex>
                                    <Text fontSize="16px" className="primaryFont" fontWeight="bold" color="orange.500">Agen</Text>
                                    <Text pos="absolute" right="32px" className="secondaryFont" fontSize="14px" fontWeight="500">Rp 2.005.749</Text>
                                </Flex>
                                <Text fontSize="14px" className="secondaryFont" fontWeight="500" mt="6px">Diskon hingga 30%</Text>
                            </Radio>
                        </Box>
                    </Stack>
                </RadioGroup>
                <Button
                    colorScheme="orange"
                    borderRadius="20px"
                    p="24px"
                    pos="fixed"
                    bottom="36px"
                    type="submit"
                    fontWeight="700"
                    className="primaryFont"
                    fontSize="18px"
                    w="90%"
                    d="flex"
                    onClick={() => router.push("/profile")}
                    visibility={isMobile ? "block" : "hidden"}>
                    Update
                </Button>


                <Flex justify="flex-end" w="100%" mt="52px">
                    <ButtonSubmit text="Konfirmasi" />
                </Flex>
            </FormControl >
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
