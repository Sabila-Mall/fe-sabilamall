import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
  Text,
  Circle,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Divider,
  Select,
  Textarea,
  Button,
  RadioGroup,
  Radio,
  Grid,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const AlamatPenerima = () => {
  return (
    <>
      <Navbar />
      <Box
        as="main"
        pt={{ base: "51px", md: "71px" }}
        d="flex"
        flexDir="column"
        alignItems="center"
        marginTop={{ base: "2rem", md: "3rem" }}
      >
        <Box w={{ base: "90vw", md: "80vw" }}>
          <Breadcrumb
            spacing="8px"
            separator={<FiChevronRight color="gray.500" />}
            fontSize={{ base: "sm", md: "md" }}
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="#">
                <Text className="secondaryFont" fontWeight="500">
                  Home
                </Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="#">
                <Text className="secondaryFont" fontWeight="500">
                  Checkout
                </Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="#">
                <Text
                  className="primaryFont"
                  color="orange.400"
                  fontWeight="700"
                >
                  Alamat Penerima
                </Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box
          w={{ base: "85%", md: "100%" }}
          d="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="2rem"
        >
          <Circle
            bg="orange.400"
            size={{ base: "1.8rem", md: "2.2rem" }}
            fontSize={{ base: "0.75rem", md: "0.85rem" }}
          >
            1
          </Circle>
          <Text
            className="secondaryFont"
            marginLeft="0.5rem"
            fontSize={{ base: "sm", md: "md" }}
          >
            Alamat Penerima
          </Text>
          <Box
            marginLeft="1rem"
            bg="gray.500"
            h={{ base: "1px", md: "1.2px" }}
            w="10rem"
          />
          <Circle
            bg="gray.50"
            marginLeft="1rem"
            size={{ base: "1.8rem", md: "2.2rem" }}
            fontSize={{ base: "0.75rem", md: "0.85rem" }}
            color="gray.500"
          >
            2
          </Circle>
          <Text
            className="secondaryFont"
            marginLeft="0.5rem"
            color="gray.500"
            fontSize={{ base: "sm", md: "md" }}
          >
            Detail Pesanan
          </Text>
        </Box>
        <Box
          w={{ base: "90vw", md: "80vw" }}
          marginTop="2rem"
          d="flex"
          justifyContent="space-between"
          flexDir={{ base: "column-reverse", md: "row" }}
        >
          <Box
            w={{ base: "100%", md: "65%" }}
            d={{ base: "flex", md: "inline" }}
            flexDir={{ base: "column", md: "row" }}
            alignItems={{ base: "center", md: "stretch" }}
          >
            <Box w="100%">
              <Text className="primaryFont" fontWeight="700" fontSize="1.25rem">
                Data Pengirim
              </Text>
              <Tabs variant="unstyled" marginTop="0.5rem">
                <TabList>
                  <Tab
                    color="gray.500"
                    className="secondaryFont"
                    borderBottom="2px solid"
                    borderBottomColor="gray.300"
                    fontSize={{ base: "xs", md: "md" }}
                    _selected={{
                      color: "black",
                      borderBottom: "2px solid",
                      borderBottomColor: "yellow.500",
                    }}
                  >
                    Gunakan alamat tersimpan
                  </Tab>
                  <Tab
                    marginLeft="1rem"
                    color="gray.500"
                    className="secondaryFont"
                    borderBottom="2px solid"
                    borderBottomColor="gray.300"
                    fontSize={{ base: "xs", md: "md" }}
                    _selected={{
                      color: "black",
                      borderBottom: "2px solid",
                      borderBottomColor: "yellow.500",
                    }}
                  >
                    Masukkan alamat baru
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <InputGroup
                      width={{ base: "100%", md: "48%" }}
                      marginTop="0.5rem"
                      marginBottom="1rem"
                    >
                      <Input
                        type="tel"
                        placeholder="Cari alamat"
                        color="gray.500"
                        fontSize="sm"
                      />
                      <InputRightElement
                        children={<BiSearch color="black" />}
                      />
                    </InputGroup>
                    <Box
                      height={{ base: "11.5rem", md: "7.3rem" }}
                      overflowY="scroll"
                      css={
                        {
                          // "&::-webkit-scrollbar": {
                          //   width: "0px",
                          // },
                          // "&::-webkit-scrollbar-track": {
                          //   width: "10px",
                          // },
                          // "&::-webkit-scrollbar-thumb": {
                          //   width: "10px",
                          // },
                        }
                      }
                    >
                      <RadioGroup>
                        <Grid
                          templateColumns={{
                            base: "repeat(1,1fr)",
                            md: "repeat(2,1fr)",
                          }}
                          gap={4}
                        >
                          <Box
                            w="100%"
                            border="1px solid"
                            borderColor="gray.400"
                            borderRadius="md"
                            d="flex"
                            flexDir="row"
                            padding="5px 10px 5px 10px"
                            as="label"
                            for="1"
                            cursor="pointer"
                          >
                            <Radio value="1" id="1" />
                            <Box
                              d="flex"
                              flexDir="column"
                              marginLeft="2ch"
                              fontSize="0.8rem"
                            >
                              <Text>Ariq</Text>
                              <Text>081122334455</Text>
                            </Box>
                          </Box>
                          <Box
                            w="100%"
                            border="1px solid"
                            borderColor="gray.400"
                            borderRadius="md"
                            d="flex"
                            flexDir="row"
                            padding="5px 10px 5px 10px"
                            as="label"
                            for="2"
                            cursor="pointer"
                          >
                            <Radio value="2" id="2" />
                            <Box
                              d="flex"
                              flexDir="column"
                              marginLeft="2ch"
                              fontSize="0.8rem"
                            >
                              <Text>Ariq</Text>
                              <Text>081122334455</Text>
                            </Box>
                          </Box>
                          <Box
                            w="100%"
                            border="1px solid"
                            borderColor="gray.400"
                            borderRadius="md"
                            d="flex"
                            flexDir="row"
                            padding="5px 10px 5px 10px"
                            as="label"
                            for="3"
                            cursor="pointer"
                          >
                            <Radio value="3" id="3" />
                            <Box
                              d="flex"
                              flexDir="column"
                              marginLeft="2ch"
                              fontSize="0.8rem"
                            >
                              <Text>Ariq</Text>
                              <Text>081122334455</Text>
                            </Box>
                          </Box>
                          <Box
                            w="100%"
                            border="1px solid"
                            borderColor="gray.400"
                            borderRadius="md"
                            d="flex"
                            flexDir="row"
                            padding="5px 10px 5px 10px"
                            as="label"
                            for="4"
                            cursor="pointer"
                          >
                            <Radio value="4" id="4" />
                            <Box
                              d="flex"
                              flexDir="column"
                              marginLeft="2ch"
                              fontSize="0.8rem"
                            >
                              <Text>Ariq</Text>
                              <Text>081122334455</Text>
                            </Box>
                          </Box>
                          <Box
                            w="100%"
                            border="1px solid"
                            borderColor="gray.400"
                            borderRadius="md"
                            d="flex"
                            flexDir="row"
                            padding="5px 10px 5px 10px"
                            as="label"
                            for="5"
                            cursor="pointer"
                          >
                            <Radio value="5" id="5" />
                            <Box
                              d="flex"
                              flexDir="column"
                              marginLeft="2ch"
                              fontSize="0.8rem"
                            >
                              <Text>Ariq</Text>
                              <Text>081122334455</Text>
                            </Box>
                          </Box>
                          <Box
                            w="100%"
                            border="1px solid"
                            borderColor="gray.400"
                            borderRadius="md"
                            d="flex"
                            flexDir="row"
                            padding="5px 10px 5px 10px"
                            as="label"
                            for="6"
                            cursor="pointer"
                          >
                            <Radio value="6" id="6" />
                            <Box
                              d="flex"
                              flexDir="column"
                              marginLeft="2ch"
                              fontSize="0.8rem"
                            >
                              <Text>Ariq</Text>
                              <Text>081122334455</Text>
                            </Box>
                          </Box>
                        </Grid>
                      </RadioGroup>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box
                      w="100%"
                      d="flex"
                      flexDir={{ base: "column", md: "row" }}
                      justifyContent="space-between"
                    >
                      <Box w={{ base: "100%", md: "47.5%" }}>
                        <Text
                          className="secondaryFont"
                          fontWeight="500"
                          fontSize="0.875rem"
                        >
                          Nama Pengirim
                        </Text>
                        <Input
                          placeholder="Masukkan nama pengirim"
                          marginTop="0.5rem"
                        />
                      </Box>
                      <Box w={{ base: "100%", md: "47.5%" }}>
                        <Text
                          className="secondaryFont"
                          fontWeight="500"
                          fontSize="0.875rem"
                          marginTop={{ base: "1rem", md: "0rem" }}
                        >
                          Ponsel Pengirim
                        </Text>
                        <Input
                          placeholder="Masukkan nomor ponsel pengirim"
                          marginTop="0.5rem"
                        />
                      </Box>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <Divider orientation="horizontal" />
              <Text
                className="primaryFont"
                fontWeight="700"
                fontSize="1.25rem"
                marginTop="1rem"
              >
                Data Alamat Penerima
              </Text>
              <Tabs variant="unstyled" marginTop="0.5rem">
                <TabList>
                  <Tab
                    color="gray.400"
                    className="secondaryFont"
                    borderBottom="2px solid"
                    borderBottomColor="gray.300"
                    fontSize={{ base: "xs", md: "md" }}
                    _selected={{
                      color: "black",
                      borderBottom: "2px solid",
                      borderBottomColor: "yellow.500",
                    }}
                  >
                    Gunakan alamat tersimpan
                  </Tab>
                  <Tab
                    marginLeft="1rem"
                    color="gray.500"
                    className="secondaryFont"
                    borderBottom="2px solid"
                    borderBottomColor="gray.300"
                    fontSize={{ base: "xs", md: "md" }}
                    _selected={{
                      color: "black",
                      borderBottom: "2px solid",
                      borderBottomColor: "yellow.500",
                    }}
                  >
                    Masukkan alamat baru
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <InputGroup
                      width={{ base: "100%", md: "48%" }}
                      marginTop="0.5rem"
                      marginBottom="1rem"
                    >
                      <Input
                        type="tel"
                        placeholder="Cari alamat"
                        color="gray.500"
                        fontSize="sm"
                      />
                      <InputRightElement
                        children={<BiSearch color="black" />}
                      />
                    </InputGroup>
                    <Box
                      height={{ base: "31rem", md: "20rem" }}
                      overflowY="scroll"
                    >
                      <RadioGroup>
                        <Grid
                          templateColumns={{
                            base: "repeat(1,1fr)",
                            md: "repeat(2,1fr)",
                          }}
                          gap={4}
                        >
                          <Box
                            w="100%"
                            border="1px solid"
                            borderColor="gray.400"
                            borderRadius="md"
                            d="flex"
                            flexDir="row"
                            padding="7px 10px 7px 10px"
                            as="label"
                            for="1"
                            cursor="pointer"
                          >
                            <Radio value="1" id="1" />
                            <Box
                              d="flex"
                              flexDir="column"
                              marginLeft="2ch"
                              fontSize="0.8rem"
                            >
                              <Text>Ariq</Text>
                              <Text>081122334455</Text>
                              <Text>
                                Jl. Margonda Raya, Pondok Cina, Kecamatan Beji,
                                Kota Depok, Jawa Barat 16424
                              </Text>
                            </Box>
                          </Box>
                          <Box
                            w="100%"
                            border="1px solid"
                            borderColor="gray.400"
                            borderRadius="md"
                            d="flex"
                            flexDir="row"
                            padding="7px 10px 7px 10px"
                            as="label"
                            for="1"
                            cursor="pointer"
                          >
                            <Radio value="1" id="1" />
                            <Box
                              d="flex"
                              flexDir="column"
                              marginLeft="2ch"
                              fontSize="0.8rem"
                            >
                              <Text>Ariq</Text>
                              <Text>081122334455</Text>
                              <Text>
                                Jl. Margonda Raya, Pondok Cina, Kecamatan Beji,
                                Kota Depok, Jawa Barat 16424
                              </Text>
                            </Box>
                          </Box>
                          <Box
                            w="100%"
                            border="1px solid"
                            borderColor="gray.400"
                            borderRadius="md"
                            d="flex"
                            flexDir="row"
                            padding="7px 10px 7px 10px"
                            as="label"
                            for="1"
                            cursor="pointer"
                          >
                            <Radio value="1" id="1" />
                            <Box
                              d="flex"
                              flexDir="column"
                              marginLeft="2ch"
                              fontSize="0.8rem"
                            >
                              <Text>Ariq</Text>
                              <Text>081122334455</Text>
                              <Text>
                                Jl. Margonda Raya, Pondok Cina, Kecamatan Beji,
                                Kota Depok, Jawa Barat 16424
                              </Text>
                            </Box>
                          </Box>
                          <Box
                            w="100%"
                            border="1px solid"
                            borderColor="gray.400"
                            borderRadius="md"
                            d="flex"
                            flexDir="row"
                            padding="7px 10px 7px 10px"
                            as="label"
                            for="1"
                            cursor="pointer"
                          >
                            <Radio value="1" id="1" />
                            <Box
                              d="flex"
                              flexDir="column"
                              marginLeft="2ch"
                              fontSize="0.8rem"
                            >
                              <Text>Ariq</Text>
                              <Text>081122334455</Text>
                              <Text>
                                Jl. Margonda Raya, Pondok Cina, Kecamatan Beji,
                                Kota Depok, Jawa Barat 16424
                              </Text>
                            </Box>
                          </Box>
                          <Box
                            w="100%"
                            border="1px solid"
                            borderColor="gray.400"
                            borderRadius="md"
                            d="flex"
                            flexDir="row"
                            padding="7px 10px 7px 10px"
                            as="label"
                            for="1"
                            cursor="pointer"
                          >
                            <Radio value="1" id="1" />
                            <Box
                              d="flex"
                              flexDir="column"
                              marginLeft="2ch"
                              fontSize="0.8rem"
                            >
                              <Text>Ariq</Text>
                              <Text>081122334455</Text>
                              <Text>
                                Jl. Margonda Raya, Pondok Cina, Kecamatan Beji,
                                Kota Depok, Jawa Barat 16424
                              </Text>
                            </Box>
                          </Box>
                          <Box
                            w="100%"
                            border="1px solid"
                            borderColor="gray.400"
                            borderRadius="md"
                            d="flex"
                            flexDir="row"
                            padding="7px 10px 7px 10px"
                            as="label"
                            for="1"
                            cursor="pointer"
                          >
                            <Radio value="1" id="1" />
                            <Box
                              d="flex"
                              flexDir="column"
                              marginLeft="2ch"
                              fontSize="0.8rem"
                            >
                              <Text>Ariq</Text>
                              <Text>081122334455</Text>
                              <Text>
                                Jl. Margonda Raya, Pondok Cina, Kecamatan Beji,
                                Kota Depok, Jawa Barat 16424
                              </Text>
                            </Box>
                          </Box>
                        </Grid>
                      </RadioGroup>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box
                      w="100%"
                      d="flex"
                      flexDir={{ base: "column", md: "row" }}
                      justifyContent="space-between"
                    >
                      <Box w={{ base: "100%", md: "47.5%" }}>
                        <Text
                          className="secondaryFont"
                          fontWeight="500"
                          fontSize="0.875rem"
                        >
                          Nama Awal
                        </Text>
                        <Input
                          placeholder="Masukkan nama awal penerima"
                          marginTop="0.5rem"
                        />
                        <Text
                          className="secondaryFont"
                          fontWeight="500"
                          fontSize="0.875rem"
                          marginTop="1rem"
                        >
                          Negara
                        </Text>
                        <Select
                          placeholder="Pilih negara penerima"
                          marginTop="0.5rem"
                        >
                          <option key="1" value="Nanti di map">
                            Nanti di map
                          </option>
                          <option key="2" value="Nanti di map">
                            Nanti di map
                          </option>
                          <option key="3" value="Nanti di map">
                            Nanti di map
                          </option>
                        </Select>
                        <Text
                          className="secondaryFont"
                          fontWeight="500"
                          fontSize="0.875rem"
                          marginTop="1rem"
                        >
                          Kota Tujuan
                        </Text>
                        <Select
                          placeholder="Pilih kota tujuan penerima"
                          marginTop="0.5rem"
                        >
                          <option key="1" value="Nanti di map">
                            Nanti di map
                          </option>
                          <option key="2" value="Nanti di map">
                            Nanti di map
                          </option>
                          <option key="3" value="Nanti di map">
                            Nanti di map
                          </option>
                        </Select>
                        <Text
                          className="secondaryFont"
                          fontWeight="500"
                          fontSize="0.875rem"
                          marginTop="1rem"
                        >
                          Kode Pos
                        </Text>
                        <Select
                          placeholder="Pilih kode pos penerima"
                          marginTop="0.5rem"
                        >
                          <option key="1" value="Nanti di map">
                            Nanti di map
                          </option>
                          <option key="2" value="Nanti di map">
                            Nanti di map
                          </option>
                          <option key="3" value="Nanti di map">
                            Nanti di map
                          </option>
                        </Select>
                      </Box>
                      <Box
                        w={{ base: "100%", md: "47.5%" }}
                        marginTop={{ base: "1rem", md: "0rem" }}
                      >
                        <Text
                          className="secondaryFont"
                          fontWeight="500"
                          fontSize="0.875rem"
                        >
                          Nama Akhir
                        </Text>
                        <Input
                          placeholder="Masukkan nama akhir penerima"
                          marginTop="0.5rem"
                        />
                        <Text
                          className="secondaryFont"
                          fontWeight="500"
                          fontSize="0.875rem"
                          marginTop="1rem"
                        >
                          Provinsi
                        </Text>
                        <Select
                          placeholder="Pilih provinsi penerima"
                          marginTop="0.5rem"
                        >
                          <option key="1" value="Nanti di map">
                            Nanti di map
                          </option>
                          <option key="2" value="Nanti di map">
                            Nanti di map
                          </option>
                          <option key="3" value="Nanti di map">
                            Nanti di map
                          </option>
                        </Select>
                        <Text
                          className="secondaryFont"
                          fontWeight="500"
                          fontSize="0.875rem"
                          marginTop="1rem"
                        >
                          Kecamatan
                        </Text>
                        <Select
                          placeholder="Pilih kecamatan penerima"
                          marginTop="0.5rem"
                        >
                          <option key="1" value="Nanti di map">
                            Nanti di map
                          </option>
                          <option key="2" value="Nanti di map">
                            Nanti di map
                          </option>
                          <option key="3" value="Nanti di map">
                            Nanti di map
                          </option>
                        </Select>
                        <Text
                          className="secondaryFont"
                          fontWeight="500"
                          fontSize="0.875rem"
                          marginTop="1rem"
                        >
                          Ponsel
                        </Text>
                        <Select
                          placeholder="Pilih nomor ponsel penerima"
                          marginTop="0.5rem"
                        >
                          <option key="1" value="Nanti di map">
                            Nanti di map
                          </option>
                          <option key="2" value="Nanti di map">
                            Nanti di map
                          </option>
                          <option key="3" value="Nanti di map">
                            Nanti di map
                          </option>
                        </Select>
                      </Box>
                    </Box>
                    <Text
                      className="secondaryFont"
                      fontWeight="500"
                      fontSize="0.875rem"
                      marginTop="1rem"
                    >
                      Alamat
                    </Text>
                    <Textarea
                      placeholder="Masukkan alamat penerima"
                      marginTop="0.5rem"
                      resize="none"
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <Divider orientation="horizontal" />
              <Box marginTop="1rem" w="100%" d="flex" justifyContent="flex-end">
                <Button
                  bg="red.500"
                  color="white"
                  w={{ base: "100%", md: "15%" }}
                  marginBottom="2rem"
                  marginRight={{ base: "0rem", md: "1rem" }}
                >
                  Lanjutkan
                </Button>
              </Box>
            </Box>
          </Box>
          <Box w={{ base: "100%", md: "25%" }}>
            <Box
              w="100%"
              border="1px solid"
              borderColor="gray.500"
              borderRadius="md"
              paddingX="1.5ch"
              paddingY="1ch"
              position="sticky"
              top={{ base: "0px", md: "calc(71px + 5rem)" }}
              marginBottom={{ base: "2rem", md: "6.5rem" }}
            >
              <Text
                className="primaryFont"
                fontSize="1.125rem"
                fontWeight="700"
              >
                Ringkasan
              </Text>
              <Box
                width="100%"
                d="flex"
                justifyContent="space-between"
                marginTop="0.5rem"
              >
                <Text color="gray.500" className="primaryFont" fontWeight="700">
                  Jumlah
                </Text>
                <Text
                  color="gray.500"
                  className="secondaryFont"
                  fontWeight="500"
                >
                  9.999.999 pcs
                </Text>
              </Box>
              <Box
                width="100%"
                d="flex"
                justifyContent="space-between"
                marginTop="0.3rem"
              >
                <Text color="gray.500" className="primaryFont" fontWeight="700">
                  Berat
                </Text>
                <Text
                  color="gray.500"
                  className="secondaryFont"
                  fontWeight="500"
                >
                  1.000.000 gr
                </Text>
              </Box>
              <Divider orientation="horizontal" marginY="0.5rem" />
              <Text
                className="primaryFont"
                fontSize="1.125rem"
                fontWeight="700"
              >
                Pembayaran
              </Text>
              <Box
                width="100%"
                d="flex"
                justifyContent="space-between"
                marginTop="0.5rem"
              >
                <Text color="gray.500" className="primaryFont" fontWeight="700">
                  Subtotal
                </Text>
                <Text
                  color="gray.500"
                  className="secondaryFont"
                  fontWeight="500"
                >
                  Rp99.999.999
                </Text>
              </Box>
              <Box
                width="100%"
                d="flex"
                justifyContent="space-between"
                marginTop="0.3rem"
              >
                <Text color="gray.500" className="primaryFont" fontWeight="700">
                  Diskon
                </Text>
                <Text
                  color="gray.500"
                  className="secondaryFont"
                  fontWeight="500"
                >
                  Rp99.999.999
                </Text>
              </Box>
              <Box
                width="100%"
                d="flex"
                justifyContent="space-between"
                marginTop="0.3rem"
              >
                <Text color="gray.500" className="primaryFont" fontWeight="700">
                  Pengiriman
                </Text>
                <Text
                  color="gray.500"
                  className="secondaryFont"
                  fontWeight="500"
                >
                  Rp99.999.999
                </Text>
              </Box>
              <Divider orientation="horizontal" marginY="0.5rem" />
              <Box
                width="100%"
                d="flex"
                justifyContent="space-between"
                marginTop="0.3rem"
              >
                <Text color="gray.500" className="primaryFont" fontWeight="700">
                  Total
                </Text>
                <Text
                  color="orange.400"
                  className="secondaryFont"
                  fontWeight="500"
                  fontSize="1.25rem"
                >
                  Rp99.999.999
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box></Box>
      </Box>
      <Footer />
    </>
  );
};

export default AlamatPenerima;
