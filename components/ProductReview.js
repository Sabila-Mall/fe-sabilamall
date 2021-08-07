import { Image } from "@chakra-ui/image";
import { Flex, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import { IoStar } from "react-icons/io5";

const ProductReview = () => {
  const totalReview = 999;
  const comments = [
    {
      profilePicture: "",
      star: 5,
      date: "Kemarin",
      username: "Anonymous",
      comment:
        "I love tiramisu wafer. Chocolate chocolate cake powder chocolate cake sweet roll sugar plum pie. Liquorice carrot cake I love liquorice sweet icing powder cookie. Cake bear claw bonbon chocolate icing chocolate chocolate cake. Marshmallow chupa chups lollipop. Liquorice I love wafer soufflé bonbon.",
    },
    {
      profilePicture: "",
      star: 5,
      date: "10 tahun yang lalu",
      username: "Aldi Naufal Fitrah",
      comment:
        "I love tiramisu wafer. Chocolate chocolate cake powder chocolate cake sweet roll sugar plum pie. Liquorice carrot cake I love liquorice sweet icing powder cookie. Cake bear claw bonbon chocolate icing chocolate chocolate cake. Marshmallow chupa chups lollipop. Liquorice I love wafer soufflé bonbon.",
    },
    {
      profilePicture: "",
      star: 5,
      date: "7 hari yang lalu",
      username: "Anonymous",
      comment:
        "I love tiramisu wafer. Chocolate chocolate cake powder chocolate cake sweet roll sugar plum pie. Liquorice carrot cake I love liquorice sweet icing powder cookie. Cake bear claw bonbon chocolate icing chocolate chocolate cake. Marshmallow chupa chups lollipop. Liquorice I love wafer soufflé bonbon.",
    },
    {
      profilePicture: "",
      star: 5,
      date: "2 Bulan yang lalu",
      username: "Gani Gani Gani",
      comment:
        "I love tiramisu wafer. Chocolate chocolate cake powder chocolate cake sweet roll sugar plum pie. Liquorice carrot cake I love liquorice sweet icing powder cookie. Cake bear claw bonbon chocolate icing chocolate chocolate cake. Marshmallow chupa chups lollipop. Liquorice I love wafer soufflé bonbon.",
    },
  ];

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
    console.log(ret);
    return ret;
  };

  return (
    <VStack className={"secondaryFont"} alignItems={"flex-start"} id="review">
      <Flex
        direction={{ base: "column", md: "row" }}
        fontSize={"24px"}
        as={"b"}
      >
        <Text mr={{ base: 0, md: "1rem" }} className={"primaryFont"}>
          Penilaian Produk{" "}
        </Text>
        <Text textColor={"orange.300"}>({totalReview} ulasan)</Text>
      </Flex>

      <HStack></HStack>

      <VStack spacing={"16px"}>
        {comments.map((comment, index) => {
          return (
            <Flex
              key={index}
              backgroundColor={"gray.50"}
              borderRadius={"12px"}
              flexDirection={"row"}
              py={"25px"}
              pr={"30px"}
              pl={"25px"}
            >
              <Image />

              <Flex flexDirection={"column"} ml={"16px"}>
                <Flex
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  mb={"7px"}
                >
                  <Flex flexDirection={"column"}>
                    <Flex>{renderStar(comment.star)}</Flex>
                    <Text
                      as={"b"}
                      className={"primaryFont"}
                      textColor={"gray.600"}
                      fontSize={"16px"}
                    >
                      {comment.username}
                    </Text>
                  </Flex>
                  <Text as={"bold"} textColor={"gray.400"} fontSize={"14px"}>
                    {comment.date}
                  </Text>
                </Flex>
                <Text textColor={"gray.500"} fontSize={"14px"}>
                  {comment.comment}
                </Text>
              </Flex>
            </Flex>
          );
        })}
      </VStack>
    </VStack>
  );
};

export default ProductReview;
