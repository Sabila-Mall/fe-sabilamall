import { Button } from "@chakra-ui/react";

export const CetakTataCaraPembayaranButton = () => {
  return (
    <Button
      fontWeight="700"
      className="primaryFont"
      w="100%"
      bgColor="orange.500"
      color="white"
      _hover={{ bgColor: "orange.600" }}
      mb="0.8rem"
      onClick={() => {
        window.print();
      }}
    >
      Cetak Tata Cara Pembayaran
    </Button>
  );
};
