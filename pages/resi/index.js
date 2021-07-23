const { Box, Text, Flex, Button, Divider } = require("@chakra-ui/react");
const { Layout } = require("../../components/Layout");

const resi = () => {
  return (
    <>
      <Box
        px="0.5rem"
        w="full"
        h="3.125rem"
        display="flex"
        alignItems="center"
        boxShadow="0px 4px 10px 0px #00000040"
      >
        <Text fontWeight="700" color="gray.500">
          Informasi Pesanan
        </Text>
      </Box>
      <Layout>
        <Box
          my="-3rem"
          boxShadow="0px 4px 10px 0px #00000040"
          borderRadius="1rem"
          p="0.75rem"
        >
          <Box fontWeight="500">
            <TextWLabel title="Nomor Pesanan" desc="SMC10101" />
            <Box maxW="280px">
              <Flex justifyContent="space-between">
                <TextWLabel title="Status Pesanan" desc="Terkirim" />
                <TextWLabel title="Waktu Pemesanan" desc="10 Juli 2021 13:11" />
              </Flex>
              <Flex justifyContent="space-between" mb="1rem">
                <TextWLabel title="Status Pembayaran" desc="Dikonfirmasi" />
                <TextWLabel
                  title="Waktu Pembayaran"
                  desc="10 Juli 2021 13:11"
                />
              </Flex>
            </Box>
            <Flex flexWrap="wrap" mb="1rem">
              <Button colorScheme="orange" w="full" mb="0.5rem">
                Berikan Penilaian
              </Button>
              <Button w="full" colorScheme="orange" variant="outline">
                Lihat Invoice
              </Button>
            </Flex>
            <Divider w="full" />
          </Box>
          <Box>
            <Text fontWeight="600" mb="1rem">
              Data Pengirim
            </Text>
            <Box mb="1rem">
              <Text fontWeight="bold" color="gray.600">
                [Nama Lengkap Pengirim]
              </Text>
              <Text>[Nomor HP Pengirim]</Text>
            </Box>
            <Box>
              <Text fontWeight="600" mb="0.5rem">
                Data Penerima
              </Text>
              <Text fontWeight="700" color="gray.600">
                Hendra Setiawan Indrajaja
              </Text>
              <Text mb="0.4rem">0855-5555-5555</Text>
              <Text
                fontWeight="500"
                color="gray.600"
                fontSize="0.85rem"
                lineHeight="1.5"
              >
                Jl Kb Kacang Grand Indonesia Shopping Town East Mall Lt Ground
                30, TANGERANG - CILEDUG, BANTEN, 15418
              </Text>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

const TextWLabel = ({ title, desc }) => {
  return (
    <>
      <Box mb="0.5rem">
        <Text color="gray.500" fontSize="0.8rem">
          {title}
        </Text>
        <Text color="black">{desc}</Text>
      </Box>
    </>
  );
};
export default resi;
