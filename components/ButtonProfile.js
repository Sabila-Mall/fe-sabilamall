import { Box, Button } from "@chakra-ui/react";

export const ButtonStatusUser = ({ text, mt }) => {
  return (
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
      mt={mt}
    >
      {text}
    </Box>
  );
};

export const ButtonSubmit = ({ text }) => (
  <Button
    className="primaryFont"
    fontWeight="700"
    fontSize="18px"
    type="submit"
    display={{ base: "none", md: "block" }}
    size="lg"
    colorScheme="orange.500"
    bg="orange.500"
    _hover={{ bg: "orange.400" }}
  >
    {text}
  </Button>
);
