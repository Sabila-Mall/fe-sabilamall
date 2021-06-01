import { Box, Text, Input, Button, FormControl } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import NavbarProfile from "../../components/NavbarProfile";

const InputBoxAndLabel = ({ register, text, name, mt }) => (
  <Box mt={mt} key={text}>
    <Text
      className="primaryFont"
      fontWeight="700"
      fontSize="16px"
      lineHeight="20.8px"
      mb="8px"
    >
      {text}{" "}
      <Box as="span" color="red.500">
        *
      </Box>
    </Text>
    <Input
      {...register(name, { required: true })}
      type="password"
      id={name}
      placeholder={text}
      _focus={{ outline: "none" }}
    />
  </Box>
);

const UbahKataSandi = () => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (values) => console.log(values);

  return (
    <>
      <NavbarProfile section={"Ubah Kata Sandi"} />
      <Box mt="100px" px="16px" pt="18px">
        <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
          <Box px="12px">
            <InputBoxAndLabel
              register={register}
              text="Password Lama"
              name="oldPassword"
              mt="2px"
            />
            <InputBoxAndLabel
              register={register}
              text="Password Baru"
              name="newPassword"
              mt="50px"
            />
            <InputBoxAndLabel
              register={register}
              text="Konfirmasi Password Baru"
              name="newPasswordConfirm"
              mt="20px"
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
          >
            Update Profile
          </Button>
        </FormControl>
      </Box>
    </>
  );
};

export default UbahKataSandi;
