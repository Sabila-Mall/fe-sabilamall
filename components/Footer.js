import {
  Box, Icon, Image, Heading, Text, Flex, Center, HStack, VStack, IconButton,
  Link, Grid, GridItem, useMediaQuery,
} from "@chakra-ui/react";

import { FaFacebookSquare, FaLinkedin, FaUser } from "react-icons/fa";
import { IoLogoTwitter, IoLogoInstagram, IoHomeSharp, IoCart, IoReceiptSharp }
  from "react-icons/io5";

import styles from "../styles/Footer.module.scss";

const MobileFooter = () => {
  return (
      <Flex
        color="gray.500"
        pb={2}
        pt={3}
        px={{ base: 9, md: 12}}
        fontSize="12px"
        justifyContent={"space-between"}
        borderTop="1px"
        borderColor="gray.200"
      >
        <VStack
          as="a"
          target="_blank"
          variant="outline"
          href="https://chakra-ui.com"
        >
          <Icon
            aria-label={"Home"}
            as={IoHomeSharp}
            w={6}
            h={6}
          />
          <Text m="0">Home</Text>
        </VStack>
        <VStack
          as="a"
          target="_blank"
          variant="outline"
          href="https://chakra-ui.com"
        >
          <Icon
            aria-label={"Keranjang"}
            as={IoCart}
            w={6}
            h={6}
          />
          <Text>Keranjang</Text>
        </VStack>
        <VStack
          as="a"
          target="_blank"
          variant="outline"
          href="https://chakra-ui.com"
        >
          <Icon
            aria-label={"Pesanan"}
            as={IoReceiptSharp}
            w={6}
            h={6}
          />
          <Text>Pesanan</Text>
        </VStack>
        <VStack
          as="a"
          target="_blank"
          variant="outline"
          href="https://chakra-ui.com"
        >
          <Icon
            aria-label={"Akun"}
            as={FaUser}
            w={6}
            h={6}
          />
          <Text>Akun</Text>
        </VStack>
      </Flex>
  )
}

const DesktopFooter = () => {
  return (
    <Box as="footer" bg="gray.100">
      <HStack px={{ base: 10, md: 20, lg: 28 }} pt={10} alignItems="initial">
        <Flex flexDirection="column" flex="1">
          <Box pb={10}>
            <Heading fontSize="18px" className={styles.primaryFont} pb={2}>
              Tentang Kami
            </Heading>
            <Text className={styles.secondaryFont}>
              Aplikasi Reselling (Jualan Bareng) terlengkap,
              milik Anak Negeri di Indonesia!
            </Text>
          </Box>

          <Box pb={10}>
            <Heading fontSize="18px" className={styles.primaryFont} pb={2}>
              Kunjungi Kami
            </Heading>
            <Text className={styles.secondaryFont}>
              Satria Building 2nd Lt 2 Unit A204-A206, Jl. Akses
              UI No.24-26, Tugu, Kec. Cimanggis, Kota Depok,
              Jawa Barat, Indonesia. Kode pos 16451.
            </Text>
          </Box>

          <Box>
            <Heading fontSize="18px" className={styles.primaryFont} pb={3}>
              Unduh Aplikasi
            </Heading>
            <Image
              src="/images/Footer/google-play.svg"
              alt="Google Play Store"
            />
          </Box>
        </Flex>

        <VStack flex="1" mx="auto">
          <Box pb={10} >
            <Heading fontSize="18px" className={styles.primaryFont} pb={2}>
              Informasi
            </Heading>
            <VStack spacing={2} align="initial" className={styles.secondaryFont}>
              <Link>Mengenal SabilaMall</Link>
              <Link>Gabung Reseller Baju Muslim</Link>
              <Link>Kebijakan Privasi</Link>
              <Link>Syarat & Ketentuan</Link>
              <Link>Kontak kami</Link>
            </VStack>
          </Box>

          <Box>
            <Heading fontSize="18px" className={styles.primaryFont} pb={2}>
              Ikuti Kami
            </Heading>
            <HStack spacing={{ base: 1, lg: 4 }} className={styles.secondaryFont}>
              <IconButton aria-label="Facebook" as={FaFacebookSquare} color="orange.400" w={6} h={6}/>
              <IconButton aria-label="Twitter" as={IoLogoTwitter} color="orange.400" w={6} h={6}/>
              <IconButton aria-label="Instagram" as={IoLogoInstagram} color="orange.400" w={6} h={6}/>
              <IconButton aria-label="LinkedIn" as={FaLinkedin} color="orange.400" w={6} h={6}/>
            </HStack>
          </Box>
        </VStack>

        <VStack alignItems="initial" flex="1">
          <Heading fontSize="18px" className={styles.primaryFont} pb={7}>
            Partner Resmi
          </Heading>
          <Grid
            gap={10} pb={8}
            templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            placeItems="center"
          >
            <GridItem>
              <Image
                src="/images/Footer/pos-indonesia.svg"
                alt="Pos Indonesia"
              />
            </GridItem>
            <GridItem>
              <Image
                src="/images/Footer/sap.svg"
                alt="SAP"
              />
            </GridItem>
            <GridItem>
              <Image
                src="/images/Footer/sicepat.svg"
                alt="SiCepat"
              />
            </GridItem>
            <GridItem
              colSpan={{ lg: 3 }}
              justifySelf="center"
            >
              <Image
                src="/images/Footer/jne-express.svg"
                alt="JNE Express"
              />
            </GridItem>
          </Grid>
        </VStack>
      </HStack>
      <Center fontSize="12px" pb={4}>
        © 2021 PT Sabilamall Niaga Digital.
      </Center>
    </Box>
  )
}

const Footer = () => {
  const [desktop] = useMediaQuery("(min-width: 480px)")

  if (desktop) {
    return <DesktopFooter />;
  }
  return <MobileFooter />;
}

export default Footer;
