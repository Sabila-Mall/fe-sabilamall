import { Box, Image, Flex, HStack, Icon } from "@chakra-ui/react";
import { View } from "@react-pdf/renderer";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdPlayArrow, MdPlayCircleFilled } from "react-icons/md";
import ReactImageZoom from "react-image-zoom";
import Slider from "react-slick";

import styles from "../styles/ProductDetails.module.scss";
import { getImageLink } from "../utils/functions";

export const ProductImages = ({
  slider,
  products_image,
  images: images_list,
  setImgLink,
  products_video,
}) => {
  const [viewType, setViewType] = useState(products_video?.length > 0 ? 'video' : 'image');
  const [indexView, setIndexView] = useState(0);
  const [imageNum, setImageNum] = useState(0);
  const videos = products_video;
  const [video, setVideo] = useState(products_video?.length > 0 ? products_video[0].youtube : '');
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

  function zoom(e) {
    const zoomer = document.getElementById("zoom-product-image");
    let offsetX;
    let offsetY;
    let x;
    let y;
    e.nativeEvent.offsetX
      ? (offsetX = e.nativeEvent.offsetX)
      : (offsetX = e.nativeEvent.touches[0].pageX);
    e.nativeEvent.offsetY
      ? (offsetY = e.nativeEvent.offsetY)
      : (offsetX = e.nativeEvent.touches[0].pageX);
    x = (offsetX / zoomer.offsetWidth) * 100;
    y = (offsetY / zoomer.offsetHeight) * 100;
    zoomer.style.backgroundPosition = x + "% " + y + "%";
  }

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


  function getThumbnailYoutube(payload) {
    // https://www.youtube.com/embed/KJ37_Yd2Nfs
    // https://img.youtube.com/vi/i7LF6aeKZhI/default.jpg
    var video_id = payload.split('/')[payload.split('/').length - 1];
    return `https://img.youtube.com/vi/${video_id}/default.jpg`;
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

        {
          viewType == 'image' ?
            <Flex mb="1rem" justifyContent="center">
              <Box
                as="figure"
                cursor="crosshair"
                w="22rem"
                h="22rem"
                position="relative"
                overflow="hidden"
                className={styles.zoom}
                backgroundImage={`url(${getImageLink(image)})`}
                onMouseMove={(e) => zoom(e)}
                id="zoom-product-image"
              >
                <Image height="full" src={getImageLink(image)} />
              </Box>
            </Flex>
            :
            <Flex mb="1rem" justifyContent="center">
              <Box
                as="figure"
                cursor="crosshair"
                w="22rem"
                h="22rem"
                position="relative"
                overflow="hidden"
                className={styles.zoom}
                onMouseMove={(e) => zoom(e)}
                id="zoom-product-image"
              >
                <iframe style={{ 'width': '22rem', 'height': '22rem' }} src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </Box>
            </Flex>
        }
        {/* <Flex mb="1rem" justifyContent="center">
          <Box
            as="figure"
            cursor="crosshair"
            w="22rem"
            h="22rem"
            position="relative"
            overflow="hidden"
            className={styles.zoom}
            backgroundImage={`url(${getImageLink(image)})`}
            onMouseMove={(e) => zoom(e)}
            id="zoom-product-image"
          >
            <Image height="full" src={getImageLink(image)} />
          </Box>
        </Flex> */}

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
                {videos && videos.map((e, index) => {
                  return (
                    <Box key={e} pr="5rem">
                      <Box
                        position='relative'
                        w="3rem"
                        h="3rem"
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"
                        border={viewType === 'video' && indexView === index ? "3px solid #f6ad55" : ""}
                        backgroundPosition="center"
                        cursor="pointer"
                        backgroundImage={getThumbnailYoutube(e.youtube)}
                        onClick={() => {
                          setVideo(e.youtube);
                          setIndexView(index);
                          setViewType('video');
                        }}
                      >
                        <Box
                          position='absolute'
                          top='0'
                          bottom='0'
                          left='0'
                          right='0'
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                        >
                          <Icon as={MdPlayCircleFilled} w='8' h='8' opacity='80%' color='black' />
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
                {images.map((e, index) => {
                  return (
                    <Box key={e.image} pr="5rem">
                      <Box
                        w="3rem"
                        h="3rem"
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"
                        border={viewType === 'image' && indexView === index ? "3px solid #f6ad55" : ""}
                        backgroundPosition="center"
                        cursor="pointer"
                        onClick={() => {
                          setImage(e.image);
                          setIndexView(index);
                          setViewType('image');
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
