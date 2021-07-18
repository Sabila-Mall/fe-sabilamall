import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Box,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export const SummaryBox = ({ dataSummary }) => (
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
      <Flex color="gray.500" key={info} justify="space-between" mb="0.82rem">
        <Text fontWeight={700}>{info}</Text>
        <Text fontWeight={500}>{value}</Text>
      </Flex>
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

const FormField = ({
  textLabel,
  placeholder,
  type = "text",
  options,
  min = 0,
  register,
  id,
}) => {
  let inputElement = null;

  if (type === "text" || type === "email" || type === "date") {
    inputElement = (
      <Input
        _focus={{ outline: "none" }}
        placeholder={placeholder}
        type={type}
        required={true}
        id={id}
        {...register(id)}
      />
    );
  }

  if (type == "number") {
    inputElement = (
      <Input
        _focus={{ outline: "none" }}
        placeholder={placeholder}
        type={type}
        min={min}
        required={true}
        id={id}
        {...register(id)}
      />
    );
  }

  if (type === "select") {
    inputElement = (
      <Select
        placeholder={placeholder}
        _focus={{ outline: "none" }}
        required={true}
        id={id}
        {...register(id)}
      >
        {options.map(({ text }) => (
          <option value={text} key={text}>
            {text}
          </option>
        ))}
      </Select>
    );
  }

  if (type == "textarea") {
    inputElement = (
      <Textarea
        placeholder={placeholder}
        size="md"
        _focus={{ outline: "none" }}
        id={id}
        {...register(id)}
      />
    );
  }

  return (
    <>
      <FormLabel
        mt=".75rem"
        textTransform="capitalize"
        fontWeight={500}
        mb=".25rem"
      >
        {textLabel}
      </FormLabel>
      {inputElement}
    </>
  );
};

export const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const methods = [
    { text: "Metode 1" },
    { text: "Metode 2" },
    { text: "Metode 3" },
    { text: "Metode 4" },
  ];

  const banks = [
    { text: "BRI" },
    { text: "BCA" },
    { text: "BNI" },
    { text: "BI" },
  ];

  // let today = new Date();
  // const dd = String(today.getDate()).padStart(2, "0");
  // const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  // const yyyy = today.getFullYear();

  // today = yyyy + "-" + mm + "-" + dd;

  return (
    <FormControl
      as="form"
      className="primaryFont"
      mx="auto"
      maxWidth="23rem"
      width={{ base: "100%", lg: "23rem" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormFieldGroup>
        <FormField
          textLabel="Metode Pembayaran"
          type="select"
          options={methods}
          id="metode"
          register={register}
        />
      </FormFieldGroup>
      <FormFieldGroup textHead="Pengirim">
        <FormField
          textLabel="Pilih Bank Pengirim"
          type="select"
          options={banks}
          id="bankPengirim"
          register={register}
        />
        <FormField
          textLabel="Nama Pengirim"
          placeholder="Masukkan nama awal penerima"
          id="nama"
          register={register}
        />
      </FormFieldGroup>
      <FormFieldGroup textHead="Penerima">
        <FormField
          textLabel="Bank Tujuan"
          type="select"
          placeholder="Pilih Bank Tujuan Transfer"
          options={banks}
          id="bankTujuan"
          register={register}
        />
        <FormField
          textLabel="Tanggal Transfer"
          placeholder="Pilih tanggal transfer"
          type="date"
          id="tanggalTransfer"
          register={register}
        />
        <FormField
          textLabel="Nominal Transfer"
          placeholder="Masukkan nominal transfer"
          type="number"
          id="nominalTransfer"
          register={register}
        />
        <FormField
          textLabel="Catatan"
          placeholder="Masukkan alamat penerima"
          type="textarea"
          id="catatan"
          register={register}
        />
      </FormFieldGroup>
      <Flex justify="flex-end">
        <Button
          type="submit"
          bg="orange.500"
          color="white"
          _hover={{ bg: "orange.400" }}
          _focus={{ outline: "none" }}
        >
          Kirim Konfirmasi
        </Button>
      </Flex>
    </FormControl>
  );
};
