import {
  Box,
  Text,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

import { Layout } from "../../../components/Layout";
import NavbarProfile from "../../../components/NavbarProfile";

const SubresellerMobile = ({
  sm,
  search,
  setSearch,
  subResellerData,
  loading,
}) => {
  return (
    <Box minH="100vh" bg="gray.50">
      <NavbarProfile section="Rekap Order Subreseller" />
      <Layout hasPadding>
        <Flex pt="3rem" flexDir="column" width="100%" my="1rem">
          <InputGroup size="md" w="100%">
            <Input
              pr="4.5rem"
              placeholder="Cari dengan MemberID atau nama..."
              fontSize="0.9rem"
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Icon
                as={FiSearch}
                color="gray.500"
                boxSize="1.2em"
                fontSize="14px"
              />
            </InputRightElement>
          </InputGroup>
          <Box
            borderWidth="1px"
            borderRadius="md"
            mt="1rem"
            p="1rem"
            maxH="30rem"
            overflowY="scroll"
          >
            <Box
              d="flex"
              fontWeight="700"
              fontSize="1rem"
              className="primaryFont"
              borderBottom="1px"
              pb="1rem"
              mb="1rem"
              borderBottomColor="gray.500"
            >
              <Text w="35%" isTruncated>
                MemberID
              </Text>
              <Text w="35%" isTruncated>
                Nama
              </Text>
              <Text w="30%" isTruncated>
                Jumlah
              </Text>
            </Box>
            {subResellerData?.length > 0 ? (
              subResellerData.map((data) => {
                if (
                  data.memberId.toLowerCase().includes(search.toLowerCase()) ||
                  data.nama.toLowerCase().includes(search.toLowerCase())
                ) {
                  return (
                    <Box
                      d="flex"
                      fontSize="0.9rem"
                      className="secondaryFont"
                      mb="1rem"
                    >
                      <Text w="35%" pr="0.5rem" isTruncated>
                        {data.memberId}
                      </Text>
                      <Text w="35%" pr="0.5rem" isTruncated>
                        {data.nama}
                      </Text>
                      <Text w="30%" pr="0.5rem" isTruncated>
                        {data.jumlah}
                      </Text>
                    </Box>
                  );
                }
              })
            ) : (
              <Flex justifyContent="center">
                <Spinner />
              </Flex>
            )}
          </Box>
        </Flex>
      </Layout>
    </Box>
  );
};

export default SubresellerMobile;
