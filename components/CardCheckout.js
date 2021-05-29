import { Button } from "@chakra-ui/button";
import { Box, Divider, Flex, HStack, Text, VStack } from "@chakra-ui/layout";

export const CardCheckout = () => {
  return (
    <Box
      width="full"
      borderRadius="12px"
      border="solid #CBD5E0 0.5px"
      px="1rem"
    >
      <Flex flexDirection="column" color="gray.500" fontWeight="500">
        <Flex my="6px" justifyContent="space-between">
          <Text fontWeight="700">Subtotal</Text>
          <Text>Rp99.999.999</Text>
        </Flex>
        <Flex my="6px" justifyContent="space-between">
          <Text fontWeight="700">Diskon</Text>
          <Text>Rp99.999.999</Text>
        </Flex>
        <Divider my="6px" />
        <Flex my="6px" justifyContent="space-between">
          <Text fontWeight="700">Total</Text>
          <Text fontSize="1.2rem" color="orange.500">
            Rp99.999.999
          </Text>
        </Flex>
        <Button my="3px" colorScheme="red" size="md">
          Proses ke Checkout
        </Button>
      </Flex>
    </Box>
  );
};
