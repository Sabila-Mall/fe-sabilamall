import {
  Box,
  Center,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  extendTheme,
  Text,
  Stack,
  AspectRatio,
  Flex,
  Divider,
  HStack,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement,
  Input,
  VStack,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { IoChevronForwardSharp, IoMail, IoPeopleSharp } from "react-icons/io5";

const breakpoints = createBreakpoints({
  xs: "20em", // 320px
  sm: "30em", // 480px
  md: "48em", // 768px
  lg: "62em", // 992px
  xl: "80em", // 1280px
  "2xl": "96em", // 1536px
});

const contactUs = () => {
  const theme = extendTheme({ breakpoints });

  return (
    <Center>
      <Stack
        width={["85%"]}
        direction={["column"]}
        my="3rem"
        // mx={["1rem", "2rem", "2rem", "3rem", "7rem"]}
      >
        <Box w="100%" pl="2rem">
          <Breadcrumb separator={<IoChevronForwardSharp color="gray.500" />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#" color="orange.400">
                <b>Kontak Kami</b>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box>
          <Text mt="1rem" mb="1rem" fontSize={["4xl", "4xl", "5xl"]}>
            <b>Kontak Kami</b>
          </Text>
        </Box>
        <Grid
          templateRows="repeat(5, 1fr)"
          templateColumns="repeat(7, 1fr)"
          gap="1rem"
        >
          <GridItem colSpan={3} rowSpan={1} order={2}>
            <Flex
              h="10%"
              order={[1, 1, 2]}
              direction={["column", "column", "row"]}
            >
              <Stack spacing="1em" direction="row">
                <Stack direction="row">
                  <FaPhoneAlt size="2rem" color="orange" />
                  <h1>+62 851-5995-4161</h1>
                </Stack>
                <Stack direction="row">
                  <IoMail size="2rem" color="orange" />
                  <h1>customer@sabilamall.co.id</h1>
                </Stack>
              </Stack>
            </Flex>
          </GridItem>

          <GridItem colSpan={2} rowSpan={4} order={1}>
            <AspectRatio w="22rem" h="22rem" ratio={4 / 4} order={[2, 2, 1]}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3005748285827!2d106.83741871529621!3d-6.355123363942694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edea57fe727d%3A0xd91affb117d8be88!2sSabilaMall!5e0!3m2!1sen!2sid!4v1620227743526!5m2!1sen!2sid"></iframe>
            </AspectRatio>
          </GridItem>

          <GridItem colSpan={2} rowSpan={4} order={3}>
            <Box position="relative" w="100%" h="100%">
              <Image
                src="/Assets/sm-mascott.svg"
                alt="sm-mascott"
                layout="fill"
                quality={100}
              />
            </Box>
          </GridItem>
          <GridItem colSpan={3} rowSpan={4} order={4}>
            <Stack w="100%" h="100%">
              <Text as="h1" fontSize={["2xl"]}>
                <b>Tinggalkan Pesan</b>
              </Text>

              <VStack h="100%">
                <InputGroup size="md" flexGrow="1">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IoPeopleSharp color="gray.300" />}
                  />
                  <Input type="tel" placeholder="Nama Anda" size="md" />
                </InputGroup>
                <InputGroup size="md" flexGrow="1">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IoMail color="gray.300" />}
                  />
                  <Input placeholder="Email" size="md" />
                </InputGroup>
                <InputGroup size="md" flexGrow="1">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaPhoneAlt color="gray.300" />}
                  />
                  <Input type="tel" placeholder="Nomor Telepon" />
                </InputGroup>
                <Textarea
                  placeHolder="Tinggalkan Pesan Anda di sini"
                  size="md"
                  w="100%"
                  h="40%"
                />
                <Button colorScheme="red" variant="solid" size="md">
                  Kirim
                </Button>
              </VStack>
            </Stack>
          </GridItem>
        </Grid>
      </Stack>
    </Center>
  );
};

export default contactUs;
