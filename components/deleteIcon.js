import {
    Box,
    Flex,
    Text,
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

const DeleteIcon = ({ deleteAddress }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box pos="absolute" left={0} h={{ base: "16px", md: "24px" }}>
            <FaTrashAlt onClick={onOpen} />
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent borderRadius="20px" bgColor={{ base: "#F7FAFC", md: "white" }}>
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
                                    onClick={deleteAddress}
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