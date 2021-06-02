import { Box, Text, Input, Select } from "@chakra-ui/react";

// options wajib diisi kalau type-nya select
// contohnya ada di file MyProfile.js
// register itu fungsi dari react-hook-form

const InputBoxAndLabel = ({ register, text, name, mt, w, type, options }) => (
  <Box mt={mt} key={text} w={w}>
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
    {type !== "select" && (
      <Input
        {...register(name, { required: true })}
        type={type}
        id={name}
        placeholder={text}
        _focus={{ outline: "none" }}
      />
    )}
    {type === "select" && (
      <Select
        {...register(name, { required: true })}
        _focus={{ outline: "none" }}
      >
        {options.map((option, index) => (
          <option
            key={option.value}
            value={option.value}
            selected={index === 0 && "selected"}
          >
            {option.text}
          </option>
        ))}
      </Select>
    )}
  </Box>
);

export default InputBoxAndLabel;
