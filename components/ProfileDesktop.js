import { Box, Flex, Text, Icon, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import { IoKey, IoMedalOutline } from "react-icons/io5";
import { VscPackage } from "react-icons/vsc";

import { CardProfile } from "./CardProfile";
import Navbar from "./Navbar";

const ProfileDesktop = ({ section, element }) => {
  const router = useRouter();

  const sm = [
    { text: "SM Pay", value: "1000.000" },
    { text: "SM Point", value: 5 },
  ];

  const menu = [
    { text: "Profile Saya", path: "/profile", icon: FaUser },
    {
      text: "Alamat Pengiriman",
      path: "/profile/alamat-pengiriman",
      icon: VscPackage,
    },
    {
      text: "Upgrade Akun",
      path: "/profile/profile-saya",
      icon: IoMedalOutline,
    },
    { text: "Ubah Password", path: "/profile/ubah-password", icon: IoKey },
  ];

  return (
    <Box bg="gray.50" h="100%" display={{ base: "none", md: "block" }}>
      <Flex
        justify="center"
        pt="120px"
        pb="30px"
        bg="gray.50"
        px={{ base: "50px", md: "10px", lg: "80px", xl: "120px" }}
      >
        <Box
          display={{ base: "none", md: "block" }}
          position="fixed"
          top="0"
          left="0"
          zIndex="2"
        >
          <Navbar />
        </Box>
        <Flex>
          <CardProfile sm={sm} />
        </Flex>
        <Box
          border="1px solid #E2E8F0"
          borderRadius="20px"
          p="32px"
          w="62vw"
          ml="15px"
          boxShadow="0px 2px 4px -1px rgba(45, 55, 72, 0.06), 0px 4px 6px -1px rgba(45, 55, 72, 0.1)"
          bg="white"
        >
          <Flex>
            {menu.map((item) => (
              <Flex
                className="secondaryFont"
                fontSize={{ md: "14px", lg: "16px" }}
                lineHeight="24px"
                align="center"
                fontWeight="500"
                p="10px 2%"
                cursor="pointer"
                key={item.text}
                borderBottom={
                  section === item.text
                    ? "2px solid #DD6B20"
                    : "2px solid #E2E8F0"
                }
                color={section === item.text ? "orange.500" : "black"}
                onClick={() => router.push(item.path)}
              >
                <Icon as={item.icon} mr="11px" />
                <Text>{item.text}</Text>
              </Flex>
            ))}
          </Flex>
          <Heading
            className="primaryFont"
            fontWeight="700"
            fontSize="28px"
            lineHeight="33.6px"
            mt="28px"
            ml="8px"
          >
            {section}
          </Heading>
          {element}
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfileDesktop;
