import {
  Box,
  Flex,
  Avatar,
  Text,
  VStack,
  StackDivider,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { FaUser } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import { VscPackage } from "react-icons/vsc";

import { useSmPayPointContext } from "../contexts/SMPayPointProvider";
import { useAuthContext } from "../contexts/authProvider";
import { currencyFormat } from "../utils/functions";
import { ButtonStatusUser } from "./ButtonProfile";

export const SMCard = ({ w }) => {
  const { smPay, smPoint } = useSmPayPointContext();
  const sm = [
    { text: "SM Pay", value: smPay },
    { text: "SM Point", value: smPoint },
  ];
  return (
    <Flex mt="20px" mx="auto" w={w} justifyContent="center" alignItems="center">
      {sm.map((item, index) => (
        <Box
          key={item.text}
          display="flex"
          flexDirection="column"
          ml={index ? "12px" : "0px"}
          borderRadius="8px"
          boxShadow="0px 1px 3px 0px #2D37481A,0px 1px 2px 0px #2D37480F"
        >
          <Box bg="gray.100" w="113px" p="7px" borderRadius="8px 8px 0px 0px">
            <Text
              className="primaryFont"
              fontWeight="700"
              fontSize="14px"
              color="orange.500"
              textAlign="center"
            >
              {item.text}
            </Text>
          </Box>
          <Box w="100%" p="7px" bg="gray.50" borderRadius="0px 0px 8px 8px">
            <Text
              className="secondaryFont"
              fontWeight="500"
              fontSize="12px"
              lineHeight="18px"
              textAlign="center"
              color="gray.900"
            >
              {index ? item.value : `${item.value}`}
            </Text>
          </Box>
        </Box>
      ))}
    </Flex>
  );
};

export const CardProfile = ({ sm, cardProfileText }) => {
  const router = useRouter();
  const { userData } = useAuthContext();
  const profileMenu = [
    { text: "Akun Saya", icon: FaUser, path: "/profile" },
    { text: "Wishlist", icon: IoHeart, path: "/wishlist" },
    { text: "Pesanan Saya", icon: VscPackage, path: "/profile/pesanan-saya" },
    { text: "SM Pay", icon: IoWalletOutline, path: "/top-up" },
  ];

  return (
    <Box
      position="sticky"
      top="90px"
      w={{ md: "260px", lg: "270px" }}
      boxShadow=" 0px 2px 4px -1px rgba(45, 55, 72, 0.06), 0px 4px 6px -1px rgba(45, 55, 72, 0.1)"
      pt="20px"
      pb="36px"
      borderRadius="20px"
      bg="white"
      alignSelf="flex-start"
    >
      <Flex align="center" direction="column">
        <Avatar
          color="white"
          size="xl"
          background="blue.800"
          name={`${userData?.first_name}${userData?.last_name && " "}
          ${userData?.last_name}`}
          src={userData?.avatar}
        />
        <Text
          fontWeight="700"
          lineHeight="18.2px"
          className="primaryFont"
          my="8px"
          textAlign="center"
          px="8px"
        >
          {userData?.first_name}
          {userData?.last_name && " "}
          {userData?.last_name}
        </Text>
        <Text
          fontWeight="500"
          fontSize="14px"
          lineHeight="21px"
          className="secondaryFont"
        >
          {userData?.email}
        </Text>
        <Box display="flex" alignItems="center" mt="8px">
          <Text fontSize="0.9rem" mr="1rem">
            {userData?.memberid}
          </Text>
          <ButtonStatusUser
            text={`${userData?.user_level
              .charAt(0)
              .toUpperCase()}${userData?.user_level.slice(1)}`}
          />
        </Box>
      </Flex>
      <Box px="10px" mt="50px">
        <SMCard />
      </Box>
      <VStack
        mt="40px"
        divider={<StackDivider borderColor="gray.200" />}
        spacing={3}
        align="stretch"
      >
        <StackDivider borderColor="gray.200" />
        {profileMenu.map((menu) => (
          <Flex
            key={menu.text}
            fontSize="16px"
            align="center"
            pl="16px"
            cursor="pointer"
          >
            <Icon
              as={menu.icon}
              color={cardProfileText === menu.text ? "orange.500" : "black"}
              fontSize="20px"
              mr="10px"
            />
            <Text
              onClick={() => router.push(menu.path)}
              className="secondaryFont"
              color={cardProfileText === menu.text ? "orange.500" : "black"}
              fontWeight="500"
              lineHeight="24px"
            >
              {menu.text}
            </Text>
          </Flex>
        ))}
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
  );
};
