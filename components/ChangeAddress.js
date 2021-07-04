import {
  Box,
  Text,
  Divider,
  Flex,
  Spacer,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Stack,
} from "@chakra-ui/react";
import router from "next/router";
import { useState, useEffect } from "react";

import AddressBox from "./AddressBox";
import NavbarProfile from "./NavbarProfile";
import ReceiverAddresses from "./ReceiverAddresses";

export const ChangeAddress = ({ isMobile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pengirim, setPengirim] = useState({});

  const deleteSender = () => {
    setPengirim({});
    console.log(pengirim);
  };

  const handleName = (value) => {
    senderAddress.name = value;
    setPengirim(senderAddress);
  };

  const handlePhone = (value) => {
    senderAddress.phoneNumber = value;
    setPengirim(senderAddress);
  };

  const handleAddress = (value) => {
    senderAddress.address = value;
    setPengirim(senderAddress);
  };

  let senderAddress = {
    id: "uid123",
    name: "Farahhhhhhhhhh",
    phoneNumber: "088888888888",
    address: "Jl depok blok AA no. 17 Kota Depok, Sukmajaya, Jawa Barat. 16417",
  };

  let receiverAddresses = [
    {
      id: "uid124",
      name: "Farahhhhhhhhhh",
      phoneNumber: "088888888888",
      fullAddress:
        "Jl depok blok AA no. 17 Kota Depok, Sukmajaya, Jawa Barat. 16417",
    },
    {
      id: "uid125",
      name: "Farahhhhhhhhhh",
      phoneNumber: "088888888888",
      fullAddress:
        "Jl depok blok AA no. 17 Kota Depok, Sukmajaya, Jawa Barat. 16417",
    },
    {
      id: "uid126",
      name: "Farahhhhhhhhhh",
      phoneNumber: "088888888888",
      fullAddress:
        "Jl depok blok AA no. 17 Kota Depok, Sukmajaya, Jawa Barat. 16417",
    },
  ];
  useEffect(() => {
    setPengirim(senderAddress);
  }, []);

  return (
    <Box bgColor={{ base: "gray.50", md: "white" }}>
      <Box
        mt={{ base: "48px", md: "10px" }}
        px="16px"
        borderRadius="20px"
        boxShadow="md"
        bgColor="white"
      >
        <Stack dir="column">
          <Text
            className="primaryFont"
            fontSize="16px"
            fontWeight="bold"
            color={{ base: "black", md: "orange.500" }}
          >
            Alamat Pengirim
          </Text>
          <Divider mt="10px" mb="10px" />
          {pengirim ? (
            <AddressBox
              name={pengirim.name}
              phoneNumber={pengirim.phoneNumber}
              address={pengirim.address}
              editAddress={
                !isMobile ? onOpen : () => router.push("edit-pengirim-mobile")
              }
              deleteAddress={deleteSender}
            />
          ) : (
            <Button
              borderColor="orange.500"
              borderWidth="1px"
              backgroundColor="white"
              color="orange.500"
            >
              Tambah
            </Button>
          )}
        </Stack>

        <Modal isOpen={isOpen} onClose={onClose} pos="relative">
          <ModalOverlay />
          <ModalContent
            borderRadius="20px"
            bgColor={{ base: "#F7FAFC", md: "white" }}
          >
            <ModalHeader>Ubah Alamat Penerima</ModalHeader>
            <ModalCloseButton
              pos="absolute"
              top="-15px"
              right="-15px"
              borderRadius="50%"
              color="white"
              bg="red.600"
              _hover={{ bg: "red.700" }}
            />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nama Lengkap</FormLabel>
                <Input
                  id="name"
                  value={pengirim.name}
                  onChange={(e) => handleName(e.target.value)}
                  required
                />

                <FormLabel mt={4}>Nomor Telepon</FormLabel>
                <Input
                  id="phoneNumber"
                  value={pengirim.phoneNumber}
                  type="number"
                  onChange={(e) => handlePhone(e.target.value)}
                  required
                />

                <FormLabel mt={4}>Alamat Lengkap</FormLabel>
                <Input
                  id="address"
                  value={pengirim.address}
                  onChange={(e) => handleAddress(e.target.value)}
                  required
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="orange"
                borderRadius="20px"
                p="15px 64px"
                mr={3}
                type="submit"
                fontWeight="700"
                className="primaryFont"
                fontSize="14px"
                w={{ base: "100%", md: "50%" }}
              >
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Box
        mt={{ base: "100px", md: "20px" }}
        px="16px"
        pt="18px"
        borderRadius="20px"
        boxShadow="md"
        bgColor="white"
      >
        <Flex>
          <Text
            className="primaryFont"
            fontSize="16px"
            fontWeight="bold"
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
            display={{ base: "none", md: "block" }}
          >
            Tambah
          </Button>
        </Flex>

        <Divider mt="10px" mb="10px" />
        <ReceiverAddresses addresses={receiverAddresses} isMobile={isMobile} />
      </Box>
    </Box>
  );
};

export const ChangeAddressMobile = () => (
  <Box display={{ base: "block", md: "none" }}>
    <NavbarProfile section={"Alamat Pengiriman"} />
    <Box overflowY="hidden">
      <ChangeAddress isMobile={true} />
    </Box>
  </Box>
);
