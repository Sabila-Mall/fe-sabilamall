import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Flex, Text, Heading } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React from "react";

import { Layout } from "../components/Layout";

export const NotFoundPage = () => {
  const router = useRouter();
  return (
    <Layout hasNavbar hasPadding hasFooter>
      <Flex
        py="4rem"
        w="full"
        alignItems="center"
        justifyContent="center"
        direction="column"
        h="full"
      >
        <Heading
          fontSize={{ base: "1.5rem", sm: "2rem" }}
          maxW="30ch"
          textAlign="center"
          color="gray.600"
        >
          Halaman yang anda akses tidak ditemukan
        </Heading>
        <Image
          src="images/logo.png"
          my="2rem"
          w={{ base: "25vw", md: "10rem" }}
        />
        <Button
          colorScheme="orange"
          w={{ base: "full", sm: "15rem" }}
          mt="1rem"
          onClick={() => router.push("/")}
        >
          Kembali Berbelanja
        </Button>
      </Flex>
    </Layout>
  );
};

export default NotFoundPage;
