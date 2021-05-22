import { Square, Icon, Text, Box } from "@chakra-ui/react";

const CardCategory = ({ icon, name }) => {
  return (
    <Square
      shadow="lg"
      size="10rem"
      bg="white"
      flexDirection="column"
      borderRadius="lg"
      cursor="pointer"
    >
      <Icon as={icon} color="red.600" boxSize="3rem" marginBottom="0.5rem" />
      <Text className="secondaryFont" fontSize="0.9rem" marginTop="0.5rem">
        {name}
      </Text>
    </Square>
  );
};

export default CardCategory;
