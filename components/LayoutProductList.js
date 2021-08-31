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
} from "@chakra-ui/react";
import { IoArrowDown, IoChevronDown, IoFilterOutline } from "react-icons/io5";

import { useAuthContext } from "../contexts/authProvider";
import styles from "../styles/Product.module.scss";
import CardProduct from "./CardProduct";

const px = { base: "1rem", md: "1.5rem", lg: "3rem", xl: "50px" };

const LayoutProductList = ({
  data,
  loading,
  handleLoadMore,
  handleFilter,
  sorting = true,
  title = true,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData } = useAuthContext();
  function handleFilterWrapper(filter) {
    onClose();
    handleFilter(filter);
  }

  return (
    <Box bg="white" pb="100px" px={px}>
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
                <Box onClick={() => handleFilterWrapper("")}>Paling Sesuai</Box>
                <Box onClick={() => handleFilterWrapper("atoz")}>
                  Urutkan (A-Z)
                </Box>
                <Box onClick={() => handleFilterWrapper("ztoa")}>
                  Urutkan (Z-A)
                </Box>
                <Box onClick={() => handleFilterWrapper("hightolow")}>
                  Harga (Tertinggi-Terendah)
                </Box>
                <Box onClick={() => handleFilterWrapper("lowtohigh")}>
                  Harga (Terendah-Tertinggi)
                </Box>
                <Box onClick={() => handleFilterWrapper("topseller")}>
                  Top Seller
                </Box>
                <Box onClick={() => handleFilterWrapper("mostliked")}>
                  Paling Disukai
                </Box>
                <Box onClick={() => handleFilterWrapper("specials")}>
                  Produk Spesial
                </Box>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
        {sorting && (
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
              Urutkan Berdasarkan <Icon ml="30px" as={IoChevronDown} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleFilter("")}>
                Paling Sesuai
              </MenuItem>
              <MenuItem onClick={() => handleFilter("atoz")}>
                Urutkan (A-Z)
              </MenuItem>
              <MenuItem onClick={() => handleFilter("ztoa")}>
                Urutkan (Z-A)
              </MenuItem>
              <MenuItem onClick={() => handleFilter("hightolow")}>
                Harga (Tertinggi-Terendah)
              </MenuItem>
              <MenuItem onClick={() => handleFilter("lowtohigh")}>
                Harga (Terendah-Tertinggi)
              </MenuItem>
              <MenuItem onClick={() => handleFilter("topseller")}>
                Top Seller
              </MenuItem>
              <MenuItem onClick={() => handleFilter("mostliked")}>
                Paling Disukai
              </MenuItem>
              <MenuItem onClick={() => handleFilter("specials")}>
                Produk Spesial
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
      <Grid
        w="100%"
        position="relative"
        templateColumns={[
          "repeat(2,1fr)",
          "repeat(3,1fr)",
          "repeat(4,1fr)",
          "repeat(5,1fr)",
          "repeat(7,1fr)",
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
            <Box key={item.id}>
              <CardProduct {...item} responsive={true} />
            </Box>
          ),
        )}
      </Grid>
      {data.currentPage !== data.lastPage && (
        <Center mt="1rem">
          <Button
            variant="outline"
            borderRadius="29px"
            borderColor="red.500"
            color="red.500"
            onClick={handleLoadMore}
            isLoading={loading}
            spinnerPlacement="end"
            loadingText="Mengambil data"
          >
            Lihat Lebih Banyak <Icon as={IoArrowDown} ml=".5rem" />
          </Button>
        </Center>
      )}
    </Box>
  );
};

export default LayoutProductList;
