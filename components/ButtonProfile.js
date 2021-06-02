import { Box } from "@chakra-ui/react";

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
