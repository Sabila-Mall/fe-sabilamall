import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Button,
  Heading,
  HStack,
  Progress,
  Center,
  useBoolean,
  color,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { GoStar } from "react-icons/go";

import styles from "../styles/ProductDetails.module.scss";

const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

const ProductInformation = ({
  products_description,
  vendors_name: vendor,
  vendor_rating: vendorRating, // still hardcode
  vendors_address,
  id,
  total_user_rated: ratingAmount,
  rating,
  one_ratio,
  two_ratio,
  three_ratio,
  four_ratio,
  five_ratio,
}) => {
  const [description, setDescription] = useBoolean(false);

  const ratingArray = {
    1: one_ratio,
    2: two_ratio,
    3: three_ratio,
    4: four_ratio,
    5: five_ratio,
  };
  let totalRating = 0;
  for (var ratingInt in ratingArray) {
    totalRating += ratingArray[ratingInt];
  }
  const ratingList = [
    {
      label: 5,
      percentage:
        (ratingArray[5] * 100) / (totalRating === 0 ? 1 : totalRating),
    },
    {
      label: 4,
      percentage:
        (ratingArray[4] * 100) / (totalRating === 0 ? 1 : totalRating),
    },
    {
      label: 3,
      percentage:
        (ratingArray[3] * 100) / (totalRating === 0 ? 1 : totalRating),
    },
    {
      label: 2,
      percentage:
        (ratingArray[2] * 100) / (totalRating === 0 ? 1 : totalRating),
    },
    {
      label: 1,
      percentage:
        (ratingArray[1] * 100) / (totalRating === 0 ? 1 : totalRating),
    },
  ];

  const showDescription = () => {
    const descriptionText = document.getElementById("descriptionText");
    setDescription.toggle();

    descriptionText.classList.toggle(styles.productDescription);
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
            onClick={setDescription.on}
          >
            Informasi Produk
          </Tab>
          <Tab
            _selected={{ color: "orange.500", borderBottomColor: "orange.400" }}
            _hover={{ color: "orange.400", borderBottomColor: "orange.300" }}
            _focus={{ boxShadow: "none" }}
            className="secondaryFont"
            fontWeight="500"
            onClick={setDescription.off}
          >
            Penilaian
          </Tab>
          {/* <Link
            href={`/product-details/${id}#review`}
            d={{ base: "flex", sm: "inherit" }}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              _selected={{
                color: "orange.500",
                borderBottomColor: "orange.400",
              }}
              _focus={{ boxShadow: "none" }}
              p="12px 20px"
              borderRadius="0"
              _hover={{
                boxShadow: "none",
                color: "orange.400",
                borderBottom: "2px solid #F6AD55",
                transform: "translateY(2px)",
              }}
              className="secondaryFont"
              fontWeight="500"
              bg="white"
            >
              Ulasan
            </Button>
          </Link> */}
        </TabList>

        <TabPanels>
          <TabPanel
            p={{ base: "0", lg: "1rem" }}
            pt="1rem"
            w="100%"
            id="informationPanel"
          >
            <Stack spacing="24px" direction="row" w="100%">
              <Box
                border="1px"
                borderColor="gray.200"
                borderRadius="8px"
                py="10px"
                w="110%"
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
                  {vendor}
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
                  {vendorRating}
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
                  {vendors_address}
                </Text>
              </Box>
            </Stack>
            <Box>
              <Text fontWeight="bold" mt="8px" mb="8px">
                Deskripsi Produk
              </Text>
              <Text
                id="descriptionText"
                className={styles.productDescription}
                color="gray.600"
                fontSize="14px"
              >
                {/* {products_description?.replace(/<[^>]+>/g, "")} */}
                <div
                  dangerouslySetInnerHTML={{ __html: products_description }}
                />
              </Text>
              <Button
                bg="none"
                color="orange.400"
                fontWeight="bold"
                p="0"
                onClick={showDescription}
                id="seeMoreButton"
                _hover={{ bg: "transparent", color: "orange.500" }}
                _focus={{ boxShadow: "none" }}
              >
                {description ? "Lebih Sedikit" : "Lihat selengkapnya"}
              </Button>
            </Box>
          </TabPanel>
          <TabPanel id="ratingPanel" w="100%">
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
                    {Number(rating).toFixed(2)}
                  </Heading>
                  <Text display="inline"> dari 5</Text>
                </Box>
                <StarRatings
                  rating={Number(rating)}
                  starRatedColor="orange"
                  starDimension="24px"
                  starSpacing="2px"
                />
                <Text
                  color="gray.500"
                  className="secondaryFont"
                  fontWeight="500"
                >
                  {`${ratingAmount} penilaian`}
                </Text>
              </Center>
              <Stack w="60%" spacing="4px" ml="4px">
                {ratingList.map((el, index) => {
                  let color;
                  {
                    el.percentage > 10
                      ? (color = "#ffffff")
                      : (color = "#ffa726");
                  }
                  return (
                    <HStack key={index}>
                      <GoStar size={24} color="orange" />
                      <Progress
                        value={el.percentage}
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
    </Box>
  );
};

export default ProductInformation;
