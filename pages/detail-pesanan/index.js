import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Flex, Text } from "@chakra-ui/layout";
import { Button, Grid, GridItem, HStack, VStack } from "@chakra-ui/react";

const RingkasanPesanan = () => {

}

const Pengiriman = () => {

}

const CatatanPesanan = () => {

}

const MetodePembayaran = () => {

}

const Voucher = () => {

}

const Confirmation = () => {

}

const DetailPesanan = () => {
  return (
    <>
      <Navbar />
      <Flex>
        <VStack>
          <RingkasanPesanan />
          <Pengiriman />
          <CatatanPesanan />

          <HStack>
            <MetodePembayaran />
            <Voucher />
          </HStack>

          <Confirmation />

          <Flex justify={"space-between"}>
            <Button>Sebelumnya</Button>
            <Button>Pesan Sekarang</Button>
          </Flex>
        </VStack>

        {/*Component for sidebar*/}
      </Flex>
      <Footer />
    </>
  )
}

export default DetailPesanan;