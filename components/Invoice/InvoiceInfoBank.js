import { Flex, Text, useToast } from "@chakra-ui/react";
import { IoCopyOutline } from "react-icons/io5";

import { copyToClipboard } from "../../utils/functions";

export const Bank = ({ bank, number }) => {
  const toast = useToast();

  const handleCopy = () => {
    copyToClipboard(
      number,
      () =>
        toast({
          title: "Berhasil menyalin nomor rekening",
          description: `Nomor rekening ${number} dari bank ${bank} berhasil disalin`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        }),
      () =>
        toast({
          title: "Gagal menyalin nomor rekening",
          description: "Silahkan menyalin nomor rekening secara manual",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        }),
    );
  };

  return (
    <Flex justifyContent="space-between" textAlign="left" my="1">
      <Text>{bank}</Text>
      <Flex alignItems="center">
        <Text mr="0.5rem">{number}</Text>
        <IoCopyOutline
          color="#DD6B20"
          size="1.3em"
          cursor="pointer"
          onClick={handleCopy}
        />
      </Flex>
    </Flex>
  );
};
