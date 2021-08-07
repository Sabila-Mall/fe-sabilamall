import {
  Box,
  Text,
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
  Stack,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";

import { AddressBoxSender } from "./AddressBox";
import InputBoxAndLabel from "./InputBoxAndLabel";

const SenderAddresses = ({ isMobile, addresses }) => {
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
    const tempAddress = { name: data.name, phoneNumber: data.phoneNumber };
    console.log(tempAddress);
  };

  return (
    <Stack dir="column" pt="1rem" pb={isMobile ? "36px" : ""}>
      <Flex alignItems="center">
        <Text
          className="primaryFont"
          fontSize="16px"
          fontWeight="bold"
          color={{ base: "black", md: "orange.500" }}
          ml={isMobile ? "16px" : "auto"}
        >
          Identitas Pengirim
        </Text>
        <Spacer />
        <Button
          borderColor="orange.500"
          borderWidth="1px"
          backgroundColor="white"
          color="orange.500"
          p="11px 38px"
          onClick={onOpen}
          display={{ base: "none", md: "block" }}
        >
          <Flex align="center">
            <IoIosAddCircle fontSize="1rem" />
            <Text
              className="primaryFont"
              fontWeight="700"
              fontSize="0.875rem"
              lineHeight="100%"
              ml="0.2rem"
            >
              Tambah
            </Text>
          </Flex>
        </Button>
      </Flex>
      <Divider mt="0.5rem" />
      {addressList.map((address) => {
        return (
          <Box key={address.phoneNumber}>
            <AddressBoxSender
              name={address.name}
              phoneNumber={address.phoneNumber}
              editAddress={onOpen}
              deleteAddress={() => deleteAddress(address.phoneNumber)}
            />
          </Box>
        );
      })}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        pos="relative"
        size={isMobile ? "6xl" : "lg"}
      >
        {isMobile ? <></> : <ModalOverlay />}
        <ModalContent
          p={isMobile ? "" : "50px"}
          pos="absolute"
          h={isMobile ? "calc(100% - 50px)" : "auto"}
          mt="50px"
          top={isMobile ? "" : "calc(50% - 15rem)"}
          borderRadius={isMobile ? "0" : "20px"}
          bgColor={isMobile ? "#F7FAFC" : "white"}
        >
          {isMobile ? (
            <></>
          ) : (
            <ModalHeader fontWeight="700">
              Tambah Identitas Pengirim
            </ModalHeader>
          )}
          <ModalCloseButton
            pos="absolute"
            top="-15px"
            right="-15px"
            borderRadius="50%"
            color="white"
            bg="red.600"
            visibility={isMobile ? "hidden" : "visible"}
            _hover={{ bg: "red.700" }}
          />
          <ModalBody m="12px">
            <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
              <InputBoxAndLabel
                register={register}
                text="Nama Lengkap"
                name="name"
              />
              <InputBoxAndLabel
                register={register}
                text="Nomor Telepon"
                name="phoneNumber"
                type="number"
                mt={4}
              />
              <Flex justify={isMobile ? "center" : "flex-end"}>
                <Button
                  colorScheme="orange"
                  borderRadius="20px"
                  p="16px 64px"
                  mt={isMobile ? "" : "1rem"}
                  type="submit"
                  fontWeight="700"
                  className="primaryFont"
                  fontSize="14px"
                  w={{ base: "100%", md: "50%" }}
                >
                  Update
                </Button>
              </Flex>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
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
            <IoIosAddCircle fontSize="16px" />
            <Text
              className="primaryFont"
              fontWeight="700"
              fontSize="0.8rem"
              lineHeight="13px"
              onClick={onOpen}
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
  );
};

export default SenderAddresses;
