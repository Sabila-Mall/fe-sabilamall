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
    Flex,
    Spacer,
    Text
} from "@chakra-ui/react";
import AddressBox from "./AddressBox";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io"

const ReceiverAddresses = ({ addresses, isMobile }) => {
    const [addressList, setAddressList] = useState(addresses)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const deleteAddress = (phone) => {
        let outputList = [];
        for (let i = 0; i < addressList.length; i++) {
            if (addressList[i].phoneNumber !== phone) {
                console.log(addressList[i].phoneNumber);
                outputList.push(addressList[i])
            }
        }
        setAddressList(outputList)
    }

    return (
        <Box>
            <Flex>
                <Text
                    className="primaryFont"
                    fontSize="16px"
                    fontWeight="bold"
                    ml={isMobile ? "16px" : "auto"}
                    color={{ base: "black", md: "orange.500" }}>
                    Alamat Penerima
                </Text>
                <Spacer />
                <Button
                    borderColor="orange.500"
                    borderWidth="1px"
                    backgroundColor="white"
                    color="orange.500"
                    p="11px 38px"
                    display={{ base: "none", md: "block" }}
                >
                    <Flex>
                        <IoIosAddCircle fontSize="16px" />
                        <Text
                            className="primaryFont"
                            fontWeight="700"
                            fontSize="10px"
                            lineHeight="13px"
                            transform="translateY(2px)"
                            onClick={onOpen}
                        >
                            Tambah
                        </Text>
                    </Flex>
                </Button>
            </Flex>
            <Stack
                divider={<StackDivider color="gray.500" />}
            >
                {addressList.map((address) => {
                    const [name, setname] = useState(address.name)
                    const [phoneNumber, setphoneNumber] = useState(address.phoneNumber)
                    const [fullAddress, setfullAddress] = useState(address.fullAddress)
                    const [district, setdistrict] = useState(address.district)
                    const [city, setcity] = useState(address.city)
                    const [province, setprovince] = useState(address.province)
                    const [postalCode, setpostalCode] = useState(address.postalCode)

                    const [tempName, settempName] = useState(name)
                    const [tempPhoneNumber, settempPhoneNumber] = useState(phoneNumber)
                    const [tempFullAddress, settempFullAddress] = useState(fullAddress)
                    const [tempDistrict, settempDistrict] = useState(district)
                    const [tempCity, settempCity] = useState(city)
                    const [tempProvince, settempProvince] = useState(province)
                    const [tempPostalCode, settempPostalCode] = useState(postalCode)

                    const handleSubmit = () => {
                        setname(tempName)
                        setphoneNumber(tempPhoneNumber)
                        setfullAddress(tempFullAddress)
                        setdistrict(tempDistrict)
                        setcity(tempCity)
                        setprovince(tempProvince)
                        setpostalCode(tempPostalCode)

                        settempName(name)
                    }

                    return (
                        <Box>
                            <AddressBox
                                name={name}
                                phoneNumber={phoneNumber}
                                address={fullAddress}
                                district={district}
                                province={province}
                                postalCode={postalCode}
                                city={city}
                                editAddress={onOpen}
                                deleteAddress={() => deleteAddress(phoneNumber)} />
                            <Modal
                                isOpen={isOpen}
                                onClose={onClose}
                                size={isMobile ? "6xl" : "5xl"}
                            >
                                {isMobile ? <></> : <ModalOverlay />}
                                <ModalContent
                                    borderRadius={isMobile ? "0" : "20px"}
                                    bgColor={isMobile ? "#F7FAFC" : "white"}
                                    h={isMobile ? "100%" : "auto"}
                                    mt="50px">

                                    {isMobile ? <></> :
                                        <ModalHeader
                                            fontWeight="bold"
                                            fontSize="18px"
                                            className="primaryFont">
                                            Ubah Alamat Penerima
                                        </ModalHeader>}

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
                                        visibility={isMobile ? "hidden" : "visible"} />
                                    <ModalBody m="12px 12px 0px 12px">
                                        <FormControl>
                                            <Grid
                                                templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                                                gap="24px">
                                                <GridItem colSpan={isMobile ? 2 : 1}>
                                                    <FormLabel
                                                        fontWeight="bold"
                                                        fontSize="16px"
                                                        className="primaryFont">
                                                        Nama Lengkap
                                                    </FormLabel>
                                                    <Input
                                                        id="name"
                                                        value={tempName}
                                                        onChange={(e) => settempName(e.target.value)}
                                                        isRequired={true} />
                                                </GridItem>
                                                <GridItem colSpan={isMobile ? 2 : 1}>
                                                    <FormLabel
                                                        fontWeight="bold"
                                                        fontSize="16px"
                                                        className="primaryFont">
                                                        Nomor Telepon
                                                    </FormLabel>
                                                    <Input
                                                        id="phoneNumber"
                                                        value={tempPhoneNumber}
                                                        onChange={(e) => settempPhoneNumber(e.target.value)}
                                                        type="number"
                                                        isRequired={true} />
                                                </GridItem>
                                                <GridItem colSpan={isMobile ? 2 : 1}>
                                                    <FormLabel
                                                        mt={4}
                                                        fontWeight="bold"
                                                        fontSize="16px"
                                                        className="primaryFont">
                                                        Alamat Lengkap
                                                    </FormLabel>
                                                    <Textarea
                                                        id="address"
                                                        value={tempFullAddress}
                                                        onChange={(e) => settempFullAddress(e.target.value)}
                                                        isRequired={true} />
                                                </GridItem >
                                                <GridItem colSpan={isMobile ? 2 : 1}>
                                                    <FormLabel>Provinsi</FormLabel>
                                                    <Select
                                                        placeholder="Select option"
                                                        onChange={(e) => settempProvince(e.target.value)}>
                                                        <option value="option1">Option 1</option>
                                                        <option value="option2">Option 2</option>
                                                        <option value="option3">Option 3</option>
                                                    </Select>
                                                </GridItem>
                                                <GridItem colSpan={isMobile ? 2 : 1}>
                                                    <FormLabel>Kota/Kabupaten</FormLabel>
                                                    <Select
                                                        placeholder="Select option"
                                                        onChange={(e) => settempCity(e.target.value)}>
                                                        <option value="option1">Option 1</option>
                                                        <option value="option2">Option 2</option>
                                                        <option value="option3">Option 3</option>
                                                    </Select>
                                                </GridItem>
                                                <GridItem colSpan={isMobile ? 2 : 1}>
                                                    <FormLabel>Kecamatan</FormLabel>
                                                    <Select
                                                        placeholder="Select option"
                                                        onChange={(e) => settempDistrict(e.target.value)}>
                                                        <option value="option1">Option 1</option>
                                                        <option value="option2">Option 2</option>
                                                        <option value="option3">Option 3</option>
                                                    </Select>
                                                </GridItem>
                                                <GridItem colSpan={isMobile ? 2 : 1}>
                                                    <FormLabel>Kode Pos</FormLabel>
                                                    <Select
                                                        placeholder="Select option"
                                                        onChange={(e) => settempPostalCode(e.target.value)}>
                                                        <option value="option1">Option 1</option>
                                                        <option value="option2">Option 2</option>
                                                        <option value="option3">Option 3</option>
                                                    </Select>
                                                </GridItem>


                                            </Grid>
                                        </FormControl>
                                    </ModalBody>

                                    <ModalFooter
                                        bgColor={isMobile ? "#F7FAFC" : "white"}>
                                        <Flex w="100%" justifyContent="flex-end" flexDir={isMobile ? "column" : "row"}>
                                            {isMobile ? <Button
                                                border="1px solid #C53030"
                                                borderRadius="20px"
                                                p="15px 64px"
                                                color="red.600"
                                                fontWeight="700"
                                                className="primaryFont"
                                                fontSize="14px"
                                                w={{ base: "100%", md: "25%" }}>
                                                Hapus
                                            </Button> : <></>}

                                            <Button
                                                colorScheme="orange"
                                                borderRadius="20px"
                                                p="15px 64px"
                                                mt="36px"
                                                onClick={() => { handleSubmit() }}
                                                fontWeight="700"
                                                className="primaryFont"
                                                fontSize="14px"
                                                w={{ base: "100%", md: "25%" }}>
                                                Update
                                            </Button>
                                        </Flex>

                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Box>

                    )
                }
                )}

            </Stack>
        </Box>
    )
}

export default ReceiverAddresses