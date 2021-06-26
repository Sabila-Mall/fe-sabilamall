import { Box, Image, Flex, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const imageSrc = [
  {
    src: "images/ProductDetail/image2.svg",
  },
  {
    src: "images/ProductDetail/image3.svg",
  },
  {
    src: "images/ProductDetail/image5.svg",
  },
  {
    src: "images/ProductDetail/image6.svg",
  },
  {
    src: "images/ProductDetail/image7.svg",
  },
];

export const ProductImages = () => {
  // Set which Image clicked
  // To be implemented when APIs ready
  const [imageNum, setImageNum] = useState(0);

  return (
    <Box w="100%">
      <Flex flexDir="column" justifyContent="center" mb="1.5rem">
        <Flex mb="1rem" justifyContent="center">
          <Box>
            <Image src="images/produk.svg" />
          </Box>
        </Flex>

        <Flex justifyContent="center">
          <Box
            pos="relative"
            w={{ base: "100%", md: "50%", lg: "100%", xl: "90%" }}
          >
            <Box
              position="absolute"
              top="25%"
              bg="rgba(246, 173, 85, 0.8)"
              cursor="pointer"
            >
              <MdKeyboardArrowLeft size="2em" color="white" />
            </Box>
            <Box
              position="absolute"
              top="25%"
              right="0"
              bg="rgba(246, 173, 85, 0.8)"
              cursor="pointer"
            >
              <MdKeyboardArrowRight size="2em" color="white" />
            </Box>
            <Flex justifyContent="space-between">
              {imageSrc.map((e) => {
                return <Image key={e.src} src={e.src} />;
              })}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
