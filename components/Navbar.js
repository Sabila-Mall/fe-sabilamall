import { Image } from "@chakra-ui/image";
import {
  Box,
  Input,
  VStack,
  Heading,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [isMenu, setIsMenu] = useState(true);

  const menuSidebar = [
    { text: "Kategori - Brand", id: "kb", href: "#" },
    { text: "Mengenal SabilaMall", id: "ms", href: "#" },
    { text: "Gabung Reseller Baju Murah", id: "grbm", href: "#" },
    { text: "Kebijakan Privasi", id: "kp", href: "#" },
    { text: "Syarat & Ketentuan", id: "sk", href: "#" },
    { text: "Hubungi Kami", id: "hk", href: "#" },
    { text: "Download Aplikasi", id: "dagp", href: "#" },
  ];

  return (
    <>
      <Box
        position="fixed"
        bg="white"
        minWidth="100vw"
        h="50px"
        boxShadow="0px 4px 10px 0px #00000040"
        boxSizing="border-box"
        overflow="hidden"
        display="flex"
        justifyContent="space-between"
      >
        <Box display="flex" ml="20px">
          <Image
            src="/images/Navbar/hamburger.svg"
            onClick={() => setIsMenu(true)}
          />
          <Image src="/images/Navbar/logo.svg" ml="20px" />
        </Box>
        <Box display="flex" mr="20px">
          <Image src="/images/Navbar/notif.svg" />
        </Box>
        <Box
          zIndex={isSearched ? "100" : "-100"}
          position="absolute"
          h="100%"
          right="0"
          w={isSearched ? "100vw" : "100px"}
          bg={isSearched ? "white" : "transparent"}
          display="flex"
          alignItems="center"
          px="20px"
          transition="width 0.8s, background-color 0.8s"
        >
          <Image
            src="/images/Navbar/back.svg"
            mr="12px"
            _hover={{ cursor: "pointer" }}
            onClick={() => setIsSearched(false)}
            display={isSearched ? "block" : "none"}
          />
          <InputGroup
            borderColor="white"
            isDisabled={isSearched ? "false" : "true"}
          >
            <InputLeftElement
              children={
                <Image
                  src="/images/Navbar/search.svg"
                  mr="20px"
                  _hover={{ cursor: "pointer" }}
                  onClick={() => setIsSearched(true)}
                />
              }
              ml={isSearched ? "15px" : "0"}
              transition="margin-left 0.8s"
            />
            <Input
              type="text"
              placeholder="Cari di toko..."
              bg={isSearched ? "gray.100" : "transparent"}
              borderRadius="12px"
              borderWidth="0"
              pl={isSearched ? "45px" : "0"}
              w={isSearched ? "100%" : "0"}
              transition="width 0.8s, padding-left 0.8s, background-color 0.8s"
            />
          </InputGroup>
        </Box>
      </Box>
      <Box
        position="fixed"
        zIndex="101"
        bg="gray.500"
        opacity={isMenu ? "50%" : "0%"}
        w={isMenu ? "100vw" : "0"}
        h="100vh"
        transition="opacity 0.6s"
        onClick={() => setIsMenu(false)}
      ></Box>
      <Box
        position="fixed"
        boxSizing="border-box"
        h="100vh"
        w={isMenu ? "85vw" : "0"}
        bg="white"
        zIndex="102"
        fontFamily="Inter"
        fontWeight="500"
        lineHeight="24px"
        color="black"
        overflow="hidden"
        transition="width 0.4s"
      >
        <Box
          w="100%"
          h="50px"
          boxShadow="0px 4px 10px 0px #00000040"
          boxSizing="border-box"
          bg="white"
          display="flex"
          alignItems="center"
        >
          <Image
            src="/images/Navbar/back.svg"
            ml="20px"
            mr="10px"
            onClick={() => setIsMenu(false)}
          />
          <Heading size="sm">Menu</Heading>
        </Box>
        <VStack spacing={1} px="10px" pt="10px">
          {menuSidebar.map((menu, index) => {
            if (index === 0) {
              return (
                <Box
                  h="50px"
                  borderBottomWidth="1px"
                  borderColor="gray.200"
                  w="70vw"
                  key={menu.id}
                >
                  <Link href={menu.href}>
                    <Heading
                      size="sm"
                      lineHeight="50px"
                      display="flex"
                      justifyContent="space-between"
                    >
                      {menu.text} <Image src="/images/Navbar/forward.svg" />
                    </Heading>
                  </Link>
                </Box>
              );
            } else if (index === menuSidebar.length - 1) {
              return (
                <Box
                  borderBottomWidth="1px"
                  borderColor="gray.200"
                  w="70vw"
                  key={menu.id}
                >
                  <Link href={menu.href}>
                    <Heading size="sm" lineHeight="50px">
                      {menu.text}
                    </Heading>
                  </Link>
                  <Image
                    src="/images/Navbar/google-play.svg"
                    alt="Google Play"
                    mt="-15px"
                    mb="14px"
                  />
                </Box>
              );
            }
            return (
              <Box
                h="50px"
                borderBottomWidth="1px"
                borderColor="gray.200"
                w="70vw"
                key={menu.id}
              >
                <Link href={menu.href}>
                  <Heading size="sm" lineHeight="50px">
                    {menu.text}
                  </Heading>
                </Link>
              </Box>
            );
          })}
        </VStack>
      </Box>
    </>
  );
};

export default Navbar;
