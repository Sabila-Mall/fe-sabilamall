import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Skeleton,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getBanks, postPaymentConfirmation } from "../api/Konfirmasi";
import { useAuthContext } from "../contexts/authProvider";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { isRequestSuccess } from "../utils/api";

export const SummaryBox = ({ dataSummary, loading }) => (
  <Box
    className="primaryFont"
    borderRadius=".75rem"
    border="1px solid #CBD5E0"
    pt="1.625rem"
    pb=".805rem"
    px=".75rem"
    fontSize={{ base: ".9rem", md: "1rem" }}
    width={{ base: "100%", lg: "23rem" }}
    maxWidth="23rem"
    mt={{ base: "0", lg: ".75rem" }}
    mx="auto"
  >
    {dataSummary.map(({ info, value }) => (
      <Skeleton key={info} isLoaded={!loading}>
        <Flex color="gray.500" justify="space-between" mb="0.82rem">
          <Text fontWeight={700}>{info}</Text>
          <Text fontWeight={500}>{value}</Text>
        </Flex>
      </Skeleton>
    ))}
  </Box>
);

const FormFieldGroup = ({ textHead, children }) => (
  <Box mb="2rem">
    {textHead && (
      <Text fontWeight={700} fontSize="1rem">
        {textHead}
      </Text>
    )}
    {children}
  </Box>
);

const Options = ({ type, data }) => {
  switch (type) {
    case "bankPengirim":
      return (
        <>
          {
            data.map(each =>
              <option key={each.bankid} value={each.bankid}>{each.namabank}</option>,
            )
          }
        </>
      );
    case "bankTujuan":
      return (
        <>
          {
            data.map(each =>
              <option key={each.bankid} value={each.bankid}>{`${each.namabank} - ${each.rekening}`}</option>,
            )
          }
        </>
      );
    case "metode":
      return (
        <>
          {
            data.map(each =>
              <option key={each.method} value={each.method}>{each.method}</option>,
            )
          }
        </>
      );
    default:
      return null;
  }
};

const FormField = ({
                     textLabel,
                     placeholder,
                     type = "text",
                     options,
                     register,
                     id,
                     errors,
                   }) => {
  let inputElement = null;

  switch (type) {
    case "text":
    case "email":
    case "date":
    case "number":
      inputElement = (
        <Input
          placeholder={placeholder}
          type={type}
          id={id}
          {...register(id, {
            required: "Kolom ini wajib diisi",
            min: { value: 0, message: "Nominal minimal 0" },
          })}
        />
      );
      break;
    case "select":
      inputElement = (
        <Select
          placeholder={placeholder}
          id={id}
          {...register(id, {
            required: "Kolom ini wajib diisi",
          })}
        >
          <Options type={id} data={options} />
        </Select>
      );
      break;
    case "textarea":
      inputElement = (
        <Textarea
          placeholder={placeholder}
          size="md"
          id={id}
          {...register(id)}
        />
      );
      break;
  }

  return (
    <FormControl isInvalid={errors[id]}>
      <FormLabel
        mt=".75rem"
        textTransform="capitalize"
        fontWeight={500}
        mb=".25rem"
      >
        {textLabel}
      </FormLabel>
      {inputElement}
      <FormErrorMessage>
        {errors[id] && errors[id].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export const Form = ({ orderNumber }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { userData } = useAuthContext();
  const memberId = userData?.memberid;

  const router = useRouter();

  const toast = useToast();
  const successToast = (successMessage) => {
    toast({
      position: "top",
      title: successMessage,
      status: "success",
      isClosable: true,
    });
  };
  const errorToast = (errMessage) => {
    toast({
      position: "top",
      title: errMessage,
      status: "error",
      isClosable: true,
    });
  };

  const onSubmit = async data => {
    const dateArr = data.tanggalTransfer.split("-");
    const tanggal = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;

    const postData = {
      action: "confirm",
      noorder: orderNumber,
      metode: "Bank",
      memberid: memberId,
      amount: Number(data.nominalTransfer),
      date: tanggal,
      bankasal: Number(data.bankPengirim),
      pemilik: data.nama,
      banktujuan: Number(data.bankTujuan),
      notes: data.catatan,
    };

    try {
      const res = await postPaymentConfirmation(postData);
      if (isRequestSuccess(res)) {
        successToast(res.message);
        router.push("/profile/pesanan-saya");
      } else {
        errorToast(res.message ?? "Gagal mengirim konfirmasi pembayaran");
      }
    } catch (err) {
      console.error(err);
      errorToast(err ?? "Terjadi kesalahan");
    }
  };

  const [bankPengirim, setBankPengirim] = useState([]);
  const [bankTujuan, setBankTujuan] = useState([]);

  useEffect(() => {
    getBanks()
      .then(res => {
        setBankPengirim(res.data.bankasal ?? []);
        setBankTujuan(res.data.banktujuan ?? []);
      })
      .catch(err => {
        console.error(err);
        errorToast(err);
      });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        as="main"
        className="primaryFont"
        mx="auto"
        maxWidth="23rem"
        width={{ base: "100%", lg: "23rem" }}
      >
        <FormFieldGroup />
        <FormFieldGroup textHead="Pengirim">
          <FormField
            textLabel="Bank Pengirim"
            placeholder="Pilih Bank Pengirim"
            type="select"
            options={bankPengirim}
            id="bankPengirim"
            register={register}
            errors={errors}
          />
          <FormField
            textLabel="Nama Pengirim"
            placeholder="Masukkan nama awal pengirim"
            id="nama"
            register={register}
            errors={errors}
          />
        </FormFieldGroup>
        <FormFieldGroup textHead="Penerima">
          <FormField
            textLabel="Bank Tujuan"
            type="select"
            placeholder="Pilih Bank Tujuan Transfer"
            options={bankTujuan}
            id="bankTujuan"
            register={register}
            errors={errors}
          />
          <FormField
            textLabel="Tanggal Transfer"
            placeholder="Pilih tanggal transfer"
            type="date"
            id="tanggalTransfer"
            register={register}
            errors={errors}
          />
          <FormField
            textLabel="Nominal Transfer"
            placeholder="Masukkan nominal transfer"
            type="number"
            id="nominalTransfer"
            register={register}
            errors={errors}
          />
          <FormField
            textLabel="Catatan"
            placeholder="Masukkan alamat penerima"
            type="textarea"
            id="catatan"
            register={register}
            errors={errors}
          />
        </FormFieldGroup>
        <Flex justify="flex-end">
          <Button
            type="submit"
            bg="orange.500"
            color="white"
            _hover={{ bg: "orange.400" }}
            isLoading={isSubmitting}
          >
            Kirim Konfirmasi
          </Button>
        </Flex>
      </Box>
    </form>
  );
};
