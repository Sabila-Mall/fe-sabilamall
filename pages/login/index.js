import {
  Box,
  Center,
  Text,
  Image,
  Stack,
  StackDivider,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Button,
  FormControl,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsFillLockFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";

import {
  apiLogin,
  saveTokenToCookies,
  saveUserIdToCookies,
} from "../../api/Auth";
import { USER_FIELDS } from "../../constants/authConstants";
import { useAuthContext } from "../../contexts/authProvider";
import { isRequestSuccess } from "../../utils/api";
import { filterObject } from "../../utils/functions";

const Login = () => {
  const router = useRouter();
  const { setUserData, setIsLoggedIn, loading } = useAuthContext();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    apiLogin(loginEmail, loginPassword)
      .then((res) => {
        const response = res.data;
        if (isRequestSuccess(response)) {
          setUserData(filterObject(response.data[0], USER_FIELDS));
          saveUserIdToCookies(response.data[0].id);
          saveTokenToCookies(response.data[0].token);
          setIsLoggedIn(true);
          router.push("/");
        } else {
          console.error(response.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Center w="100%" h="100vh" className="login">
      <Stack
        divider={
          <StackDivider borderColor={{ base: "white", md: "gray.200" }} />
        }
        spacing={{ base: "4px" }}
        direction={{ base: "column", md: "row" }}
        w={{ base: "100%", md: "90%" }}
        h={{ md: "60%" }}
      >
        <Center w={{ base: "100%", md: "50%" }}>
          <Image
            src="/images/loginLogo.svg"
            w={{ base: "50%", md: "75%" }}
            mt="48px"
          />
        </Center>

        <Center w={{ base: "100%", md: "50%" }}>
          <Box w="70%">
            <Text
              fontSize="16px"
              className="secondaryFont"
              align={{ base: "center", md: "start" }}
            >
              Selamat datang di
            </Text>
            <Text
              fontSize={{ base: "16px", md: "24px" }}
              mt={{ base: "5px", md: "15px" }}
              fontWeight="bold"
              className="primaryFont"
              align={{ base: "center", md: "start" }}
            >
              Aplikasi Sabila Mall
            </Text>

            <FormControl>
              <Stack mt="32px" spacing="16px">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IoMdMail />}
                    color="gray.500"
                  />
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    onChange={(event) => setLoginEmail(event.target.value)}
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BsFillLockFill />}
                    color="gray.500"
                  />
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={(event) => setLoginPassword(event.target.value)}
                  />
                </InputGroup>

                <Link
                  color="gray.400"
                  align="end"
                  mt="48px"
                  href="/ResetPassword"
                  className="secondaryFont"
                  textDecor="underline"
                >
                  Lupa kata sandi
                </Link>
              </Stack>

              <Stack direction="row" w="100%" mt="24px" spacing="16px">
                <Link onClick={(e) => submitHandler(e)} w="100%" h="100%">
                  <Button
                    bgColor="red.500"
                    w="100%"
                    _hover={{ color: "red.500" }}
                    type="submit"
                    isDisabled={
                      loginEmail === "" || loginPassword === "" || loading
                    }
                    isLoading={loading}
                  >
                    <Text color="white" as="b" className="primaryFont">
                      Login
                    </Text>
                  </Button>
                </Link>

                <Link href="/signup/" w="100%" h="100%">
                  <Button
                    bgColor="white"
                    variant="outline"
                    borderColor="red.500"
                    w="100%"
                  >
                    <Text color="red.500" as="b" className="primaryFont">
                      Daftar
                    </Text>
                  </Button>
                </Link>
              </Stack>
            </FormControl>

            <Divider borderColor="gray.200" mt="16px" mb="16px" />

            <Text
              color="gray.500"
              fontSize="sm"
              m="10px"
              align="center"
              className="secondaryFont"
            >
              Dengan Masuk atau Daftar, Anda telah menyetujui Ketentuan Layanan
              serta Kebijakan Privasi Sabila Mall.
            </Text>
            <Text
              color="gray.300"
              fontSize="sm"
              align="center"
              mt="16px"
              className="secondaryFont"
            >
              Versi 1.0.0
            </Text>
          </Box>
        </Center>
      </Stack>
    </Center>
  );
};

export default Login;
