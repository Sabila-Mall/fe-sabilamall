import { Square, Icon, Text, Box } from "@chakra-ui/react";

const CardCategory = ({ icon, name, onClick }) => {
  return (
    <Box
      shadow="md"
      width="8rem"
      height="8rem"
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
        boxSize="3rem"
        marginTop="1rem"
        marginBottom="0.5rem"
      />
      <Text
        className="secondaryFont"
        fontSize="0.8rem"
        marginTop="0.5rem"
        textAlign="center"
      >
        {name}
      </Text>
    </Box>
  );
};

export default CardCategory;
