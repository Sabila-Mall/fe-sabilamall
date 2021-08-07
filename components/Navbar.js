import { Image } from "@chakra-ui/image";
import {
  Box,
  Text,
  Icon,
  Input,
  InputGroup,
  Flex,
  InputLeftElement,
  Link,
  useDisclosure,
  Grid,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import {
  IoMenu,
  IoSearch,
  IoHeartSharp,
  IoNotifications,
  IoCart,
} from "react-icons/io5";

import { productList } from "../constants/dummyData";
import { icons } from "../constants/navbarConstant";
import styles from "../styles/Navbar.module.scss";
import QuickAdd from "./QuickAdd";
import Sidebar from "./Sidebar";

const NavbarBottom = ({ onDrawerOpen }) => {
  return (
    <Box
      as="nav"
      className={styles.navbarBottom}
      zIndex="10"
      display={{ base: "flex", md: "none" }}
    >
      {icons.map((icon) => (
        <Box
          className={styles.boxIcon}
          key={icon.id}
          onClick={icon.text === "Keranjang" ? onDrawerOpen : () => {}}
        >
          <Icon as={icon.iconElement} className={styles.navbarIcon} />
          <Text className={styles.boxIconText}>{icon.text}</Text>
        </Box>
      ))}
    </Box>
  );
};

const Overlay = ({ isSearched, isMainMenu, handleClickOverlay }) => (
  <Box
    position="fixed"
    zIndex="2"
    bg="gray.500"
    top="0"
    opacity="50%"
    w={isMainMenu || isSearched ? "100vw" : "0"}
    h="100vh"
    onClick={handleClickOverlay}
  />
);

const SearchedElement = ({ isSearched, setIsSearched }) => (
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
        children={<Icon as={IoSearch} className={styles.navbarIcon} />}
        transition="all 0.8s"
        display={isSearched ? "flex" : "none"}
        alignItems="center"
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
);

const IconRightElements = ({ isLoggedIn, onDrawerOpen, setIsSearched }) => (
  <Grid
    templateColumns={{
      base: "repeat(3, 1fr)",
      md: isLoggedIn ? "repeat(5,1fr)" : "repeat(4,1fr)",
    }}
    w="auto"
    columnGap={{ base: 6, md: isLoggedIn ? 0 : 8 }}
    alignItems="center"
  >
    <Icon
      as={IoSearch}
      className={styles.navbarIcon}
      onClick={() => setIsSearched(true)}
      display={{ base: "block", md: "none" }}
    />
    <Link href="/" w="fit-content">
      <Icon as={IoNotifications} className={styles.navbarIcon} />
    </Link>
    <Link href="/" w="fit-content" display={{ base: "none", md: "block" }}>
      <Icon as={IoCart} className={styles.navbarIcon} />
    </Link>
    <Link href="/" w="fit-content" onClick={onDrawerOpen}>
      <Icon as={IoHeartSharp} className={styles.navbarIcon} />
    </Link>
    <Link w="fit-content" display={{ base: "none", md: "block" }} href="/">
      <Icon as={FaUser} className={styles.navbarIcon} />
    </Link>
    {isLoggedIn && (
      <Box
        w="fit-content"
        display={{ base: "none", md: "block" }}
        fontSize="12px"
      >
        <Text fontWeight="bold">Kim Jong Un</Text>
        <Flex w="full" justify="space-between">
          <Text mr=".7rem">CSUI2021</Text>
          <Box
            bg="gray.400"
            color="white"
            px=".4rem"
            py=".1rem"
            borderRadius="30px"
          >
            Reguler
          </Box>
        </Flex>
      </Box>
    )}
  </Grid>
);

const Navbar = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [isMainMenu, setIsMainMenu] = useState(false);
  const [isCategoryMenu, setIsCategoryMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const drawerDisclosure = useDisclosure();
  const isDrawerOpen = drawerDisclosure.isOpen;
  const onDrawerOpen = drawerDisclosure.onOpen;
  const onDrawerClose = drawerDisclosure.onClose;

  const navbarEl = useRef(null);

  const handleClickOverlay = () => {
    setIsMainMenu(false);
    setIsCategoryMenu(false);
  };

  useEffect(() => {
    if (navbarEl.current)
      navbarEl.current.style.width = document.body.clientWidth + "px";
    const setNavbarWidth = () => {
      if (navbarEl.current)
        navbarEl.current.style.width = document.body.clientWidth + "px";
    };
    window.addEventListener("resize", setNavbarWidth);
    return () => {
      window.removeEventListener("resize", setNavbarWidth);
    };
  }, []);

  return (
    <>
      <Box
        ref={navbarEl}
        className={styles.navbarTop}
        px={{ base: "1rem", md: "1.5rem", lg: "3rem", xl: "50px" }}
        h={{ base: "50px", md: "70px" }}
        zIndex={isSearched ? "5" : "30"}
      >
        <Box display="flex" alignItems="center" w="100%">
          <Icon
            as={IoMenu}
            className={styles.navbarIcon}
            display={{ base: "block", md: "none" }}
            onClick={() => {
              setIsMainMenu((prev) => !prev);
              setIsCategoryMenu(false);
            }}
            mr="1rem"
          />
          <Image src="/images/Navbar/logo.svg" />
          <InputGroup
            mx={isLoggedIn ? { base: "15px", xl: "30px" } : "30px"}
            w={{ base: "100%", lg: "60vw", xl: "70vw" }}
            // minW={{ base: "auto", xl: "70vw" }}
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

        <IconRightElements
          isLoggedIn={isLoggedIn}
          onDrawerOpen={onDrawerOpen}
          isSearched={isSearched}
          setIsSearched={setIsSearched}
        />
        <SearchedElement
          isSearched={isSearched}
          setIsSearched={setIsSearched}
        />
      </Box>
      <Overlay
        isMainMenu={isMainMenu}
        isSearched={isSearched}
        handleClickOverlay={handleClickOverlay}
      />
      <Sidebar
        isLoggedIn={isLoggedIn}
        setIsCategoryMenu={setIsCategoryMenu}
        isCategoryMenu={isCategoryMenu}
        setIsMainMenu={setIsMainMenu}
        isMainMenu={isMainMenu}
      />
      <NavbarBottom onDrawerOpen={onDrawerOpen} />
      <QuickAdd
        products={productList}
        onDrawerClose={onDrawerClose}
        isDrawerOpen={isDrawerOpen}
      />
    </>
  );
};

export default Navbar;
