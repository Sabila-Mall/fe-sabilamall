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
  Grid,
  GridItem,
  FormControl,
  useDisclosure,
  useMediaQuery,
  Button
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import InputBoxAndLabel from "./InputBoxAndLabel";

import DeleteIcon from "./deleteIcon";
import { useForm } from "react-hook-form";
import { useAddressContext } from "../contexts/addressProvider";
import { useAuthContext } from "../contexts/authProvider";
import { apiKecamatan, apiKodePos, apiKota, apiProvinsi } from "../api/Zone";

const AddressBoxReceiver = ({
  data
}) => {

  const [name, setname] = useState(data.firstname + " " + (data.lastname ? data.lastname : ""))

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 48rem)")
  const { register, handleSubmit } = useForm();

  const { deleteItem, addItemPenerima } = useAddressContext();
  const { userData } = useAuthContext()
  const userId = userData?.id
  const addressId = data?.address_id

  const [provinceData, setprovinceData] = useState([])
  const [cityData, setcityData] = useState([])
  const [districtData, setdistrictData] = useState([])
  const [postalCodeData, setpostalCodeData] = useState([])

  const [provinceId, setProvinceId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [districtId, setdistrictId] = useState(null)
  const [postalCodeId, setpostalCodeId] = useState(null)

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
          console.log(res);
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
          console.log(response);
          setdistrictData(response)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [cityId]);

  useEffect(() => {
    if (districtId) {
      console.log(districtId);
      apiKodePos(cityId, districtId, provinceId)
        .then((res) => {
          const response = res.data.data;
          let temp = []
          let tempPostalCode = []
          response.forEach(element => {
            if (!tempPostalCode.includes(element.postal_code)) {
              temp.push(element)
              tempPostalCode.push(element.postal_code)
            }
          });
          console.log(response);
          console.log(temp);
          setpostalCodeData(temp)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [districtId]);

  const onSubmit = data => {
    let firstname, lastname, phone, street, district, city, province, postalCode
    if (data.name.split(" ").length > 1) {
      firstname = data.name.split(" ").slice(0, data.name.split(" ").length - 1).join(" ")
      lastname = data.name.split(" ")[data.name.split(" ").length - 1]
    } else {
      firstname = data.name
      lastname = ""
    }

    setname(firstname + " " + lastname)
    phone = data.phoneNumber
    district = data.district
    postalCode = data.postalCode
    province = data.province
    city = data.city
    street = data.address

    console.log(userId, firstname, lastname, phone, postalCode, city, district, province, street);

    deleteItem(userId, addressId)
    addItemPenerima(userId,
      0,
      1,
      firstname,
      lastname,
      phone,
      postalCode,
      city,
      district,
      province,
      street,
      100,
      "edit")
    onClose()
  }

  return (
    <Box position="relative" p="16px" pb="0">
      <Flex lineHeight="150%" className="secondaryFont" fontSize="12px">
        <Box
          color="gray.500"
          textAlign="right"
          display={{ base: "none", md: "block" }}
        >
          <Text>{name ? "Nama Lengkap" : ""}</Text>
          <Text>{data.phone ? "Telepon" : ""}</Text>
          <Text>{data.street ? "Alamat" : ""}</Text>
        </Box>
        <Box ml={{ base: "0", md: "16px" }} maxW={{ base: "60%", md: "40%" }}>
          <Text fontWeight="bold">{data.firstname + " " + data.lastname}</Text>
          <Text>{data.phone}</Text>
          <Text>{data.street}</Text>
          <Text>
            {((data.city_type && data.city_name) ? (data.city_type + " " + data.city_name) : "") +
              ((data.city_type && data.city_name) && data.zone_name ? ", " : "") +
              (data.zone_name ? data.zone_name : "")}
          </Text>
          <Text>
            {(data.subdistrict_name ? data.subdistrict_name : "") +
              (data.subdistrict_name && data.postcode ? ", " : "") +
              (data.postcode ? data.postcode : "")}
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
        <DeleteIcon data={data} />
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
                    defaultValue={data.firstname + " " + (data.lastname || "")}
                  />
                </GridItem>
                <GridItem colSpan={isMobile ? 2 : 1}>
                  <InputBoxAndLabel
                    register={register}
                    text="Nomor Telepon"
                    name="phoneNumber"
                    type="tel"
                    defaultValue={data.phone}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <InputBoxAndLabel
                    register={register}
                    type="textarea"
                    mt={4}
                    text="Alamat Lengkap"
                    name="address"
                    defaultValue={data.street}
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
                    onChange={(e) => setProvinceId(e.target.value)}
                    defaultValue={data.zone_name}
                    defaultValueId={data.zone_apicityid}
                  />
                </GridItem>
                <GridItem colSpan={isMobile ? 2 : 1}>
                  <InputBoxAndLabel
                    register={register}
                    type="select"
                    text="Kota/Kabupaten"
                    options={cityData}
                    name="city"
                    selectZone="city"
                    defaultValue={data.city_name}
                    defaultValueId={data.city_id}
                    onChange={(e) => setCityId(e.target.value)}
                  />
                </GridItem>
                <GridItem colSpan={isMobile ? 2 : 1}>
                  <InputBoxAndLabel
                    register={register}
                    type="select"
                    text="Kecamatan"
                    options={districtData}
                    name="district"
                    selectZone="district"
                    defaultValue={data.subdistrict_name}
                    defaultValueId={data.subdistrict_id}
                    onChange={(e) => setdistrictId(e.target.value)}
                  />
                </GridItem>
                <GridItem colSpan={isMobile ? 2 : 1}>
                  <InputBoxAndLabel
                    register={register}
                    type="select"
                    text="Kode Pos"
                    options={postalCodeData}
                    name="postalCode"
                    selectZone="postalCode"
                    defaultValue={data.postcode}
                    defaultValueId={data.postcode}
                    onChange={(e) => setpostalCodeId(e.target.value)}
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
  data
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 48rem)")
  const { register, handleSubmit } = useForm();
  const { deleteItem, addItemPengirim } = useAddressContext();
  const { userData } = useAuthContext()
  const userId = userData?.id
  const addressId = data?.address_id

  const onSubmit = data => {
    let firstname, lastname, phone
    if (data.name.split(" ").length > 1) {
      firstname = data.name.split(" ").slice(0, data.name.split(" ").length - 1).join(" ")
      lastname = data.name.split(" ")[data.name.split(" ").length - 1]
    } else {
      firstname = data.name
      lastname = ""
    }
    phone = data.phoneNumber
    deleteItem(userId, addressId)
    addItemPengirim(userId, 0, 2, firstname, lastname, phone, "edit")
    onClose();
  }



  return (
    <Box position="relative" p="16px" pb="0">
      <Flex lineHeight="150%" className="secondaryFont" fontSize="12px">
        <Box
          color="gray.500"
          textAlign="right"
          display={{ base: "none", md: "block" }}
        >
          <Text>{data.firstname + " " + (data.lastname || " ") ? "Nama Lengkap" : ""}</Text>
          <Text>{data.phone ? "Telepon" : ""}</Text>
        </Box>
        <Box ml={{ base: "0", md: "16px" }} maxW={{ base: "60%", md: "40%" }}>
          <Text fontWeight="bold">{data.firstname + " " + (data.lastname || " ")}</Text>
          <Text>{data.phone}</Text>
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
        <DeleteIcon data={data} />
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        pos="relative"
        size={isMobile ? "6xl" : "lg"}
      >
        {isMobile ? <></> : <ModalOverlay />}
        <ModalContent
          p={isMobile ? "0" : "50px"}
          pos="absolute"
          h={isMobile ? "calc(100% - 50px)" : "auto"}
          mt="50px"
          top={isMobile ? "0" : "calc(50% - 15rem)"}
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
            top={{ base: "0", md: "-15px" }}
            right={{ base: "0", md: "-15px" }}
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
                defaultValue={data.firstname + " " + (data.lastname || " ")}
              />
              <InputBoxAndLabel
                register={register}
                text="Nomor Telepon"
                name="phoneNumber"
                type="tel"
                mt={4}
                defaultValue={data.phone}
              />
              <Flex justify={isMobile ? "center" : "flex-end"}>
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
                  bottom={{ base: "28px", md: "0" }}
                  mx={{ base: "28px", md: "0" }}
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
