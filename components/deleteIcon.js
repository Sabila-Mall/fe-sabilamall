import {
    Box,
    Flex,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalHeader,
    Button,
    Center
} from "@chakra-ui/react";

import { FaTrashAlt } from "react-icons/fa";
import { useAddressContext } from "../contexts/addressProvider";
const DeleteIcon = ({ data }) => {
    const { deleteItem } = useAddressContext()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const deleteAddress = (userId, addressId) => {
        deleteItem(userId, addressId, "delete")
        onClose()
    }
    return (
        <Box pos="absolute" left={0} h={{ base: "16px", md: "24px" }}>
            <FaTrashAlt onClick={onOpen} />
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent borderRadius="20px" bgColor={{ base: "#F7FAFC", md: "white" }} pos="absolute" top="35%">
                    <ModalHeader w="100%" justifyContent="center" justifySelf="center" justifyItems="center">
                        <Center>
                            Hapus Alamat?
                        </Center>
                    </ModalHeader>
                    <ModalBody pb={6}>
                        <Center>
                            <Flex>
                                <Button
                                    bgColor="gray.500"
                                    color="white"
                                    borderRadius="20px"
                                    p="15px 64px"
                                    mr={3}
                                    type="submit"
                                    fontWeight="700"
                                    className="primaryFont"
                                    fontSize="14px"
                                    onClick={onClose}
                                    _hover={{ bgColor: "gray.700" }}>
                                    Batal
                                </Button>
                                <Button
                                    bgColor="red.600"
                                    color="white"
                                    borderRadius="20px"
                                    p="15px 64px"
                                    type="submit"
                                    fontWeight="700"
                                    className="primaryFont"
                                    fontSize="14px"
                                    onClick={() => deleteAddress(data?.user_id, data?.address_id)}
                                    _hover={{ bgColor: "red.700" }}>
                                    Hapus
                                </Button>
                            </Flex>
                        </Center>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default DeleteIcon;