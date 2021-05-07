import { Image } from "@chakra-ui/image";
import {
  Box,
  Text,
  Icon,
  Input,
  VStack,
  Heading,
  Accordion,
  InputGroup,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  InputLeftElement,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import {
  IoMenu,
  IoCart,
  IoSearch,
  IoHomeSharp,
  IoHeartSharp,
  IoReceiptSharp,
  IoNotifications,
} from "react-icons/io5";

import styles from "../styles/Navbar.module.scss";

const styledIcon = {
  color: "gray.500",
  w: "23px",
  h: "23px",
  _hover: {
    cursor: "pointer",
  },
};

const fontSizeSidebar = {
  "@media only screen and (max-width:300px)": {
    fontSize: ".8em",
  },
  fontSize: ".9em",
};

const styledSidebarMenu = {
  position: "fixed",
  boxSizing: "border-box",
  h: "100vh",
  bg: "white",
  fontWeight: "500",
  lineHeight: "24px",
  color: "black",
  overflow: "hidden",
  transition: "width 0.4s",
};

const styledNavbar = {
  position: "fixed",
  bg: "white",
  minWidth: "100vw",
  boxSizing: "border-box",
  overflow: "hidden",
  alignItems: "center",
};

const BoxMenu = ({ children }) => (
  <Box
    h="40px"
    borderBottomWidth="1px"
    borderColor="gray.200"
    w="70vw"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
  >
    {children}
  </Box>
);

const NavbarBottom = () => {
  const styledBox = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const styledFont = {
    fontSize: "12px",
    color: "gray.500",
    lineHeight: "18px",
    fontWeight: "500",
  };

  const icons = [
    { text: "Home", iconElement: IoHomeSharp, id: "ic1" },
    { text: "Keranjang", iconElement: IoCart, id: "ic2" },
    { text: "Pesanan", iconElement: IoReceiptSharp, id: "ic3" },
    { text: "Akun", iconElement: FaUser, id: "ic4" },
  ];

  return (
    <Box
      sx={styledNavbar}
      h="60px"
      bottom="0"
      border="1.5px solid #E2E8F0"
      justifyContent="space-evenly"
      display={{ base: "flex", md: "none" }}
    >
      {icons.map((icon) => (
        <Box sx={styledBox} key={icon.id}>
          <Icon as={icon.iconElement} sx={styledIcon} />
          <Text sx={styledFont}>{icon.text}</Text>
        </Box>
      ))}
    </Box>
  );
};

const Navbar = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [isMainMenu, setIsMainMenu] = useState(false);
  const [isCategoryMenu, setIsCategoryMenu] = useState(false);

  const handleClickOverlay = () => {
    setIsMainMenu(false);
    setIsCategoryMenu(false);
  };

  const menuSidebar = {
    headerText: "Menu",
    menu: [
      { text: "Kategori - Brand", id: "kb", href: "#" },
      { text: "Mengenal SabilaMall", id: "ms", href: "#" },
      { text: "Gabung Reseller Baju Murah", id: "grbm", href: "#" },
      { text: "Kebijakan Privasi", id: "kp", href: "#" },
      { text: "Syarat & Ketentuan", id: "sk", href: "#" },
      { text: "Hubungi Kami", id: "hk", href: "#" },
      { text: "Download Aplikasi", id: "dagp", href: "#" },
    ],
  };

  const menuCategory = {
    headerText: "Kategori - Brand",
    menu: [
      {
        text: "Aksesoris Fashion",
        id: "kjqsb13",
        subMenu: [
          { text: "Kaus Muslim Keren Banget", href: "#", id: "dancxal12" },
          { text: "Kaus Kaki Muslimah", href: "#", id: "cnshqwm2" },
        ],
      },
      {
        text: "Buku & Alat Tulis",
        id: "mlk1871",
        subMenu: [
          { text: "Kaus Muslim Keren Banget", href: "#", id: "mdjayqbd" },
          { text: "Kaus Kaki Muslimah", href: "#", id: "kadindjqb1" },
        ],
      },
      {
        text: "Fashion Bayi & Anak",
        id: "mllkpo98",
        subMenu: [
          { text: "Kaus Muslim Keren Banget", href: "#", id: "ncnciwm2" },
          { text: "Kaus Kaki Muslimah", href: "#", id: "nclal2298" },
        ],
      },
      {
        text: "Fashion Muslim",
        id: "lkqn131",
        subMenu: [
          { text: "Kaus Muslim Keren Banget", href: "#", id: "clleu27y28u" },
          { text: "Kaus Kaki Muslimah", href: "#", id: "nclaei2ei" },
        ],
      },
      {
        text: "Kesehatan",
        id: "mkoqi187",
        subMenu: [
          { text: "Kaus Muslim Keren Banget", href: "#", id: "mce2e87d" },
          { text: "Kaus Kaki Muslimah", href: "#", id: "ncswiud28" },
        ],
      },
      {
        text: "Mainan",
        id: "mlkqoi12",
        subMenu: [
          { text: "Kaus Muslim Keren Banget", href: "#", id: "bncwiue28" },
          { text: "Kaus Kaki Muslimah", href: "#", id: "oi02832h" },
        ],
      },
      {
        text: "Makanan dan Minuman",
        id: "lklo910j",
        subMenu: [
          { text: "Kaus Muslim Keren Banget", href: "#", id: "bii2392" },
          { text: "Kaus Kaki Muslimah", href: "#", id: "i1u98hsq" },
        ],
      },
      {
        text: "Perawatan & Kecantikan",
        id: "mxlkw12q1",
        subMenu: [
          { text: "Kaus Muslim Keren Banget", href: "#", id: "nckwie28" },
          { text: "Kaus Kaki Muslimah", href: "#", id: "mlqo091" },
        ],
      },
      {
        text: "Perlengkapan Dapur",
        id: "lkpo28u",
        subMenu: [
          { text: "Kaus Muslim Keren Banget", href: "#", id: "nodqwi92" },
          { text: "Kaus Kaki Muslimah", href: "#", id: "oi2e89j" },
        ],
      },
      {
        text: "Perlengkapan Ibadah",
        id: " lkw52",
        subMenu: [
          { text: "Kaus Muslim Keren Banget", href: "#", id: "kiqii92" },
          { text: "Kaus Kaki Muslimah", href: "#", id: "oi2928j" },
        ],
      },
      {
        text: "Perlengkapan Rumah Tangga",
        id: "mxlla981",
        subMenu: [
          { text: "Kaus Muslim Keren Banget", href: "#", id: "oo029e" },
          { text: "Kaus Kaki Muslimah", href: "#", id: "lko0e29u" },
        ],
      },
      {
        text: "Sepatu & Tas",
        id: "mdaljq121",
        subMenu: [
          { text: "Kaus Muslim Keren Banget", href: "#", id: "po2e3209" },
          { text: "Kaus Kaki Muslimah", href: "#", id: "oi20e92" },
        ],
      },
      {
        text: "Serba-serbi",
        id: "pnsqj12",
        subMenu: [
          { text: "Ciput", href: "#", id: "cpad123" },
          { text: "Kaus Kaki Muslimah", href: "#", id: "kalsa123" },
        ],
      },
    ],
  };

  return (
    <>
      <Box
        sx={styledNavbar}
        justifyContent="space-between"
        top="0"
        position="fixed"
        boxShadow="0px 4px 10px 0px #00000040"
        h={{ base: "50px", md: "70px" }}
        display="flex"
        px={{ base: "2px", md: "40px", lg: "80px", xl: "120px" }}
        className={styles.navbarFont}
      >
        <Box display="flex" ml="20px" alignItems="center">
          <Icon
            as={IoMenu}
            sx={styledIcon}
            display={{ base: "block", md: "none" }}
            onClick={() => setIsMainMenu(true)}
          />
          <Image src="/images/Navbar/logo.svg" ml="20px" />
          <InputGroup
            ml="30px"
            w="60vw"
            mr="25px"
            display={{ base: "none", md: "block" }}
          >
            <InputLeftElement
              children={
                <Icon
                  as={IoSearch}
                  h="23px"
                  w="23px"
                  sx={{
                    _hover: {
                      cursor: "pointer",
                    },
                  }}
                  color="orange.400"
                  ml="17px"
                />
              }
            />
            <Input
              type="text"
              placeholder="Cari di toko..."
              borderRadius="15px"
              borderWidth="0"
              bg="gray.100"
              pl="55px"
            />
          </InputGroup>
        </Box>
        <Box display="flex" alignItems="center" mr="20px">
          <Icon
            as={IoHeartSharp}
            sx={styledIcon}
            mr={{ base: "12px", md: "20px", lg: "25px" }}
          />
          <Icon as={IoNotifications} sx={styledIcon} />
          <Icon
            as={FaUser}
            sx={styledIcon}
            ml={{ base: "12px", md: "20px", lg: "25px" }}
            display={{ base: "none", md: "block" }}
          />
        </Box>
        <Box
          zIndex={isSearched ? "100" : "-100"}
          position="absolute"
          h="100%"
          right="0"
          w={isSearched ? "100vw" : "128px"}
          bg={isSearched ? "white" : "transparent"}
          display={{ base: "flex", md: "none" }}
          alignItems="center"
          px="20px"
          transition="width 0.8s, background-color 0.8s"
        >
          <Icon
            as={BsChevronLeft}
            onClick={() => setIsSearched(false)}
            mr="12px"
            w="20px"
            h="20px"
            _hover={{ cursor: "pointer" }}
            display={isSearched ? "block" : "none"}
          />
          <InputGroup
            borderColor="white"
            isDisabled={isSearched ? "false" : "true"}
          >
            <InputLeftElement
              children={
                <Icon
                  as={IoSearch}
                  sx={styledIcon}
                  onClick={() => setIsSearched(true)}
                  mr="20px"
                />
              }
              ml={isSearched ? "15px" : "0"}
              transition="all 0.8s"
            />
            <Input
              type="text"
              placeholder="Cari di toko..."
              bg={isSearched ? "gray.100" : "transparent"}
              borderRadius="12px"
              borderWidth="0"
              pl={isSearched ? "45px" : "0"}
              w={isSearched ? "100%" : "0"}
              visibility={isSearched ? "visible" : "hidden"}
              transition="width 0.8s, padding-left 0.8s,  background-color 0s, visibility 0s"
            />
          </InputGroup>
        </Box>
      </Box>
      <Box
        position="fixed"
        zIndex="101"
        bg="gray.500"
        opacity={isMainMenu ? "50%" : "0%"}
        w={isMainMenu ? "100vw" : "0"}
        h="100vh"
        transition="opacity 0.6s"
        onClick={handleClickOverlay}
      ></Box>
      <Box w={isMainMenu ? "85vw" : "0"} zIndex="102" sx={styledSidebarMenu}>
        <Box
          w="100%"
          h="50px"
          boxShadow="0px 4px 10px 0px #00000040"
          boxSizing="border-box"
          bg="white"
          display="flex"
          alignItems="center"
        >
          <Icon
            as={BsChevronLeft}
            onClick={
              isCategoryMenu
                ? () => setIsCategoryMenu(false)
                : () => setIsMainMenu(false)
            }
            ml="20px"
            mr="10px"
            w="20px"
            h="20px"
          />
          <Heading
            sx={fontSizeSidebar}
            visibility={isCategoryMenu ? "hidden" : "visible"}
          >
            {menuSidebar.headerText}
          </Heading>
        </Box>
        <VStack spacing={1} px="10px" pt="5px">
          {menuSidebar.menu.map((item) => {
            if (item.id === "kb") {
              return (
                <Box
                  h="40px"
                  borderBottomWidth="1px"
                  borderColor="gray.200"
                  w="70vw"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  key={item.id}
                  onClick={() => setIsCategoryMenu(true)}
                >
                  <Heading sx={fontSizeSidebar} lineHeight="50px">
                    {item.text}
                  </Heading>
                  <Icon as={BsChevronRight} w="20px" h="20px" />
                </Box>
              );
            } else if (item.id === "dagp") {
              return (
                <Box
                  borderBottomWidth="1px"
                  borderColor="gray.200"
                  w="70vw"
                  key={item.id}
                >
                  <Link href={item.href}>
                    <Heading sx={fontSizeSidebar} lineHeight="40px">
                      {item.text}
                    </Heading>
                  </Link>
                  <Image
                    src="/images/Navbar/google-play.svg"
                    alt="Google Play"
                    mt="-13px"
                    mb="14px"
                  />
                </Box>
              );
            }
            return (
              <BoxMenu key={item.id}>
                <Link href={item.href}>
                  <Heading sx={fontSizeSidebar} lineHeight="50px">
                    {item.text}
                  </Heading>
                </Link>
              </BoxMenu>
            );
          })}
        </VStack>
      </Box>
      <Box
        w={isCategoryMenu ? "85vw" : "0"}
        zIndex="103"
        sx={styledSidebarMenu}
        overflow="hidden"
        transition="width .3s"
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
          <Icon
            as={BsChevronLeft}
            onClick={
              isCategoryMenu
                ? () => setIsCategoryMenu(false)
                : () => setIsMainMenu(false)
            }
            ml="20px"
            mr="10px"
            w="20px"
            h="20px"
          />
          <Heading
            sx={fontSizeSidebar}
            visibility={isCategoryMenu ? "visible" : "hidden"}
          >
            {menuCategory.headerText}
          </Heading>
        </Box>
        <VStack spacing={1} px="10px" pt="5px">
          <Accordion defaultIndex={[0]} borderWidth="0" allowMultiple>
            {menuCategory.menu.map((item) => {
              return (
                <AccordionItem key={item.id}>
                  <AccordionButton borderWidth="0" borderColor="transparent">
                    <Box
                      h="40px"
                      w="70vw"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Heading sx={fontSizeSidebar} lineHeight="30px">
                        {item.text}
                      </Heading>
                      <AccordionIcon />
                    </Box>
                  </AccordionButton>
                  <AccordionPanel pb={1} pl="30px">
                    {item.subMenu.map((sub) => (
                      <Heading
                        sx={fontSizeSidebar}
                        lineHeight="40px"
                        key={sub.id}
                      >
                        {sub.text}
                      </Heading>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </VStack>
      </Box>
      <NavbarBottom />
    </>
  );
};

export default Navbar;
