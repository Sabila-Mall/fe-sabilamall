import {
  Box,
  Icon,
  Image,
  Heading,
  Text,
  Flex,
  Center,
  Stack,
  HStack,
  VStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Link from "next/link";

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

import styles from "../styles/Footer.module.scss";
import { socialMedia } from "../utils/socialMediaLink";

const DesktopFooter = () => {
  return (
    <Box as="footer" bg="gray.100">
      <Stack
        px={{ base: 10, md: 20, lg: 28 }}
        pt={10}
        alignItems="initial"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Flex flexDirection="column" flex="1">
          <Box pb={{ base: 5, md: 10 }}>
            <Heading fontSize="18px" className={styles.primaryFont} pb={2}>
              Tentang Kami
            </Heading>
            <Text className={styles.secondaryFont}>
              Aplikasi Reselling (Jualan Bareng) terlengkap, milik Anak Negeri
              di Indonesia!
            </Text>
          </Box>

          <Box pb={{ base: 5, md: 10 }}>
            <Heading fontSize="18px" className={styles.primaryFont} pb={2}>
              Kunjungi Kami
            </Heading>
            <Text className={styles.secondaryFont}>
              Satria Building 2nd Lt 2 Unit A204-A205, Jl. Akses UI No.24-26,
              Tugu, Kec. Cimanggis, Kota Depok, Jawa Barat, Indonesia. Kode pos
              16451.
            </Text>
            <Flex alignItems="center">
              <FaPhoneAlt color="orange" className={styles.icon} />
              <Text className={styles.secondaryFont} pl="0.64rem">
                +62 838-2054-8149
              </Text>
            </Flex>
            <Flex alignItems="center">
              <IoMail color="orange" className={styles.icon} />
              <Text className={styles.secondaryFont} pl="0.64rem">
                bisnis@sabilamall.co.id
              </Text>
            </Flex>
          </Box>

          <Box pb={{ base: 5, md: 0 }}>
            <Heading fontSize="18px" className={styles.primaryFont} pb={3}>
              Unduh Aplikasi
            </Heading>
            <Text
              as="a"
              href="https://play.google.com/store/apps/details?id=id.co.sabilamall.sm_app"
              target="_blank"
            >
              <Image
                src="/images/Footer/google-play.png"
                alt="Google Play Store Sabila Mall"
                cursor="pointer"
              />
            </Text>
          </Box>
        </Flex>

        <VStack
          flex="1"
          mx="auto"
          alignItems={{ base: "flex-start" }}
          paddingLeft={{ md: "3rem" }}
        >
          <Box pb={{ base: 5, md: 10 }}>
            <Heading fontSize="18px" className={styles.primaryFont} pb={2}>
              Informasi
            </Heading>
            <VStack
              spacing={2}
              align="initial"
              className={styles.secondaryFont}
            >
              <Link href={"/about-us"}>
                <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>
                  Mengenal SabilaMall
                </Text>
              </Link>
              <Link href={"/join-reseller"}>
                <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>
                  Gabung Reseller Baju Muslim
                </Text>
              </Link>
              <Link href={"/privacy-policy"}>
                <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>
                  Kebijakan Privasi
                </Text>
              </Link>
              <Link href={"/terms-and-conditions"}>
                <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>
                  Syarat & Ketentuan
                </Text>
              </Link>
              <Link href={"/contact-us"}>
                <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>
                  Kontak kami
                </Text>
              </Link>
            </VStack>
          </Box>

          <Box pb={{ base: 5, md: 0 }}>
            <Heading fontSize="18px" className={styles.primaryFont} pb={2}>
              Ikuti Kami
            </Heading>
            <HStack
              spacing={{ base: 1, lg: 4 }}
              className={styles.secondaryFont}
            >
              {socialMedia.map(({ name, link, logoType }, index) => {
                return (
                  <Text
                    as="a"
                    href={link}
                    target="_blank"
                    _focus={{ boxShadow: "none" }}
                    cursor="pointer"
                    key={index}
                  >
                    <Icon
                      aria-label={name}
                      as={logoType}
                      color="orange.400"
                      w={6}
                      h={6}
                    />
                  </Text>
                );
              })}
            </HStack>
          </Box>
        </VStack>

        <VStack alignItems="initial" flex="1">
          <Heading fontSize="18px" className={styles.primaryFont} pb={7}>
            Partner Resmi
          </Heading>
          <Grid
            gap={10}
            pb={8}
            templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            placeItems="center"
          >
            <GridItem>
              <Image
                className={styles.partnerLogo}
                src="/images/Footer/pos-indonesia.png"
                alt="Pos Indonesia"
              />
            </GridItem>
            <GridItem>
              <Image
                className={styles.partnerLogo}
                src="/images/Footer/sap.png"
                alt="SAP"
              />
            </GridItem>
            <GridItem>
              <Image
                className={styles.partnerLogo}
                src="/images/Footer/sicepat.png"
                alt="SiCepat"
              />
            </GridItem>
            <GridItem>
              <Image
                className={styles.partnerLogo}
                src="/images/Footer/jne-express.png"
                alt="JNE Express"
              />
            </GridItem>
            <GridItem>
              <Image
                className={styles.partnerLogo}
                src="/images/Footer/ncs.png"
                alt="NCS"
              />
            </GridItem>
            <GridItem>
              <Image
                className={styles.partnerLogo}
                src="/images/Footer/wahana.png"
                alt="Wahana"
              />
            </GridItem>
          </Grid>
        </VStack>
      </Stack>
      <Center fontSize="14px" pb={20}>
        © 2021 PT Sabilamall Niaga Digital.
      </Center>
    </Box>
  );
};

const Footer = () => {
  return <DesktopFooter />;
};

export default Footer;
