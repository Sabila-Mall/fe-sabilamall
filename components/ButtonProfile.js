import { Box, Button } from "@chakra-ui/react";

import { setBadgeColor } from "../utils/functions";

export const ButtonStatusUser = ({ text, mt }) => {
  return (
    <Box
      minWidth={{ base: "64px", md: "80px" }}
      h={{ base: "24px", md: "30px" }}
      borderRadius="30px"
      bg={setBadgeColor(text)}
      fontSize={{ base: "12px", md: "14px" }}
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

export const ButtonSubmit = ({ text, isLoading, ...props }) => (
  <Button
    className="primaryFont"
    fontWeight="semibold"
    fontSize="15px"
    type="submit"
    display={{ base: "none", md: "block" }}
    size="lg"
    colorScheme="orange.500"
    bg="orange.500"
    _hover={{ bg: "orange.400" }}
    {...props}
  >
    {text}
  </Button>
);
