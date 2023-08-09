import {
  Box,
  Center,
  Circle,
  Divider,
  Flex,
  HStack,
  Icon,
  Skeleton,
  Spinner,
  Square,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

import { getLeaderboard, getProfile, getRanking } from "../api/SMCard";
import { useAuthContext } from "../contexts/authProvider";
import { isRequestSuccess } from "../utils/api";
import { formatNumber } from "../utils/functions";

const SMCard = ({ width }) => {
  const { userData } = useAuthContext();
  const userId = userData?.id;
  const memberId = userData?.memberid;

  const router = useRouter();

  const [leaderboard, setLeaderboard] = useState({
    data: new Array(5).fill(0),
    loading: true,
  });
  const [ranking, setRanking] = useState({
    data: 0,
    loading: true,
  });
  const [SMPoint, setSMPoint] = useState({
    data: 0,
    loading: true,
  });
  const [SMPay, setSMPay] = useState({
    data: 0,
    loading: true,
  });

  const toast = useToast();
  const errorToast = (errMessage) => {
    toast({
      position: "top",
      title: errMessage,
      status: "error",
      isClosable: true,
    });
  };

  useEffect(() => {
    getLeaderboard()
      .then((res) => {
        if (isRequestSuccess(res.data)) {
          setLeaderboard({
            data: res.data.data ?? [],
            loading: false,
          });
        } else {
          throw "Gagal mendapatkan leaderboard";
        }
      })
      .catch((err) => {
        console.error(err);
        errorToast(err);
        setLeaderboard({ data: [], loading: false });
      });
  }, []);

  useEffect(() => {
    if (memberId) {
      getRanking(memberId)
        .then((res) => {
          if (isRequestSuccess(res.data)) {
            console.log(res.data);
            setRanking({
              data: res.data.data.ranking,
              loading: false,
            });
          } else {
            throw "Gagal mendapatkan ranking";
          }
        })
        .catch((err) => {
          console.error(err);
          errorToast(err);
          setRanking({ data: 0, loading: false });
        });
    }
  }, [memberId]);

  useEffect(() => {
    if (userId) {
      getProfile(userId)
        .then((res) => {
          if (isRequestSuccess(res.data)) {
            setSMPay({
              data: res.data.memberdeposit ?? 0,
              loading: false,
            });

            setSMPoint({
              data: res.data.smpoint ?? 0,
              loading: false,
            });
          } else {
            throw "Gagal mendapatkan profile user";
          }
        })
        .catch((err) => {
          console.error(err);
          errorToast(err);
          setSMPay({ data: 0, loading: false });
          setSMPoint({ data: 0, loading: false });
        });
    }
  }, [userId]);

  return (
    <Box
      pt={{ base: "0.5rem", md: "3.5rem" }}
      w={width}
      h={{ base: "fit-content", md: "22rem" }}
      mb="1rem"
      mt="2rem"
    >
      <Center bg="gray.50" w="full" h="32%" borderTopRadius="lg">
        <Center w="60%">
          <Box marginRight={{ base: "0.3rem", sm: "0.6rem" }} ml="0.6rem">
            <Text
              color="red.600"
              className="primaryFont"
              fontWeight="700"
              fontSize="0.875rem"
            >
              SM Pay
            </Text>
            {SMPay.loading ? (
              <Spinner />
            ) : (
              <Text
                className="secondaryFont"
                fontWeight="500"
                fontSize="0.875rem"
              >
                Rp {formatNumber(SMPay.data)}
              </Text>
            )}
          </Box>
          <Box marginLeft={{ base: "0.3rem", sm: "0.7rem" }}>
            <Text
              color="red.600"
              className="primaryFont"
              fontWeight="700"
              fontSize="0.875rem"
            >
              SM Point
            </Text>
            {SMPoint.loading ? (
              <Spinner />
            ) : (
              <Text
                className="secondaryFont"
                fontWeight="500"
                fontSize="0.875rem"
              >
                {SMPoint.data}
              </Text>
            )}
          </Box>
        </Center>
        <Divider
          orientation="vertical"
          h="3.5rem"
          borderRight="1px"
          color="gray.400"
        />
        <Center w="40%">
          <Square
            size={{ base: "2.8rem", sm: "3rem" }}
            marginRight={{ base: "0.3rem", sm: "0.7rem" }}
            flexDirection="column"
            cursor="pointer"
          >
            <Icon
              as={IoIosAddCircle}
              color="red.600"
              boxSize={{ base: "1.8rem", sm: "2rem" }}
              onClick={() => router.push("/top-up")}
            />
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
            size={{ base: "2.8rem", sm: "3rem" }}
            marginLeft={{ base: "0.3rem", sm: "0.7rem" }}
            flexDirection="column"
            cursor="pointer"
          >
            <Icon
              as={FaHistory}
              color="red.600"
              marginTop="0.1rem"
              boxSize={{ base: "1.6rem", sm: "1.8rem" }}
              marginBottom="0.1rem"
              onClick={() => router.push("/riwayat")}
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
      <Stack
        p="1rem"
        w="full"
        h={{ base: "100%", md: "68%" }}
        bg="red.600"
        borderBottomRadius="lg"
        direction={{ base: "column", sm: "row" }}
      >
        <Circle
          bg="white"
          flexDirection="column"
          alignSelf="center"
          className="secondaryFont"
          shadow="xl"
          size={{ base: "8rem", md: "9rem" }}
          maxW={{ base: "100%", sm: "40%" }}
          maxH="full"
        >
          <Text fontSize="0.875rem" fontWeight="500">
            Ranking Saya
          </Text>
          {ranking.loading ? (
            <Spinner />
          ) : (
            <Text fontSize="1.5rem" fontWeight="500">
              {formatNumber(ranking.data)}
            </Text>
          )}
        </Circle>
        <VStack color="white" fontSize="0.9rem" w={{ base: "full", sm: "60%" }}>
          <Text fontWeight="700" className="primaryFont">
            Leaderboard
          </Text>
          <VStack
            justify="space-between"
            fontSize="0.8rem"
            fontWeight="500"
            className="secondaryFont"
            spacing="0.3rem"
            w="full"
          >
            {leaderboard.data.map((each, index) => (
              <Skeleton
                isLoaded={!leaderboard.loading}
                key={index}
                w="full"
                justify="space-between"
                h="20px"
              >
                <Flex>
                  <Text w="70%" isTruncated>
                    {index + 1}. {each.membername}
                  </Text>
                  <Text w="30%" isTruncated>
                    {each.smpoint} poin
                  </Text>
                </Flex>
              </Skeleton>
            ))}
          </VStack>
        </VStack>
      </Stack>
    </Box>
  );
};

export default SMCard;
