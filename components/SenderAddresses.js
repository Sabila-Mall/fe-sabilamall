import {
    Box,
    Text,
    Flex,
    Spacer,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalHeader,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Stack
} from "@chakra-ui/react";
import AddressBox from "./AddressBox";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io"

const SenderAddresses = ({ isMobile }) => {


    let addresses = [
        {
            name: "Farahhhhhhh",
            phoneNumber: "0888888888",
            key: "0888888888"
        }
    ]

    const [addressList, setAddressList] = useState(addresses)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const addAddress = (name, phone) => {
        const newAddress = {
            name: name,
            phoneNumber: phone
        }
        setAddressList([...addresses, newAddress])
    }

    const deleteAddress = (phone) => {
        let outputList = [];
        for (let i = 0; i < addressList.length; i++) {
            if (addressList[i].phoneNumber !== phone) {
                console.log(addressList[i].phoneNumber);
                outputList.push(addressList[i])
            }
        }
        setAddressList([outputList])
    }

    return (
        <Stack dir="column">
            <Flex>
                <Text
                    className="primaryFont"
                    fontSize="16px"
                    fontWeight="bold"
                    color={{ base: "black", md: "orange.500" }}
                    ml={isMobile ? "16px" : "auto"}>
                    Identitas Pengirim
                </Text>
                <Spacer />
                <Button
                    borderColor="orange.500"
                    borderWidth="1px"
                    backgroundColor="white"
                    color="orange.500"
                    p="11px 38px"
                    onClick={onOpen}
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
                        >
                            Tambah
                        </Text>
                    </Flex>
                </Button>
            </Flex>
            {addressList.map((address) => {
                const [name, setname] = useState(address.name)
                const [phoneNumber, setphoneNumber] = useState(address.phoneNumber)

                const [tempName, settempName] = useState(name)
                const [tempPhoneNumber, settempPhoneNumber] = useState(phoneNumber)

                const handleSubmit = () => {
                    let flag = false
                    for (let i = 0; i < addresses.length; i++) {
                        if (addresses[i].phoneNumber === tempPhoneNumber) {
                            flag = true
                        }
                    }
                    if (flag) {
                        setname(tempName)
                        setphoneNumber(tempPhoneNumber)
                    } else {
                        addAddress(tempName, tempPhoneNumber)
                    }

                }

                return (
                    <Box>
                        <AddressBox
                            name={name}
                            phoneNumber={phoneNumber}
                            editAddress={onOpen}
                            deleteAddress={() => deleteAddress(phoneNumber)} />
                        <Modal
                            isOpen={isOpen}
                            onClose={onClose}
                            pos="relative"
                            size={isMobile ? "6xl" : "md"}
                        >
                            {isMobile ? <></> : <ModalOverlay />}
                            <ModalContent
                                pos="absolute"
                                h={isMobile ? "calc(100% - 50px)" : "auto"}
                                mt="50px"
                                pt="48px"
                                borderRadius={isMobile ? "0" : "20px"}
                                bgColor={isMobile ? "#F7FAFC" : "white"}>
                                {isMobile ? <></> : <ModalHeader>Ubah Alamat Pengirim</ModalHeader>}
                                <ModalCloseButton
                                    pos="absolute"
                                    top="-15px"
                                    right="-15px"
                                    borderRadius="50%"
                                    color="white"
                                    bg="red.600"
                                    visibility={isMobile ? "hidden" : "visible"}
                                    _hover={{ bg: "red.700" }} />
                                <ModalBody pb={6}>
                                    <FormControl>
                                        <FormLabel>Nama Lengkap</FormLabel>
                                        <Input
                                            id="name"
                                            value={tempName}
                                            onChange={(e) => settempName(e.target.value)}
                                            isRequired={true} />

                                        <FormLabel mt={4}>Nomor Telepon</FormLabel>
                                        <Input
                                            id="phoneNumber"
                                            value={tempPhoneNumber}
                                            type="number"
                                            onChange={(e) => settempPhoneNumber(e.target.value)}
                                            isRequired={true} />
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <Button
                                        colorScheme="orange"
                                        borderRadius="20px"
                                        p="15px 64px"
                                        mr={3}
                                        onClick={() => handleSubmit()}
                                        fontWeight="700"
                                        className="primaryFont"
                                        fontSize="14px"
                                        w={{ base: "100%", md: "50%" }}>
                                        Update
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>

                )
            }
            )}

        </Stack>

    )
}

export default SenderAddresses