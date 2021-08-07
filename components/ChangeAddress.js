import { Box, Divider, Stack } from "@chakra-ui/react";

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
      postalCode: "16417",
      key: "012345678",
    },
    {
      name: "Farahhhhhhhhhh",
      phoneNumber: "088888888888",
      fullAddress: "Jl depok blok AA no. 17",
      district: "Sukmajaya",
      city: "Kota Depok",
      province: "Jawa Barat",
      postalCode: "16417",
      key: "088888888888",
    },
    {
      name: "Farahhhhhhhhhh",
      phoneNumber: "000000000",
      fullAddress: "Jl depok blok AA no. 17",
      district: "Sukmajaya",
      city: "Kota Depok",
      province: "Jawa Barat",
      postalCode: "16417",
      key: "000000000",
    },
  ];

  let senderAddresses = [
    {
      name: "Farahhhhh",
      phoneNumber: "0888888888",
    },
    {
      name: "Farahhhhhhh",
      phoneNumber: "0888888887",
    },
  ];

  return (
    <Box
      bgColor={isMobile ? "gray.50" : "white"}
      pt={{ base: "5rem", md: "1rem" }}
    >
      <Box
        mt={isMobile ? "0" : "10px"}
        w={isMobile ? "90%" : "auto"}
        mx={isMobile ? "5%" : "auto"}
        px="16px"
        borderRadius="20px"
        boxShadow="md"
        bgColor="white"
      >
        <Stack dir="column">
          <SenderAddresses isMobile={isMobile} addresses={senderAddresses} />
        </Stack>
      </Box>
      <Box
        mt="20px"
        px="16px"
        w={isMobile ? "90%" : "auto"}
        mx={isMobile ? "5%" : "auto"}
        borderRadius="20px"
        boxShadow="md"
        bgColor="white"
        mb="1rem"
      >
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
