import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";

import DeleteIcon from "./deleteIcon";

const AddressBox = ({
  name,
  phoneNumber,
  address,
  city,
  district,
  province,
  postalCode,
  editAddress,
  deleteAddress,
}) => {
  return (
    <Box position="relative" p="16px" pb="0">
      <Flex lineHeight="150%" className="secondaryFont" fontSize="12px">
        <Box
          color="gray.500"
          textAlign="right"
          display={{ base: "none", md: "block" }}
        >
          <Text>{name ? "Nama Lengkap" : ""}</Text>
          <Text>{phoneNumber ? "Telepon" : ""}</Text>
          <Text>{address ? "Alamat" : ""}</Text>
        </Box>
        <Box ml={{ base: "0", md: "16px" }} maxW={{ base: "60%", md: "40%" }}>
          <Text fontWeight="bold">{name}</Text>
          <Text>{phoneNumber}</Text>
          <Text>{address}</Text>
          <Text>
            {(city ? city : "") +
              (city && province ? ", " : "") +
              (province ? province : "")}
          </Text>
          <Text>
            {(district ? district : "") +
              (district && postalCode ? ", " : "") +
              (postalCode ? postalCode : "")}
          </Text>
        </Box>
      </Flex>
      <Divider mt="1rem" mb="0" />
      <Box
        position="absolute"
        top="15px"
        right="40px"
        color="gray.500"
        cursor="pointer"
        h={{ base: "24px", md: "24px" }}
      >
        <FaPen onClick={editAddress} />
      </Box>
      <Box
        position="absolute"
        top="15px"
        right="20px"
        color="gray.500"
        cursor="pointer"
      >
        <DeleteIcon deleteAddress={deleteAddress} />
      </Box>
    </Box>
  );
};

export default AddressBox;
