import { Image } from "@chakra-ui/image";
import {
  Box,
  Text,
  Icon,
  Input,
  InputGroup,
  Flex,
  InputLeftElement,
  useDisclosure,
  Grid,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { BiUser, BiLogOut } from "react-icons/bi";
import { BsChevronLeft } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import {
  IoMenu,
  IoSearch,
  IoHeartSharp,
  IoNotifications,
  IoCart,
  IoFileTrayStacked,
  IoChevronDown,
} from "react-icons/io5";
import { IoHomeSharp, IoReceiptSharp } from "react-icons/io5";

import { getCategory } from "../api/Homepage";
import { productList } from "../constants/dummyData";
import { useAuthContext } from "../contexts/authProvider";
import { useCartContext } from "../contexts/cartProvider";
import { useWishlistContext } from "../contexts/wishlistProvider";
import styles from "../styles/Navbar.module.scss";
import { logout, setBadgeColor } from "../utils/functions";
import QuickAdd from "./QuickAdd";
import Sidebar from "./Sidebar";

export const NavbarBottom = ({ onDrawerOpen, isLoggedIn }) => {
  const router = useRouter();
  const { cartData } = useCartContext();
  let l = cartData?.length;
  return (
    <Box
      as="nav"
      className={styles.navbarBottom}
      zIndex="10"
      display={{ base: "flex", md: "none" }}
    >
      <Box className={styles.boxIcon} onClick={() => router.push("/")}>
        <Icon
          as={IoHomeSharp}
          className={styles.navbarIcon}
          color={router.pathname === "/" ? "orange.400" : "gray.500"}
        />
        <Text
          className={styles.boxIconText}
          color={router.pathname === "/" ? "orange.400" : "gray.500"}
        >
          Beranda
        </Text>
      </Box>
      <Box
        position="relative"
        className={styles.boxIcon}
        onClick={isLoggedIn ? onDrawerOpen : () => router.push("/login")}
      >
        <Icon as={IoCart} className={styles.navbarIcon} color="gray.500" />
        <Text color="gray.500" className={styles.boxIconText}>
          Keranjang
        </Text>
        {l != 0 && (
          <Flex
            top="-.1rem"
            right="-0.05rem"
            width="1.25rem"
            height="1.25rem"
            position="absolute"
            color="white"
            justifyContent="center"
            fontWeight="700"
            fontSize="0.7rem"
            alignItems="center"
            borderRadius="100%"
            bgColor="orange.500"
          >
            <Text fontSize="0.7rem">{l < 99 ? l : "99"}</Text>
          </Flex>
        )}
      </Box>
      <Box
        className={styles.boxIcon}
        onClick={() =>
          isLoggedIn
            ? router.push("/profile/pesanan-saya")
            : router.push("/login")
        }
      >
        <Icon
          as={IoReceiptSharp}
          className={styles.navbarIcon}
          color={
            router.pathname === "/profile/pesanan-saya"
              ? "orange.400"
              : "gray.500"
          }
        />
        <Text
          className={styles.boxIconText}
          color={
            router.pathname === "/profile/pesanan-saya"
              ? "orange.400"
              : "gray.500"
          }
        >
          Pesanan
        </Text>
      </Box>
      <Box
        className={styles.boxIcon}
        onClick={() =>
          isLoggedIn ? router.push("/profile") : router.push("/login")
        }
      >
        <Icon
          as={FaUser}
          className={styles.navbarIcon}
          color={router.pathname === "/profile" ? "orange.400" : "gray.500"}
        />
        <Text
          className={styles.boxIconText}
          color={router.pathname === "/profile" ? "orange.400" : "gray.500"}
        >
          Akun
        </Text>
      </Box>
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

const SearchedElement = ({ isSearched, setIsSearched }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (searchQuery) router.push(`/search?q=${searchQuery}`);
    }
  };

  return (
    <Box
      className={styles.boxSearch}
      display={{ base: "flex", lg: "none" }}
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
          onClick={() => {
            if (searchQuery) router.push(`/search?q=${searchQuery}`);
          }}
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
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={(event) => handleKeyDown(event)}
        />
      </InputGroup>
    </Box>
  );
};

const IconRightElements = ({ isLoggedIn, onDrawerOpen, setIsSearched }) => {
  const { userData, loading } = useAuthContext();
  const { cartData } = useCartContext();
  const { wishlistData } = useWishlistContext();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();
  let l = cartData?.length;
  let d = wishlistData?.length;

  return loading ? (
    <Spinner mx="auto" />
  ) : (
    <Grid
      templateColumns={{
        base: "repeat(3, 1.3rem)",
        sm: "repeat(3, 2rem)",
        md: "repeat(6, 2.75rem)",
        lg: isLoggedIn ? "repeat(5, 2.75rem) 6rem" : "repeat(5, 3rem) 6rem",
      }}
      w="auto"
      columnGap={{ base: 6, md: 0 }}
      alignItems="center"
    >
      <Icon
        as={IoSearch}
        className={styles.navbarIcon}
        color="gray.500"
        onClick={() => setIsSearched(true)}
        display={{ base: "block", lg: "none" }}
      />

      <Icon
        as={IoNotifications}
        className={styles.navbarIcon}
        color="gray.500"
      />
      <Box
        position="relative"
        w="fit-content"
        display={{ base: "none", md: "block" }}
        onClick={
          isLoggedIn ? () => onDrawerOpen() : () => router.push("/login")
        }
      >
        <Icon as={IoCart} className={styles.navbarIcon} color="gray.500" />
        {l != 0 && (
          <Flex
            bottom={l < 10 ? "-0.5rem" : "-0.55rem"}
            right={l < 10 ? "-0.55rem" : "-0.55rem"}
            width="1.25rem"
            height="1.25rem"
            position="absolute"
            color="white"
            justifyContent="center"
            fontWeight="700"
            fontSize="0.7rem"
            alignItems="center"
            borderRadius="100%"
            bgColor="orange.500"
          >
            <Text fontSize="0.7rem">{l < 99 ? l : "99"}</Text>
          </Flex>
        )}
      </Box>

      <Link href={isLoggedIn ? "/wishlist" : "/login"} w="fit-content">
        <Box position="relative" w="fit-content">
          <Icon
            as={IoHeartSharp}
            className={styles.navbarIcon}
            color="gray.500"
          />
          {d != 0 && (
            <Flex
              bottom={d < 10 ? "-0.5rem" : "-0.55rem"}
              right={d < 10 ? "-0.5rem" : "-0.7rem"}
              width={d < 10 ? "1.25rem" : "1.35rem"}
              height={d < 10 ? "1.25rem" : "1.35rem"}
              position="absolute"
              color="white"
              justifyContent="center"
              fontWeight="700"
              alignItems="center"
              borderRadius="100%"
              bgColor="orange.500"
            >
              <Text fontSize="0.7rem">{d < 99 ? d : "99"}</Text>
            </Flex>
          )}
        </Box>
      </Link>

      <Link href={"/stok"} w="fit-content">
        <Icon
          display={{ base: "none", md: "block" }}
          as={IoFileTrayStacked}
          className={styles.navbarIcon}
          color="gray.500"
        />
      </Link>
      <Box
        w="fit-content"
        display={{ base: "none", md: "block" }}
        position="relative"
      >
        {isLoggedIn ? (
          <Menu>
            <MenuButton>
              <Flex align="center" _hover={{ cursor: "pointer" }}>
                <Icon
                  as={FaUser}
                  className={styles.navbarIcon}
                  color="gray.500"
                />
                <Box
                  w="fit-content"
                  display={{ base: "none", lg: "block" }}
                  fontSize="12px"
                  ml="1rem"
                >
                  <Text
                    fontWeight="bold"
                    isTruncated
                    maxWidth="16ch"
                    overflow="hidden"
                  >
                    {userData?.first_name} {userData?.last_name}
                  </Text>
                  <Flex w="full" justify="space-between">
                    <Text mr=".7rem">{userData?.memberid}</Text>
                    <Box
                      bg={setBadgeColor(userData?.user_level)}
                      color="white"
                      px=".4rem"
                      py=".1rem"
                      borderRadius="30px"
                    >
                      {userData?.user_level}
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList zIndex="popover">
              <MenuItem
                icon={<BiUser color="gray.500" />}
                onClick={() => router.push("/profile")}
                color="gray.500"
                _hover={{ color: "black" }}
              >
                Profil
              </MenuItem>
              <MenuItem
                icon={<IoReceiptSharp color="gray.500" />}
                onClick={() => router.push("/profile/pesanan-saya")}
                color="gray.500"
                _hover={{ color: "black" }}
              >
                Pesanan Saya
              </MenuItem>
              <MenuItem
                icon={<BiLogOut />}
                color="gray.500"
                onClick={() => logout()}
                _hover={{ color: "black" }}
              >
                Keluar
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Flex
            align="center"
            _hover={{ cursor: "pointer" }}
            onClick={() => router.push("/login")}
          >
            <Icon as={FaUser} color="gray.500" className={styles.navbarIcon} />
            <Spacer w="1rem" />
            <Text>Masuk</Text>
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

const CustomAccordion = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getCategory().then((e) => {
      console.info(e.data?.data);
      setCategory(e.data?.data);
      setLoading(false);
    });
  }, []);

  return (
    <Menu>
      <MenuButton>
        <Flex
          pl="16px"
          pr="8px"
          alignItems="center"
          className={styles.category}
        >
          <Text>Kategori</Text>
          <IoChevronDown color="#999999" />
        </Flex>
      </MenuButton>
      <MenuList className={styles.menuList} maxH="80vh" overflowY="auto">
        {loading ? (
          <Flex justifyContent="center" width="full">
            <Spinner m="1rem" />
          </Flex>
        ) : (
          <Accordion width="320px" allowToggle>
            {category?.map((el) => (
              <AccordionItem id={el.id}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {el.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel p={0}>
                  <MenuItem
                    className={styles.menuItem}
                    onClick={() =>
                      router.push(`/daftar-produk?id=${el.id}&nama=${el.name}`)
                    }
                  >
                    Semua {el.name}
                  </MenuItem>
                  {el?.sub_categories?.map((sub) => (
                    <MenuItem
                      className={styles.menuItem}
                      onClick={() =>
                        router.push(
                          `/daftar-produk?id=${sub.id}&nama=${sub.name}`,
                        )
                      }
                    >
                      {sub.name}
                    </MenuItem>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </MenuList>
    </Menu>
  );
};

const Navbar = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [isMainMenu, setIsMainMenu] = useState(false);
  const [isCategoryMenu, setIsCategoryMenu] = useState(false);
  const { isLoggedIn } = useAuthContext();
  const drawerDisclosure = useDisclosure();
  const isDrawerOpen = drawerDisclosure.isOpen;
  const onDrawerOpen = drawerDisclosure.onOpen;
  const onDrawerClose = drawerDisclosure.onClose;

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (searchQuery) router.push(`/search?q=${searchQuery}`);
    }
  };

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
            display={{ base: "block", lg: "none" }}
            onClick={() => {
              setIsMainMenu((prev) => !prev);
              setIsCategoryMenu(false);
            }}
            mr="1rem"
          />
          <Link href="/">
            <Image
              src="/images/Navbar/logo.svg"
              _hover={{ cursor: "pointer" }}
            />
          </Link>
          <Flex
            mx={isLoggedIn ? { base: "15px", xl: "30px" } : "30px"}
            w="full"
            alignItems="stretch"
            className={styles.boxNavbar}
            display={{ base: "none", lg: "flex" }}
          >
            <CustomAccordion />
            <InputGroup w="100%">
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
                    ml="12px"
                    onClick={() => {
                      if (searchQuery) router.push(`/search?q=${searchQuery}`);
                    }}
                  />
                }
              />
              <Input
                type="text"
                placeholder="Cari di toko..."
                borderRadius="15px"
                borderWidth="0"
                bg="gray.100"
                pl="50px"
                focusBorderColor="gray.100"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event)}
              />
            </InputGroup>
          </Flex>
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
      <NavbarBottom onDrawerOpen={onDrawerOpen} isLoggedIn={isLoggedIn} />
      <QuickAdd onDrawerClose={onDrawerClose} isDrawerOpen={isDrawerOpen} />
    </>
  );
};

export default Navbar;
