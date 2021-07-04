import { Square, Icon, Text, Box } from "@chakra-ui/react";

const CardCategory = ({ icon, name, onClick }) => {
  return (
    <Box
      shadow="md"
      width="6rem"
      height="6rem"
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
        marginTop="0.8rem"
        marginBottom="0.5rem"
      />
      <Text
        className="secondaryFont"
        fontSize="0.7rem"
        marginTop="0.3rem"
        textAlign="center"
      >
        {name}
      </Text>
    </Box>
  );
};

export default CardCategory;
