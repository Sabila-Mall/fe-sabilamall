import { Box, Flex, Text, Icon, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import { IoKey, IoMedalOutline } from "react-icons/io5";
import { VscPackage } from "react-icons/vsc";

import { CardProfile } from "./CardProfile";
import { Layout } from "./Layout";
import Navbar from "./Navbar";

const ProfileDesktop = ({ section, element, cardProfileText }) => {
  const router = useRouter();

  const sm = [
    { text: "SM Pay", value: "1000.000" },
    { text: "SM Point", value: 5 },
  ];

  const menu = [
    { text: "Profil Saya", path: "/profile", icon: FaUser },
    {
      text: "Data Pengiriman",
      path: "/profile/alamat-pengiriman",
      icon: VscPackage,
    },
    {
      text: "Upgrade Akun",
      path: "/profile/upgrade-account",
      icon: IoMedalOutline,
    },
    { text: "Ubah Password", path: "/profile/ubah-password", icon: IoKey },
  ];

  return (
    <Layout
      hasNavbar
      hasPadding
      sticky
      background="gray.50"
      display={{ base: "none", md: "flex" }}
    >
      <Flex justify="center" pb="30px" bg="gray.50">
        <Flex>
          <CardProfile sm={sm} cardProfileText={cardProfileText} />
        </Flex>
        <Box
          border="1px solid #E2E8F0"
          borderRadius="20px"
          p="32px"
          // w="62vw"
          w="100%"
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
                {section === item.text && <Icon as={item.icon} mr="11px" />}
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
          >
            {section}
          </Heading>
          {element}
        </Box>
      </Flex>
    </Layout>
  );
};

export default ProfileDesktop;
