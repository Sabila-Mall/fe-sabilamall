import {
  Box,
  Divider,
  Flex,
  Text,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  ModalFooter,
  Grid,
  GridItem,
  FormLabel,
  Input,
  FormControl,
  useDisclosure,
  useMediaQuery,
  Textarea,
  Select,
  Button
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import InputBoxAndLabel from "./InputBoxAndLabel";

import DeleteIcon from "./deleteIcon";
import { useForm } from "react-hook-form";

const AddressBoxReceiver = ({
  name,
  phoneNumber,
  address,
  city,
  district,
  province,
  postalCode,
  deleteAddress,
}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 48rem)")
  const { register, handleSubmit } = useForm();
  const [receiverName, setreceiverName] = useState(name)
  const [receiverPhoneNumber, setreceiverPhoneNumber] = useState(phoneNumber)
  const [receiverAddress, setreceiverAddress] = useState(address)
  const [receiverCity, setreceiverCity] = useState(city)
  const [receiverDistrict, setreceiverDistrict] = useState(district)
  const [receiverProvince, setreceiverProvince] = useState(province)
  const [receiverPostalCode, setreceiverPostalCode] = useState(postalCode)

  const onSubmit = data => {
    setreceiverName(data.name)
    setreceiverPhoneNumber(data.phoneNumber)
    setreceiverAddress(data.address)
    setreceiverCity(data.city)
    setreceiverDistrict(data.district)
    setreceiverProvince(data.province)
    setreceiverPostalCode(data.postalCode)
  }

  const provinceOptions = [{
    value: "option1",
    text: "option1"
  },
  {
    value: "option2",
    text: "option2"
  },
  {
    value: "option3",
    text: "option3"
  }]

  const cityOptions = [{
    value: "option1",
    text: "option1"
  },
  {
    value: "option2",
    text: "option2"
  },
  {
    value: "option3",
    text: "option3"
  }]

  const districtOptions = [{
    value: "option1",
    text: "option1"
  },
  {
    value: "option2",
    text: "option2"
  },
  {
    value: "option3",
    text: "option3"
  }]

  const postalCodeOptions = [{
    value: "option1",
    text: "option1"
  },
  {
    value: "option2",
    text: "option2"
  },
  {
    value: "option3",
    text: "option3"
  }]

  return (
    <Box position="relative" p="16px" pb="0">
      <Flex lineHeight="150%" className="secondaryFont" fontSize="12px">
        <Box
          color="gray.500"
          textAlign="right"
          display={{ base: "none", md: "block" }}
        >
          <Text>{receiverName ? "Nama Lengkap" : ""}</Text>
          <Text>{receiverPhoneNumber ? "Telepon" : ""}</Text>
          <Text>{receiverAddress ? "Alamat" : ""}</Text>
        </Box>
        <Box ml={{ base: "0", md: "16px" }} maxW={{ base: "60%", md: "40%" }}>
          <Text fontWeight="bold">{receiverName}</Text>
          <Text>{receiverPhoneNumber}</Text>
          <Text>{receiverAddress}</Text>
          <Text>
            {(receiverCity ? receiverCity : "") +
              (receiverCity && receiverProvince ? ", " : "") +
              (receiverProvince ? receiverProvince : "")}
          </Text>
          <Text>
            {(receiverDistrict ? receiverDistrict : "") +
              (receiverDistrict && receiverPostalCode ? ", " : "") +
              (receiverPostalCode ? receiverPostalCode : "")}
          </Text>
        </Box>
      </Flex>
      <Divider mt="1rem" mb="0" />
      <Box
        position="absolute"
        top="15px"
        right="40px"
        color="gray.500"
        cursor="pointer"
        h={{ base: "24px", md: "24px" }}
      >
        <FaPen onClick={onOpen} />
      </Box>
      <Box
        position="absolute"
        top="15px"
        right="20px"
        color="gray.500"
        cursor="pointer"
      >
        <DeleteIcon deleteAddress={deleteAddress} />
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={isMobile ? "6xl" : "5xl"}
      >
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
              Ubah Alamat Penerima
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
                    defaultValue={receiverName}
                  />
                </GridItem>
                <GridItem colSpan={isMobile ? 2 : 1}>
                  <InputBoxAndLabel
                    register={register}
                    text="Nomor Telepon"
                    name="phoneNumber"
                    type="tel"
                    defaultValue={receiverPhoneNumber}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <InputBoxAndLabel
                    register={register}
                    type="textarea"
                    mt={4}
                    text="Alamat Lengkap"
                    name="address"
                    defaultValue={receiverAddress}
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

const AddressBoxSender = ({
  name,
  phoneNumber,
  deleteAddress,
}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 48rem)")
  const { register, handleSubmit } = useForm();
  const [senderName, setsenderName] = useState(name)
  const [senderPhoneNumber, setsenderPhoneNumber] = useState(phoneNumber)

  const onSubmit = data => {
    setsenderName(data.name)
    setsenderPhoneNumber(data.phoneNumber)
  }



  return (
    <Box position="relative" p="16px" pb="0">
      <Flex lineHeight="150%" className="secondaryFont" fontSize="12px">
        <Box
          color="gray.500"
          textAlign="right"
          display={{ base: "none", md: "block" }}
        >
          <Text>{senderName ? "Nama Lengkap" : ""}</Text>
          <Text>{senderPhoneNumber ? "Telepon" : ""}</Text>
        </Box>
        <Box ml={{ base: "0", md: "16px" }} maxW={{ base: "60%", md: "40%" }}>
          <Text fontWeight="bold">{senderName}</Text>
          <Text>{senderPhoneNumber}</Text>
        </Box>
      </Flex>
      <Divider mt="1rem" mb="0" />
      <Box
        position="absolute"
        top="15px"
        right="40px"
        color="gray.500"
        cursor="pointer"
        h={{ base: "24px", md: "24px" }}
      >
        <FaPen onClick={onOpen} />
      </Box>
      <Box
        position="absolute"
        top="15px"
        right="20px"
        color="gray.500"
        cursor="pointer"
      >
        <DeleteIcon deleteAddress={deleteAddress} />
      </Box>
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
            <ModalHeader fontWeight="700">Ubah Identitas Pengirim</ModalHeader>
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
                defaultValue={senderName}
              />
              <InputBoxAndLabel
                register={register}
                text="Nomor Telepon"
                name="phoneNumber"
                type="tel"
                mt={4}
                defaultValue={senderPhoneNumber}
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
    </Box >
  );
};

export default AddressBoxReceiver;

export { AddressBoxSender };
