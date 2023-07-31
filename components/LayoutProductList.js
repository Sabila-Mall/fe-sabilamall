import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Skeleton,
  SkeletonText,
  useDisclosure,
  VStack,
  Flex,
  Link,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { IoArrowDown, IoChevronDown, IoFilterOutline } from "react-icons/io5";

import styles from "../styles/Product.module.scss";
import CardProduct from "./CardProduct";

const LayoutProductList = ({
  queryProducts,
  loading,
  handleLoadMore,
  handleFilter,
  sorting = true,
  title = true,
  filterData,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  function handleFilterWrapper(filter) {
    onClose();
    handleFilter(filter);
  }

  const list_filter = [
    { title: "Paling Sesuai", value: "" },
    { title: "Urutkan (A-Z)", value: "atoz" },
    { title: "Urutkan (Z-A)", value: "ztoa" },
    { title: "Harga (Tertinggi-Terendah)", value: "hightolow" },
    { title: "Harga (Terendah-Tertinggi)", value: "lowtohigh" },
    { title: "Top Seller", value: "topseller" },
    { title: "Paling Disukai", value: "mostliked" },
    { title: "Produk Spesial", value: "special" },
  ];

  return (
    <Box bg="white" pb="100px">
      <Box
        className={styles.secondaryFont}
        mb="32px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pr={{ lg: "40px" }}
      >
        {title && (
          <Heading
            className={styles.primaryFont}
            color={"black"}
            fontWeight={700}
            fontSize={{ base: "16px", md: "20px", lg: "24px" }}
            lineHeight={{ base: "20.8px", md: "26px", lg: "31.2px" }}
          >
            Semua Produk
          </Heading>
        )}
        {sorting && (
          <>
            <Icon
              onClick={onOpen}
              as={IoFilterOutline}
              fontSize="24px"
              display={{ base: "block", md: "none", lg: "none" }}
            />
            <Modal
              isOpen={isOpen}
              onClose={onClose}
              isCentered={true}
              size="sm"
              motionPreset="slideInBottom"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalBody>
                  <VStack align="start" spacing="1rem" justify="center">
                    {list_filter.map((item, index) => (
                      <Box
                        onClick={() => handleFilterWrapper(item.value)}
                        key={index}
                      >
                        {item.title}
                      </Box>
                    ))}
                  </VStack>
                </ModalBody>
              </ModalContent>
            </Modal>

            <Menu display={{ base: "none", md: "block" }}>
              <MenuButton
                px={4}
                py={2}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                borderColor="#E2E8F0"
                _hover={{ bg: "gray.200" }}
                _expanded={{ bg: "gray.300" }}
                _focus={{ boxShadow: "none" }}
                display={{ base: "none", md: "block" }}
              >
                Urutkan Berdasarkan -{" "}
                {list_filter.find((item) => item.value == filterData).title}{" "}
                <Icon ml="30px" as={IoChevronDown} />
              </MenuButton>
              <MenuList>
                {list_filter.map((item, index) => (
                  <MenuItem
                    onClick={() => handleFilter(item.value)}
                    key={index}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </>
        )}
      </Box>
      <Grid
        w="100%"
        position="relative"
        templateColumns={[
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
          "repeat(5, 1fr)",
          "repeat(6, 1fr)",
          "repeat(7, 1fr)",
        ]}
        columnGap={2}
        rowGap={4}
      >
        {/* {queryProducts.data?.pages?.reduce((acc, curr) => acc.data.concat(curr.data))} */}
        {!queryProducts.isFetched
          ? queryProducts.data?.pages?.map((page) =>
              page.data.map((data, index) => (
                <Box
                  key={index}
                  bg="white"
                  borderRadius="8px"
                  border="1px solid #CBD5E0"
                >
                  <Skeleton h="10rem" />
                  <Box padding="1.5rem">
                    <SkeletonText noOfLines={2} mb="1rem" />
                    <SkeletonText noOfLines={1} />
                  </Box>
                </Box>
              )),
            )
          : queryProducts.data?.pages?.map((page) =>
              page.data.map((data, index) => (
                <CardProduct
                  key={data.products_id}
                  {...data}
                  responsive={true}
                />
              )),
            )}
      </Grid>

      {!queryProducts.isFetched ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        queryProducts.data?.pages?.reduce(
          (acc, curr) => acc.concat(curr.data),
          [],
        ).length == 0 && (
          <Box display={"flex"} flexDirection={"column"}>
            <Text fontSize={"xl"} align={"center"}>
              Produk Tidak Ditemukan
            </Text>
            <Image src={"/images/2.svg"} height={"60vh"} />
          </Box>
        )
      )}

      {/* <Grid
        w="100%"
        position="relative"
        templateColumns={[
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
          "repeat(5, 1fr)",
          "repeat(7, 1fr)",
          "repeat(8, 1fr)",
        ]}
        columnGap={2}
        rowGap={4}
      >
        {data.data.map((item, index) =>
          loading ? (
            <Box
              key={index}
              bg="white"
              borderRadius="8px"
              border="1px solid #CBD5E0"
            >
              <Skeleton h="10rem" />
              <Box padding="1.5rem">
                <SkeletonText noOfLines={2} mb="1rem" />
                <SkeletonText noOfLines={1} />
              </Box>
            </Box>
          ) : (
            <Box bg={'red'} height={index == 0 ? '200px' : ''}>
            </Box>
          ),
        )}
      </Grid> */}

      {queryProducts.hasNextPage && (
        <Center mt="1rem">
          <Button
            variant="outline"
            borderRadius="29px"
            borderColor="red.500"
            color="red.500"
            onClick={() => queryProducts.fetchNextPage()}
            spinnerPlacement="end"
            loadingText="Mengambil data"
            isLoading={queryProducts.isFetching}
          >
            Lihat Lebih Banyak <Icon as={IoArrowDown} ml=".5rem" />
          </Button>
        </Center>
      )}
    </Box>
  );
};

export default LayoutProductList;
