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
} from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { FaPhoneAlt } from "react-icons/fa";
import { IoChevronForwardSharp, IoMail } from "react-icons/io5";

const contactUs = () => {
  const breakpoints = createBreakpoints({
    xs: "20em", // 320px
    sm: "30em", // 480px
    md: "48em", // 768px
    lg: "62em", // 992px
    xl: "80em", // 1280px
    "2xl": "96em", // 1536px
  });

  const theme = extendTheme({ breakpoints });

  return (
    <Stack direction={["column"]}>
      <Box w="100%">
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
        <Text fontSize={["4xl", "5xl"]}>
          <b>Kontak Kami</b>
        </Text>
      </Box>
      <Flex direction="column">
        <Flex
          h="10%"
          spacing="24px"
          order={[1, 2]}
          // ["column", "row"]
          direction={{ xs: "column", md: "row" }}
        >
          <Stack direction="row">
            <FaPhoneAlt size="2rem" color="orange" />
            <h1>+62 851-5995-4161</h1>
          </Stack>
          <Stack direction="row">
            <IoMail size="2rem" color="orange" />
            <h1>customer@sabilamall.co.id</h1>
          </Stack>
        </Flex>
        <AspectRatio w="22rem" h="22rem" ratio={4 / 4} order={[2, 1]}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3005748285827!2d106.83741871529621!3d-6.355123363942694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edea57fe727d%3A0xd91affb117d8be88!2sSabilaMall!5e0!3m2!1sen!2sid!4v1620227743526!5m2!1sen!2sid"></iframe>
        </AspectRatio>
      </Flex>
    </Stack>
  );
};

export default contactUs;
