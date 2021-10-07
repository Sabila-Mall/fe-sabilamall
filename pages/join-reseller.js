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

import { Layout } from "../components/Layout";

const Join = () => {
  const router = useRouter();

  return (
    <Layout hasNavbar hasFooter hasPadding>
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
        <Text>
          Terima kasih sudah tertartik untuk mendapatkan informasi terkait
          pendaftaran reseller SabilaMall!
        </Text>
        <Text my={{ base: ".5rem", md: "1rem" }}>
          Selamat bergabung bersama lebih dari 7000 orang di Indonesia yang
          sudah bergabung lebih dulu.
          <br /> Selamat bergabung bersama orang-orang yang mau membangun
          Indonesia ini lebih baik, lebih produktif. Selamat bergabung bersama
          komunitas orang-orang yang sukses mandiri secara ekonomi.
        </Text>
        <Text fontSize="1.125rem">
          Kami sangat menyambut baik Anda untuk jualan bareng, belajar bareng
          dan maju bareng karena kami sudah menyiapkan berbagai kemudahan dan
          fasilitas seperti:
        </Text>
        <UnorderedList fontSize="1.125rem">
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
        <Text>dan masih banyak lagi kemudahan dan fasilitas lain.</Text>
        <Text mt={{ base: ".5rem", md: "1rem" }}>
          Baca info penawaran promo join reseller baju muslim{" "}
          <Link
            href="https://sabilamall.co.id/lp/dropship-dan-reseller-baju-muslim/"
            color="orange.500"
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
                "https://api.whatsapp.com/send?phone=6282125023944&text=Kak%20Ninu,%20Saya%20tertarik%20menjadi%20reseller%20SabilaMall.%20Mohon%20bantuannya.%20Saya%20tahu%20dari%20Google.%20Terimakasih",
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
