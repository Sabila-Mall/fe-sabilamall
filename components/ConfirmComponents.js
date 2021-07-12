import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";

export const SummaryBox = ({ dataSummary }) => (
  <Box
    borderRadius=".75rem"
    border="1px solid #CBD5E0"
    pt="1.625rem"
    pb=".805rem"
    px=".75rem"
    fontSize={{ base: ".9rem", md: "1rem" }}
    className="primaryFont"
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

const FormField = ({ textLabel, placeholder, type = "text", options }) => {
  let inputElement = null;

  if (
    type === "text" ||
    type === "email" ||
    type == "date" ||
    type == "number"
  ) {
    inputElement = (
      <Input
        _focus={{ outline: "none" }}
        placeholder={placeholder}
        type={type}
      />
    );
  }

  if (type === "select") {
    inputElement = (
      <Select placeholder={placeholder} _focus={{ outline: "none" }}>
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

  return (
    <FormControl className="primaryFont">
      <FormFieldGroup>
        <FormField
          textLabel="Metode Pembayaran"
          type="select"
          options={methods}
        />
      </FormFieldGroup>
      <FormFieldGroup textHead="Pengirim">
        <FormField
          textLabel="Pilih Bank Pengirim"
          type="select"
          options={banks}
        />
        <FormField
          textLabel="Nama Pengirim"
          placeholder="Masukkan nama awal penerima"
        />
      </FormFieldGroup>
      <FormFieldGroup textHead="Penerima">
        <FormField
          textLabel="Bank Tujuan"
          type="select"
          placeholder="Pilih Bank Tujuan Transfer"
          options={banks}
        />
        <FormField
          textLabel="Tanggal Transfer"
          placeholder="Pilih tanggal transfer"
          type="date"
        />
        <FormField
          textLabel="Nominal Transfer"
          placeholder="Masukkan nominal transfer"
          type="number"
        />
        <FormField
          textLabel="Catatan"
          placeholder="Masukkan alamat penerima"
          type="textarea"
        />
      </FormFieldGroup>
    </FormControl>
  );
};
