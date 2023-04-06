import { AspectRatio, Box, Center, Img, Skeleton, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Slider from "react-slick";

import { useWindowSize } from "../hooks/useWindowSize";
import { getImageLink } from "../utils/functions";

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

const Banner = ({ queryBanners }) => {
  const [display, setDisplay] = useState("none");
  const { width } = useWindowSize();
  let ref = null;

  const router = useRouter();

  return !queryBanners.isFetched ? (
    <AspectRatio ratio={5 / 1} p={3} borderRadius={'xl'}>
      <Skeleton h="12rem" />
    </AspectRatio>
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
            ? queryBanners.data?.map((each, index) => (
              <Box
                key={index}
                display="flex !important"
                justifyContent="center"
                onClick={() => router.push(each.link)}
              >
                <Box
                  boxSizing="border-box"
                  width={0.9 * window.innerWidth + "px"}
                  height={(0.9 / 3) * window.innerWidth + "px"}
                  className="imageRound"
                  ml={{ base: "0.25rem", xl: "0.5rem" }}
                  mr={{ base: "0.25rem", xl: "0.5rem" }}
                  backgroundImage={`url(${getImageLink(each.image_path)})`}
                  backgroundPosition="center"
                  backgroundSize="cover"
                />
              </Box>
            ))
            : queryBanners.data?.map((each, index) => (
              <Img
                onClick={() => router.push(each.url)}
                className="imageRound"
                src={getImageLink(each.image_path)}
                pl={{ base: "0.2rem", xl: "0.5rem" }}
                pr={{ base: "0.2rem", xl: "0.5rem" }}
                key={index}
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
