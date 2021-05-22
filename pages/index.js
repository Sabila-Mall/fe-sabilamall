import { Box } from "@chakra-ui/react";

import Footer from "../components/Footer";
import LayoutProductList from "../components/LayoutProductList";
import Navbar from "../components/Navbar";
import {
  dataNormal,
  dataFlashSale,
  dataDiscount,
} from "../constants/dummyData";

const Home = () => {
  const endTime = new Date("2021-05-29T11:07:50.420Z");

  return (
    <>
      <Navbar />
      <Box as="main" pt={{ base: "51px", md: "71px" }}>
        <LayoutProductList
          headingText="Flash Sale"
          bg="red.600"
          data={dataFlashSale}
          endTime={endTime}
        />
        <LayoutProductList
          headingText="Discount"
          bg="white"
          data={dataDiscount}
        />
        <LayoutProductList
          headingText="Semua Produk"
          bg="white"
          data={dataNormal}
        />
      </Box>
      <Footer />
    </>
  );
};

export default Home;
