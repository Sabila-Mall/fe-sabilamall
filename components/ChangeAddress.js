import { Box, Stack } from "@chakra-ui/react";

import NavbarProfile from "./NavbarProfile";
import ReceiverAddresses from "./ReceiverAddresses";
import SenderAddresses from "./SenderAddresses";

export const ChangeAddress = ({ isMobile }) => {
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
          <SenderAddresses isMobile={isMobile} />
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
        <ReceiverAddresses isMobile={isMobile} />
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
