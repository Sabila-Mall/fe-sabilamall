import { Box, Image, Flex, HStack, Button, Icon, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ReactImageZoom from "react-image-zoom";
import Slider from "react-slick";

import styles from "../styles/ProductDetails.module.scss";
import { getImageLink } from "../utils/functions";

export const ProductImages = ({
  slider,
  products_image,
  images: images_list,
  setImgLink,
}) => {
  const [imageNum, setImageNum] = useState(0);
  const [image, setImage] = useState(products_image);
  const images = [
    { id: "podafae", image: products_image, sort_order: images_list?.length },
    ...images_list,
  ];
  let ref = null;

  useEffect(() => {
    setImgLink(getImageLink(image));
  }, [image]);

  const [imageActive, setImageActive] = useState("podafae");

  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: images.length < 5 ? images.length : 5,
    slidesToScroll: 4,
    centerMode: false,
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
          <Box w="22rem">
            <Image src={getImageLink(image)} />
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
              className={styles.slickButton}
              display={images.length < 5 ? "none" : "block"}
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
              className={styles.slickButton}
              display={images.length < 5 ? "none" : "block"}
              onClick={() => {
                if (ref !== null) {
                  ref.slickNext();
                }
              }}
            >
              <MdKeyboardArrowRight size="2em" color="white" />
            </Box>
            <Box
              width={
                images.length < 5 ? `calc(${images.length} * 4rem)` : "full"
              }
            >
              <Slider
                ref={(node) => {
                  ref = node;
                }}
                {...settings}
              >
                {images.map((e) => {
                  return (
                    <Box key={e.image} pr="5rem">
                      <Box
                        w="3rem"
                        h="3rem"
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"
                        border={imageActive === e.id ? "3px solid #f6ad55" : ""}
                        backgroundPosition="center"
                        cursor="pointer"
                        onClick={() => {
                          setImage(e.image);
                          setImageActive(e.id);
                        }}
                      >
                        <Image src={getImageLink(e.image)} objectFit="cover" />
                      </Box>
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
