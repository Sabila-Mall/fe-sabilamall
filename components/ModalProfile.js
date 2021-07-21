import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Text, // Lorem,
  Button,
} from "@chakra-ui/react";

const ButtonModal = ({ text, styles, onClick }) => (
  <Button
    {...styles}
    borderRadius="20px"
    h="38px"
    w="106px"
    fontSize="16px"
    color="white"
    fontWeight="700"
    lineHeight="38px"
    p="0px 24px"
    onClick={onClick}
    _active={{
      bg: styles.bg,
      outline: "none",
      borderColor: "transparent",
    }}
    _focus={{
      outline: "none",
      border: "none",
      bg: styles.bg,
    }}
  >
    {text}
  </Button>
);

const ModalProfile = ({
  isOpen,
  onClose,
  textBody,
  secondaryText,
  secondaryAction,
}) => {
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          className="primaryFont"
          w="330px"
          h="159px"
          boxShadow="0px 0px 5px 0px #00000040"
          borderRadius="20px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          m="auto"
        >
          <ModalBody>
            <Text
              textAlign="center"
              transform="translateY(30px)"
              fontWeight="700"
              fontSize="18px"
              mb="1rem"
            >
              {textBody}
            </Text>
          </ModalBody>
          <ModalFooter
            display="flex"
            justifyContent="space-evenly"
            transform="translateY(-20px)"
          >
            <ButtonModal
              text="Batal"
              onClick={onClose}
              styles={{ bg: "gray.500" }}
            />
            <ButtonModal
              text={secondaryText}
              onClick={secondaryAction}
              styles={{ bg: "red.600" }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalProfile;
