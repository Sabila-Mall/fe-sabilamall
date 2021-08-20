import { Box, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoNotifications, IoChevronBack } from "react-icons/io5";

const NavbarProfile = ({ section }) => {
  const router = useRouter();

  return (
    <Box
      h="50px"
      boxShadow="0px 4px 10px 0px #00000040"
      w="100vw"
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
      bg="white"
      zIndex="2"
      pos="fixed"
    >
      <Box display="flex" alignItems="center">
        <Icon
          as={IoChevronBack}
          onClick={() =>
            section === "Akun Saya" ? router.push("/") : router.push("/profile")
          }
        />

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
};

export default NavbarProfile;
