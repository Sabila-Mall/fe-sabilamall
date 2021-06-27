import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Button
} from "@chakra-ui/react";
import router from "next/router";
import NavbarProfile from "../../components/NavbarProfile";

const editSenderMobile = () => {
    return (
        <Box>
            <Box bgColor="white">
                <NavbarProfile section="Alamat Pengirim" />
            </Box>
            <Box>
                <Box mx="24px" mt="48px">
                    <FormControl>
                        <FormLabel className="primaryFont" fontWeight="700" fontSize="16px">Nama Lengkap</FormLabel>
                        <Input id="name" required />

                        <FormLabel mt={4} className="primaryFont" fontWeight="700" fontSize="16px">Nomor Telepon</FormLabel>
                        <Input id="phoneNumber" required />

                        <FormLabel mt={4} className="primaryFont" fontWeight="700" fontSize="16px">Alamat Lengkap</FormLabel>
                        <Input id="address" required />
                    </FormControl>
                </Box>
            </Box>
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
                ml="5%"
                d="flex"
                onClick={() => router.push("/profile/alamat-pengiriman")}>
                Update
            </Button>
        </Box>

    );
};

export default editSenderMobile;
