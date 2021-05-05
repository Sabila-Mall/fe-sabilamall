import React, { useState } from "react";
import Link from "next/link";
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

import { IoMdMail } from "react-icons/io";
import { IoPeopleSharp, IoPhonePortraitOutline, IoFlag } from "react-icons/io5";
import { BsFillLockFill } from "react-icons/bs";
import { BiShow, BiHide } from "react-icons/bi";
import { MdLocationOn, MdSettingsEthernet } from "react-icons/md";

import styles from "../../styles/Signup.module.scss";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

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
        w={{ base: "100%", md: "85%", lg:"" }}
      >
        <Center w="100%">
          <Image
            src="/images/signup/logo.png"
            alt="sabila-mall-logo"
            // bg="green"
            w={{ base: "55%", md: "100%" }}
          />
        </Center>
        <Center w="100%" h="100%">
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
              <Text className={styles.secondary} fontSize="14px">Silahkan isi data berikut untuk mendaftar</Text>
            </Box>
            <FormControl id="NamaDepan">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  h="100%"
                  children={<Icon as={IoPeopleSharp} color="gray.500" boxSize="1.2em" />}
                  />
                <Input placeholder="Nama Depan" size="md" fontSize="sm" onChange={e => setNamaDepan(e.target.value)} />
              </InputGroup>
            </FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                h="100%"
                children={<Icon as={IoPeopleSharp} color="gray.500" boxSize="1.2em" />}
              />
              <Input placeholder="Nama Belakang" size="md" fontSize="sm" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                h="100%"
                children={<Icon as={IoMdMail} color="gray.500" boxSize="1.2em" />}
              />
              <Input placeholder="Email Address" size="md" fontSize="sm" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                h="100%"
                children={<Icon as={BsFillLockFill} color="gray.500" boxSize="1.2em" />}
              />
              <Input
                pr=""
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                size="md"
                fontSize="sm"
              />
              <InputRightElement 
                onClick={() => setShowPassword(!showPassword)}
                h="100%"
                children={<Icon as={showPassword ? BiShow : BiHide} color="gray.500" boxSize="1.2em" />}
              />
            </InputGroup>
            <Box borderRadius="md" borderWidth={1} borderColor="gray.200" w="100%" h={10}>
              <Stack
                isInline
                w="100%"
                h="100%"
                spacing="0px"
                borderRadius="md"
              >
                <Center children={<Icon as={IoFlag} color="gray.500" boxSize="1.2em" h="100%"/>} minW="2.44rem"/>
                <Center w="100%">
                  <Select variant="unstyled" placeholder="Pilih Provinsi" fontSize="sm" h="100%">
                    {provinces.map((province) => (
                      <option value={province}>{province}</option>
                    ))}
                  </Select>
                </Center>
              </Stack>
            </Box>
            <Box borderRadius="md" borderWidth={1} borderColor="gray.200" w="100%" h={10}>
              <Stack
                isInline
                w="100%"
                h="100%"
                spacing="0px"
                borderRadius="md"
              >
                <Center children={<Icon as={IoFlag} color="gray.500" boxSize="1.2em" h="100%"/>} minW="2.44rem"/>
                <Center w="100%">
                  <Select variant="unstyled" placeholder="Pilih Kota" fontSize="sm" h="100%">
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
                children={<Icon as={MdLocationOn} color="gray.500" boxSize="1.2em" fontSize="14px" />}
              />
              <Input placeholder="Alamat" size="md" fontSize="sm" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                h="100%"
                children={<Icon as={IoPhonePortraitOutline} color="gray.500" boxSize="1.2em" />}
              />
              <Input placeholder="No. Telepon / Handphone" size="md" fontSize="sm" />
            </InputGroup>
            <Text align="center" color="gray.500" className={styles.secondary} fontSize="12px">
              Dengan Masuk atau Daftar, Anda telah menyetujui
              <br />
              Ketentuan Layanan serta Kebijakan Privasi Sabila Mall.
            </Text>
            <Button bg="red.500" color="white" isFullWidth>
              Register
            </Button>
            <Text align="center" color="gray.500" className={styles.secondary} fontSize="12px">
              Sudah punya akun?{" "}
              <b>
                <Link href="/">Masuk</Link>
              </b>
            </Text>
          </Stack>
        </Center>
      </Stack>
    </Center>
  );
};

export default SignUp;
