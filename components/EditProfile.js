import { Box, Button, FormControl, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { ButtonSubmit } from "./ButtonProfile";
import InputBoxAndLabel from "./InputBoxAndLabel";
import NavbarProfile from "./NavbarProfile";

export const EditProfile = ({ isMobile }) => {
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
        <Box px="28px">
          <InputBoxAndLabel
            register={register}
            text="Nama Depan"
            name={isMobile ? "namaDepanMobile" : "namaDepan"}
            mt={{ base: "50px", md: "25px" }}
            type="text"
          />
          <InputBoxAndLabel
            register={register}
            text="Nama Belakang"
            name={isMobile ? "namaBelakangMobile" : "namaBelakang"}
            mt="20px"
            type="text"
          />
          <InputBoxAndLabel
            register={register}
            text="Email"
            name={isMobile ? "emailMobile" : "email"}
            mt="20px"
            type="email"
          />
          <InputBoxAndLabel
            register={register}
            text="Jenis Kelamin"
            name={isMobile ? "jenisKelaminMobile" : "jenisKelamin"}
            mt="20px"
            type="select"
            options={[
              {
                value: "pria",
                text: "Pria",
              },
              { value: "wanita", text: "Wanita" },
            ]}
          />
          <InputBoxAndLabel
            register={register}
            text="Tanggal Lahir"
            name={isMobile ? "tanggalLahirMobile" : "tanggalLahir"}
            mt="20px"
            type="date"
          />
        </Box>
        <Box position="absolute" w="100%" px="28px" bottom={10}>
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
            Update Profile
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

export const EditProfileMobile = () => (
  <Box display={{ base: "block", md: "none" }} h="100vh">
    <NavbarProfile section={"Edit Profile"} />
    <EditProfile isMobile={true} />
  </Box>
);
