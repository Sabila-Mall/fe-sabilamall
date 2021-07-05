import {
    Box,
    Divider,
    Stack
} from "@chakra-ui/react";
import NavbarProfile from "./NavbarProfile";
import ReceiverAddresses from "./ReceiverAddresses";
import SenderAddresses from "./SenderAddresses";

export const ChangeAddress = ({ isMobile }) => {

    let receiverAddresses = [
        {
            name: "Farahhhhhhhhhh",
            phoneNumber: "012345678",
            fullAddress: "Jl depok blok AA no. 17",
            district: "Sukmajaya",
            city: "Kota Depok",
            province: "Jawa Barat",
            postalCode: "16417"
        },
        {
            name: "Farahhhhhhhhhh",
            phoneNumber: "088888888888",
            fullAddress: "Jl depok blok AA no. 17",
            district: "Sukmajaya",
            city: "Kota Depok",
            province: "Jawa Barat",
            postalCode: "16417"
        },
        {
            name: "Farahhhhhhhhhh",
            phoneNumber: "000000000",
            fullAddress: "Jl depok blok AA no. 17",
            district: "Sukmajaya",
            city: "Kota Depok",
            province: "Jawa Barat",
            postalCode: "16417"
        }
    ]

    return (
        <Box
            bgColor={isMobile ? "gray.50" : "white"}
            pt="48px">
            <Box
                mt={isMobile ? "0" : "10px"}
                w={isMobile ? "90%" : "auto"}
                mx={isMobile ? "5%" : "auto"}
                px="16px"
                borderRadius="20px"
                boxShadow="md"
                bgColor="white">
                <Stack dir="column">
                    <Divider mt="10px" mb="10px" />
                    <SenderAddresses isMobile={isMobile} />

                </Stack>

            </Box>
            <Box
                mt={{ base: "100px", md: "20px" }}
                px="16px"
                w={isMobile ? "90%" : "auto"}
                mx={isMobile ? "5%" : "auto"}
                pt="18px"
                borderRadius="20px"
                boxShadow="md"
                bgColor="white">

                <Divider mt="10px" mb="10px" />
                <ReceiverAddresses addresses={receiverAddresses} isMobile={isMobile} />

            </Box>
        </Box>

    );
};

export const ChangeAddressMobile = () => (
    <Box display={{ base: "block", md: "none" }}>
        <NavbarProfile section={"Alamat Pengiriman"} />
        <Box overflowY="hidden">
            <ChangeAddress isMobile={true} />
        </Box>
    </Box>
);
