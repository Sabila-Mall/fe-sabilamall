import {
  Box,
  Center,
  Text,
  Img,
  Stack,
  StackDivider,
  Input,
  InputGroup,
  FormControl,
  InputLeftElement,
  Button,
  toast,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoMdMail, IoMdPhonePortrait } from "react-icons/io";

import { apiResetPassword } from "../../api/Auth";
import { Layout } from "../../components/Layout";
import { isRequestSuccess } from "../../utils/api";

const ResetPassword = () => {
  const router = useRouter();
  const [resetEmail, setResetEmail] = useState("");
  const [resetPhone, setResetPhone] = useState("");
  const toast = useToast();

  const submitHandler = (event) => {
    event.preventDefault();
    apiResetPassword(resetEmail ?? resetPhone)
      .then((res) => {
        const response = res.data;
        if (isRequestSuccess(response)) {
          toast({
            title: "Email Reset Password Berhasil Terkirim",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        } else {
          toast({
            title: response.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Gagal mengirimkan email",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        console.error(err);
      });
  };

  return (
    <Layout noFooter hasPadding>
      <Flex
        direction="column"
        justifyContent="center"
        minH="calc(100vh - 3rem)"
      >
        <Stack
          divider={
            <StackDivider borderColor={{ base: "white", md: "gray.200" }} />
          }
          spacing={{ base: "4px" }}
          direction={{ base: "column", md: "row" }}
          align="center"
          justifyContent="center"
          h="fit-content"
        >
          <Center w={{ base: "100%", md: "50%" }}>
            <Img
              src="images/resetLogo.svg"
              alt="reset-logo"
              w={{ base: "50%", md: "75%" }}
            />
          </Center>

          <Center w={{ base: "100%", md: "50%" }}>
            <Box>
              <Text
                fontSize={{ base: "16px", md: "24px" }}
                mb="8px"
                fontWeight="bold"
                className="primaryFont"
                align={{ base: "center", md: "start" }}
              >
                Reset Kata Sandi
              </Text>
              <Text
                fontSize="16px"
                className="secondaryFont"
                align={{ base: "center", md: "start" }}
              >
                Masukkan Alamat Email Anda
              </Text>

              <FormControl>
                <InputGroup mt="32px">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IoMdMail />}
                    color="gray.500"
                  />
                  <Input
                    placeholder="Email Anda"
                    onChange={(event) => setResetEmail(event.target.value)}
                  />
                </InputGroup>
                <Text
                  fontSize="14px"
                  my="0.5rem"
                  className="secondaryFont"
                  align="center"
                >
                  Atau
                </Text>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IoMdPhonePortrait />}
                    color="gray.500"
                  />
                  <Input
                    placeholder="Nomor HP Anda Anda"
                    onChange={(event) => setResetPhone(event.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <Button
                bgColor="red.500"
                w="100%"
                _hover={{ color: "red.500" }}
                isDisabled={
                  resetEmail === "" && resetPhone === "" ? true : false
                }
                mt="16px"
                type="submit"
                onClick={(e) => submitHandler(e)}
              >
                <Text color="white" as="b" className="primaryFont">
                  Reset Kata Sandi
                </Text>
              </Button>
            </Box>
          </Center>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default ResetPassword;
