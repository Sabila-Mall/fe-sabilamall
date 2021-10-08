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
  Spinner,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";

import { apiKecamatan, apiKodePos, apiKota, apiProvinsi } from "../api/Zone";
import { useAddressContext } from "../contexts/addressProvider";
import { useAuthContext } from "../contexts/authProvider";
import AddressBoxReceiver from "./AddressBox";
import InputBoxAndLabel from "./InputBoxAndLabel";
import { BiSearch } from "react-icons/bi";

const ReceiverAddresses = ({ isMobile }) => {
  const [penerimaSearch, setPenerimaSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const { addressDataPenerima, loading, addItemPenerima } = useAddressContext();
  const { userData } = useAuthContext();
  const userId = userData?.id;

  const [provinceData, setprovinceData] = useState([]);
  const [cityData, setcityData] = useState([]);
  const [districtData, setdistrictData] = useState([]);
  const [postalCodeData, setpostalCodeData] = useState([]);

  const [provinceId, setProvinceId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [districtId, setdistrictId] = useState(null);
  const [postalCodeId, setpostalCodeId] = useState(null);

  const [tempName, settempName] = useState("");
  const [tempPhone, settempPhone] = useState(null);
  const [tempAddress, settempAddress] = useState("");

  useEffect(() => {
    apiProvinsi()
      .then((res) => {
        const response = res.data.data;
        setprovinceData(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (provinceId) {
      apiKota(provinceId)
        .then((res) => {
          const response = res.data.data;
          setcityData(response);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [provinceId]);

  useEffect(() => {
    if (cityId) {
      apiKecamatan(cityId)
        .then((res) => {
          const response = res.data.data;
          setdistrictData(response);
        })
        .catch((err) => { });
    }
  }, [cityId]);

  useEffect(() => {
    if (districtId) {
      apiKodePos(cityId, districtId, provinceId)
        .then((res) => {
          const response = res.data.data;
          setpostalCodeData(response);
        })
        .catch((err) => { });
    }
  }, [districtId]);

  const onSubmit = (data) => {
    let firstname, lastname, phone, address;
    phone = data.phoneNumber;
    address = data.address;
    if (data.name.trim().split(" ").length > 1) {
      firstname = data.name
        .split(" ")
        .slice(0, data.name.split(" ").length - 1)
        .join(" ");
      lastname = data.name.split(" ")[data.name.split(" ").length - 1];
      onClose();
    } else {
      firstname = data.name;
      onClose();
    }
    addItemPenerima(
      userId,
      0,
      1,
      firstname,
      lastname,
      phone,
      postalCodeId,
      cityId,
      districtId,
      provinceId,
      address,
      100,
      "add",
    );

    onClose();

    setProvinceId(null);
    settempAddress("");
    settempName("");
    settempPhone(null);
    setCityId(null);
    setcityData([]);
    setdistrictData([]);
    setdistrictId(null);
    setpostalCodeData([]);
    setpostalCodeId(null);
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
          onClick={onOpen}
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
          onChange={(e) => setPenerimaSearch(e.target.value)}
        />
        <InputRightElement
          children={<BiSearch color="black" />}
        />
      </InputGroup>
      <Divider mt="0.5rem" />
      <Stack>
        {loading ? (
          <Grid placeItems="center">
            <Spinner />
          </Grid>
        ) : (
          addressDataPenerima &&
          addressDataPenerima.map((address, index) => {
            if (penerimaSearch === "") {
              return (
                <Box key={index}>
                  <AddressBoxReceiver data={address} />
                </Box>
              );
            } else {
              const nama = address?.firstname + " " + address?.lastname;
              if ((nama.toLowerCase().includes(penerimaSearch.toLowerCase()) ||
                address?.phone.includes(penerimaSearch))
              ) {
                return (
                  <Box key={index}>
                    <AddressBoxReceiver data={address} />
                  </Box>
                );
              }
            }
          })
        )}
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
      <Modal isOpen={isOpen} onClose={onClose} size={isMobile ? "5xl" : "5xl"}>
        {isMobile ? <></> : <ModalOverlay />}
        <ModalContent
          borderRadius={isMobile ? "0" : "20px"}
          bgColor={isMobile ? "gray.50" : "white"}
          h={isMobile ? "fit-content" : "auto"}
          mt={isMobile ? "50px" : ""}
          top={isMobile ? "" : "20%"}
          mb="0"
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
          <ModalBody m={{ md: "12px" }}>
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
                    defaultValue={tempName}
                    onChange={(e) => settempName(e.target.value)}
                  />
                </GridItem>
                <GridItem colSpan={isMobile ? 2 : 1}>
                  <InputBoxAndLabel
                    register={register}
                    text="Nomor Telepon"
                    name="phoneNumber"
                    type="tel"
                    defaultValue={tempPhone}
                    onChange={(e) => settempPhone(e.target.value)}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <InputBoxAndLabel
                    register={register}
                    type="textarea"
                    mt={4}
                    text="Alamat Lengkap"
                    name="address"
                    defaultValue={tempAddress}
                    onChange={(e) => settempAddress(e.target.value)}
                  />
                </GridItem>
                <GridItem colSpan={isMobile ? 2 : 1}>
                  <InputBoxAndLabel
                    register={register}
                    type="select"
                    text="Provinsi"
                    options={provinceData}
                    name="province"
                    selectZone="province"
                    onChange={(e) => {
                      setProvinceId(e.target.value);
                    }}
                  />
                </GridItem>
                <GridItem colSpan={isMobile ? 2 : 1}>
                  <InputBoxAndLabel
                    register={register}
                    type="select"
                    text="Kota/Kabupaten"
                    options={cityData}
                    selectZone="city"
                    onChange={(e) => setCityId(e.target.value)}
                    name="city"
                  />
                </GridItem>
                <GridItem colSpan={isMobile ? 2 : 1}>
                  <InputBoxAndLabel
                    register={register}
                    type="select"
                    text="Kecamatan"
                    options={districtData}
                    selectZone="district"
                    onChange={(e) => setdistrictId(e.target.value)}
                    name="district"
                  />
                </GridItem>
                <GridItem colSpan={isMobile ? 2 : 1}>
                  <InputBoxAndLabel
                    register={register}
                    type="select"
                    text="Kode Pos"
                    onChange={(e) => {
                      setpostalCodeId(e.target.value);
                    }}
                    options={postalCodeData}
                    selectZone="postalCode"
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
                    mt="2rem"
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
                  mt=".5rem"
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
