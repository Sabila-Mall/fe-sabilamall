import { Box, Button, FormControl, Flex, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { getProfile, updatePassword } from "../api/users";
import { useAuthContext } from "../contexts/authProvider";
import { ButtonSubmit } from "./ButtonProfile";
import InputBoxAndLabel from "./InputBoxAndLabel";
import NavbarProfile from "./NavbarProfile";

export const ChangePassword = ({ isMobile }) => {
  const { handleSubmit, register, control } = useForm();
  const toast = useToast();
  const [loadingBtn, setLoadingBtn] = useState(false);

  const { userData } = useAuthContext();
  const userId = userData?.id;

  const [validatePass, setValidatePass] = useState({
    length: false,
    alphanumeric: false,
    match: false,
  });

  const newPass = useWatch({
    name: isMobile ? "newPasswordMobile" : "newPassword",
    defaultValue: "",
    control,
  });

  const newPassConfirm = useWatch({
    name: isMobile ? "newPasswordConfirmMobile" : "newPasswordConfirm",
    defaultValue: "",
    control,
  });

  const oldPass = useWatch({
    name: isMobile ? "oldPasswordMobile" : "oldPassword",
    defaultValue: "",
    control,
  });

  const passwordPattern = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{2,})$/;

  const callToaster = ({
    title = "Gagal Mengubah Password",
    description,
    status = "error",
  }) =>
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: "top",
    });

  const onSubmit = async (values) => {
    setLoadingBtn(true);
    let oldPass = null;
    let newPass = null;
    if (
      values.newPassword !== values.newPasswordConfirm ||
      values?.newPasswordMobile !== values.newPasswordConfirmMobile
    ) {
      setLoadingBtn(false);
      return callToaster({ description: "Konfirmasi password tidak sesuai" });
    }

    if (isMobile || !values.oldPassword) {
      oldPass = values.oldPasswordMobile;
      newPass = values.newPasswordMobile;
    } else {
      oldPass = values.oldPassword;
      newPass = values.newPassword;
    }

    updatePassword({
      customers_id: userId,
      oldpassword: oldPass,
      newpassword: newPass,
    })
      .then(() =>
        callToaster({
          title: "Berhasil Mengubah Password",
          description: "Password berhasil diubah",
          status: "success",
        }),
      )
      .catch((e) => callToaster({ description: "Password tidak sesuai" }))
      .finally(() => setLoadingBtn(false));
  };

  useEffect(() => {
    const newPassGte8 = newPass?.length >= 8;
    const newPassConfirmGte8 = newPassConfirm?.length >= 8;
    const newPassRegex = passwordPattern.test(newPass);
    const newPassConfirmRegex = passwordPattern.test(newPassConfirm);
    const isMatch = newPass === newPassConfirm;

    setValidatePass({
      alphanumeric: newPassRegex && newPassConfirmRegex,
      length: newPassGte8 && newPassConfirmGte8,
      match: isMatch,
    });
  }, [newPass, newPassConfirm]);

  return (
    <FormControl
      as="form"
      // px="16px"
      // pt="18px"
      pt={{ base: "48px", md: "28px" }}
      onSubmit={handleSubmit(onSubmit)}
      h={isMobile && "100vh"}
      position="relative"
      w="100%"
    >
      {/* <Box>{newPass}</Box> */}
      <Box px={{ base: "1rem", md: 0 }}>
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
      {Boolean(
        !(
          validatePass.length &&
          validatePass.alphanumeric &&
          validatePass.match
        ),
      ) && (
        <Box
          mt="1rem"
          fontSize="0.85rem"
          color="red.500"
          fontWeight="600"
          px={{ base: "1rem", md: 0 }}
        >
          {!validatePass.length && (
            <Text>*Minimal terdiri dari 8 karakter</Text>
          )}
          {!validatePass.alphanumeric && (
            <Text>*Harus mengandung huruf dan angka</Text>
          )}
          {!validatePass.match && (
            <Text>*Konfirmasi password tidak sesuai</Text>
          )}
        </Box>
      )}
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
          isDisabled={
            !(
              validatePass.length &&
              validatePass.alphanumeric &&
              validatePass.match
            )
          }
          isLoading={loadingBtn}
        >
          Ubah Password
        </Button>
      </Box>
      <Flex justify="flex-end" w="100%" mt="70px">
        <ButtonSubmit
          isDisabled={
            !(
              validatePass.length &&
              validatePass.alphanumeric &&
              validatePass.match
            )
          }
          text="Ubah Password"
          isLoading={loadingBtn}
        />
      </Flex>
    </FormControl>
  );
};

export const ChangePasswordMobile = () => (
  <Box display={{ base: "block", md: "none" }} h="100vh">
    <NavbarProfile section={"Ubah Password"} />
    <ChangePassword isMobile={true} />
  </Box>
);
