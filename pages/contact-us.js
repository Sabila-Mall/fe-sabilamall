import {
  Box,
  Center,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  extendTheme,
  Text,
  Stack,
  AspectRatio,
  Flex,
  Divider,
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
  const style = {
    transform: "translateY(-2rem)",
  };

  return (
    <Center>
      <Stack
        width={["85%"]}
        direction={["column"]}
        pt="3rem"
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
          <Text
            mt="1rem"
            mb="1rem"
            fontSize={["4xl", "4xl", "5xl"]}
            fontWeight="700"
          >
            Kontak Kami
          </Text>
        </Box>
        <Grid
          mt="0 !important"
          templateRows="2rem 10rem 10rem 4.5rem "
          templateColumns="auto 28.4rem auto"
          gap="1rem"
        >
          <GridItem rowSpan={1} order={2}>
            <Flex
              h="10%"
              order={[1, 1, 2]}
              direction={["column", "column", "row"]}
            >
              <Stack
                direction="row"
                alignItems="center"
                height="3rem"
                width="100%"
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center">
                  <FaPhoneAlt size="2rem" color="orange" />
                  <Text
                    ml="0.64rem"
                    as="h1"
                    fontSize="0.875rem"
                    fontWeight="500"
                  >
                    +62 851-5995-4161
                  </Text>
                </Stack>
                <Divider orientation="vertical" />
                <Stack direction="row" alignItems="center">
                  <IoMail size="2rem" color="orange" />
                  <Text
                    ml="0.64rem"
                    as="h1"
                    fontSize="0.875rem"
                    fontWeight="500"
                  >
                    customer@sabilamall.co.id
                  </Text>
                </Stack>
                <Divider orientation="Horizontal" />
              </Stack>
            </Flex>
          </GridItem>
          <GridItem rowSpan={3} order={1}>
            <AspectRatio
              w="22.5rem"
              h="22.5rem"
              ratio={1 / 1}
              order={[2, 2, 1]}
            >
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3005748285827!2d106.83741871529621!3d-6.355123363942694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edea57fe727d%3A0xd91affb117d8be88!2sSabilaMall!5e0!3m2!1sen!2sid!4v1620227743526!5m2!1sen!2sid"></iframe>
            </AspectRatio>
          </GridItem>

          <GridItem rowSpan={4} order={3}>
            <Flex position="relative" justifyContent="center">
              {/* <Image
                src="/Assets/sm-mascott.svg"
                alt="sm-mascott"
                layout="fill"
                quality={100}
              /> */}
              <img style={style} src="/Assets/sm-mascott.svg" alt="" />
            </Flex>
          </GridItem>
          <GridItem rowSpan={3} order={4} mt="2rem">
            <Stack w="100%" h="100%">
              <Text as="h1" fontSize={["2xl"]}>
                <b>Tinggalkan Pesan</b>
              </Text>
              <VStack h="100%" spacing="1rem">
                <InputGroup size="md" flexGrow="1">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IoPeopleSharp size="1.4rem" color="#A0AEC0" />}
                  />
                  <Input type="tel" placeholder="Nama Anda" size="md" />
                </InputGroup>
                <InputGroup size="md" flexGrow="1">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<IoMail size="1.4rem" color="#A0AEC0" />}
                  />
                  <Input placeholder="Alamat email Anda" size="md" />
                </InputGroup>
                <InputGroup size="md" flexGrow="1">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaPhoneAlt size="1.4rem" color="#A0AEC0" />}
                  />
                  <Input type="tel" placeholder="Nomor Telepon" />
                </InputGroup>
                <Textarea
                  placeHolder="Tinggalkan pesan Anda di sini"
                  size="md"
                  w="100%"
                  h="40%"
                />
                <Flex w="100%" justifyContent="flex-end">
                  <Button
                    colorScheme="red"
                    variant="solid"
                    size="md"
                    width="10.4rem"
                  >
                    Kirim
                  </Button>
                </Flex>
              </VStack>
            </Stack>
          </GridItem>
        </Grid>
      </Stack>
    </Center>
  );
};

export default contactUs;
