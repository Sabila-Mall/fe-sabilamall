import { Box, Center, Img, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Slider from "react-slick";

import { IMAGE_HOST } from "../constants/api";
import { useWindowSize } from "../hooks/useWindowSize";

const settings = {
  centerMode: true,
  infinite: true,
  slidesToShow: 1,
  speed: 500,
  dots: true,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: true,
};

const Banner = ({ data, loading }) => {
  const [display, setDisplay] = useState("none");
  const { width } = useWindowSize();

  let ref = null;

  return loading ? (
    <Center>
      <Spinner size="xl" />
    </Center>
  ) : (
    <Box
      position="relative"
      overflow="hidden"
      onMouseEnter={() => setDisplay("block")}
      onMouseLeave={() => setDisplay("none")}
    >
      <Box
        onClick={() => {
          if (ref !== null) {
            ref.slickPrev();
          }
        }}
        position="absolute"
        zIndex={5}
        top="50%"
        transform="translate(0.4em, -50%)"
        cursor="pointer"
        display={display}
      >
        <Box
          borderRadius="50%"
          bg="white"
          boxShadow="0px 2px 6px rgba(0, 0, 0, 0.25);"
        >
          <MdChevronLeft size="2em" />
        </Box>
      </Box>
      <Box
        maxWidth="1440px"
        width={width <= 576 ? window.innerWidth * 1.2 + "px" : "100%"}
        position="relative"
        left={width <= 576 ? -window.innerWidth * 0.1 + "px" : 0}
      >
        <Slider
          ref={(node) => {
            ref = node;
          }}
          {...settings}
        >
          {width <= 576
            ? data.map((each) => (
                <Box
                  key={data?.id}
                  display="flex !important"
                  justifyContent="center"
                >
                  <Box
                    boxSizing="border-box"
                    width={0.9 * window.innerWidth + "px"}
                    height={(0.9 / 3) * window.innerWidth + "px"}
                    className="imageRound"
                    ml={{ base: "0.25rem", xl: "0.5rem" }}
                    mr={{ base: "0.25rem", xl: "0.5rem" }}
                    backgroundImage={`url(${IMAGE_HOST + each.image_path})`}
                    backgroundPosition="center"
                    backgroundSize="cover"
                  ></Box>
                </Box>
              ))
            : data.map((each) => (
                <Img
                  className="imageRound"
                  src={IMAGE_HOST + each.image_path}
                  pl={{ base: "0.2rem", xl: "0.5rem" }}
                  pr={{ base: "0.2rem", xl: "0.5rem" }}
                  key={each.id}
                />
              ))}
        </Slider>
      </Box>
      <Box
        onClick={() => {
          if (ref !== null) {
            ref.slickNext();
          }
        }}
        position="absolute"
        zIndex={5}
        right={6}
        top="50%"
        transform="translate(1.1em, -50%)"
        cursor="pointer"
        display={display}
      >
        <Box
          borderRadius="50%"
          bg="white"
          boxShadow="0px 2px 6px rgba(0, 0, 0, 0.25);"
        >
          <MdChevronRight size="2em" />
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
