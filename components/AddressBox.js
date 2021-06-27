import {
    Box,
    Flex,
    Text
} from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";
import DeleteIcon from "./deleteIcon";

const AddressBox = ({ name, phoneNumber, address, editAddress, deleteAddress }) => {


    return (
        <Box position="relative" p="16px">
            <Flex lineHeight="150%" className="secondaryFont" fontSize="12px">
                <Box color="gray.500" textAlign="right" display={{ base: "none", md: "block" }}>
                    <Text>Nama Lengkap</Text>
                    <Text>Telepon</Text>
                    <Text>Alamat</Text>
                </Box>
                <Box ml="16px" maxW={{ base: "60%", md: "40%" }}>
                    <Text fontWeight="bold">{name}</Text>
                    <Text>{phoneNumber}</Text>
                    <Text>{address}</Text>
                </Box>
            </Flex>
            <Box position="absolute" top="15px" right="40px" color="gray.500" cursor="pointer" h={{ base: "24px", md: "24px" }}>
                <FaPen onClick={editAddress} />
            </Box>
            <Box position="absolute" top="15px" right="20px" color="gray.500" cursor="pointer">
                <DeleteIcon deleteAddress={deleteAddress} />
            </Box>

        </Box>
    )
}

export default AddressBox;