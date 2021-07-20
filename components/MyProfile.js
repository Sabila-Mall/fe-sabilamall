import { Box, Text, Input, Button, FormControl, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { ButtonSubmit } from "./ButtonProfile";
import InputBoxAndLabel from "./InputBoxAndLabel";

const MyProfile = () => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (values) => console.log(values);
  return (
    <FormControl w="100%" mt="30px">
      <Flex w="100%" justify="space-between">
        <InputBoxAndLabel
          register={register}
          name="firstName"
          text="Nama Depan"
          w="48%"
          type="text"
        />
        <InputBoxAndLabel
          register={register}
          name="lastName"
          text="Nama Belakang"
          w="48%"
          type="text"
        />
      </Flex>
      <Box mt="20px">
        <InputBoxAndLabel
          register={register}
          name="gender"
          text="Jenis Kelamin"
          w="100%"
          type="select"
          options={[
            { text: "Pria", value: "pria" },
            { text: "Wanita", value: "wanita" },
          ]}
        />
      </Box>
      <Box mt="20px">
        <InputBoxAndLabel
          register={register}
          name="birthDate"
          text="Tanggal Lahir"
          w="100%"
          type="date"
        />
      </Box>
      <Box mt="20px">
        <InputBoxAndLabel
          register={register}
          name="phone"
          text="Nomor Telepon"
          w="100%"
          type="number"
        />
      </Box>
      <Flex justify="flex-end" w="100%" mt="70px">
        <ButtonSubmit text="Konfirmasi" />
      </Flex>
    </FormControl>
  );
};

export default MyProfile;
