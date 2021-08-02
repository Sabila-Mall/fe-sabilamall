import {
  Stack,
  Button,
  Box,
  useDisclosure,
  Divider,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import AddressBoxReceiver from "./AddressBox";


const ReceiverAddresses = ({ addresses, isMobile }) => {
  const [addressList, setAddressList] = useState(addresses);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteAddress = (phone) => {
    let outputList = [];
    for (let i = 0; i < addressList.length; i++) {
      if (addressList[i].phoneNumber !== phone) {
        console.log(addressList[i].phoneNumber);
        outputList.push(addressList[i]);
      }
    }
    console.log(outputList);
  };
  return (
    <Box pt="1rem" pb={isMobile ? "36px" : ""}>
      <Flex alignItems="center">
        <Text
          className="primaryFont"
          fontSize="16px"
          fontWeight="bold"
          ml={isMobile ? "16px" : "auto"}
          color={{ base: "black", md: "orange.500" }}
        >
          Alamat Penerima
        </Text>
        <Spacer />
        <Button
          borderColor="orange.500"
          borderWidth="1px"
          backgroundColor="white"
          color="orange.500"
          p="11px 38px"
          display={{ base: "none", md: "block" }}
        >
          <Flex>
            <IoIosAddCircle fontSize="1rem" />
            <Text
              className="primaryFont"
              fontWeight="700"
              fontSize="0.875rem"
              lineHeight="100%"
              transform="translateY(2px)"
              onClick={onOpen}
            >
              Tambah
            </Text>
          </Flex>
        </Button>
      </Flex>
      <Divider mt="0.5rem" />
      <Stack>
        {addressList.map((address) => {
          const [name, setname] = useState(address.name);
          const [phoneNumber, setphoneNumber] = useState(address.phoneNumber);
          const [fullAddress, setfullAddress] = useState(address.fullAddress);
          const [district, setdistrict] = useState(address.district);
          const [city, setcity] = useState(address.city);
          const [province, setprovince] = useState(address.province);
          const [postalCode, setpostalCode] = useState(address.postalCode);

          const [tempName, settempName] = useState(name);
          const [tempPhoneNumber, settempPhoneNumber] = useState(phoneNumber);
          const [tempFullAddress, settempFullAddress] = useState(fullAddress);
          const [tempDistrict, settempDistrict] = useState(district);
          const [tempCity, settempCity] = useState(city);
          const [tempProvince, settempProvince] = useState(province);
          const [tempPostalCode, settempPostalCode] = useState(postalCode);

          const handleSubmit = () => {
            console.log(tempName);
            console.log(tempPhoneNumber);
            console.log(tempFullAddress);
            console.log(tempDistrict);
            console.log(tempCity);
            console.log(tempProvince);
            console.log(tempPostalCode);
          };

          return (
            <Box key={phoneNumber}>
              <AddressBoxReceiver
                name={name}
                phoneNumber={phoneNumber}
                address={fullAddress}
                district={district}
                province={province}
                postalCode={postalCode}
                city={city}
                editAddress={onOpen}
                deleteAddress={() => deleteAddress(phoneNumber)}
              />
            </Box>
          );
        })}
        {isMobile ? (
          <Button
            borderColor="orange.500"
            borderWidth="1px"
            backgroundColor="white"
            color="orange.500"
            p="11px 38px"
            borderRadius="20px"
            mb="48px"
          >
            <Flex alignItems="center">
              <IoIosAddCircle fontSize="1rem" />
              <Text
                className="primaryFont"
                fontWeight="700"
                fontSize="0.8em"
                lineHeight="100%"
                ml="0.25rem"
              >
                Tambah
              </Text>
            </Flex>
          </Button>
        ) : (
          <></>
        )}
      </Stack>
    </Box>
  );
};

export default ReceiverAddresses;
