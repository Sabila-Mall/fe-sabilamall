import {
  Box,
  Icon,
  VStack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  Image,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsChevronUp,
  BsChevronDown,
} from "react-icons/bs";
import { FaUser } from "react-icons/fa";

import { getCategory } from "../api/Homepage";
import { menuCategory, menuSidebar } from "../constants/navbarConstant";
import { useAuthContext } from "../contexts/authProvider";
import { useHomePageContext } from "../contexts/homepageProvider";
import styles from "../styles/Navbar.module.scss";
import { isRequestSuccess } from "../utils/api";
import { getImageLink, logout, setBadgeColor } from "../utils/functions";
import { useQuery } from "react-query";

const UserInfo = ({ useBorder }) => {
  const { userData } = useAuthContext();
  return (
    <Flex
      borderBottom={useBorder && "1px solid #e2e8f0"}
      align="center"
      pb="1rem"
      justify="flex-start"
      w="70vw"
      mt=".8rem"
    >
      <Image
        w="3.4rem"
        h="3.4rem"
        src={getImageLink(userData?.avatar)}
        borderRadius="full"
      />
      <Box ml=".5rem" fontSize="14px">
        <Text fontWeight="700" maxW="15ch" isTruncated>{`${userData?.first_name
          } ${userData?.last_name ?? ""}`}</Text>
        {userData?.admin_id != null ?
          <Box>
            <Text>{userData?.memberid}</Text>
            <Flex
              h="22px"
              px=".5rem"
              py=".5rem"
              bg={setBadgeColor(userData?.user_level)}
              align="center"
              justify="center"
              borderRadius="30px"
              color="white"
              fontSize="12px"
            >
              {userData?.user_level} by admin
            </Flex>
          </Box>
          :
          <Flex>
            <Text>{userData?.memberid}</Text>
            <Flex
              h="22px"
              px=".5rem"
              py=".5rem"
              bg={setBadgeColor(userData?.user_level)}
              align="center"
              justify="center"
              borderRadius="30px"
              color="white"
              fontSize="12px"
              ml="2rem"
            >
              {userData?.user_level}
            </Flex>
          </Flex>
        }

      </Box>
    </Flex>
  );
};

const LoginSideBar = () => {
  const router = useRouter();
  return (
    <Flex
      align="center"
      justify="flex-start"
      onClick={() => router.push("/login")}
      className={styles.boxMenu}
      py="2rem"
    >
      <FaUser size="2rem" color="#718096" />
      <Text mx="1rem">Login</Text>
    </Flex>
  );
};

const Sidebar = ({
  isCategoryMenu,
  setIsCategoryMenu,
  setIsMainMenu,
  isLoggedIn,
  isMainMenu,
}) => {
  const { userData, loading } = useAuthContext();
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [categoryState, setCategoryState] = useState({});

  const toast = useToast();
  const errorToast = (errMessage) => {
    toast({
      position: "top",
      title: errMessage,
      status: "error",
      isClosable: true,
    });
  };

  const closeSidebar = () => {
    setIsMainMenu(false);
    setIsCategoryMenu(false);
  };

  const queryCategories = useQuery(['category'], async () => {
    try {
      const res = await getCategories();
      if (isRequestSuccess(res.data)) {
        return res.data.data;
      } else {
        throw Error('Gagal mendapatkan kategori');
      }
    } catch (err) {
      console.error(err);
      errorToast(err);
    }
  }, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return (
    <>
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
          {isLoggedIn ? <UserInfo userData={userData} /> : <LoginSideBar />}
          {menuSidebar.menu.map((item) => {
            switch (item?.id) {
              case "kb":
                return (
                  <Box
                    className={styles.boxMenu}
                    key={item.id}
                    onClick={() => setIsCategoryMenu(true)}
                  >
                    <Heading
                      className={styles.fontSizeSidebar}
                      lineHeight="50px"
                    >
                      {item.text}
                    </Heading>
                    <Icon as={BsChevronRight} w="20px" h="20px" />
                  </Box>
                );
              case "dagp":
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

                      <Image
                        src="/images/Navbar/google-play.svg"
                        alt="Google Play"
                        mt="-13px"
                        mb="14px"
                      />
                    </Link>
                  </Box>
                );
              case "kl":
                return (
                  isLoggedIn && (
                    <Box
                      className={styles.boxMenu}
                      key={item.id}
                      _hover={{ cursor: "pointer" }}
                      onClick={() => logout()}
                    >
                      <Heading
                        className={styles.fontSizeSidebar}
                        lineHeight="50px"
                      >
                        {item.text}
                      </Heading>
                    </Box>
                  )
                );
              default:
                return (
                  <Box className={styles.boxMenu} key={item.id}>
                    <Link href={item.href}>
                      <Heading
                        className={styles.fontSizeSidebar}
                        lineHeight="50px"
                      >
                        {item.text}
                      </Heading>
                    </Link>
                  </Box>
                );
            }
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
          {isLoggedIn && <UserInfo useBorder={false} />}
          <Accordion borderWidth="0" allowToggle allowMultiple>
            {queryCategories.isFetched &&
              queryCategories.data?.map((item) => {
                const subCategories = item.sub_categories;
                return (
                  <AccordionItem key={item.categories_id}>
                    <AccordionButton
                      borderWidth="0"
                      borderColor="transparent"
                      _focus={{ outline: "none" }}
                      onClick={() => {
                        const temp = { ...categoryState };
                        temp[`${item.categories_id}`] = !temp[`${item.categories_id}`];
                        setCategoryState(temp);
                      }}
                    >
                      <Box className={styles.boxCategoryMenu}>
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          w="full"
                        >
                          <Heading
                            className={styles.fontSizeSidebar}
                            lineHeight="30px"
                          >
                            {item.categories_name}
                          </Heading>
                          <Icon
                            as={
                              categoryState[`${item.categories_id}`]
                                ? BsChevronUp
                                : BsChevronDown
                            }
                            ml="20px"
                            mr="10px"
                            w="20px"
                            h="20px"
                          />
                        </Flex>
                      </Box>
                    </AccordionButton>
                    <AccordionPanel
                      fontSize="0.75em"
                      lineHeight="150%"
                      cursor="pointer"
                      onClick={() => {
                        closeSidebar();
                        router.push(
                          `/daftar-produk?id=${item.categories_id}&nama=${item.categories_name}`,
                        );
                      }}
                    >
                      Semua {item.categories_name}
                    </AccordionPanel>
                    {subCategories &&
                      subCategories.map((item, index) => {
                        return (
                          <AccordionPanel
                            fontSize="0.75em"
                            lineHeight="150%"
                            cursor="pointer"
                            key={index}
                            onClick={() => {
                              closeSidebar();
                              router.push(
                                `/daftar-produk?id=${item.categories_id}&nama=${item.categories_name}`,
                              );
                            }}
                          >
                            {item.categories_name}
                          </AccordionPanel>
                        );
                      })}
                  </AccordionItem>
                );
              })}
          </Accordion>
        </VStack>
      </Box>
    </>
  );
};

export default Sidebar;
