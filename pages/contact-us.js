import {
  Box,
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
  Textarea,
  Button,
  Image,
} from "@chakra-ui/react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import {
  IoMail,
  IoPeopleSharp,
  IoLocation,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoLinkedin,
} from "react-icons/io5";

import { Layout } from "../components/Layout";
import styles from "../styles/ContactUs.module.scss";

const contactUs = () => {
  return (
    <Layout
      hasNavbar
      hasBreadCrumb
      breadCrumbItem={[{ name: "Kontak Kami", link: "#", isOnPage: true }]}
    >
      <Flex
        className={styles.layout}
        fontWeight="500"
        flexDirection="column"
        justifyContent="center"
      >
        <Box>
          <Text
            mb="25px"
            as="h1"
            fontWeight="700"
            fontSize={{ base: "2.25rem", "2xl": "3rem" }}
            mt="23px"
          >
            Kontak Kami
          </Text>

          <Grid
            gridTemplateColumns={{
              lg: "300px auto 260px",
              xl: "360px auto 280px",
            }}
            gridTemplateRows={{ base: "repeat(auto)", lg: "15% auto " }}
            gap={{ base: 10, lg: 2, xl: 5 }}
          >
            <GridItem order={{ lg: 2 }}>
              <Stack
                h="100%"
                w="100%"
                flexDirection={{ lg: "column" }}
                spacing="25px"
              >
                <Stack
                  justifyContent={{ lg: "space-between" }}
                  h="100%"
                  direction={{ base: "column", lg: "row" }}
                  spacing={{ base: "1rem" }}
                >
                  <Flex alignItems="center">
                    <FaPhoneAlt size="2rem" color="orange" />
                    <Text fontSize={{ base: "14px", xl: "1rem" }} pl="0.64rem">
                      +62 851-5995-4161
                    </Text>
                  </Flex>
                  <Divider
                    orientation="vertical"
                    display={{ base: "none", lg: "block" }}
                  />
                  <Flex alignItems="center">
                    <IoMail size="2rem" color="orange" />
                    <Text fontSize={{ base: "14px", xl: "1rem" }} pl="0.64rem">
                      customer@sabilamall.co.id
                    </Text>
                  </Flex>
                </Stack>
                <Divider
                  orientation="horizontal"
                  display={{ base: "none", lg: "block" }}
                />
              </Stack>
            </GridItem>

            <GridItem order={{ lg: 1 }} rowSpan={{ lg: 2 }}>
              <Flex flexDirection={["column"]}>
                <AspectRatio
                  ratio={1 / 1}
                  borderRadius="20px"
                  overflow="hidden"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3005748285827!2d106.83741871529621!3d-6.355123363942694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edea57fe727d%3A0xd91affb117d8be88!2sSabilaMall!5e0!3m2!1sen!2sid!4v1620499207093!5m2!1sen!2sid"
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

            <GridItem order={{ lg: 3 }} rowSpan={{ lg: 2 }}>
              <Stack direction="column" spacing={1}>
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
              </Stack>
            </GridItem>

            <GridItem order={{ lg: 5 }} rowSpan={1}>
              <Stack spacing={5}>
                <Text as="h1" fontSize="1.5rem" fontWeight="700">
                  Tinggalkan Pesan
                </Text>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    fontSize="1em"
                    children={<IoPeopleSharp color="#A0AEC0" size="24px" />}
                  />
                  <Input type="tel" placeholder="Nama Anda" />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    fontSize="1em"
                    children={<IoMail color="#A0AEC0" size="24px" />}
                  />
                  <Input placeholder="Alamat email Anda" />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    fontSize="1em"
                    children={<FaPhoneAlt color="#A0AEC0" size="24px" />}
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
                    w={{ base: "100%", lg: "10.4rem" }}
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
    </Layout>
  );
};

export default contactUs;
