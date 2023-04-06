import { Box, Text, Flex, HStack, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoLogoFacebook, IoMdLink } from "react-icons/io";
import { IoLogoTwitter, IoLogoWhatsapp } from "react-icons/io5";

import { copyToClipboard, getImageLink } from "../utils/functions";

export const ShareProduct = () => {
  const toast = useToast();
  const router = useRouter();
  const link = router.route;
  const d = [
    {
      name: "facebook",
      link: `https://www.facebook.com/sharer/sharer.php?u=${link}`,
      logo: <IoLogoFacebook size="1.5em" />,
    },
    {
      name: "twitter",
      link: `https://twitter.com/intent/tweet?url=${link}`,
      logo: <IoLogoTwitter size="1.5em" />,
    },
    // {
    //   name: "whatsapp",
    //   link: "https://api.whatsapp.com/send?phone=6282125023944",
    //   logo: <IoLogoWhatsapp size="1.5em" />,
    // },
    {
      name: "link",
      link,
      logo: <IoMdLink size="1.5em" />,
    },
  ];

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
          return e.name === "link" ? (
            <Box
              key={e.name}
              _hover={{ textColor: "white", background: "red" }}
              border="2px solid #E53E3E"
              borderRadius="24px"
              p="0.35rem"
              cursor="pointer"
              onClick={() => {
                copyToClipboard(window.location);
                toast({
                  position: "top",
                  title: "Berhasil menyalin link produk",
                  status: "success",
                  isClosable: true,
                });
              }}
            >
              {e.logo}
            </Box>
          ) : (
            <Link href={e.link} isExternal key={e.name}>
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
          );
        })}
      </HStack>
    </Box>
  );
};
