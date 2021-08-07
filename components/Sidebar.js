import {
  Box,
  Icon,
  VStack,
  Heading,
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  Flex,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import { menuCategory, menuSidebar } from "../constants/navbarConstant";
import styles from "../styles/Navbar.module.scss";

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

const Sidebar = ({
  isCategoryMenu,
  setIsCategoryMenu,
  setIsMainMenu,
  isLoggedIn,
  isMainMenu,
}) => (
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
        {isLoggedIn && <UserInfo />}
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
                  <Heading className={styles.fontSizeSidebar} lineHeight="40px">
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
        {isLoggedIn && <UserInfo useBorder={false} />}
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
  </>
);

export default Sidebar;
