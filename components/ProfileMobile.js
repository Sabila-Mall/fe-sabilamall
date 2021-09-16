import {
  Box,
  Icon,
  Text,
  Avatar,
  VStack,
  StackDivider,
  Flex,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoHeart } from "react-icons/io5";
import { VscPackage } from "react-icons/vsc";

import { useSmPayPointContext } from "../contexts/SMPayPointProvider";
import { useAuthContext } from "../contexts/authProvider";
import { logout } from "../utils/functions";
import { ButtonStatusUser } from "./ButtonProfile";
import { SMCard } from "./CardProfile";
import ModalProfile from "./ModalProfile";
import NavbarProfile from "./NavbarProfile";

const ProfileMobile = () => {
  const router = useRouter();

  const { userData } = useAuthContext();
  const { smLoading, smPay, smPoint } = useSmPayPointContext();

  const sm = [
    { text: "SM Pay", value: smPay },
    { text: "SM Point", value: smPoint },
  ];

  const wisPack = [
    { text: "Wishlist", icon: IoHeart, href: "/wishlist" },
    { text: "Pesanan Saya", icon: VscPackage, href: "/profile/pesanan-saya" },
  ];

  const profileMenu = [
    { text: "Ubah Password", path: "/profile/ubah-password" },
    { text: "Alamat Pengiriman", path: "/profile/alamat-pengiriman" },
    { text: "Edit Profile", path: "/profile/edit-profile" },
    { text: "Top Up SM Pay", path: "/top-up" },
    { text: "Riwayat Top Up", path: "/riwayat" },
    {
      text: "Upgrade Akun",
      path: ["/profile/invoice-upgrade-akun", "/profile/profile-saya"],
    },
    { text: "Pusat Bantuan", path: "/" },
    { text: "Keluar", path: "/login" },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    onClose();
    logout();
  };

  return (
    <>
      {smLoading ? (
        <Spinner />
      ) : (
        <Box bg="gray.50" display={{ base: "block", md: "none" }}>
          <Box>
            <ModalProfile
              isOpen={isOpen}
              onClose={onClose}
              textBody="Keluar dari akun?"
              secondaryText="Keluar"
              secondaryAction={logoutHandler}
            />
            <NavbarProfile section="Akun Saya" />
            <Box mt="3.2rem" px="1rem" pt="1.12rem">
              <Flex alignItems="center" justifyContent="space-between">
                <Flex
                  alignItems="center"
                  w="100%"
                  overflow="hidden"
                  position="relative"
                >
                  <Avatar
                    size="lg"
                    background="blue.800"
                    color="white"
                    name={`${userData?.first_name}${userData?.last_name && " "}
                    ${userData?.last_name}`}
                    src={userData?.avatar}
                  />
                  <Box
                    fontSize="14px"
                    ml="12px"
                    w="calc(100% - 80px)"
                    maxHeight="60px"
                  >
                    <Text
                      fontWeight="700"
                      lineHeight="18.2px"
                      className="primaryFont"
                      overflow="hidden"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                    >
                      {userData?.first_name}
                      {userData?.last_name && " "}
                      {userData?.last_name}
                    </Text>
                    <Text
                      fontWeight="500"
                      fontSize="15px"
                      lineHeight="21px"
                      className="secondaryFont"
                      overflow="hidden"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                    >
                      {userData?.email}
                    </Text>
                  </Box>
                </Flex>
                <Box d="flex" flexDirection="column" alignItems="center">
                  <Text fontSize="14px" mb="4px">
                    {userData?.memberid}
                  </Text>
                  <ButtonStatusUser
                    text={`${userData?.user_level
                      .charAt(0)
                      .toUpperCase()}${userData?.user_level.slice(1)}`}
                  />
                </Box>
              </Flex>
              <SMCard sm={sm} w="308px" />

              <Box display="flex" justifyContent="space-evenly" mt="20px">
                {wisPack.map((item) => (
                  <Link href={item.href}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      key={item.text}
                    >
                      <Icon as={item.icon} color="orange.400" fontSize="30px" />
                      <Text
                        className="secondaryFont"
                        fontSize="12px"
                        fontWeight="500"
                        lineHeight="18px"
                      >
                        {item.text}
                      </Text>
                    </Box>
                  </Link>
                ))}
              </Box>
              <VStack
                mt="20px"
                divider={<StackDivider borderColor="gray.200" />}
                spacing={3}
                align="stretch"
              >
                <StackDivider borderColor="gray.200" />
                {profileMenu.map((menu) =>
                  menu.text === "Upgrade Akun" ? (
                    <VStack
                      divider={<StackDivider borderColor="gray.200" />}
                      align="stretch"
                      key="Upgrade Akun"
                    >
                      <Box key={menu.text}>
                        <Text
                          className="secondaryFont"
                          fontSize="16px"
                          fontWeight="500"
                          lineHeight="24px"
                        >
                          {menu.text}
                        </Text>
                      </Box>
                      <Box key={menu.text}>
                        <Text
                          onClick={
                            menu.text === "Keluar"
                              ? onOpen
                              : () => router.push(menu.path[0])
                          }
                          className="secondaryFont"
                          fontSize="16px"
                          fontWeight="500"
                          lineHeight="24px"
                          ml="1rem"
                        >
                          Invoice Upgrade Akun
                        </Text>
                      </Box>
                      <Box key={menu.text}>
                        <Text
                          onClick={
                            menu.text === "Keluar"
                              ? onOpen
                              : () => router.push(menu.path[1])
                          }
                          className="secondaryFont"
                          fontSize="16px"
                          fontWeight="500"
                          lineHeight="24px"
                          ml="1rem"
                        >
                          Request Upgrade Akun
                        </Text>
                      </Box>
                    </VStack>
                  ) : (
                    <Box key={menu.text}>
                      <Text
                        onClick={
                          menu.text === "Keluar"
                            ? onOpen
                            : () => router.push(menu.path)
                        }
                        className="secondaryFont"
                        fontSize="16px"
                        fontWeight="500"
                        lineHeight="24px"
                      >
                        {menu.text}
                      </Text>
                    </Box>
                  ),
                )}
                <Text
                  textAlign="center"
                  fontSize="12px"
                  fontFamily="Inter"
                  fontWeight="500"
                  color="gray.400"
                  mt="1.2rem"
                >
                  Sabila Mall v1.00.00
                </Text>
              </VStack>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProfileMobile;
