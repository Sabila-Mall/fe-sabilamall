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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoMdMail } from "react-icons/io";

import { useResetPassword } from "../../api/Auth";

const ResetPassword = () => {
  const router = useRouter();
  const [resetEmail, setResetEmail] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    useResetPassword(resetEmail)
      .then((res) => {
        if (
          res.message === "Your password has been sent to your email address."
        ) {
          router.push("/");
        } else {
          console.error(res.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Center w="100%" h="100vh">
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
          <Img
            src="images/resetLogo.svg"
            alt="reset-logo"
            w={{ base: "50%", md: "75%" }}
          />
        </Center>

        <Center w={{ base: "100%", md: "50%" }}>
          <Box w="70%">
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
            </FormControl>

            <Button
              bgColor="red.500"
              w="100%"
              _hover={{ color: "red.500" }}
              isDisabled={resetEmail === "" ? true : false}
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
    </Center>
  );
};

export default ResetPassword;
