import { Box, Image, Flex, HStack, Icon } from "@chakra-ui/react";
import { View } from "@react-pdf/renderer";
import axios from "axios";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdPlayArrow, MdPlayCircleFilled } from "react-icons/md";
import ReactImageZoom from "react-image-zoom";
import Slider from "react-slick";

import styles from "../styles/ProductDetails.module.scss";
import { getImageLink } from "../utils/functions";

export const ProductImages = ({
  products_image,
  products_images,
  products_videos,
}) => {
  const videos = products_videos != null ? JSON.parse(products_videos) : [];
  const [viewType, setViewType] = useState(videos != null && videos?.length > 0 ? 'video' : 'image');
  const [indexView, setIndexView] = useState(0);
  const [imageNum, setImageNum] = useState(0);
  const [video, setVideo] = useState(videos != null && videos?.length > 0 ? videos[0].source : '');
  const [image, setImage] = useState(products_image);

  const images_list = JSON.parse(products_images ?? "[]");

  const images = [
    { id: "podafae", image: products_image, sort_order: images_list?.length },
    ...images_list,
  ];
  let ref = null;

  // useEffect(() => {
  //   setImgLink(getImageLink(image));
  // }, [image]);

  const [imageActive, setImageActive] = useState("podafae");

  function zoom(e) {
    const zoomer = document.getElementById("zoom-product-image");
    let offsetX;
    let offsetY;
    let x;
    let y;
    try {
      e.nativeEvent.offsetX
        ? (offsetX = e.nativeEvent.offsetX)
        : (offsetX = e.nativeEvent?.touches[0]?.pageX);
      e.nativeEvent.offsetY
        ? (offsetY = e.nativeEvent.offsetY)
        : (offsetY = e.nativeEvent?.touches[0]?.pageY);
    } catch {
      offsetX = 0;
      offsetY = 0;
    }
    x = (offsetX / zoomer.offsetWidth) * 100;
    y = (offsetY / zoomer.offsetHeight) * 100;
    zoomer.style.backgroundPosition = x + "% " + y + "%";
  }

  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: images.length + videos.length < 5 ? images.length + videos.length : 5,
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

  const [isHoverImage, setIsHoverImage] = useState(false);


  function getThumbnailYoutube(payload) {
    // https://www.youtube.com/embed/KJ37_Yd2Nfs
    // https://img.youtube.com/vi/i7LF6aeKZhI/default.jpg
    var video_id = payload.split('/')[payload.split('/').length - 1];
    return `https://img.youtube.com/vi/${video_id}/default.jpg`;
  };

  const handleDownloadImage = (downloadImage) => {
    axios
      .get(downloadImage, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", "image.jpg");

        document.body.appendChild(link);

        link.click();
      }).catch((err) => console.log(err));
  };

  return (
    <Box w="100%" minWidth={'22rem'}>
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
      <Flex flexDir="column" justifyContent="right" mb="1.5rem" alignItems={'center'}>
        {
          viewType == 'image' ?
            // <Flex mb="1rem" justifyContent="center">
            <Box
              as="figure"
              cursor="crosshair"
              h="22rem"
              w={'100%'}
              // position="relative"
              // overflow="hidden"
              className={styles.zoom}
              backgroundImage={`url(${getImageLink(image)})`}
              onMouseMove={(e) => zoom(e)}
              id="zoom-product-image"
              // border={'1px'}
              // borderColor={'gray.300'}
              onMouseEnter={() => setIsHoverImage(true)}
              onMouseLeave={() => setIsHoverImage(false)}
            // onDoubleClick={() => handleDownloadImage(getImageLink(image))}

            >
              <Box h="22rem" hidden={isHoverImage} bgColor={'white'} backgroundImage={`url(${getImageLink(image)})`} bgSize={'contain'} bgRepeat={'no-repeat'} bgPosition={'center'} ></Box>
              <Image height="full" width={"full"} src={getImageLink(image)} style={{ opacity: '0' }} />
            </Box>
            // </Flex>
            :
            <Box
              as="figure"
              cursor="crosshair"
              h="22rem"
              w={'100%'}

              position="relative"
              overflow="hidden"
            >
              <Flex justifyContent={'center'}>
                <iframe style={{ 'height': '22rem', 'minWidth': '22rem' }} src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </Flex>
            </Box>
        }
        <Box h={'20px'} />
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

        <Box pos="relative" maxW={'22rem'}>
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
            display={images.length + videos.length <= 5 ? "none" : "block"}
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
            display={images.length + videos.length <= 5 ? "none" : "block"}
            onClick={() => {
              if (ref !== null) {
                ref.slickNext();
              }
            }}
          >
            <MdKeyboardArrowRight size="2em" color="white" />
          </Box>
          <Box
            // w={'full'}
            width={
              images.length + videos.length <= 5 ? `calc(${images.length + videos.length} * 4rem)` : "full"
            }
          >
            <Slider
              ref={(node) => {
                ref = node;
              }}
              {...settings}

            >
              {videos.length > 0 && videos.map((e, index) => {
                return (
                  <Box key={e} >
                    <Box
                      position='relative'
                      mx={'0.5rem'}
                      h="3rem"

                      backgroundRepeat="no-repeat"
                      backgroundSize="cover"
                      border={viewType === 'video' && indexView === index ? "3px solid #f6ad55" : ""}
                      backgroundPosition="center"
                      cursor="pointer"
                      backgroundImage={getThumbnailYoutube(e.source)}
                      onClick={() => {
                        setVideo(e.source);
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
                  <Box key={e.image}>
                    <Box
                      // w="3rem"
                      mx={'0.5rem'}
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
                      overflow={'hidden'}
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
    </Box>
  );
};
