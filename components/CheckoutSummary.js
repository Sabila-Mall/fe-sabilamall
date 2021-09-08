import { Box, Divider, Text } from "@chakra-ui/react";

import { formatNumber } from "../utils/functions";

const SummaryEntry = ({ text, data, unit = "", isNegative = false }) =>
  data === 0 ? (
    <></>
  ) : (
    <Box
      width="100%"
      d="flex"
      justifyContent="space-between"
      marginTop="0.5rem"
    >
      <Text
        color="gray.500"
        className="primaryFont"
        fontWeight="700"
        isTruncated
      >
        {text}
      </Text>
      <Text
        color="gray.500"
        className="secondaryFont"
        fontWeight="500"
        isTruncated
      >
        {isNegative && "-"}
        {data ? formatNumber(data) : 0} {unit}
      </Text>
    </Box>
  );

const CheckoutSummary = ({
  jumlah = 0,
  berat = 0,
  subtotal = 0,
  pengiriman = 0,
  tambahan = 0,
  diskon = 0,
  voucher = 0,
}) => (
  <Box w={{ base: "100%", lg: "25%" }}>
    <Box
      w="100%"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      paddingX="1.5ch"
      paddingY="1ch"
      position="sticky"
      top={{ base: "0px", lg: "calc(71px + 5rem)" }}
      marginBottom={{ base: "2rem", lg: "6.5rem" }}
    >
      <Text
        className="primaryFont"
        fontSize="1.125rem"
        fontWeight="700"
        isTruncated
      >
        Ringkasan
      </Text>
      <SummaryEntry text="Jumlah" data={jumlah} unit="pcs" />
      <SummaryEntry text="Berat" data={berat} unit="gr" />

      <Divider orientation="horizontal" marginY="0.5rem" />

      <Text
        className="primaryFont"
        fontSize="1.125rem"
        fontWeight="700"
        isTruncated
      >
        Pembayaran
      </Text>
      <SummaryEntry text="Subtotal" data={subtotal} />
      <SummaryEntry text="Pengiriman" data={pengiriman} />
      <SummaryEntry text="Tambahan" data={tambahan} />
      <SummaryEntry text="Diskon" data={diskon} isNegative={true} />
      <SummaryEntry text="Voucher" data={voucher} isNegative={true} />

      <Divider orientation="horizontal" marginY="0.5rem" />
      <SummaryEntry
        text="Total"
        data={
          Number(subtotal) +
          Number(pengiriman) +
          Number(tambahan) -
          Number(diskon) -
          Number(voucher)
        }
      />
    </Box>
  </Box>
);

export default CheckoutSummary;
