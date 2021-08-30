import { Box, Flex, Text, Icon, Heading, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import { IoKey, IoMedalOutline } from "react-icons/io5";
import { VscPackage } from "react-icons/vsc";

import { useSmPayPointContext } from "../contexts/SMPayPointProvider";
import { useAuthContext } from "../contexts/authProvider";
import { CardProfile } from "./CardProfile";
import Navbar from "./Navbar";

const ProfileDesktop = ({ section, element, cardProfileText }) => {
  const router = useRouter();

  const { userData } = useAuthContext();
  const { smLoading, smPoint, smPay } = useSmPayPointContext();

  const sm = [
    { text: "SM Pay", value: smPay },
    { text: "SM Point", value: smPoint },
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
      path: "/profile/profile-saya",
      icon: IoMedalOutline,
    },
    { text: "Ubah Password", path: "/profile/ubah-password", icon: IoKey },
  ];

  return (
    <>
      {smLoading ? (
        <Spinner />
      ) : (
        <Box bg="gray.50" h="100%" display={{ base: "none", md: "block" }}>
          <Flex
            justify="center"
            pt="120px"
            pb="30px"
            bg="gray.50"
            // px={{ base: "50px", md: "10px", lg: "80px", xl: "120px" }}
            px={{ base: "1rem", md: "1.5rem", lg: "3rem", xl: "50px" }}
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
              <CardProfile
                sm={sm}
                cardProfileText={cardProfileText}
                userData={userData}
              />
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
        </Box>
      )}
    </>
  );
};

export default ProfileDesktop;
