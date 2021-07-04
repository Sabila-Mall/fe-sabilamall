import { Box, Circle, Text, Center, Square, Icon } from "@chakra-ui/react";
import { FaHistory } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

const SMCard = ({ width }) => {
  return (
    <Box w={width} h="15rem" borderRadius="lg">
      <Center
        bg="gray.50"
        w="100%"
        h="32%"
        borderTopLeftRadius="lg"
        borderTopRightRadius="lg"
      >
        <Center
          h="3rem"
          w="60%"
          borderRight="1px"
          borderRightColor="gray.400"
          d="flex"
          flexDirection="row"
        >
          <Box marginRight="0.6rem">
            <Text
              color="red.600"
              className="primaryFont"
              fontWeight="700"
              fontSize="0.875rem"
            >
              SM Pay
            </Text>
            <Text
              className="secondaryFont"
              fontWeight="500"
              fontSize="0.875rem"
            >
              Rp. 100.000.000
            </Text>
          </Box>
          <Box marginLeft="0.7rem">
            <Text
              color="red.600"
              className="primaryFont"
              fontWeight="700"
              fontSize="0.875rem"
            >
              SM Point
            </Text>
            <Text
              className="secondaryFont"
              fontWeight="500"
              fontSize="0.875rem"
            >
              5
            </Text>
          </Box>
        </Center>
        <Center w="40%" h="2rem">
          <Square
            size="3rem"
            marginRight="0.7rem"
            flexDirection="column"
            cursor="pointer"
          >
            <Icon as={IoIosAddCircle} color="red.600" boxSize="2rem" />
            <Text
              fontSize="0.75rem"
              className="secondaryFont"
              color="red.600"
              fontWeight="500"
            >
              Top Up
            </Text>
          </Square>
          <Square
            size="3rem"
            marginLeft="0.7rem"
            flexDirection="column"
            cursor="pointer"
          >
            <Icon
              as={FaHistory}
              color="red.600"
              marginTop="0.1rem"
              boxSize="1.8rem"
              marginBottom="0.1rem"
            />
            <Text
              fontSize="0.75rem"
              className="secondaryFont"
              color="red.600"
              fontWeight="500"
            >
              History
            </Text>
          </Square>
        </Center>
      </Center>
      <Box
        w="100%"
        h="68%"
        bg="red.600"
        borderBottomLeftRadius="lg"
        borderBottomRightRadius="lg"
        d="flex"
        flexDirection="row"
      >
        <Box
          w="40%"
          h="100%"
          borderBottomLeftRadius="lg"
          d="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Circle
            bg="white"
            size="8rem"
            d="flex"
            flexDirection="column"
            className="secondaryFont"
            shadow="xl"
          >
            <Text fontSize="0.875rem" fontWeight="500">
              Ranking Saya
            </Text>
            <Text fontSize="1.5rem" fontWeight="500">
              368
            </Text>
          </Circle>
        </Box>
        <Center
          w="60%"
          h="100%"
          borderBottomRightRadius="lg"
          flexDirection="column"
          color="white"
          fontSize="0.9rem"
        >
          <Text fontWeight="700" className="primaryFont">
            Leaderboard
          </Text>
          <Box
            w="70%"
            d="flex"
            flexDirection="column"
            justifyContent="space-between"
            fontSize="0.8rem"
            fontWeight="500"
            className="secondaryFont"
          >
            <Box h="20%" w="100%" d="flex" justifyContent="space-between">
              <Text w="60%" minW="20px" isTruncated>
                1. Siapa
              </Text>
              <Text w="40%" minW="20px" align="right" isTruncated>
                1495 poin
              </Text>
            </Box>
            <Box h="20%" w="100%" d="flex" justifyContent="space-between">
              <Text w="60%" minW="20px" isTruncated>
                2. Siapa lagi
              </Text>
              <Text w="40%" minW="20px" align="right" isTruncated>
                397 poin
              </Text>
            </Box>
            <Box h="20%" w="100%" d="flex" justifyContent="space-between">
              <Text w="60%" minW="20px" isTruncated>
                3. lagi lagi
              </Text>
              <Text w="40%" minW="20px" align="right" isTruncated>
                376 poin
              </Text>
            </Box>
            <Box h="20%" w="100%" d="flex" justifyContent="space-between">
              <Text w="60%" minW="20px" isTruncated>
                4. terus
              </Text>
              <Text w="40%" minW="20px" align="right" isTruncated>
                289 poin
              </Text>
            </Box>
            <Box h="20%" w="100%" d="flex" justifyContent="space-between">
              <Text w="60%" minW="20px" isTruncated>
                5. lagilagilagilagilagilagi
              </Text>
              <Text w="40%" minW="20px" align="right" isTruncated>
                123 poin
              </Text>
            </Box>
          </Box>
        </Center>
      </Box>
    </Box>
  );
};

export default SMCard;
