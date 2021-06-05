import { Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";

const TestTable = () => {
  return (
    <Table w="100%" bg="red" display={{ base: "none", md: "block" }}>
      <Thead>
        <Tr>
          <Th w="70%">Produk</Th>
          <Th>Harga Satuan</Th>
          <Th textAlign="center" p="0">
            Jumlah
          </Th>
          <Th textAlign="center" px="1em">
            Subtotal
          </Th>
        </Tr>
      </Thead>

      <Tbody>
        <Tr>
          <Td>Rp99.999.999</Td>
          <Td>Rp99.999.999</Td>
          <Td>Rp99.999.999</Td>
          <Td>
            <Text color="orange.400" fontWeight="500" fontSize="1.1rem">
              Rp99.999.999
            </Text>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default TestTable;
