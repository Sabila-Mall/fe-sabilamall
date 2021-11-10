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
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
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

import { apiSendMail } from "../../api/SendEmail";
import { Layout } from "../../components/Layout";
import styles from "../../styles/ContactUs.module.scss";
import { socialMedia } from "../../utils/socialMediaLink";

const contactUs = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    setLoading(true);
    const res = await apiSendMail(name, phone, email, message);
    if (res.success === true) {
      toast({
        title: "Email sent",
        description: "Pesan sukses terkirim!",
        status: "success",
        duration: 4000,
        position: "top",
      });
    } else {
      toast({
        title: "Email failed to sent",
        description: "Gagal mengirimkan email",
        status: "error",
        duration: 4000,
        position: "top",
      });
    }
    setLoading(false);
  };

  return (
    <Layout
      hasFooter
      hasNavbar
      hasPadding
      hasBreadCrumb
      breadCrumbItem={[
        { name: "Kontak Kami", link: "/contact-us", isOnPage: true },
      ]}
    >
      <Flex fontWeight="500" flexDirection="column" justifyContent="center">
        <Box>
          <Text
            mb="25px"
            fontWeight="700"
            fontSize={{ base: "2rem", "2xl": "3rem" }}
          >
            Kontak Kami
          </Text>

          <Grid
            gridTemplateColumns={{
              lg: "280px auto 260px",
              xl: "320px auto 280px",
            }}
            gridTemplateRows={{ base: "repeat(auto)", lg: "12% auto " }}
            gap={{ base: 10, lg: 4, xl: 6 }}
          >
            <GridItem order={{ lg: 2 }}>
              <Stack
                h="100%"
                w="100%"
                flexDirection={{ lg: "column" }}
                spacing="25px"
              >
                <Stack
                  h="100%"
                  direction={{ base: "column", lg: "row" }}
                  spacing={{ base: "1rem" }}
                >
                  <Flex alignItems="center">
                    <FaPhoneAlt color="orange" className={styles.icon} />
                    <Text fontSize={{ base: "14px", xl: "1rem" }} pl="0.64rem">
                      +62 851-5653-6861
                    </Text>
                  </Flex>
                  <Divider
                    orientation="vertical"
                    display={{ base: "none", lg: "block" }}
                  />
                  <Flex alignItems="center">
                    <IoMail color="orange" className={styles.icon} />
                    <Text fontSize={{ base: "14px", xl: "1rem" }} pl="0.64rem">
                      bisnis@sabilamall.co.id
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
                      <Text fontSize="14px" fontWeight="500">
                        Satria Building 2nd Lt 2 Unit A204-A206, Jl. Akses UI
                        No.24-26, Tugu, Kec. Cimanggis, Kota Depok, Jawa Barat
                        Depok Jawa Barat, 16451 Indonesia
                      </Text>
                    </Box>
                    <Box mt="1rem">
                      <Link
                        target="_blank"
                        href="https://g.page/sabilamall?share"
                        _hover={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="outline"
                          fontWeight="700"
                          colorScheme="orange"
                          fontSize="14px"
                        >
                          Lihat di Google Maps
                        </Button>
                      </Link>
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            </GridItem>

            <GridItem order={{ lg: 3 }} rowSpan={{ lg: 2 }}>
              <Stack direction="column" spacing={1}>
                <Flex justifyContent="center" my="60px">
                  <Image
                    src="/images/sm-mascott.svg"
                    alt=""
                    w="auto"
                    h={{ base: "200px", md: "320px" }}
                  />
                </Flex>
                <Text fontSize="1.5rem" fontWeight="700" textAlign="center">
                  Follow SabilaMall yuk!
                </Text>
                <Stack direction="row" spacing={4} justifyContent="center">
                  {socialMedia.map(({ link, logo }) => {
                    return (
                      <Link target="_blank" href={link} cursor="pointer">
                        {logo}
                      </Link>
                    );
                  })}
                </Stack>
              </Stack>
            </GridItem>

            <GridItem order={{ lg: 5 }} rowSpan={1}>
              <Stack spacing={5}>
                <Text fontSize="1.5rem" fontWeight="700">
                  Tinggalkan Pesan
                </Text>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    fontSize="1em"
                    children={<IoPeopleSharp color="#A0AEC0" size="24px" />}
                  />
                  <Input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Nama Anda"
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    fontSize="1em"
                    children={<IoMail color="#A0AEC0" size="24px" />}
                  />
                  <Input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Alamat email Anda"
                    value={email}
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    fontSize="1em"
                    children={<FaPhoneAlt color="#A0AEC0" size="24px" />}
                  />
                  <Input
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    placeholder="Nomor telepon Anda"
                  />
                </InputGroup>
                <Textarea
                  h="7.5rem"
                  placeholder="Tuliskan pesan Anda di sini (minimal 25 karakter)"
                  resize={"none"}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <Flex justifyContent="flex-end">
                  <Button
                    isLoading={loading}
                    onClick={handleSubmit}
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
