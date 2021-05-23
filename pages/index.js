import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Img,
} from "@chakra-ui/react";
import React from "react";
import { BsWatch, BsBagFill } from "react-icons/bs";
import {
  FaBaby,
  FaMugHot,
  FaHome,
  FaSprayCan,
  FaMosque,
  FaPencilRuler,
  FaRobot,
  FaStethoscope,
} from "react-icons/fa";
import { IoFastFood, IoGift } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Footer from "../components/Footer";
import LayoutCategoryList from "../components/LayoutCategoryList";
import LayoutProductList from "../components/LayoutProductList";
import Navbar from "../components/Navbar";
import SMCard from "../components/SMCard";
import {
  dataNormal,
  dataFlashSale,
  dataDiscount,
} from "../constants/dummyData";

const Home = () => {
  const endTime = new Date("2021-05-29T11:07:50.420Z");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const category = [
    {
      title: "Fashion",
      items: [
        [BsWatch, "Fashion Muslim"],
        [FaBaby, "Fashion Bayi"],
        [BsWatch, "Aksesori Fashion"],
        [BsBagFill, "Sepatu dan Tas"],
      ],
    },
    {
      title: "Rumah Tangga",
      items: [
        [FaMugHot, "Perlengkapan Dapur"],
        [FaHome, "Perlengkapan Rumah Tangga"],
        [FaSprayCan, "Perawatan & Kecantikan"],
        [FaMosque, "Perlengkapan Ibadah"],
      ],
    },
    {
      title: "Perlengkapan Lainnya",
      items: [
        [FaPencilRuler, "Buku & Alat Tulis"],
        [FaRobot, "Mainan"],
        [IoFastFood, "Makanan dan Minuman"],
        [FaStethoscope, "Kesehatan"],
        [IoGift, "Serba-serbi"],
      ],
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <Navbar />
      <Box as="main" pt={{ base: "51px", md: "71px" }}>
        <Box marginTop="1rem">
          <Slider {...settings}>
            <Img
              src="/images/Carousel/1.png"
              paddingLeft="5vw"
              paddingRight="5vw"
            />
            <Img
              src="/images/Carousel/1.png"
              paddingLeft="5vw"
              paddingRight="5vw"
            />
            <Img
              src="/images/Carousel/1.png"
              paddingLeft="5vw"
              paddingRight="5vw"
            />
          </Slider>
        </Box>
        <Box
          d="flex"
          flexDirection={{ base: "column", xl: "row" }}
          justifyContent="space-evenly"
          alignItems="center"
          marginTop="2rem"
          marginBottom="2rem"
        >
          <SMCard width={{ base: "90vw", md: "26rem" }} />
          <Box
            d={{ base: "none", md: "flex" }}
            flexDirection="column"
            alignItems="center"
            paddingTop={{ base: "2rem", xl: "0px" }}
          >
            <Text className="primaryFont" fontWeight="700" fontSize="1.5rem">
              Kategori
            </Text>
            <LayoutCategoryList moreCategory={false} onOpen={() => onOpen()} />
          </Box>
        </Box>
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

      <Modal
        onClose={onClose}
        size="xl"
        isOpen={isOpen}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent maxW="68rem">
          <ModalBody paddingBottom="1.5rem">
            <ModalCloseButton />
            {category.map((cat) => {
              return (
                <LayoutCategoryList
                  moreCategory={true}
                  title={cat.title}
                  category={cat.items}
                />
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
