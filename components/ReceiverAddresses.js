import {
  Stack,
  StackDivider,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  FormControl,
  Button,
  FormLabel,
  Input,
  ModalOverlay,
  Box,
  useDisclosure,
  ModalFooter,
  Divider,
  Select,
  Textarea,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import router from "next/router";
import { useState, useEffect } from "react";

import AddressBox from "./AddressBox";

const ReceiverAddresses = ({ addresses, isMobile }) => {
  const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    setAddressList(addresses);
  }, []);

  const deleteAddress = (address) => {
    const newAddresses = [...addressList];
    let outputList = [];
    for (let i = 0; i < newAddresses.length; i++) {
      if (newAddresses[i].phoneNumber == address.phoneNumber) {
        outputList.push(newAddresses[i]);
      }
    }
    setAddressList(outputList);
  };

  return (
    <Stack divider={<StackDivider color="gray.500" />}>
      {addresses.map((address) => {
        const [penerima, setPenerima] = useState({});
        const { isOpen, onOpen, onClose } = useDisclosure();
        const handleName = (value) => {
          address.name = value;
          setPenerima(address);
        };

        const handlePhone = (value) => {
          address.phoneNumber = value;
          setPenerima(address);
        };

        const handleAddress = (value) => {
          address.address = value;
          setPenerima(address);
        };

        useEffect(() => {
          setPenerima(address);
        }, []);
        return (
          <Box key={address.id}>
            <AddressBox
              name={penerima.name}
              phoneNumber={penerima.phoneNumber}
              address={penerima.fullAddress}
              editAddress={
                isMobile
                  ? () => router.push("/profile/edit-penerima-mobile")
                  : onOpen
              }
              deleteAddress={deleteAddress}
            />
            <Modal isOpen={isOpen} onClose={onClose} pos="relative" size="5xl">
              <ModalOverlay />
              <ModalContent
                borderRadius="20px"
                bgColor={{ base: "#F7FAFC", md: "white" }}
              >
                <ModalHeader
                  fontWeight="bold"
                  fontSize="18px"
                  className="primaryFont"
                >
                  Ubah Alamat Penerima
                </ModalHeader>
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
                />
                <ModalBody m="12px">
                  <FormControl>
                    <Grid
                      templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                      }}
                      gap="24px"
                    >
                      <GridItem>
                        <FormLabel
                          fontWeight="bold"
                          fontSize="16px"
                          className="primaryFont"
                        >
                          Nama Lengkap
                        </FormLabel>
                        <Input
                          id="name"
                          value={penerima.name}
                          onChange={(e) => handleName(e.target.value)}
                          required
                        />
                      </GridItem>
                      <GridItem>
                        <FormLabel
                          fontWeight="bold"
                          fontSize="16px"
                          className="primaryFont"
                        >
                          Nomor Telepon
                        </FormLabel>
                        <Input
                          id="phoneNumber"
                          value={penerima.phoneNumber}
                          onChange={(e) => handlePhone(e.target.value)}
                          type="number"
                          required
                        />
                      </GridItem>
                      <GridItem colSpan={2}>
                        <FormLabel
                          mt={4}
                          fontWeight="bold"
                          fontSize="16px"
                          className="primaryFont"
                        >
                          Alamat Lengkap
                        </FormLabel>
                        <Textarea
                          id="address"
                          value={penerima.fullAddress}
                          onChange={(e) => handleAddress(e.target.value)}
                          required
                        />
                      </GridItem>
                      <GridItem>
                        <FormLabel>Provinsi</FormLabel>
                        <Select placeholder="Select option">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </GridItem>
                      <GridItem>
                        <FormLabel>Kota/Kabupaten</FormLabel>
                        <Select placeholder="Select option">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </GridItem>
                      <GridItem>
                        <FormLabel>Kecamatan</FormLabel>
                        <Select placeholder="Select option">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </GridItem>
                      <GridItem>
                        <FormLabel>Kode Pos</FormLabel>
                        <Select placeholder="Select option">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </GridItem>
                    </Grid>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="orange"
                    borderRadius="20px"
                    p="15px 64px"
                    mr={3}
                    type="submit"
                    fontWeight="700"
                    className="primaryFont"
                    fontSize="14px"
                    w={{ base: "100%", md: "25%" }}
                  >
                    Update
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        );
      })}
    </Stack>
  );
};

export default ReceiverAddresses;
