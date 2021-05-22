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
  return (
    <>
      <Navbar />
      <Box as="main" pt={{ base: "51px", md: "71px" }}>
        <LayoutProductList
          headingText="Flash Sale"
          bg="red.600"
          data={dataFlashSale}
        />
        <LayoutProductList
          headingText="Discount"
          bg="white"
          data={dataDiscount}
        />
        <LayoutProductList
          headingText="Semua Product"
          bg="white"
          data={dataNormal}
        />
      </Box>
      <Footer />
    </>
  );
};

export default Home;
