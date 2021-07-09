import { Icon, Text, Box } from "@chakra-ui/react";

const CardCategory = ({ isLoggedIn, icon, name, onClick }) => {
  return (
    <Box
      shadow="md"
      width={isLoggedIn ? "6rem" : { md: "6rem", lg: "8rem" }}
      height={isLoggedIn ? "6rem" : { md: "6rem", lg: "8rem" }}
      bg="white"
      cursor="pointer"
      d="flex"
      borderRadius="lg"
      flexDirection="column"
      alignItems="center"
      onClick={onClick}
    >
      <Icon
        as={icon}
        color="red.600"
        boxSize="2rem"
        marginTop={isLoggedIn ? "0.8rem" : { md: "1rem", lg: "2rem" }}
        marginBottom="0.5rem"
      />
      <Text
        className="secondaryFont"
        fontSize={isLoggedIn ? "0.7rem" : { md: "0.6rem", lg: "0.8rem" }}
        marginTop="0.3rem"
        textAlign="center"
        paddingX={isLoggedIn ? "0px" : "2ch"}
      >
        {name}
      </Text>
    </Box>
  );
};

export default CardCategory;
