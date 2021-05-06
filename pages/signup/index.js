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
  Heading,
  Text,
  Icon,
  FormControl,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { BsFillLockFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { IoPeopleSharp, IoPhonePortraitOutline, IoFlag } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";

import styles from "../../styles/Signup.module.scss";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [alamat, setAlamat] = useState("");
  const [handphone, setHandphone] = useState("");

  let provinces = [
    "province1",
    "province2",
    "province3",
    "province4",
    "province5",
  ];
  let cities = ["city1", "city2", "city3", "city4", "city5"];

  return (
    <Center w="100vw" minH="100vh">
      <Stack
        divider={
          <StackDivider borderColor={{ base: "white", md: "gray.200" }} />
        }
        mt={5}
        mb={5}
        spacing={{ base: "4px", md: "24px" }}
        direction={{ base: "column", md: "row", lg: "" }}
        h="100%"
        w={{ base: "100%", md: "85%", lg: "" }}
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
                className={styles.primary}
              >
                Pendaftaran
              </Text>
              <Text
                className={styles.secondary}
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
                    <Icon as={IoPeopleSharp} color="gray.500" boxSize="1.2em" />
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
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                h="100%"
                children={
                  <Icon as={IoPeopleSharp} color="gray.500" boxSize="1.2em" />
                }
              />
              <Input
                placeholder="Nama Belakang"
                size="md"
                fontSize="sm"
                onChange={(e) => setNamaBelakang(e.target.value)}
              />
            </InputGroup>
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
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                h="100%"
                children={
                  <Icon as={BsFillLockFill} color="gray.500" boxSize="1.2em" />
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
                  />
                }
              />
            </InputGroup>
            <Box
              borderRadius="md"
              borderWidth={1}
              borderColor="gray.200"
              w="100%"
              h={10}
            >
              <Stack isInline w="100%" h="100%" spacing="0px" borderRadius="md">
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
                  <Select
                    variant="unstyled"
                    placeholder="Pilih Provinsi"
                    fontSize="sm"
                    h="100%"
                    onChange={(e) => setProvince(e.target.value)}
                    color={province === "" ? "gray.400" : "black"}
                    borderRadius="0px"
                  >
                    {provinces.map((province) => (
                      <option value={province}>{province}</option>
                    ))}
                  </Select>
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
              <Stack isInline w="100%" h="100%" spacing="0px" borderRadius="md">
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
                  <Select
                    variant="unstyled"
                    placeholder="Pilih Kota"
                    fontSize="sm"
                    h="100%"
                    onChange={(e) => setCity(e.target.value)}
                    color={city === "" ? "gray.400" : "black"}
                    borderRadius="0px"
                  >
                    {cities.map((city) => (
                      <option value={city}>{city}</option>
                    ))}
                  </Select>
                </Center>
              </Stack>
            </Box>
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
                onChange={(e) => setHandphone(e.target.value)}
              />
            </InputGroup>
            <Text
              align="center"
              color="gray.500"
              className={styles.secondary}
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
                handphone !== ""
                  ? false
                  : true
              }
            >
              Register
            </Button>
            <Text
              align="center"
              color="gray.500"
              className={styles.secondary}
              fontSize="12px"
            >
              Sudah punya akun?{" "}
              <b>
                <Link href="/">Masuk</Link>
              </b>
            </Text>
            <Text
              align="center"
              color="gray.300"
              w="100%"
              className={styles.secondary}
              fontSize="12px"
            >
              Versi 1.0.0
            </Text>
          </Stack>
        </Center>
      </Stack>
    </Center>
  );
};

export default SignUp;
