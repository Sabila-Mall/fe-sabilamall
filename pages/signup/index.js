import {
  Center,
  Box,
  Stack,
  StackDivider,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Select,
  Text,
  Icon,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { BsFillLockFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { IoPeopleSharp, IoPhonePortraitOutline, IoFlag } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";

import {
  apiRegister,
  saveTokenToCookies,
  saveUserIdToCookies,
} from "../../api/Auth";
import { apiKota, apiProvinsi } from "../../api/Zone";
import { Layout } from "../../components/Layout";
import {
  AUTH_RESPONSE_STATUS,
  USER_FIELDS,
} from "../../constants/authConstants";
import { useAuthContext } from "../../contexts/authProvider";
import { isRequestSuccess } from "../../utils/api";
import { filterObject } from "../../utils/functions";

const SignUp = () => {
  const router = useRouter();
  const { setUserData, setIsLoggedIn } = useAuthContext();

  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [alamat, setAlamat] = useState("");
  const [handphone, setHandphone] = useState("");
  const [provinceId, setProvinceId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validatePass, setValidatePass] = useState({
    length: false,
    alphanumeric: false,
  });
  const toast = useToast();

  const passwordPattern = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{2,})$/;

  useEffect(() => {
    apiProvinsi()
      .then((res) => {
        const response = res.data.data;
        setProvinsi(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (province !== "") {
      const id = provinsi.filter((prov) => prov.zone_name === province)[0]
        .zone_apicityid;
      setProvinceId(id);
      apiKota(id)
        .then((res) => {
          const response = res.data.data;
          setKota(response);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [province]);

  useEffect(() => {
    if (city !== "") {
      const id = kota.filter((ko) => ko.city_name === city)[0].city_id;
      setCityId(id);
    }
  }, [city]);

  useEffect(() => {
    console.log(passwordPattern.test(password));
    if (password?.length >= 8 && passwordPattern.test(password)) {
      setValidatePass({ length: true, alphanumeric: true });
    } else if (passwordPattern.test(password)) {
      setValidatePass({ length: false, alphanumeric: true });
    } else if (password?.length >= 8) {
      setValidatePass({ alphanumeric: false, length: true });
    } else {
      setValidatePass({ alphanumeric: false, length: false });
    }
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    apiRegister(
      namaDepan,
      namaBelakang,
      emailAddress,
      password,
      handphone,
      alamat,
      provinceId,
      cityId,
    )
      .then((res) => {
        const response = res.data;
        if (isRequestSuccess(response)) {
          setUserData(filterObject(response.data[0], USER_FIELDS));
          saveUserIdToCookies(response.data[0].id);
          // saveTokenToCookies(respose.data[0].token);
          setIsLoggedIn(true);
          router.push("/");
        } else {
          setLoading(false);
          toast({
            position: "top",
            title: response.message,
            status: "error",
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        toast({
          position: "top",
          title: err,
          status: "error",
          isClosable: true,
        });
      });
  };
  console.log(validatePass);
  return (
    <Layout noFooter>
      <Center maxW="100vw" minH="100vh" mb="5rem">
        <Stack
          divider={
            <StackDivider borderColor={{ base: "white", md: "gray.200" }} />
          }
          spacing={{ base: "0.25em", md: "1.5em" }}
          direction={{ base: "column", md: "row", lg: "" }}
          h="100%"
          w={{ base: "100%", md: "85%" }}
        >
          <Center w="100%">
            <Image
              src="/images/signup/logo.png"
              alt="sabila-mall-logo"
              w={{ base: "55%", md: "100%" }}
            />
          </Center>
          <Center w="100%" minH="100%">
            <Stack
              align={{ base: "center", md: "stretch" }}
              spacing={5}
              direction="column"
              w="90%"
            >
              <Box>
                <Text
                  align={{ base: "center", md: "left" }}
                  fontWeight="bold"
                  fontSize="24px"
                  className="primaryFont"
                >
                  Pendaftaran
                </Text>
                <Text
                  className="secondaryFont"
                  fontSize="14px"
                  align={{ base: "center", sm: "left" }}
                >
                  Silahkan isi data berikut untuk mendaftar
                </Text>
              </Box>
              <FormControl id="NamaDepan">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    h="100%"
                    children={
                      <Icon
                        as={IoPeopleSharp}
                        color="gray.500"
                        boxSize="1.2em"
                      />
                    }
                  />
                  <Input
                    placeholder="Nama Depan"
                    size="md"
                    fontSize="sm"
                    onChange={(e) => setNamaDepan(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="namaBelakang">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    h="100%"
                    children={
                      <Icon
                        as={IoPeopleSharp}
                        color="gray.500"
                        boxSize="1.2em"
                      />
                    }
                  />
                  <Input
                    placeholder="Nama Belakang"
                    size="md"
                    fontSize="sm"
                    onChange={(e) => setNamaBelakang(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="emailAddress">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    h="100%"
                    children={
                      <Icon as={IoMdMail} color="gray.500" boxSize="1.2em" />
                    }
                  />
                  <Input
                    placeholder="Email Address"
                    size="md"
                    fontSize="sm"
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="password">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    h="100%"
                    children={
                      <Icon
                        as={BsFillLockFill}
                        color="gray.500"
                        boxSize="1.2em"
                      />
                    }
                  />
                  <Input
                    pr=""
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    size="md"
                    fontSize="sm"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement
                    onClick={() => setShowPassword(!showPassword)}
                    h="100%"
                    children={
                      <Icon
                        as={showPassword ? BiShow : BiHide}
                        color="gray.500"
                        boxSize="1.2em"
                        _hover={{ cursor: "pointer" }}
                      />
                    }
                  />
                </InputGroup>
              </FormControl>
              {Boolean(!(validatePass.length && validatePass.alphanumeric)) && (
                <Box
                  mt="-4rem"
                  fontSize="0.85rem"
                  color="red.500"
                  fontWeight="600"
                >
                  {!validatePass.length && (
                    <Text>*Minimal terdiri dari 8 karakter</Text>
                  )}
                  {!validatePass.alphanumeric && (
                    <Text>*Harus mengandung huruf dan angka</Text>
                  )}
                </Box>
              )}
              <Box
                borderRadius="md"
                borderWidth={1}
                borderColor="gray.200"
                w="100%"
                h={10}
              >
                <Stack
                  isInline
                  w="100%"
                  h="100%"
                  spacing="0px"
                  borderRadius="md"
                >
                  <Center
                    children={
                      <Icon
                        as={IoFlag}
                        color="gray.500"
                        boxSize="1.2em"
                        h="100%"
                      />
                    }
                    minW="2.44rem"
                  />
                  <Center w="100%">
                    <FormControl id="province">
                      <Select
                        variant="unstyled"
                        placeholder="Pilih Provinsi"
                        fontSize="sm"
                        h="100%"
                        onChange={(e) => setProvince(e.target.value)}
                        color={province === "" ? "gray.400" : "black"}
                        borderRadius="0px"
                      >
                        {provinsi !== [] &&
                          provinsi.map((prov, i) => (
                            <option
                              key={prov.zone_name}
                              style={{ color: "black" }}
                            >
                              {prov.zone_name}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                  </Center>
                </Stack>
              </Box>
              <Box
                borderRadius="md"
                borderWidth={1}
                borderColor="gray.200"
                w="100%"
                h={10}
              >
                <Stack
                  isInline
                  w="100%"
                  h="100%"
                  spacing="0px"
                  borderRadius="md"
                >
                  <Center
                    children={
                      <Icon
                        as={IoFlag}
                        color="gray.500"
                        boxSize="1.2em"
                        h="100%"
                      />
                    }
                    minW="2.44rem"
                  />
                  <Center w="100%">
                    <FormControl id="city">
                      <Select
                        variant="unstyled"
                        placeholder="Pilih Kota"
                        fontSize="sm"
                        h="100%"
                        onChange={(e) => setCity(e.target.value)}
                        color={city === "" ? "gray.400" : "black"}
                        borderRadius="0px"
                      >
                        {kota !== [] &&
                          kota.map((ko, i) => (
                            <option
                              key={ko.city_name}
                              style={{ color: "black" }}
                            >
                              {ko.city_name}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                  </Center>
                </Stack>
              </Box>
              <FormControl id="alamat">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    h="100%"
                    children={
                      <Icon
                        as={MdLocationOn}
                        color="gray.500"
                        boxSize="1.2em"
                        fontSize="14px"
                      />
                    }
                  />
                  <Input
                    placeholder="Alamat"
                    size="md"
                    fontSize="sm"
                    onChange={(e) => setAlamat(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="noTelpon">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    h="100%"
                    children={
                      <Icon
                        as={IoPhonePortraitOutline}
                        color="gray.500"
                        boxSize="1.2em"
                      />
                    }
                  />
                  <Input
                    placeholder="No. Telepon / Handphone"
                    size="md"
                    fontSize="sm"
                    type="tel"
                    onChange={(e) => setHandphone(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <Text
                align="center"
                color="gray.500"
                className="secondaryFont"
                fontSize="12px"
              >
                Dengan Masuk atau Daftar, Anda telah menyetujui
                <br />
                Ketentuan Layanan serta Kebijakan Privasi Sabila Mall.
              </Text>
              <Button
                bg="red.500"
                color="white"
                _hover={{ bg: "red.600" }}
                isFullWidth
                isDisabled={
                  namaDepan !== "" &&
                  namaBelakang !== "" &&
                  emailAddress !== "" &&
                  password !== "" &&
                  province !== "" &&
                  city !== "" &&
                  alamat !== "" &&
                  handphone !== "" &&
                  validatePass.length &&
                  validatePass.alphanumeric
                    ? false
                    : true
                }
                onClick={(e) => handleSubmit(e)}
                isLoading={loading}
              >
                Register
              </Button>
              <Text
                align="center"
                color="gray.500"
                className="secondaryFont"
                fontSize="12px"
              >
                Sudah punya akun?{" "}
                <b>
                  <Link href="/login">Masuk</Link>
                </b>
              </Text>
              <Text
                align="center"
                color="gray.300"
                w="100%"
                className="secondaryFont"
                fontSize="12px"
              >
                Versi 1.0.0
              </Text>
            </Stack>
          </Center>
        </Stack>
      </Center>
    </Layout>
  );
};

export default SignUp;
