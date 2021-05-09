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

const contactUs = () => {
  return (
    <>
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

          <Text mb="25px" as="h1" fontWeight="700" fontSize="2.25rem" mt="2rem">
            Kontak Kami
          </Text>

          <Grid gridTemplateRows={{ base: "repeat(auto)" }} gap={10}>
            <GridItem>
              <Stack direction={{ base: "column" }} spacing={{ base: "1rem" }}>
                <Flex alignItems="center">
                  <FaPhoneAlt size="2rem" color="orange" />
                  <Text fontSize={["14px"]} pl="0.64rem">
                    +62 851-5995-4161
                  </Text>
                </Flex>
                <Flex alignItems="center">
                  <IoMail size="2rem" color="orange" />
                  <Text fontSize={["14px"]} pl="0.64rem">
                    customer@sabilamall.co.id
                  </Text>
                </Flex>
              </Stack>
            </GridItem>

            <GridItem>
              <Flex flexDirection={["column"]}>
                <AspectRatio
                  ratio={1 / 1}
                  borderRadius="20px"
                  overflow="hidden"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3005748285827!2d106.83741871529621!3d-6.355123363942694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edea57fe727d%3A0xd91affb117d8be88!2sSabilaMall!5e0!3m2!1sen!2sid!4v1620499207093!5m2!1sen!2sid"
                    width="22rem"
                    height="22rem"
                    allowFullScreen={true}
                    loading="lazy"
                  ></iframe>
                </AspectRatio>

                <Flex mt="24px">
                  <Box>
                    <IoLocation size="2rem" color="orange" />
                  </Box>
                  <Flex direction="column">
                    <Box>
                      <Text as="h1" fontSize="14px" fontWeight="500">
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
                        fontSize="14px"
                      >
                        Lihat di Google Maps
                      </Button>
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column">
                <Flex justifyContent="center">
                  <Image
                    src="/images/sm-mascott.svg"
                    alt=""
                    w="260px"
                    h="403px"
                  />
                </Flex>
                <Text fontSize="1.5rem" fontWeight="700" textAlign="center">
                  Follow SabilaMall yuk!
                </Text>
                <Stack direction="row" spacing={4} justifyContent="center">
                  <IoLogoFacebook size="2.5rem" color="orange" />
                  <IoLogoTwitter size="2.5rem" color="orange" />
                  <IoLogoInstagram size="2.5rem" color="orange" />
                  <IoLogoLinkedin size="2.5rem" color="orange" />
                </Stack>
              </Flex>
            </GridItem>

            <GridItem>
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
                    w="100%"
                    colorScheme="red"
                    color="white"
                    fontWeight="700"
                  >
                    Kirim
                  </Button>
                </Flex>
              </Stack>
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </>
  );
};

export default contactUs;
