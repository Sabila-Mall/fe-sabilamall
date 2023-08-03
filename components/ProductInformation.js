import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Progress,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { GoStar } from "react-icons/go";

import styles from "../styles/ProductDetails.module.scss";

const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

const ProductInformation = ({
  products_description,
  vendors_name,
  vendors_address,
  vendors_origincity,
  reviews,
  vendors_success_rate,
  vendors_originsubsname
}) => {
  const [description, setDescription] = useState(false);
  const [isOverflow, setIsOverflow] = useState(() => {
    const descriptionText = document.getElementById("descriptionText")
    if (descriptionText) {
      let overflowStatus = descriptionText?.style.overflow
      if (!overflowStatus || overflowStatus === "visible") {
        descriptionText.style.overflow = "hidden";
      }
      let isOverflowing = descriptionText?.clientHeight < descriptionText?.scrollHeight;

      descriptionText.style.overflow = overflowStatus;

      return isOverflowing;
    }
    return false
  })

  const rating = reviews;
  let avgRating = 0;
  let oneRating = 0;
  let twoRating = 0;
  let threeRating = 0;
  let fourRating = 0;
  let fiveRating = 0;

  if (rating.length > 0) {
    rating.forEach((item) => {
      if (item.reviews_rating == 1) {
        oneRating++;
      } else if (item.reviews_rating == 2) {
        twoRating++;
      } else if (item.reviews_rating == 3) {
        threeRating++;
      } else if (item.reviews_rating == 4) {
        fourRating++;
      } else if (item.reviews_rating == 5) {
        fiveRating++;
      }
    });

    avgRating = rating.reduce((old, item) => old + item.reviews_rating, 0) / rating.length;
  }

  const showDescription = () => {
    const descriptionText = document.getElementById("descriptionText");
    if (description) {
      window.scrollTo(0, 0)
      descriptionText.classList.add(styles.productDescription)
    } else {
      descriptionText.classList.remove(styles.productDescription)
    }
    setDescription(!description)
  };

  return (
    <Box mt="16px" ml={{ lg: "0.5rem", xl: "0" }}>
      <Tabs>
        <TabList borderTop="2px" borderTopColor="gray.200">
          <Tab
            _selected={{ color: "orange.500", borderBottomColor: "orange.400" }}
            _hover={{ color: "orange.400", borderBottomColor: "orange.300" }}
            _focus={{ boxShadow: "none" }}
            className="secondaryFont"
            fontWeight="500"
          >
            Informasi Produk
          </Tab>
          <Tab
            _selected={{ color: "orange.500", borderBottomColor: "orange.400" }}
            _hover={{ color: "orange.400", borderBottomColor: "orange.300" }}
            _focus={{ boxShadow: "none" }}
            className="secondaryFont"
            fontWeight="500"
          >
            Penilaian
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel
            p={{ base: "0", lg: "1rem" }}
            pt="1rem"
            w="100%"
            id="informationPanel"
            minH={{ base: "fit-content", md: "75vh" }}
          >
            <Stack
              spacing="24px"
              direction={{ base: "column", md: "row" }}
              w="100%"
            >
              <Box
                border="1px"
                borderColor="gray.200"
                borderRadius="8px"
                py="10px"
                w="100%"
                pl="0.7rem"
                pr="0"
              >
                <Text
                  className="primaryFont"
                  fontWeight="bold"
                  fontSize="14px"
                  h="18px"
                >
                  Vendor
                </Text>
                <Text
                  className="secondaryFont"
                  fontWeight="500"
                  fontSize="16px"
                  color="gray.600"
                >
                  {vendors_name}
                </Text>
                <Text
                  d="inline"
                  color="gray.400"
                  fontWeight="500"
                  fontSize="1rem"
                >
                  Transaksi berhasil
                </Text>
                <Text
                  ml="0.4rem"
                  className="secondaryFont"
                  fontWeight="500"
                  fontSize="1rem"
                  color="orange.400"
                  d="inline"
                >
                  {Number(vendors_success_rate).toFixed(2)}%
                </Text>
              </Box>
              <Box
                border="1px"
                borderColor="gray.200"
                borderRadius="8px"
                px="15px"
                py="10px"
                w="100%"
              >
                <Text
                  className="primaryFont"
                  fontWeight="bold"
                  fontSize="14px"
                  h="18px"
                >
                  Lokasi:
                </Text>
                <Text
                  className="secondaryFont"
                  fontWeight="500"
                  fontSize="16px"
                  color="orange.400"
                >
                  {vendors_originsubsname + ', ' + vendors_origincity}
                </Text>
              </Box>
            </Stack>
            <Box>
              <Text fontWeight="bold" mt="8px" mb="8px">
                Deskripsi Produk
              </Text>
              {description ? <Text
                id="descriptionText"
                color="gray.600"
                fontSize="14px"
              >
                {/* {products_description?.replace(/<[^>]+>/g, "")} */}
                <Box
                  dangerouslySetInnerHTML={{ __html: products_description }}
                />
              </Text> :
                <Text
                  id="descriptionText"
                  color="gray.600"
                  fontSize="14px"
                  css={css`
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
              `}
                >
                  {/* {products_description?.replace(/<[^>]+>/g, "")} */}
                  {products_description ? <Box
                    dangerouslySetInnerHTML={{ __html: products_description }}
                  /> : <Text id="descriptionText"
                    color="gray.600"
                    fontSize="14px">-</Text>}

                </Text>
              }
              <Button
                bg="none"
                color="orange.400"
                fontWeight="bold"
                p="0"
                onClick={() => showDescription()}
                id="seeMoreButton"
                _hover={{ bg: "transparent", color: "orange.500" }}
                _focus={{ boxShadow: "none" }}
              >
                {(() => {
                  if (isOverflow) {
                    if (description) {
                      return ("Lebih Sedikit")
                    } else {
                      return ("Lihat Selengkapnya")
                    }
                  } else if (products_description) {
                    if (description) {
                      return ("Lebih Sedikit")
                    } else {
                      return ("Lihat Selengkapnya")
                    }
                  }
                })()}
              </Button>
            </Box>
          </TabPanel>
          <TabPanel id="ratingPanel" w="100%" minH={{ base: "fit-content", md: "75vh" }}>
            <Box display="flex">
              <Center
                w="40%"
                display="flex"
                flexDirection="column"
                ml={0}
                align="flex-end"
              >
                <Box>
                  <Heading
                    display="inline"
                    fontWeight="500"
                    className="secondaryFont"
                    color="gray.900"
                    as="h3"
                    size="2xl"
                  >
                    {Number(avgRating).toFixed(2)}
                  </Heading>
                  <Text display="inline"> dari 5</Text>
                </Box>
                <StarRatings
                  rating={Number(avgRating)}
                  starRatedColor="orange"
                  starDimension="24px"
                  starSpacing="2px"
                />
                <Text
                  color="gray.500"
                  className="secondaryFont"
                  fontWeight="500"
                >
                  {`${rating.length} penilaian`}
                </Text>
              </Center>
              <Stack w="60%" spacing="4px" ml="4px">
                {[fiveRating, fourRating, threeRating, twoRating, oneRating].map((item, index) => {
                  const percentage = item == 0 ? 0 : item / rating.length * 100;
                  let color;
                  if (percentage > 10) {
                    color = "#ffffff"
                  } else {
                    color = "#ffa726"
                  }
                  return (
                    <HStack key={index}>
                      <GoStar size={24} color="orange" />
                      <Progress
                        value={percentage}
                        colorScheme="orange"
                        w="100%"
                        h="16px"
                        position="relative"
                        borderRadius="8px"
                        css={css`
                          ::before {
                            content: "${5 - index}";
                            position: absolute;
                            size: 4px;
                            top: 0;
                            left: 8px;
                            color: ${color};
                            z-index: 1;
                            line-height: normal;
                            transform: translateY(-3px);
                          }
                        `}
                      ></Progress>
                    </HStack>
                  );
                })}
              </Stack>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box >
  );
};

export default ProductInformation;
