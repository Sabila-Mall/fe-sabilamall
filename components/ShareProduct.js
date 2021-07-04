import { Box, Text, Flex, HStack, Link } from "@chakra-ui/react";
import { IoLogoFacebook, IoMdLink } from "react-icons/io";
import { IoLogoTwitter, IoLogoWhatsapp } from "react-icons/io5";

export const ShareProduct = () => {
  return (
    <Box>
      <HStack
        spacing="1rem"
        align="center"
        textColor="#E53E3E"
        justifyContent="center"
      >
        <Text color="black" fontWeight="semibold">
          Bagikan
        </Text>
        <Link href="https://google.com" isExternal>
          <Box
            border="2px solid #E53E3E"
            borderRadius="24px"
            p="0.35rem"
            cursor="pointer"
          >
            <IoLogoFacebook size="1.5em" />
          </Box>
        </Link>
        <Link href="https://google.com" isExternal>
          <Box
            border="2px solid #E53E3E"
            borderRadius="24px"
            p="0.35rem"
            cursor="pointer"
          >
            <IoLogoTwitter size="1.5em" />
          </Box>
        </Link>
        <Link href="https://google.com" isExternal>
          <Box
            border="2px solid #E53E3E"
            borderRadius="24px"
            p="0.35rem"
            cursor="pointer"
          >
            <IoLogoWhatsapp size="1.5em" />
          </Box>
        </Link>
        <Link href="https://google.com" isExternal>
          <Box
            border="2px solid #E53E3E"
            borderRadius="24px"
            p="0.35rem"
            cursor="pointer"
          >
            <IoMdLink size="1.5em" />
          </Box>
        </Link>
      </HStack>
    </Box>
  );
};
