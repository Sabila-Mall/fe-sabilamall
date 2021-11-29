import { Text, Box, Image, OrderedList, ListItem } from "@chakra-ui/react";

import { CetakTataCaraPembayaranButton } from "../CetakTataCaraPembayaranButton";

export const InvoiceInfoQRIS = ({ checkoutResponse }) => {
  const howToPay =
    checkoutResponse?.payment_gateways?.howtopaypage?.data?.[0]?.step || "";
  return (
    <>
      <Text fontWeight="700" className="primaryFont" fontSize="1.15rem">
        QR Code
      </Text>
      <Box w="100%" d="flex" justifyContent="center">
        <Image
          src={checkoutResponse?.payment_gateways?.payment_code}
          alt="qrcode"
          w="40%"
        />
      </Box>
      <CetakTataCaraPembayaranButton />
      <Text mt="0.6rem" mb="0.4rem" className="secondaryFont">
        {/* {checkoutResponse?.payment_gateways?.howtopaypage.name} */}
        Pembayaran dapat dilakukan dengan melakukan langkah-langkah berikut:
      </Text>
      {!!howToPay && (
        <OrderedList>
          {howToPay.map((data) => {
            return <ListItem>{data}</ListItem>;
          })}
        </OrderedList>
      )}
    </>
  );
};
