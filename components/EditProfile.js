import { Box, Button, FormControl, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { apiUbahProfileSaya } from "../api/Auth";
import { useAuthContext } from "../contexts/authProvider";
import { isRequestSuccess } from "../utils/api";
import { dateFormat } from "../utils/functions";
import { ButtonSubmit } from "./ButtonProfile";
import InputBoxAndLabel from "./InputBoxAndLabel";
import NavbarProfile from "./NavbarProfile";

export const EditProfile = ({ isMobile }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const { userData } = useAuthContext();

  useEffect(() => {
    if (userData?.id) {
      setValue("firstName", userData?.first_name, { shouldValidate: true });
      setValue("lastName", userData?.last_name, { shouldValidate: true });
      setValue("gender", userData?.gender, { shouldValidate: true });
      setValue("birthDate", dateFormat(userData?.dob), {
        shouldValidate: true,
      });
      setValue("phone", userData?.phone, { shouldValidate: true });
      setValue("users_ktp", userData?.users_ktp, { shouldValidate: true });
    }
  }, [userData]);

  const onSubmit = (values) => {
    const { birthDate, firstName, gender, users_ktp, lastName, phone } = values;
    const dateObject = new Date(birthDate);
    const tempBirthDate = userData?.dob
      ? userData.dob
      : `${
          dateObject.getMonth() + 1
        }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    setLoading(true);
    apiUbahProfileSaya(
      userData?.id,
      firstName,
      lastName,
      phone,
      gender,
      tempBirthDate,
      users_ktp,
    )
      .then((res) => {
        if (isRequestSuccess(res.data)) {
          toast({
            title: "Successfully edited profile",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Edit profile failed",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Edit profile failed",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          pt={{ base: "48px", md: "28px" }}
          minH={isMobile && "100vh"}
          position="relative"
          pb={isMobile && "3rem"}
        >
          <Box px="28px">
            <InputBoxAndLabel
              register={register}
              text="Nama Depan"
              name="firstName"
              mt={isMobile ? "2rem" : "0"}
              type="text"
              defaultValue={userData?.first_name}
              error={
                errors?.firstName?.type === "required" &&
                "*Data ini wajib diisi"
              }
            />
            <InputBoxAndLabel
              register={register}
              text="Nama Belakang"
              name="lastName"
              mt="20px"
              type="text"
              defaultValue={userData?.last_name}
              error={
                errors?.lastName?.type === "required" && "*Data ini wajib diisi"
              }
            />
            <InputBoxAndLabel
              register={register}
              text="Jenis Kelamin"
              name="gender"
              mt="20px"
              type="select"
              options={[
                { text: "Pria", value: "1" },
                { text: "Wanita", value: "0" },
              ]}
              defaultValue={userData?.gender}
              error={
                errors?.gender?.type === "required" && "*Data ini wajib diisi"
              }
            />
            <InputBoxAndLabel
              register={register}
              text="Tanggal Lahir"
              name="birthDate"
              mt="20px"
              type="date"
              disabled={userData?.dob ? true : false}
              required={userData?.dob ? false : true}
              defaultValue={
                userData?.dob
                  ? `${new Date(userData.dob).getFullYear()}-${
                      new Date(userData.dob).getMonth() + 1 < 10
                        ? "0" +
                          (new Date(userData.dob).getMonth() + 1).toString()
                        : new Date(userData.dob).getMonth() + 1
                    }-${
                      new Date(userData.dob).getDate() < 10
                        ? "0" + new Date(userData.dob).getDate().toString()
                        : new Date(userData.dob).getDate()
                    }`
                  : ""
              }
              error={
                errors?.birthDate?.type === "required" &&
                "*Data ini wajib diisi"
              }
            />
            <InputBoxAndLabel
              register={register}
              name="phone"
              text="Nomor Telepon"
              w="100%"
              type="number"
              defaultValue={userData?.phone}
              error={
                errors?.phone?.type === "required" && "*Data ini wajib diisi"
              }
            />
            <InputBoxAndLabel
              register={register}
              required={true}
              name="users_ktp"
              text="Nomor KTP"
              mt="20px"
              type="number"
              defaultValue={userData?.users_ktp}
              error={
                errors?.users_ktp?.type === "required" &&
                "*Data ini wajib diisi"
              }
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
              isLoading={loading}
            >
              Update Profile
            </Button>
          </Box>
        </FormControl>
      </form>
    </>
  );
};

export const EditProfileMobile = () => (
  <Box display={{ base: "block", md: "none" }} h="100vh">
    <NavbarProfile section={"Edit Profile"} />
    <EditProfile isMobile={true} />
  </Box>
);
