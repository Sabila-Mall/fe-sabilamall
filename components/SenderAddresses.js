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
  Grid,
  Spinner,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";

import { useAddressContext } from "../contexts/addressProvider";
import { useAuthContext } from "../contexts/authProvider";
import { AddressBoxSender } from "./AddressBox";
import InputBoxAndLabel from "./InputBoxAndLabel";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";

const SenderAddresses = ({ isMobile }) => {
  const [pengirimSearch, setPengirimSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const { addressDataPengirim, loading, addItemPengirim } = useAddressContext();
  const { userData } = useAuthContext();
  const userId = userData?.id;

  const onSubmit = (data) => {
    let firstname, lastname, phone;
    phone = data.phoneNumber;
    if (data.name.trim().split(" ").length > 1) {
      firstname = data.name
        .split(" ")
        .slice(0, data.name.split(" ").length - 1)
        .join(" ");
      lastname = data.name.split(" ")[data.name.split(" ").length - 1];
      addItemPengirim(userId, 0, 2, firstname, lastname, phone, "add");
      onClose();
    } else {
      firstname = data.name;
      addItemPengirim(userId, 0, 2, firstname, " ", phone, "add");
      onClose();
    }
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
      <InputGroup
        width={{ base: "100%", lg: "48%" }}
        marginTop="0.5rem"
        marginBottom="1rem"
      >
        <Input
          placeholder="Cari alamat"
          color="gray.500"
          fontSize="sm"
          onChange={(e) => setPengirimSearch(e.target.value)}
        />
        <InputRightElement
          children={<BiSearch color="black" />}
        />
      </InputGroup>
      <Divider mt="0.5rem" />
      {loading ? (
        <Grid placeItems="center">
          <Spinner />
        </Grid>
      ) : (
        addressDataPengirim &&
        addressDataPengirim.map((address, index) => {
          if (pengirimSearch === "") {
            return (
              <Box key={index}>
                <AddressBoxSender data={address} />
              </Box>
            );
          } else {
            const nama = address?.firstname + " " + address?.lastname;
            if ((nama.toLowerCase().includes(pengirimSearch.toLowerCase()) ||
              address?.phone.includes(pengirimSearch))
            ) {
              return (
                <Box key={index}>
                  <AddressBoxSender data={address} />
                </Box>
              );
            }
          }

        })
      )}
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
            top={{ base: "0", md: "-15px" }}
            right={{ base: "0", md: "-15px" }}
            borderRadius="50%"
            color="white"
            bg="red.600"
            visibility={isMobile ? "hidden" : "visible"}
            _hover={{ bg: "red.700" }}
          />
          <ModalBody m={{ md: "12px" }}>
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
                type="tel"
                mt={4}
              />
              <Flex
                justify={isMobile ? "center" : "flex-end"}
                position={isMobile ? "absolute" : "relative"}
                bottom={isMobile ? "1rem" : "auto"}
                w="full"
              >
                <Button
                  colorScheme="orange"
                  borderRadius="20px"
                  p="16px 64px"
                  mt="1rem"
                  type="submit"
                  fontWeight="700"
                  className="primaryFont"
                  fontSize="14px"
                  w={{ base: "calc(100% - 56px)", md: "180px" }}
                  position={{ base: "fixed", md: "relative" }}
                  bottom={{ base: "28px", md: "auto" }}
                  mx={{ base: "28px", md: "0" }}
                >
                  Tambah
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
          onClick={onOpen}
        >
          <Flex alignItems="center">
            <IoIosAddCircle fontSize="16px" />
            <Text
              className="primaryFont"
              fontWeight="700"
              fontSize="0.8rem"
              lineHeight="13px"
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
