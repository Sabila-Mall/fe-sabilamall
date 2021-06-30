import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Link,
  Button,
  Heading,
  HStack,
  Progress,
  Center,
  useBoolean,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import dynamic from "next/dynamic";
import { GoStar } from "react-icons/go";

import styles from "../styles/ProductDetails.module.scss";

const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});

const ProductInformation = () => {
  const [description, setDescription] = useBoolean(true);

  let productRating = 4.3;
  const productDescription =
    "Chupa chups bonbon cotton candy. Cotton candy jelly-o lollipop. Bonbon carrot cake topping chocolate cake marzipan pie dragée liquorice. Chocolate cake bonbon candy canes bonbon chocolate bar. Cupcake fruitcake dragée. Liquorice ice cream pie oat cake toffee fruitcake powder sweet roll macaroon. Tart carrot cake muffin croissant jujubes oat cake caramels. Fruitcake candy dessert bear claw dragée. Chupa chups toffee apple pie pie jelly. Marshmallow sesame snaps tiramisu jelly beans. Pastry croissant gummies. Candy canes gingerbread liquorice sesame snaps donut powder pie. Bonbon bonbon dragée croissant ice cream marzipan sesame snaps cake lemon drops. Chocolate bar gummi bears jujubes tiramisu sesame snaps cupcake chupa chups pastry. Cake pudding chupa chups gummi bears soufflé jelly-o gingerbread jelly beans apple pie. Marzipan sweet roll sesame snaps sweet roll pastry pie jelly beans. Sweet jelly beans wafer muffin jujubes biscuit halvah. Oat cake jelly sesame snaps danish. Liquorice lollipop wafer oat cake muffin tiramisu marzipan donut tart. Chupa chups sugar plum apple pie oat cake marshmallow macaroon. Bear claw candy canes chocolate cake. Halvah cotton candy sweet roll powder toffee cookie sesame snaps. Cupcake gingerbread toffee candy canes chocolate bar toffee lollipop gummi bears. Jelly-o cookie soufflé. Muffin pastry sweet sweet lemon drops gingerbread topping. Cake donut dragée icing tiramisu fruitcake dessert gingerbread wafer. Liquorice croissant oat cake gummies gummi bears cotton candy chupa chups dessert jelly-o. Donut biscuit toffee. Jelly beans cookie chocolate cake candy canes gingerbread. Powder candy canes brownie croissant pie soufflé. Tart soufflé candy powder lemon drops. Cake cake macaroon chocolate bar. Jujubes powder lemon drops tootsie roll carrot cake bonbon brownie. Tootsie roll dragée jelly beans. Carrot cake candy icing apple pie. Donut gummies lemon drops icing powder pastry tootsie roll. Gummi bears halvah sugar plum sweet roll apple pie marshmallow liquorice gingerbread";

  const vendor = "Ceritanya ini vendor";
  const vendorRating = 98.48;
  const ratingAmount = 999;

  const districtLocation = "Bandung Kidul";
  const cityLocation = "BANDUNG";
  const ratingArray = {
    1: 0,
    2: 40,
    3: 30,
    4: 60,
    5: 80,
  };
  let totalRating = 0;
  for (var rating in ratingArray) {
    totalRating += ratingArray[rating];
  }
  const ratingList = [
    {
      label: 5,
      percentage: (ratingArray[5] * 100) / totalRating,
    },
    {
      label: 4,
      percentage: (ratingArray[4] * 100) / totalRating,
    },
    {
      label: 3,
      percentage: (ratingArray[3] * 100) / totalRating,
    },
    {
      label: 2,
      percentage: (ratingArray[2] * 100) / totalRating,
    },
    {
      label: 1,
      percentage: (ratingArray[1] * 100) / totalRating,
    },
  ];

  const showDescription = () => {
    const descriptionText = document.getElementById("descriptionText");
    const toggleButton = document.getElementById("seeMoreButton");

    descriptionText.classList.remove(styles.productDescription);
    toggleButton.style.display = "none";
  };

  return (
    <Box mt="16px" ml={{ lg: "0.5rem", xl: "0" }}>
      <Tabs w={{ lg: "95%", xl: "100%" }}>
        <TabList borderTopColor="gray.200">
          <Tab
            _selected={{ color: "orange.500", borderBottomColor: "orange.400" }}
            _focus={{ boxShadow: "none" }}
            className="secondaryFont"
            fontWeight="500"
            onClick={setDescription.on}
          >
            Informasi Produk
          </Tab>
          <Tab
            _selected={{ color: "orange.500", borderBottomColor: "orange.400" }}
            _focus={{ boxShadow: "none" }}
            className="secondaryFont"
            fontWeight="500"
            onClick={setDescription.off}
          >
            Penilaian
          </Tab>
          <Link href="#review">
            <Button
              _selected={{
                color: "orange.500",
                borderBottomColor: "orange.400",
              }}
              _focus={{ boxShadow: "none" }}
              _hover={{ textDecoration: "none" }}
              className="secondaryFont"
              fontWeight="500"
              bg="white"
            >
              Ulasan
            </Button>
          </Link>
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
                  className="secondaryFont"
                  fontWeight="500"
                  fontSize="18px"
                  color="orange.400"
                >
                  {vendorRating}%
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
                  {districtLocation},
                </Text>
                <Text
                  className="secondaryFont"
                  fontWeight="500"
                  fontSize="16px"
                  color="orange.400"
                >
                  {cityLocation}
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
                {productDescription}
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
                Lihat selengkapnya
              </Button>
            </Box>
          </TabPanel>
          <TabPanel id="ratingPanel">
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
                    {productRating.toFixed(2)}
                  </Heading>
                  <Text display="inline"> dari 5</Text>
                </Box>
                <StarRatings
                  rating={productRating}
                  starRatedColor="orange"
                  starDimension="24px"
                  starSpacing="2px"
                />
                <Text
                  color="gray.500"
                  className="secondaryFont"
                  fontWeight="500"
                >
                  {ratingAmount}
                  penilaian
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
