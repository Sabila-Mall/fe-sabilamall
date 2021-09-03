import { Flex, Image, Text, Box } from "@chakra-ui/react";
import { IoCreateOutline } from "react-icons/io5";

export default function OrderProduct({ name, source, details, weight, notes }) {
  return (
    <>
      <Flex>
        <Image src={source} alt="" h="50px" />
        <Box className="secondaryFont" fontWeight="500" ml="16px">
          <Text fontSize="1rem" color="gray.700">
            {name}
          </Text>
          <Text fontSize="0.875rem" color="gray.500" mt="0.25rem">
            {details}
          </Text>
          <Text fontSize="0.875rem" color="gray.500">
            {"Berat: " + weight}
          </Text>
        </Box>
      </Flex>

      {notes && (
        <Flex align="center" color="gray.400" mt="0.5rem">
          <Text fontSize="0.8rem" width="fit-content">
            {notes}
          </Text>
        </Flex>
      )}
    </>
  );
}
