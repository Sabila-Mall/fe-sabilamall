import {
  Box,
  Center,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  extendTheme,
  Text,
  Stack,
  AspectRatio,
  Flex,
  Divider,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement,
  Input,
  VStack,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import {
  IoChevronForwardSharp,
  IoMail,
  IoPeopleSharp,
  IoLocation,
} from "react-icons/io5";

const contact = () => {
  const useGetWindowWidth = () => {
    const [width, setWidth] = useState(
      typeof window !== "undefined" ? window.innerWidth : 0,
    );

    useEffect(() => {
      const onResize = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);

    return width;
  };

  return (
    <Flex
      fontWeight="500"
      mx={["2rem", "3rem", "2rem", "2rem", "7.5rem"]}
      flexDirection="column"
    >
      <Box>
        <Breadcrumb separator={<IoChevronForwardSharp size="0.75rem" />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#" color="orange.400">
              Kontak Kami
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Text as="h1" fontWeight="700" fontSize="3rem">
          Kontak Kami
        </Text>
        {useGetWindowWidth() > 1023 ? (
          <Flex w="100%">
            <Box w="30%">
              <Flex direction="column">
                <AspectRatio
                  ratio={1 / 1}
                  borderRadius="20px"
                  overflow="hidden"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.6511914828773!2d106.84040535481434!3d-6.354888779943661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edea57fe727d%3A0xd91affb117d8be88!2sSabilaMall!5e0!3m2!1sen!2sid!4v1620456567353!5m2!1sen!2sid"
                    width="22rem"
                    height="22rem"
                    allowfullscreen={true}
                  />
                </AspectRatio>
                <Flex mt="1rem">
                  <Box pr="1rem">
                    <IoLocation size="3rem" color="orange" />
                  </Box>
                  <Flex direction="column">
                    <Box>
                      <Text as="h1" fontSize="0.875rem" fontWeight="500">
                        Satria Building 2nd Lt 2 Unit A204-A206, Jl. Akses UI
                        No.24-26, Tugu, Kec. Cimanggis, Kota Depok, Jawa Barat
                        Depok Jawa Barat, 16451 Indonesia
                      </Text>
                    </Box>
                    <Box mt="1rem">
                      <Button
                        variant="outline"
                        fontWeight="700"
                        colorScheme="orange"
                      >
                        Lihat di Google Maps
                      </Button>
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
            <Flex w="45%" direction="column" px="1rem">
              <Box h="20%" bg="red.700">
                a
              </Box>
              <Box h="80%" bg="red.500">
                a
              </Box>
            </Flex>
            <Box w="25%" bg="blue.800"></Box>
          </Flex>
        ) : null}
      </Box>
    </Flex>
  );
};

export default contact;
