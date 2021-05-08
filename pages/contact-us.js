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
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaPhoneAlt, FaFacebookSquare } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import {
  IoChevronForwardSharp,
  IoMail,
  IoPeopleSharp,
  IoLocation,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoLinkedin,
} from "react-icons/io5";

const contact = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  return (
    <Flex
      fontWeight="500"
      mx={["2rem", "3rem", "2rem", "2rem", "5rem", "7.5rem"]}
      flexDirection="column"
      justifyContent="center"
    >
      <Box mt="1.25rem">
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

        <Text as="h1" fontWeight="700" fontSize="2.25rem" mt="2rem">
          Kontak Kami
        </Text>

        <Flex w="100%" flexDirection={isLargerThan768 ? "row" : "column"}>
          <Box
            w="22rem"
            maxW={{ sm: "19.5rem", lg: "19.5rem", xl: "22.5rem" }}
            mr="1rem"
          >
            <Flex w="100%" flexDirection="column">
              <AspectRatio ratio={1 / 1} borderRadius="20px" overflow="hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3005748285827!2d106.83741871529621!3d-6.355123363942694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edea57fe727d%3A0xd91affb117d8be88!2sSabilaMall!5e0!3m2!1sen!2sid!4v1620499207093!5m2!1sen!2sid"
                  width="22rem"
                  height="22rem"
                  allowfullscreen={true}
                  loading="lazy"
                ></iframe>
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
                      fontSize="0.875rem"
                    >
                      Lihat di Google Maps
                    </Button>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </Box>

          <Flex w="50%" direction="column" px="1rem">
            <Flex
              h="20%"
              w="100%"
              direction="column"
              justifyContent="space-between"
            >
              <Flex
                w="100%"
                h="50%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Flex alignItems="center">
                  {!isLargerThan1280 ? (
                    <FaPhoneAlt color="rgba(246, 173, 85, 1)" size="1rem" />
                  ) : (
                    <FaPhoneAlt color="rgba(246, 173, 85, 1)" size="2rem" />
                  )}

                  <Text
                    fontSize={isLargerThan1280 ? "1rem" : "0.9rem"}
                    as="h1"
                    pl="0.64rem"
                  >
                    +62 851-5995-4161
                  </Text>
                </Flex>
                <Divider orientation="vertical" />
                <Flex alignItems="center">
                  {!isLargerThan1280 ? (
                    <IoMail color="rgba(246, 173, 85, 1)" size="1rem" />
                  ) : (
                    <IoMail color="rgba(246, 173, 85, 1)" size="2rem" />
                  )}
                  <Text pl="0.64rem">customer@sabilamall.co.id</Text>
                </Flex>
              </Flex>
              {isLargerThan768 ? (
                <Box h="31%">
                  <Divider orientation="horizontal" />
                </Box>
              ) : null}
            </Flex>

            <Box h="80%">
              <Text as="h1" fontSize="1.5rem">
                Tinggalkan Pesan
              </Text>
              <Stack spacing={4} mt="1.4rem">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IoPeopleSharp color="#A0AEC0" />}
                  />
                  <Input type="tel" placeholder="Nama Anda" />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    fontSize="1em"
                    children={<IoMail color="#A0AEC0" />}
                  />
                  <Input placeholder="Alamat email Anda" />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    fontSize="1em"
                    children={<FaPhoneAlt color="#A0AEC0" />}
                  />
                  <Input placeholder="Nomor telepon Anda" />
                </InputGroup>
                <Textarea
                  h="7.5rem"
                  placeholder="Tuliskan pesan Anda di sini"
                  resize={"none"}
                />
                <Flex justifyContent="flex-end">
                  <Button
                    w="10.4rem"
                    colorScheme="red"
                    color="white"
                    fontWeight="700"
                  >
                    Kirim
                  </Button>
                </Flex>
              </Stack>
            </Box>
          </Flex>

          <Flex direction="column">
            <Box>
              <Image
                maxW={{ xl: "22rem" }}
                src="/Assets/sm-mascott.svg"
                alt=""
              />
            </Box>
            <Text fontSize="1.5rem" fontWeight="700">
              Follow SabilaMall yuk!
            </Text>
            <Stack direction="row" spacing={4} justifyContent="center">
              <IoLogoFacebook size="2.5rem" color="orange" />
              <IoLogoTwitter size="2.5rem" color="orange" />
              <IoLogoInstagram size="2.5rem" color="orange" />
              <IoLogoLinkedin size="2.5rem" color="orange" />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default contact;
