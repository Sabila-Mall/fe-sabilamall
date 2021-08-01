import { Box, Text, Flex, HStack, Link } from "@chakra-ui/react";
import { IoLogoFacebook, IoMdLink } from "react-icons/io";
import { IoLogoTwitter, IoLogoWhatsapp } from "react-icons/io5";

const d = [
  {
    link: "https://google.com",
    logo: <IoLogoFacebook size="1.5em" />,
  },
  {
    link: "https://google.com",
    logo: <IoLogoTwitter size="1.5em" />,
  },
  {
    link: "https://google.com",
    logo: <IoLogoWhatsapp size="1.5em" />,
  },
  {
    link: "https://google.com",
    logo: <IoMdLink size="1.5em" />,
  },
];

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
        {d.map((e, i) => {
          return (
            <>
              <Link href={e.link} isExternal>
                <Box
                  _hover={{ textColor: "white", background: "red" }}
                  border="2px solid #E53E3E"
                  borderRadius="24px"
                  p="0.35rem"
                  cursor="pointer"
                >
                  {e.logo}
                </Box>
              </Link>
            </>
          );
        })}
      </HStack>
    </Box>
  );
};
