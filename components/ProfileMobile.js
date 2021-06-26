import {
  Box,
  Icon,
  Text,
  Avatar,
  VStack,
  StackDivider,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoHeart } from "react-icons/io5";
import { VscPackage } from "react-icons/vsc";

import { ButtonStatusUser } from "./ButtonProfile";
import { SMCard } from "./CardProfile";
import NavbarProfile from "./NavbarProfile";

const ProfileMobile = ({ sm }) => {
  const router = useRouter();

  const wisPack = [
    { text: "Wishlist", icon: IoHeart, href: "/#" },
    { text: "Pesanan Saya", icon: VscPackage, href: "/#" },
  ];

  const profileMenu = [
    { text: "Ubah Kata Sandi", path: "/profile/ubah-password" },
    { text: "Alamat Pengiriman", path: "/" },
    { text: "Edit Profile", path: "/" },
    { text: "Upgrade Akun", path: "/" },
    { text: "Pusat Bantuan", path: "/" },
    { text: "Keluar", path: "/" },
  ];

  return (
    <Box display={{ base: "block", md: "none" }} h="100vh" bg="gray.50">
      <NavbarProfile section="Akun Saya" />
      <Box mt="50px" px="16px" pt="18px">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Avatar
            size="lg"
            name="Udin"
            src="https://akcdn.detik.net.id/community/media/visual/2021/05/17/lionel-messi.jpeg?w=700&q=90"
          />
          <Box fontSize="14px">
            <Text fontWeight="700" lineHeight="18.2px" className="primaryFont">
              Messi GOAT
            </Text>
            <Text
              fontWeight="500"
              fontSize="14px"
              lineHeight="21px"
              className="secondaryFont"
            >
              messigoat@biyac.com
            </Text>
          </Box>
          <ButtonStatusUser text="Reguler" />
        </Box>
        <SMCard sm={sm} w="308px" />
        <Box display="flex" justifyContent="space-evenly" mt="20px">
          {wisPack.map((item) => (
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
          ))}
        </Box>
        <VStack
          mt="20px"
          divider={<StackDivider borderColor="gray.200" />}
          spacing={3}
          align="stretch"
        >
          <StackDivider borderColor="gray.200" />
          {profileMenu.map((menu) => (
            <Box key={menu.text}>
              <Text
                className="secondaryFont"
                fontSize="16px"
                fontWeight="500"
                lineHeight="24px"
                onClick={() => router.push(menu.path)}
              >
                {menu.text}
              </Text>
            </Box>
          ))}
          <StackDivider borderColor="gray.200" />
        </VStack>
      </Box>
    </Box>
  );
};

export default ProfileMobile;
