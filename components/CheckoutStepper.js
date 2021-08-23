import { Box, Circle, Text } from "@chakra-ui/react";

/**
 * CheckoutStepper digunakan untuk menunjukan pada tahap mana checkout sekarang berada
 * @param {int} currentStep 1 untuk tahap alamat penerima, 2 untuk tahap detail pesanan
 */
const CheckoutStepper = ({currentStep}) => {
  return (
    <Box
      w={{ base: "85%", md: "100%" }}
      d="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="2rem"
    >
      <Circle
        bg={currentStep === 1 ? "orange.400" : "gray.50"}
        size={{ base: "1.8rem", md: "2.2rem" }}
        fontSize={{ base: "0.75rem", md: "0.85rem" }}
        color={currentStep === 1 ? "inherit": "gray.500"}
      >
        1
      </Circle>
      <Text
        className="secondaryFont"
        marginLeft="0.5rem"
        fontSize={{ base: "sm", md: "md" }}
        color={currentStep === 1 ? "inherit": "gray.500"}
      >
        Alamat Penerima
      </Text>
      <Box
        marginLeft="1rem"
        bg="gray.500"
        h={{ base: "1px", md: "1.2px" }}
        w="10rem"
      />
      <Circle
        bg={currentStep === 2 ? "orange.400" : "gray.50"}
        marginLeft="1rem"
        size={{ base: "1.8rem", md: "2.2rem" }}
        fontSize={{ base: "0.75rem", md: "0.85rem" }}
        color={currentStep === 2 ? "inherit": "gray.500"}
      >
        2
      </Circle>
      <Text
        className="secondaryFont"
        marginLeft="0.5rem"
        color={currentStep === 2 ? "inherit": "gray.500"}
        fontSize={{ base: "sm", md: "md" }}
      >
        Detail Pesanan
      </Text>
    </Box>
  );
};

export default CheckoutStepper;