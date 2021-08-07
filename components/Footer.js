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
  Link,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { FaFacebookSquare, FaLinkedin, FaUser } from "react-icons/fa";
import { IoLogoTwitter, IoLogoInstagram } from "react-icons/io5";

import styles from "../styles/Footer.module.scss";

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
              Satria Building 2nd Lt 2 Unit A204-A206, Jl. Akses UI No.24-26,
              Tugu, Kec. Cimanggis, Kota Depok, Jawa Barat, Indonesia. Kode pos
              16451.
            </Text>
          </Box>

          <Box pb={{ base: 5, md: 0 }}>
            <Heading fontSize="18px" className={styles.primaryFont} pb={3}>
              Unduh Aplikasi
            </Heading>
            <Image
              src="/images/Footer/google-play.png"
              alt="Google Play Store"
            />
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
              <Link>Mengenal SabilaMall</Link>
              <Link>Gabung Reseller Baju Muslim</Link>
              <Link>Kebijakan Privasi</Link>
              <Link>Syarat & Ketentuan</Link>
              <Link>Kontak kami</Link>
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
              <Link
                href="https://facebook.com"
                target="_blank"
                _focus={{ boxShadow: "none" }}
              >
                <Icon
                  aria-label="Facebook"
                  as={FaFacebookSquare}
                  color="orange.400"
                  w={6}
                  h={6}
                />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                _focus={{ boxShadow: "none" }}
              >
                <Icon
                  aria-label="Twitter"
                  as={IoLogoTwitter}
                  color="orange.400"
                  w={6}
                  h={6}
                />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                _focus={{ boxShadow: "none" }}
              >
                <Icon
                  aria-label="Instagram"
                  as={IoLogoInstagram}
                  color="orange.400"
                  w={6}
                  h={6}
                />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                _focus={{ boxShadow: "none" }}
              >
                <Icon
                  aria-label="LinkedIn"
                  as={FaLinkedin}
                  color="orange.400"
                  w={6}
                  h={6}
                />
              </Link>
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
            <GridItem colSpan={{ lg: 3 }} justifySelf="center">
              <Image
                className={styles.partnerLogo}
                src="/images/Footer/jne-express.png"
                alt="JNE Express"
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
