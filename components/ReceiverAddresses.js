import {
  Stack,
  Button,
  Box,
  useDisclosure,
  Divider,
  Flex,
  Spacer,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";

import AddressBoxReceiver from "./AddressBox";
import InputBoxAndLabel from "./InputBoxAndLabel";

const ReceiverAddresses = ({ addresses, isMobile }) => {
  const [addressList, setAddressList] = useState(addresses);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();

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

  const onSubmit = (data) => {
    const tempAddress = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      address: data.address,
      city: data.city,
      district: data.district,
      province: data.province,
      postalCode: data.postalCode,
    };
    console.log(tempAddress);
  };

  const provinceOptions = [
    {
      value: "option1",
      text: "option1",
    },
    {
      value: "option2",
      text: "option2",
    },
    {
      value: "option3",
      text: "option3",
    },
  ];

  const cityOptions = [
    {
      value: "option1",
      text: "option1",
    },
    {
      value: "option2",
      text: "option2",
    },
    {
      value: "option3",
      text: "option3",
    },
  ];

  const districtOptions = [
    {
      value: "option1",
      text: "option1",
    },
    {
      value: "option2",
      text: "option2",
    },
    {
      value: "option3",
      text: "option3",
    },
  ];

  const postalCodeOptions = [
    {
      value: "option1",
      text: "option1",
    },
    {
      value: "option2",
      text: "option2",
    },
    {
      value: "option3",
      text: "option3",
    },
  ];

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
          <Flex align="center">
            <IoIosAddCircle fontSize="1rem" />
            <Text
              className="primaryFont"
              fontWeight="700"
              fontSize="0.875rem"
              lineHeight="100%"
              onClick={onOpen}
              ml="0.2rem"
            >
              Tambah
            </Text>
          </Flex>
        </Button>
      </Flex>
      <Divider mt="0.5rem" />
      <Stack>
        {addressList.map((address) => {
          return (
            <Box key={address.phoneNumber}>
              <AddressBoxReceiver
                name={address.name}
                phoneNumber={address.phoneNumber}
                address={address.fullAddress}
                district={address.district}
                province={address.province}
                postalCode={address.postalCode}
                city={address.city}
                editAddress={onOpen}
                deleteAddress={() => deleteAddress(address.phoneNumber)}
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
      <Modal isOpen={isOpen} onClose={onClose} size={isMobile ? "6xl" : "5xl"}>
        {isMobile ? <></> : <ModalOverlay />}
        <ModalContent
          borderRadius={isMobile ? "0" : "20px"}
          bgColor={isMobile ? "#F7FAFC" : "white"}
          h={isMobile ? "calc(100% + 50px)" : "auto"}
          mt={isMobile ? "50px" : ""}
          top={isMobile ? "" : "20%"}
        >
          {isMobile ? (
            <></>
          ) : (
            <ModalHeader
              fontWeight="bold"
              fontSize="18px"
              className="primaryFont"
            >
              Tambah Alamat Penerima
            </ModalHeader>
          )}

          <Divider border="1px solid #E2E8F0" />

          <ModalCloseButton
            pos="absolute"
            top="-20px"
            right="-20px"
            borderRadius="50%"
            color="white"
            bg="red.600"
            _hover={{ bg: "red.700" }}
            w="48px"
            h="48px"
            visibility={isMobile ? "hidden" : "visible"}
          />
          <ModalBody m="12px">
            <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                }}
                gap={isMobile ? "16px" : "24px"}
              >
                <GridItem colSpan={isMobile ? 2 : 1}>
                  <InputBoxAndLabel
                    register={register}
                    text="Nama Lengkap"
                    name="name"
                  />
                </GridItem>
                <GridItem colSpan={isMobile ? 2 : 1}>
                  <InputBoxAndLabel
                    register={register}
                    text="Nomor Telepon"
                    name="phoneNumber"
                    type="tel"
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <InputBoxAndLabel
                    register={register}
                    type="textarea"
                    mt={4}
                    text="Alamat Lengkap"
                    name="address"
                  />
                </GridItem>
                <GridItem colSpan={isMobile ? 2 : 1}>
                  <InputBoxAndLabel
                    register={register}
                    type="select"
                    text="Provinsi"
                    options={provinceOptions}
                    name="province"
                  />
                </GridItem>
                <GridItem colSpan={isMobile ? 2 : 1}>
                  <InputBoxAndLabel
                    register={register}
                    type="select"
                    text="Kota/Kabupaten"
                    options={cityOptions}
                    name="city"
                  />
                </GridItem>
                <GridItem colSpan={isMobile ? 2 : 1}>
                  <InputBoxAndLabel
                    register={register}
                    type="select"
                    text="Kecamatan"
                    options={districtOptions}
                    name="district"
                  />
                </GridItem>
                <GridItem colSpan={isMobile ? 2 : 1}>
                  <InputBoxAndLabel
                    register={register}
                    type="select"
                    text="Kode Pos"
                    options={postalCodeOptions}
                    name="postalCode"
                  />
                </GridItem>
              </Grid>
              <Flex
                w="100%"
                justifyContent="flex-end"
                flexDir={isMobile ? "column" : "row"}
              >
                {isMobile ? (
                  <Button
                    border="1px solid #C53030"
                    borderRadius="20px"
                    p="15px 64px"
                    color="red.600"
                    fontWeight="700"
                    className="primaryFont"
                    fontSize="14px"
                    w={{ base: "100%", md: "25%" }}
                  >
                    Hapus
                  </Button>
                ) : (
                  <></>
                )}

                <Button
                  colorScheme="orange"
                  borderRadius="20px"
                  p="15px 64px"
                  mt="36px"
                  type="submit"
                  fontWeight="700"
                  className="primaryFont"
                  fontSize="14px"
                  w={{ base: "100%", md: "25%" }}
                >
                  Update
                </Button>
              </Flex>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ReceiverAddresses;
