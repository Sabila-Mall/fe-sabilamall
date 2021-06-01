import { Box, Icon, Text, Avatar } from "@chakra-ui/react";
import { useState } from "react";
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
      <Icon
        as={IoChevronBack}
        display={section === "Akun Saya" ? "none" : "block"}
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

const Profile = () => {
  const [section, setSection] = useState("Akun Saya");

  return (
    <>
      <NavbarProfile section={section} />
      <Box mt="50px" px="16px" pt="18px">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Avatar
            size="lg"
            name="Udin"
            src="https://akcdn.detik.net.id/community/media/visual/2021/05/17/lionel-messi.jpeg?w=700&q=90"
          />
          <Box fontSize="14px">
            <Text fontWeight="700" lineHeight="18.2px" className="primaryFont">
              Messi GOAT
            </Text>
            <Text
              fontWeight="500"
              fontSize="14px"
              lineHeight="21px"
              className="secondaryFont"
            >
              messigoat@biyac.com
            </Text>
          </Box>
          <Box
            w="80px"
            h="30px"
            borderRadius="30px"
            bg="gray.400"
            fontSize="14px"
            fontWeight="500"
            lineHeight="21px"
            className="secondaryFont"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            Reguler
          </Box>
        </Box>
        <Box
          mt="20px"
          mx="auto"
          w="308px"
          h="50px"
          bg="gray.50"
          borderRadius="10px"
          p="10px"
          boxSizing="border-box"
          boxShadow=" 0px 0px 5px 0px #00000040"
          display="flex"
          justifyContent="start"
          alignItems="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            alignItems="start"
            ml="10px"
          >
            <Text
              className="primaryFont"
              fontWeight="700"
              fontSize="12px"
              color="red.600"
            >
              SM Pay
            </Text>
            <Text
              className="secondaryFont"
              fontWeight="500"
              fontSize="12px"
              lineHeight="18px"
            >
              Rp. 100.000.000
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            alignItems="start"
            ml="50px"
          >
            <Text
              className="primaryFont"
              fontWeight="700"
              fontSize="12px"
              color="red.600"
            >
              SM Point
            </Text>
            <Text
              className="secondaryFont"
              fontWeight="500"
              fontSize="12px"
              lineHeight="18px"
            >
              5
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
