import {
  Box,
  Flex,
  Avatar,
  Text,
  VStack,
  StackDivider,
  Link,
  Icon,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { VscPackage } from "react-icons/vsc";

import { ButtonStatusUser } from "./ButtonProfile";

export const SMCard = ({ sm, w }) => (
  <Box
    mt="20px"
    mx="auto"
    w={w}
    h="50px"
    bg="gray.50"
    borderRadius="10px"
    p="10px"
    boxSizing="border-box"
    boxShadow=" 0px 0px 5px 0px #00000040"
    display="flex"
    justifyContent="start"
    alignItems="center"
  >
    {sm.map((item, index) => (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        alignItems="start"
        key={item.text}
        ml={index ? "50px" : "10px"}
      >
        <Text
          className="primaryFont"
          fontWeight="700"
          fontSize="12px"
          color="red.600"
        >
          {item.text}
        </Text>
        <Text
          className="secondaryFont"
          fontWeight="500"
          fontSize="12px"
          lineHeight="18px"
        >
          {index ? item.value : `RP. ${item.value}`}
        </Text>
      </Box>
    ))}
  </Box>
);

export const CardProfile = ({ sm }) => {
  const profileMenu = [
    { text: "Akun Saya", icon: FaUser, path: "#" },
    { text: "Wishlist", icon: IoHeart, path: "#" },
    { text: "Pesanan Saya", icon: VscPackage, path: "#" },
  ];

  return (
    <Box
      w="270px"
      boxShadow=" 0px 0px 10px 0px #00000040"
      pt="20px"
      pb="36px"
      borderRadius="20px"
    >
      <Flex align="center" direction="column">
        <Avatar
          size="xl"
          name="Udin"
          src="https://akcdn.detik.net.id/community/media/visual/2021/05/17/lionel-messi.jpeg?w=700&q=90"
        />
        <Text
          fontWeight="700"
          lineHeight="18.2px"
          className="primaryFont"
          my="8px"
        >
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
        <ButtonStatusUser text="Reguler" mt="8px" />
      </Flex>
      <Box px="10px" mt="50px">
        <SMCard sm={sm} />
      </Box>
      <VStack
        mt="40px"
        divider={<StackDivider borderColor="gray.200" />}
        spacing={3}
        align="stretch"
      >
        <StackDivider borderColor="gray.200" />
        {profileMenu.map((menu) => (
          <Flex key={menu.text} fontSize="16px" align="center" pl="16px">
            <Icon as={menu.icon} color="black" fontSize="20px" mr="10px" />
            <Link href={`/profile${menu.path}`}>
              <Text
                className="secondaryFont"
                fontWeight="500"
                lineHeight="24px"
              >
                {menu.text}
              </Text>
            </Link>
          </Flex>
        ))}
        <StackDivider borderColor="gray.200" />
      </VStack>
    </Box>
  );
};
