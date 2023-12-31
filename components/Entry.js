import { Box } from "@chakra-ui/layout";
import { Flex, Text } from "@chakra-ui/react";

// Entry is used by top-up page
const Entry = ({ data }) => {
  return (
    <Flex justify={"space-between"} className={"secondaryFont"}>
      <Box>
        <Text>{data.nama}</Text>
        <Text color={"gray.500"} fontSize={"0.75rem"}>
          {data.tanggal}
        </Text>
        <Text color={"gray.500"} fontSize={"0.75rem"}>
          kode: {data.kode}
        </Text>
      </Box>

      <Box>
        <Text>{data.harga}</Text>
        <Text color={"orange.500"} textAlign="end" fontSize={"0.75rem"}>
          {data.status}
        </Text>
      </Box>
    </Flex>
  );
};

export default Entry;
