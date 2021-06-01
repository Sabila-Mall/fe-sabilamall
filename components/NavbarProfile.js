import { Box, Icon, Text, Link } from "@chakra-ui/react";
import { IoNotifications, IoChevronBack } from "react-icons/io5";

const NavbarProfile = ({ section }) => (
  <Box
    h="50px"
    boxShadow="0px 4px 10px 0px #00000040"
    w="100vw"
    position="fixed"
    top="0"
    display={{ base: "flex", md: "none" }}
    className="primaryFont"
    fontSize="18px"
    fontWeight="700"
    lineHeight="23px"
    color="gray.500"
    justifyContent="space-between"
    alignItems="center"
    pr="18px"
    pl="20px"
  >
    <Box display="flex" alignItems="center">
      <Link href="/profile">
        <Icon
          as={IoChevronBack}
          display={section === "Akun Saya" ? "none" : "block"}
        />
      </Link>
      <Text ml="8px">{section}</Text>
    </Box>
    <Box>
      <Icon
        as={IoNotifications}
        display={section === "Akun Saya" ? "block" : "none"}
      />
    </Box>
  </Box>
);

export default NavbarProfile;
