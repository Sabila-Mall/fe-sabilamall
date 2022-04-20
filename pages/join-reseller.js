import {
  Box,
  Text,
  Flex,
  Divider,
  Button,
  UnorderedList,
  ListItem,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";

import { Layout } from "../components/Layout";

const Join = () => {
  const router = useRouter();

  return (
    <Layout hasNavbar hasFooter hasPadding>
      <Head>
        <title>
          Join Reseller Baju Muslim - Sabilamall
        </title>
        <meta
          name="keywords"
          content="join reseller baju muslim, reseller baju muslim, reseller sabilamall, join reseller sabilamall"
        />
        <meta name="author" content="SabilaMall" />
        <meta name="DC.title" content="true" />
        <meta
          name="description"
          content="Terima kasih sudah tertarik untuk mendapatkan informasi terkait pendaftaran reseller SabilaMall! Selamat bergabung bersama lebih dari 7000 orang di Indonesia yang sudah bergabung lebih dulu."
        />
      </Head>
      <Box className="secondaryFont">
        <Text
          className="secondaryFont"
          fontWeight="bold"
          fontSize={{ base: "1.5rem", lg: "1.75rem" }}
        >
          Join Reseller Baju Muslim
        </Text>
        <Divider
          borderColor="gray.400"
          my={{ base: ".6rem", md: "1rem", lg: "1.2rem" }}
        />
        <Text marginBottom="10px">
          Terima kasih sudah tertarik untuk mendapatkan informasi terkait
          pendaftaran reseller SabilaMall!
        </Text>
        <Text marginBottom="10px">
          Selamat bergabung bersama lebih dari 7000 orang di Indonesia yang
          sudah bergabung lebih dulu.
        </Text>
        <Text marginBottom="10px">
          Selamat bergabung bersama orang-orang yang mau membangun
          Indonesia ini lebih baik, lebih produktif. Selamat bergabung bersama komunitas orang-orang yang sukses mandiri secara ekonomi.
        </Text>
        <Text marginBottom="10px">
          Kami sangat menyambut baik Anda untuk jualan bareng, belajar bareng
          dan maju bareng karena kami sudah menyiapkan berbagai kemudahan dan
          fasilitas seperti:
        </Text>
        <UnorderedList marginBottom="10px">
          <ListItem>
            Website dan aplikasi agar kita bisa cek stok sendiri bahkan order
            sendiri 24 jam sehari tanpa harus menunggu admin online.
          </ListItem>
          <ListItem>
            Kelas online belajar bareng agar kita makin pinter dan omset makin
            banter.
          </ListItem>
          <ListItem>
            Program iklan bareng seperti posting bareng, iklan bareng, like dan
            komen bareng alias OLOC dan lain-lain.
          </ListItem>
          <ListItem>
            Customer Service Officer yang online dari jam 5 pagi hingga jam 11
            malam!
          </ListItem>
        </UnorderedList>
        <Text marginBottom="10px">...dan masih banyak lagi kemudahan dan fasilitas lain.</Text>
        <Text>
          Baca info penawaran promo join reseller baju muslim{" "}
          <Link
            href="https://office.sabilamall.co.id/warotator.php?pos=jv&src=web"
            target="_blank" color="orange.500"
          >
            di sini.
          </Link>
        </Text>
        <Flex justify="center" mt="5.5rem" className="primaryFont">
          <Button
            color="white"
            _focus={{ outline: "none" }}
            _hover={{ bg: "orange.600" }}
            _active={{ bg: "orange.500" }}
            bg="orange.500"
            mt={{ base: ".5rem", md: "0rem" }}
            w={{ base: "full", md: "12.7rem" }}
            onClick={() =>
              router.push(
                "https://office.sabilamall.co.id/warotator.php?pos=jv&src=web",
              )
            }
          >
            Klik Untuk Daftar
          </Button>
        </Flex>
      </Box>
    </Layout>
  );
};

export default Join;
