import {
  Flex,
  Stack,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

import { CardProfile } from "../../../components/CardProfile";
import { Layout } from "../../../components/Layout";

const SubresellerDesktop = ({
  sm,
  search,
  setSearch,
  subResellerData,
  loading,
}) => {
  return (
    <Layout hasNavbar={true} hasPadding background="gray.50" sticky>
      <Flex
        mt={{ base: "4rem", md: 0 }}
        justify="center"
        pb="32px"
        bg="gray.50"
        px={{ base: "0", md: "10px", lg: "80px", xl: "120px" }}
      >
        <Flex display={{ base: "none", lg: "block" }}>
          <CardProfile sm={sm} />
        </Flex>
        <Stack
          border="1px solid #E2E8F0"
          borderRadius="20px"
          p={{ base: "20px", md: "32px" }}
          ml={{ base: "", md: "15px" }}
          boxShadow="0px 2px 4px -1px rgba(45, 55, 72, 0.06), 0px 4px 6px -1px rgba(45, 55, 72, 0.1)"
          bg="white"
          h="fit-content"
          w="100rem"
        >
          <Flex alignItems="center" justifyContent="space-between" mb="1.3rem">
            <Text className="primaryFont" fontWeight="700" fontSize="1.75rem">
              Rekap Order Subreseller
            </Text>
            <InputGroup size="md" w="35ch">
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
          </Flex>
          <Box
            borderWidth="1px"
            borderRadius="md"
            p="1rem"
            maxH="30rem"
            overflowY="scroll"
          >
            <Box
              d="flex"
              fontWeight="700"
              fontSize="1.15rem"
              className="primaryFont"
              borderBottom="1px"
              pb="1rem"
              mb="1rem"
              borderBottomColor="gray.500"
            >
              <Text w="10%" isTruncated>
                No.
              </Text>
              <Text w="22%" isTruncated>
                MemberID
              </Text>
              <Text w="38%" isTruncated>
                Nama
              </Text>
              <Text w="30%" isTruncated>
                Jumlah
              </Text>
            </Box>
            {subResellerData.length > 0 ? (
              subResellerData.map((data, idx) => {
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
                      <Text w="10%" pr="0.5rem" isTruncated>
                        {idx + 1}.
                      </Text>
                      <Text w="22%" pr="0.5rem" isTruncated>
                        {data.memberId}
                      </Text>
                      <Text w="38%" pr="0.5rem" isTruncated>
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
        </Stack>
      </Flex>
    </Layout>
  );
};

export default SubresellerDesktop;
