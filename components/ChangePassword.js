import { Box, Button, FormControl, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { ButtonSubmit } from "./ButtonProfile";
import InputBoxAndLabel from "./InputBoxAndLabel";
import NavbarProfile from "./NavbarProfile";

export const ChangePassword = ({ isMobile }) => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (values) => console.log(values);

  return (
    <>
      <Box mt={{ base: "30px", md: "10px" }} px="16px" pt="18px">
        <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
          <Box px="12px">
            <InputBoxAndLabel
              register={register}
              text="Password Lama"
              name={isMobile ? "oldPasswordMobile" : "oldPassword"}
              mt="2px"
              type="password"
            />
            <InputBoxAndLabel
              register={register}
              text="Password Baru"
              name={isMobile ? "newPasswordMobile" : "newPassword"}
              mt={{ base: "50px", md: "25px" }}
              type="password"
            />
            <InputBoxAndLabel
              register={register}
              text="Konfirmasi Password Baru"
              name={
                isMobile ? "newPasswordConfirmMobile" : "newPasswordConfirm"
              }
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
            mt="2rem"
            _active={{ bg: "orange.300" }}
            border="none"
            display={{ base: "block", md: "none" }}
          >
            Ubah Password
          </Button>
          <Flex justify="flex-end" w="100%" mt="70px">
            <ButtonSubmit text="Ubah Password" />
          </Flex>
        </FormControl>
      </Box>
    </>
  );
};

export const ChangePasswordMobile = () => (
  <Box display={{ base: "block", md: "none" }}>
    <NavbarProfile section={"Ubah Password"} />
    <ChangePassword isMobile={true} />
  </Box>
);
