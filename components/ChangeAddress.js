import { Box, Stack } from "@chakra-ui/react";

import NavbarProfile from "./NavbarProfile";
import ReceiverAddresses from "./ReceiverAddresses";
import SenderAddresses from "./SenderAddresses";

export const ChangeAddress = ({ isMobile, section }) => {
  return (
    <Box
      bgColor={isMobile ? "gray.50" : "white"}
      pt={{ base: "5rem", md: "1rem" }}
    >
      {section === "pengirim" &&
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
      }

      {section === "penerima" &&
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
      }

    </Box>
  );
};

export const ChangeAddressMobile = ({ menu, section }) => (
  <Box display={{ base: "block", md: "none" }} pb={{ base: "4rem", md: "" }}>
    <NavbarProfile section={menu} />
    <Box overflowY="hidden">
      <ChangeAddress isMobile={true} section={section} />
    </Box>
  </Box>
);
