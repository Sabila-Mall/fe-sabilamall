import { Box, Text, Input, Select, Textarea } from "@chakra-ui/react";

const InputBoxAndLabel = ({
  register,
  text,
  name,
  mt,
  w,
  type,
  options,
  defaultValue,
  defaultValueId,
  required = true,
  onChange,
  selectZone,
  disabled = false,
  error,
  ...otherProps
}) => (
  <Box mt={mt} key={text} w={w}>
    <Text
      className="primaryFont"
      fontWeight="700"
      fontSize="16px"
      lineHeight="20.8px"
      mb="8px"
    >
      {text}{" "}
      {required && (
        <Box as="span" color="red.500">
          *
        </Box>
      )}
    </Text>
    {type !== "select" && type !== "textarea" && (
      <Input
        {...register(name, { required: required })}
        type={type}
        id={name}
        placeholder={text}
        _focus={{ outline: "none" }}
        autoComplete="on"
        disabled={disabled}
        defaultValue={defaultValue}
        {...otherProps}
      />
    )}
    {type === "select" && (
      <Select
        {...register(name, { required: required })}
        _focus={{ outline: "none" }}
        onChange={onChange}
        defaultValue={defaultValue}
        {...otherProps}
      >
        {selectZone && (
          <option
            value={defaultValueId}
            selected={true}
            disabled={true}
            hidden={true}
          >
            {defaultValue}
          </option>
        )}
        {selectZone
          ? options.map((option, index) => (
              <option
                value={
                  (selectZone === "city" && option.city_id) ||
                  (selectZone === "province" && option.zone_apicityid) ||
                  (selectZone === "district" && option.subdistrict_id) ||
                  (selectZone === "postalCode" && option.postal_code)
                }
                style={{ color: "black" }}
              >
                {(selectZone === "postalCode" && option.postal_code) ||
                  (selectZone === "district" && option.subdistrict_name) ||
                  (selectZone === "city" && option.city_name) ||
                  (selectZone === "province" && option.zone_name)}
              </option>
            ))
          : options.map((option, index) => (
              <option
                key={option.value}
                value={option.value}
                defaultValue={index === 0 && "selected"}
              >
                {option.text}
              </option>
            ))}
      </Select>
    )}
    {type === "textarea" && (
      <Textarea
        {...register(name, { required: required })}
        id={name}
        placeholder={text}
        _focus={{ outline: "none" }}
        autoComplete="on"
        defaultValue={defaultValue}
        {...otherProps}
      />
    )}
    <Text fontSize="0.85rem" color="red.500" fontWeight="600">
      {error}
    </Text>
  </Box>
);

export default InputBoxAndLabel;
