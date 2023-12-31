import {
  Heading,
  Box,
  Text,
  Flex,
  Divider,
  Image,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Layout } from "../components/Layout";
import { cardContent } from "../constants/about-us";

const display = { base: "none", lg: "block" };

const TextStyled = ({ text, ...props }) => (
  <Text fontWeight={500} fontSize="1rem" lineHeight="1.5rem" {...props}>
    {text}
  </Text>
);

const Card = ({ textHead, textBody, icon }) => (
  <Flex
    justify="center"
    align="center"
    flexDirection="column"
    flexGrow={1}
    px="1.5rem"
    border="1px solid #F6AD55"
    h="15.8rem"
    w="100%"
    maxWidth="22.82rem"
    borderRadius="10px"
    mb=".5rem"
    py=".3rem"
    m={{ base: "0", md: ".8rem" }}
    my={{ base: ".5rem", md: ".8rem" }}
  >
    <Flex justify="center">
      <Icon
        as={icon}
        color="orange.500"
        w={10}
        h={10}
        mr=".8rem"
        display={{ base: "none", md: "block" }}
      />
      <Text
        textAlign={{ base: "center", md: "left" }}
        fontSize={{ base: "1rem", md: "1.1rem" }}
        lineHeight="1.7rem"
      >
        {textHead}
      </Text>
    </Flex>
    <Divider borderColor="gray.300" my=".75rem" />
    <Text
      textAlign="center"
      fontSize={{ base: "0.75rem", md: ".875rem" }}
      lineHeight="1.125rem"
    >
      {textBody}
    </Text>
  </Flex>
);

const About = () => {
  const router = useRouter();

  return (
    <Layout hasNavbar hasFooter hasPadding>
      <Box
        className="secondaryFont"
        pt={{ base: "1.5rem", md: "3rem", lg: "5rem" }}
      >
        <Flex direction={{ base: "column-reverse", md: "row" }}>
          {/* start section kiri mascot */}
          <Box>
            <Box>
              <Heading color="red.600" fontWeight={500} fontSize="2.25rem">
                Selamat Datang di Sabila Mall
              </Heading>
              <TextStyled
                mt={{ base: "0rem", lg: ".5rem" }}
                fontSize={{ base: "1rem", lg: "1.125rem" }}
                text="Aplikasi Reselling (Jualan Bareng) Terlengkap, Milik Anak Negeri di Indonesia!"
              />
            </Box>
            <Box mt={{ base: "1rem", lg: "2rem" }}>
              <TextStyled
                text="Apakah Anda..."
                fontSize={{ base: "1.5rem", lg: "1.75rem" }}
                color="orange.500"
                lineHeight="2.25rem"
              />
              <TextStyled
                w={{ base: "100%", lg: "55%" }}
                fontSize={{ base: "1rem", lg: "1.125rem" }}
                text="seorang ibu rumah tangga/pelajar/karyawan/kepala keluarga yang sedang ingin mendapatkan penghasilan tambahan tanpa menganggu waktu sehari-hari?"
              />
            </Box>
          </Box>
          {/* end section kiri mascot  */}

          {/* mascot */}
          <Image
            width={{ base: "60%", md: "auto" }}
            mx="auto"
            mb={{ base: "2rem", lg: 0 }}
            src="/images/About/mascot.svg"
          />
        </Flex>

        <Divider borderColor="gray.300" my="4rem" />

        <Box mt="2rem">
          <TextStyled
            text="Bergabunglah bersama ribuan Agen dan Reseller di SabilaMall! "
            fontSize={{ base: "1.125rem", lg: "1.75rem" }}
            lineHeight="1.7rem"
          />
          <TextStyled
            mt=".5rem"
            fontSize={{ base: ".875rem", lg: "1rem" }}
            text="SabilaMall didirikan pada  akhir 2018 oleh Nasirudin MeC, seorang pengusaha multitalenta yang aktif juga sebagai internet marketer, trainer, penulis dan coach bisnis sejak 2007. Bermula dari penjualan fashion, kini merambah produk makanan, kecantikan hingga peralatan rumah tangga. Ada lebih dari 50 brand serta ribuan produk yang bisa anda jual tanpa perlu takut biaya tambahan bila mendaftar. Anda juga tidak perlu memikirkan stok, packingan hingga pengiriman. Cukup kendalikan semua penjualan dari smartphone Anda"
          />
          <TextStyled
            mt=".5rem"
            color="orange.500"
            fontSize={{ base: ".875rem", lg: "1rem" }}
            text="Bagi yang ingin join reseller SabilaMall silakan hubungi admin kami di nomor Whatsapp +62 838-2054-8149"
          />
        </Box>

        <Box mt={{ base: "2rem", lg: "3.7rem" }}>
          <TextStyled
            text="SabilaMall adalah Aplikasi Reseller Terlengkap Indonesia. "
            fontSize={{ base: "1.125rem", lg: "1.75rem" }}
            lineHeight="1.7rem"
          />
          <TextStyled
            mt=".5rem"
            fontSize={{ base: ".875rem", lg: "1rem" }}
            text="Siapapun anda dari kalangan ibu rumah tangga, pelajar, mahasiswa hingga pekerja dapat memiliki usaha sendiri dengan modal minim dan resiko kecil."
          />
        </Box>

        <Box mt={{ base: "2rem", lg: "3.7rem" }}>
          <TextStyled
            fontSize={{ base: "1.3rem", lg: "1.75rem" }}
            textAlign="center"
            lineHeight="2.25rem"
            text="Keunggulan dan Keuntungan Bergabung di SabilaMall"
          />
        </Box>

        <Flex
          maxWidth={{ base: "800px", lg: "1150px", xl: "1200px" }}
          mx="auto"
          flexWrap="wrap"
          justify="center"
          mt={{ base: "2rem", lg: "3.7rem" }}
        >
          {cardContent.map(({ id, textHead, textBody, icon }) => (
            <Card
              key={id}
              textHead={textHead}
              textBody={textBody}
              icon={icon}
            />
          ))}
        </Flex>
        <Flex justify="center">
          <Button
            color="white"
            _focus={{ outline: "none" }}
            _hover={{ bg: "red.700" }}
            _active={{ bg: "red.600" }}
            bg="red.600"
            mt={{ base: "1.5rem", md: "2rem" }}
            onClick={() => router.push("/contact-us")}
            fontSize={{ base: "0.9rem", md: "1rem" }}
            fontWeight="normal"
          >
            Hubungi Kami
          </Button>
        </Flex>
      </Box>
    </Layout>
  );
};

export default About;
