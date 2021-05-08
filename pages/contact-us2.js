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
import { FaPhoneAlt } from "react-icons/fa";
import {
  IoChevronForwardSharp,
  IoMail,
  IoPeopleSharp,
  IoLocation,
} from "react-icons/io5";

const contact = () => {
  return (
    <Flex
      fontWeight="500"
      mx={["2rem", "3rem", "2rem", "2rem", "7.5rem"]}
      flexDirection="column"
    >
      <Box>
        <Breadcrumb separator={<IoChevronForwardSharp size="0.75rem" />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#" color="orange.400">
              Kontak Kami
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Box>
        <Grid templateColumns="30% 42% 28%" templateRows="20% 20% 60%">
          <GridItem colSpan={3} rowSpan={1}>
            <Text as="h1" fontSize="3rem" fontWeight="700">
              Kontak Kami
            </Text>
          </GridItem>

          <GridItem bgColor="red.500" rowSpan={3}>
            <Box>
              <AspectRatio ratio={1 / 1}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.6511914828773!2d106.84040535481434!3d-6.354888779943661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edea57fe727d%3A0xd91affb117d8be88!2sSabilaMall!5e0!3m2!1sen!2sid!4v1620456567353!5m2!1sen!2sid"
                  allowfullscreen={true}
                  loading="lazy"
                />
              </AspectRatio>
              <Flex fontSize="0.875rem" mt="1rem">
                <span>
                  <IoLocation size="2rem" color="orange" />
                </span>
                <Flex>
                  Satria Building 2nd Lt 2 Unit A204-A206, Jl. Akses UI
                  No.24-26, Tugu, Kec. Cimanggis, Kota Depok, Jawa Barat Depok
                  Jawa Barat, 16451 Indonesia
                </Flex>
              </Flex>
            </Box>
          </GridItem>
          <GridItem bgColor="blue.700" rowSpan={1}>
            <Box>aaa</Box>
          </GridItem>
          <GridItem bgColor="red.500" rowSpan={3}>
            <Box>a</Box>
          </GridItem>
          <GridItem bgColor="blue.500" rowSpan={2}>
            <Box>a</Box>
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
};

export default contact;
