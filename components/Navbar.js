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
  Flex,
  InputLeftElement,
  Avatar,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import {
  IoMenu,
  IoSearch,
  IoHeartSharp,
  IoNotifications,
} from "react-icons/io5";

import { menuCategory, menuSidebar, icons } from "../constants/navbarConstant";
import styles from "../styles/Navbar.module.scss";

const NavbarBottom = () => (
  <Box
    as="nav"
    className={styles.navbarBottom}
    zIndex="10"
    display={{ base: "flex", md: "none" }}
  >
    {icons.map((icon) => (
      <Box className={styles.boxIcon} key={icon.id}>
        <Icon as={icon.iconElement} className={styles.navbarIcon} />
        <Text className={styles.boxIconText}>{icon.text}</Text>
      </Box>
    ))}
  </Box>
);

const UserInfo = ({ useBorder }) => (
  <Flex
    borderBottom={useBorder && "1px solid #e2e8f0"}
    align="center"
    pb="1rem"
    justify="flex-start"
    w="70vw"
    mt=".8rem"
  >
    <Image w="3.4rem" h="3.4rem" src="/images/navbar/eclipse.svg" />
    <Box ml=".5rem" fontSize="14px">
      <Text fontWeight="700">Nama Siapa Hayoo</Text>
      <Flex>
        <Text>D0101</Text>
        <Flex
          h="22px"
          px=".5rem"
          py=".5rem"
          bg="gray.400"
          align="center"
          justify="center"
          borderRadius="30px"
          color="white"
          fontSize="12px"
          ml="2rem"
        >
          Reguler
        </Flex>
      </Flex>
    </Box>
  </Flex>
);

const Navbar = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [isMainMenu, setIsMainMenu] = useState(false);
  const [isCategoryMenu, setIsCategoryMenu] = useState(false);

  const handleClickOverlay = () => {
    setIsMainMenu(false);
    setIsCategoryMenu(false);
  };

  return (
    <>
      <Box
        className={styles.navbarTop}
        px={{ md: "40px", lg: "80px", xl: "120px" }}
        h={{ base: "50px", md: "70px" }}
        zIndex={isSearched ? "5" : "10"}
      >
        <Box
          display="flex"
          alignItems="center"
          ml={{ base: "15px", md: "20px" }}
        >
          <Icon
            as={IoMenu}
            className={styles.navbarIcon}
            display={{ base: "block", md: "none" }}
            onClick={() => {
              setIsMainMenu(!isMainMenu);
              setIsCategoryMenu(false);
            }}
          />
          <Image
            src="/images/Navbar/logo.svg"
            ml={{ base: "15px", md: "20px" }}
          />
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
              focusBorderColor="gray.100"
            />
          </InputGroup>
        </Box>
        <Box display="flex" alignItems="center" mr="20px">
          <Icon
            as={IoHeartSharp}
            className={styles.navbarIcon}
            mr={{ base: "8px", md: "20px", lg: "25px" }}
          />
          <Icon as={IoNotifications} className={styles.navbarIcon} />
          <Icon
            as={FaUser}
            className={styles.navbarIcon}
            ml={{ base: "8px", md: "20px", lg: "25px" }}
            display={{ base: "none", md: "block" }}
          />
        </Box>
        <Box
          className={styles.boxSearch}
          display={{ base: "flex", md: "none" }}
          zIndex={isSearched ? "6" : "-6"}
          w={isSearched ? "100vw" : "128px"}
          bg={isSearched ? "white" : "transparent"}
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
          <InputGroup borderColor="white">
            <InputLeftElement
              children={
                <Icon
                  as={IoSearch}
                  className={styles.navbarIcon}
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
              pl={isSearched ? "45px" : "0"}
              w={isSearched ? "100%" : "0"}
              visibility={isSearched ? "visible" : "hidden"}
              borderRadius="12px"
              borderWidth="0"
              transition="width 0.8s, padding-left 0.8s,  background-color 0s, visibility 0s"
            />
          </InputGroup>
        </Box>
      </Box>
      <Box
        position="fixed"
        zIndex="2"
        bg="gray.500"
        opacity="50%"
        w={isMainMenu || isSearched ? "100vw" : "0"}
        h="100vh"
        onClick={handleClickOverlay}
      ></Box>
      <Box
        w={isMainMenu ? "85vw" : "0"}
        zIndex="3"
        className={styles.sidebarMenu}
      >
        <Box className={styles.headerSidebar}>
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
            className={styles.fontSizeSidebar}
            visibility={isCategoryMenu ? "hidden" : "visible"}
          >
            {menuSidebar.headerText}
          </Heading>
        </Box>
        <VStack spacing={1} px="10px" pt="5px">
          <UserInfo />
          {menuSidebar.menu.map((item) => {
            if (item.id === "kb") {
              return (
                <Box
                  className={styles.boxMenu}
                  key={item.id}
                  onClick={() => setIsCategoryMenu(true)}
                >
                  <Heading className={styles.fontSizeSidebar} lineHeight="50px">
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
                    <Heading
                      className={styles.fontSizeSidebar}
                      lineHeight="40px"
                    >
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
              <Box className={styles.boxMenu} key={item.id}>
                <Link href={item.href}>
                  <Heading className={styles.fontSizeSidebar} lineHeight="50px">
                    {item.text}
                  </Heading>
                </Link>
              </Box>
            );
          })}
        </VStack>
      </Box>
      <Box
        w={isCategoryMenu ? "85vw" : "0"}
        className={styles.sidebarMenu}
        zIndex="4"
        overflow="hidden"
        transition="width .3s"
      >
        <Box className={styles.headerSidebar}>
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
            className={styles.fontSizeSidebar}
            visibility={isCategoryMenu ? "visible" : "hidden"}
          >
            {menuCategory.headerText}
          </Heading>
        </Box>
        <VStack spacing={1} px="10px" pt="5px">
          <UserInfo useBorder={false} />
          <Accordion defaultIndex={[0]} borderWidth="0" allowMultiple>
            {menuCategory.menu.map((item) => {
              return (
                <AccordionItem key={item.id}>
                  <AccordionButton
                    borderWidth="0"
                    borderColor="transparent"
                    _focus={{ outline: "none" }}
                  >
                    <Box className={styles.boxCategoryMenu}>
                      <Heading
                        className={styles.fontSizeSidebar}
                        lineHeight="30px"
                      >
                        {item.text}
                      </Heading>
                      <AccordionIcon />
                    </Box>
                  </AccordionButton>
                  <AccordionPanel pb={1} pl="30px">
                    {item.subMenu.map((sub) => (
                      <Heading
                        className={styles.fontSizeSidebar}
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
