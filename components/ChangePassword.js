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
      <FormControl
        as="form"
        // px="16px"
        // pt="18px"
        pt={{ base: "48px", md: "28px" }}
        onSubmit={handleSubmit(onSubmit)}
        h={isMobile && "100vh"}
        position="relative"
      >
        <Box maxW="500px" px={{ base: "1rem", md: 0 }}>
          <InputBoxAndLabel
            register={register}
            text="Password Lama"
            name={isMobile ? "oldPasswordMobile" : "oldPassword"}
            mt={isMobile ? "2rem" : "0"}
            type="password"
          />
          <InputBoxAndLabel
            register={register}
            text="Password Baru"
            name={isMobile ? "newPasswordMobile" : "newPassword"}
            mt="25px"
            type="password"
          />
          <InputBoxAndLabel
            register={register}
            text="Konfirmasi Password Baru"
            name={isMobile ? "newPasswordConfirmMobile" : "newPasswordConfirm"}
            mt="20px"
            type="password"
          />
        </Box>
        <Box position="absolute" w="100%" px="28px" bottom={20}>
          <Button
            className="primaryFont"
            type="submit"
            fontWeight="700"
            fontSize="14px"
            lineHeight="18.2px"
            borderRadius="20px"
            w="100%"
            bg="orange.400"
            color="white"
            colorScheme="orange.400"
            _active={{ bg: "orange.300" }}
            border="none"
            display={{ base: "block", md: "none" }}
          >
            Ubah Password
          </Button>
        </Box>
        <Flex justify="flex-end" w="100%" mt="70px">
          <ButtonSubmit text="Ubah Password" />
        </Flex>
      </FormControl>
      {/* </Box> */}
    </>
  );
};

export const ChangePasswordMobile = () => (
  <Box display={{ base: "block", md: "none" }} h="100vh">
    <NavbarProfile section={"Ubah Password"} />
    <ChangePassword isMobile={true} />
  </Box>
);
