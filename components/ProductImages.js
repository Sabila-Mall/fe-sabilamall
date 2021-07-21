import { Box, Image, Flex, HStack } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Slider from "react-slick";

import styles from "../styles/ProductDetails.module.scss";

const imageSrc = [
  {
    src: "images/ProductDetail/image2.svg",
  },
  {
    src: "images/ProductDetail/image3.svg",
  },
  {
    src: "images/ProductDetail/image5.svg",
  },
  {
    src: "images/ProductDetail/image6.svg",
  },
  {
    src: "images/ProductDetail/image7.svg",
  },
];

export const ProductImages = ({ slider }) => {
  // Set which Image clicked
  // To be implemented when APIs ready
  const [imageNum, setImageNum] = useState(0);

  let ref = null;

  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 325,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <Box w="100%">
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <Flex flexDir="column" justifyContent="center" mb="1.5rem">
        <Flex mb="1rem" justifyContent="center">
          <Box>
            <Image src="images/produk.svg" />
          </Box>
        </Flex>

        <Flex justifyContent="center">
          <Box className={styles.slickWidth} pos="relative">
            <Box
              position="absolute"
              top="25%"
              bg="rgba(246, 173, 85, 0.8)"
              cursor="pointer"
              zIndex="20"
              onClick={() => {
                if (ref !== null) {
                  ref.slickPrev();
                }
              }}
            >
              <MdKeyboardArrowLeft size="2em" color="white" />
            </Box>
            <Box
              position="absolute"
              top="25%"
              right="0"
              bg="rgba(246, 173, 85, 0.8)"
              cursor="pointer"
              zIndex="20"
              onClick={() => {
                if (ref !== null) {
                  ref.slickNext();
                }
              }}
            >
              <MdKeyboardArrowRight size="2em" color="white" />
            </Box>
            <Box>
              <Slider
                ref={(node) => {
                  ref = node;
                  console.log(node);
                }}
                {...settings}
              >
                {imageSrc.map((e) => {
                  return (
                    <Box>
                      <Image key={e.src} src={e.src} />
                    </Box>
                  );
                })}
              </Slider>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
