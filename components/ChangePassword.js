import { Box, Button, FormControl, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import InputBoxAndLabel from "./InputBoxAndLabel";
import NavbarProfile from "./NavbarProfile";

export const ChangePassword = () => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (values) => console.log(values);

  return (
    <>
      <Box mt={{ base: "100px", md: "10px" }} px="16px" pt="18px">
        <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
          <Box px="12px">
            <InputBoxAndLabel
              register={register}
              text="Password Lama"
              name="oldPassword"
              mt="2px"
              type="password"
            />
            <InputBoxAndLabel
              register={register}
              text="Password Baru"
              name="newPassword"
              mt={{ base: "50px", md: "25px" }}
              type="password"
            />
            <InputBoxAndLabel
              register={register}
              text="Konfirmasi Password Baru"
              name="newPasswordConfirm"
              mt="20px"
              type="password"
            />
          </Box>
          <Button
            className="primaryFont"
            fontWeight="700"
            fontSize="14px"
            lineHeight="18.2px"
            type="submit"
            mx="auto"
            borderRadius="20px"
            w="100%"
            bg="orange.400"
            color="white"
            colorScheme="orange.400"
            mt="150px"
            _active={{ bg: "orange.300" }}
            border="none"
            display={{ base: "block", md: "none" }}
          >
            Update Profile
          </Button>
          <Flex justify="flex-end" w="100%" mt="70px">
            <Button
              className="primaryFont"
              fontWeight="700"
              fontSize="18px"
              type="submit"
              display={{ base: "none", md: "block" }}
              size="lg"
              colorScheme="orange.500"
              bg="orange.500"
              _hover={{ bg: "orange.400" }}
            >
              Ubah Password
            </Button>
          </Flex>
        </FormControl>
      </Box>
    </>
  );
};

export const ChangePasswordMobile = () => (
  <Box display={{ base: "block", md: "none" }}>
    <NavbarProfile section={"Ubah Kata Sandi"} />
    <ChangePassword />
  </Box>
);
