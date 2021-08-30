import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  toast,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";

import { apiCancelOrder } from "../api/CancelOrder";
import { useMyOrderContext } from "../contexts/customerOrderProvider";

export const CancelOrder = ({ isOpen, onClose, orderId, id, orderNum }) => {
  const { setRefetch } = useMyOrderContext();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const handleCancel = () => {
    setLoading(true);
    apiCancelOrder(id, orderId).then((res) => {
      if (res.data.success) {
        setRefetch(true);
        toast({
          position: "top",
          title: "Berhasil membatalkan order",
          status: "success",
          isClosable: true,
        });
      } else {
        toast({
          position: "top",
          title: "Gagal membatalkan Order",
          status: "error",
          isClosable: true,
        });
      }
      onClose();
      setLoading(false);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pb="0.5rem" mt="0">
          <Text mt="0.5rem" textDecoration="underline">
            Pembatalan Pesanan
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text>
              Apakah anda yakin mau membatalkan pesanan dengan Nomor Order :{" "}
              {<strong>{orderNum}</strong>}
            </Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            TIDAK
          </Button>
          <Button
            onClick={() => {
              handleCancel();
            }}
            colorScheme="red"
            variant={!loading && "ghost"}
          >
            {loading ? <Spinner /> : "Batalkan Order"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
