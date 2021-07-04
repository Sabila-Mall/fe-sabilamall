import { Box, Text, Img, Circle, Icon } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
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
import { IoFastFood, IoGift, IoArrowUp } from "react-icons/io5";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const category = [
    [BsWatch, "Fashion Muslim"],
    [FaBaby, "Fashion Bayi"],
    [BsWatch, "Aksesoris Fashion"],
    [BsBagFill, "Sepatu dan Tas"],
    [FaMugHot, "Perlengkapan Dapur"],
    [FaHome, "Perlengkapan Rumah Tangga"],
    [FaSprayCan, "Perawatan & Kecantikan"],
    [FaMosque, "Perlengkapan Ibadah"],
    [FaPencilRuler, "Buku & Alat Tulis"],
    [FaRobot, "Mainan"],
    [IoFastFood, "Makanan dan Minuman"],
    [FaStethoscope, "Kesehatan"],
    [IoGift, "Serba-serbi"],
    [IoGift, "Apalagi :("],
  ];

  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "30px",
        },
      },
    ],
  };

  const flashSaleRef = useRef();
  const scrollRef = useRef();

  const [inFlashSale, setInFlashSale] = useState(false);
  const [scrollVisible, setScrollVisible] = useState(false);

  function logit() {
    const flashSaleData = flashSaleRef.current.getBoundingClientRect();
    const scrollData = scrollRef.current.getBoundingClientRect();

    if (
      flashSaleData.top - scrollData.bottom < 0 &&
      flashSaleData.bottom - scrollData.top < 0
    ) {
      setInFlashSale(false);
    } else {
      setInFlashSale(true);
    }
    if (window.pageYOffset > window.innerHeight / 3) {
      setScrollVisible(true);
    } else {
      setScrollVisible(false);
    }
  }

  useEffect(() => {
    const watchScroll = () => {
      window.addEventListener("scroll", logit);
    };
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
    };
  });

  useEffect(() => {
    const elem = scrollRef.current.getBoundingClientRect();
  }, []);

  return (
    <>
      <Navbar />
      <Box as="main" pt={{ base: "51px", md: "71px" }}>
        <Circle
          bg={inFlashSale ? "white" : "red.600"}
          size="40px"
          position="fixed"
          zIndex="9999"
          bottom={{ base: "75px", md: "20px" }}
          right="20px"
          d={scrollVisible ? "flex" : "none"}
          alignItems="center"
          justifyContent="center"
          ref={scrollRef}
          cursor="pointer"
          onClick={() => window.scroll({ top: 0, behavior: "smooth" })}
        >
          <Icon
            as={IoArrowUp}
            color={inFlashSale ? "red.600" : "white"}
            width="55%"
            height="55%"
          />
        </Circle>
        <Box marginTop="1.5rem">
          <Slider {...settings}>
            <Img
              className="imageRound"
              src="/images/Carousel/1.jpg"
              pl="0.5rem"
              pr="0.5rem"
            />
            <Img
              className="imageRound"
              src="/images/Carousel/2.jpg"
              pl="0.5rem"
              pr="0.5rem"
            />
            <Img
              className="imageRound"
              src="/images/Carousel/3.jpg"
              pl="0.5rem"
              pr="0.5rem"
            />
            <Img
              className="imageRound"
              src="/images/Carousel/4.jpg"
              pl="0.5rem"
              pr="0.5rem"
            />
            <Img
              className="imageRound"
              src="/images/Carousel/5.jpg"
              pl="0.5rem"
              pr="0.5rem"
            />
            <Img
              className="imageRound"
              src="/images/Carousel/6.jpg"
              pl="0.5rem"
              pr="0.5rem"
            />
            <Img
              className="imageRound"
              src="/images/Carousel/7.jpg"
              pl="0.5rem"
              pr="0.5rem"
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
          {isLoggedIn && (
            <>
              <SMCard width={{ base: "90vw", md: "26rem" }} />
              <Box
                d={{ base: "none", md: "flex" }}
                flexDirection="column"
                alignItems="center"
                paddingTop={{ base: "2rem", xl: "0px" }}
              >
                <Text
                  className="primaryFont"
                  fontWeight="700"
                  fontSize="1.5rem"
                >
                  Kategori
                </Text>
                <LayoutCategoryList
                  isLoggedIn={isLoggedIn}
                  category={category}
                />
              </Box>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Box
                d={{ base: "none", md: "flex" }}
                flexDirection="column"
                alignItems="center"
                paddingTop={{ base: "2rem", xl: "0px" }}
              >
                <Text
                  className="primaryFont"
                  fontWeight="700"
                  fontSize="1.5rem"
                >
                  Kategori
                </Text>
                <LayoutCategoryList
                  isLoggedIn={isLoggedIn}
                  category={category}
                />
              </Box>
            </>
          )}
        </Box>
        <LayoutProductList
          headingText="Flash Sale"
          bg="red.600"
          data={dataFlashSale}
          flashSaleRef={flashSaleRef}
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
