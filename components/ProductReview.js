import {
  Avatar,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoStar } from "react-icons/io5";

import { IMAGE_HOST } from "../constants/api";

const ProductReview = ({ reviewed_customers }) => {
  const totalReview = reviewed_customers.length;

  const renderStar = (numberOfStars) => {
    const ret = [];

    for (let i = 0; i < numberOfStars; i++) {
      ret.push(
        <Icon
          key={i}
          aria-label={"Star rating"}
          as={IoStar}
          color={"orange.400"}
        />,
      );
    }

    for (let i = numberOfStars; i < 5; i++) {
      ret.push(<Icon key={i} aria-label={"Star rating"} as={IoStar} />);
    }
    return ret;
  };

  return (
    <VStack className={"secondaryFont"} alignItems={"flex-start"} id="review">
      <Flex
        direction={{ base: "column", md: "row" }}
        fontSize={"24px"}
        fontWeight="bold"
      >
        <Text mr={{ base: 0, md: "1rem" }} className={"primaryFont"}>
          Penilaian Produk{" "}
        </Text>
        <Text textColor={"orange.300"}>({totalReview} ulasan)</Text>
      </Flex>

      <HStack></HStack>

      <VStack spacing={"16px"} w="full">
        {reviewed_customers.map(
          ({
            customers_name,
            reviews_rating,
            created_at,
            image,
            reviews_text,
            reviews_id,
            is_hidden_name,
          }) => {
            return (
              <Flex
                key={reviews_id}
                backgroundColor={"gray.50"}
                borderRadius={"12px"}
                flexDirection={"row"}
                py={"25px"}
                pr={"30px"}
                pl={"25px"}
                w="full"
              >
                <Avatar src={IMAGE_HOST + image} />

                <Flex flexDirection={"column"} ml={"16px"}>
                  <Flex
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    mb={"7px"}
                  >
                    <Flex flexDirection={"column"}>
                      <Flex>{renderStar(Number(reviews_rating))}</Flex>
                      <Text
                        as={"b"}
                        className={"primaryFont"}
                        textColor={"gray.600"}
                        fontSize={"16px"}
                      >
                        {is_hidden_name == 1
                          ? customers_name?.substring(0, 3) + "***"
                          : customers_name}
                      </Text>
                    </Flex>
                    <Text
                      ml=".5rem"
                      as={"bold"}
                      textColor={"gray.400"}
                      fontSize={"14px"}
                    >
                      {created_at}
                    </Text>
                  </Flex>
                  <Text textColor={"gray.500"} fontSize={"14px"}>
                    {reviews_text}
                  </Text>
                </Flex>
              </Flex>
            );
          },
        )}
      </VStack>
    </VStack>
  );
};

export default ProductReview;
