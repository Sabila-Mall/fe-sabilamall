import { Box, FormControl, Flex, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { apiUbahProfileSaya } from "../api/Auth";
import { useAuthContext } from "../contexts/authProvider";
import { isRequestSuccess } from "../utils/api";
import { dateFormat } from "../utils/functions";
import { ButtonSubmit } from "./ButtonProfile";
import InputBoxAndLabel from "./InputBoxAndLabel";

const MyProfile = () => {
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
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <FormControl w="100%" mt="30px">
        <Flex w="100%" justify="space-between">
          <InputBoxAndLabel
            register={register}
            name="firstName"
            text="Nama Depan"
            w="48%"
            type="text"
            defaultValue={userData?.first_name}
            error={
              errors?.firstName?.type === "required" && "*Data ini wajib diisi"
            }
          />
          <InputBoxAndLabel
            register={register}
            name="lastName"
            text="Nama Belakang"
            w="48%"
            type="text"
            defaultValue={userData?.last_name}
            error={
              errors?.lastName?.type === "required" && "*Data ini wajib diisi"
            }
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
              { text: "Pria", value: "1" },
              { text: "Wanita", value: "0" },
            ]}
            defaultValue={userData?.gender}
            error={
              errors?.gender?.type === "required" && "*Data ini wajib diisi"
            }
          />
        </Box>
        <Box mt="20px">
          <InputBoxAndLabel
            register={register}
            name="birthDate"
            text="Tanggal Lahir"
            w="100%"
            type="date"
            disabled={userData?.dob ? true : false}
            required={userData?.dob ? false : true}
            defaultValue={userData?.dob ? dateFormat(userData.dob) : ""}
            error={
              errors?.birthDate?.type === "required" && "*Data ini wajib diisi"
            }
          />
        </Box>
        <Box mt="20px">
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
        </Box>
        <Box mt="20px">
          <InputBoxAndLabel
            register={register}
            required={true}
            name="users_ktp"
            text="Nomor KTP"
            w="100%"
            type="number"
            defaultValue={userData?.users_ktp}
            error={
              errors?.users_ktp?.type === "required" && "*Data ini wajib diisi"
            }
          />
        </Box>
        <Flex justify="flex-end" w="100%" mt="70px">
          <ButtonSubmit text="Konfirmasi" isLoading={loading} />
        </Flex>
      </FormControl>
    </form>
  );
};

export default MyProfile;
