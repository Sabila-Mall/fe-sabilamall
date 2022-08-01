import {
  Flex,
  Img,
  Tag,
  TagLeftIcon,
  TagLabel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
  Box,
  Text,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsClock } from "react-icons/bs";
import {
  IoCartOutline,
  IoFileTrayStackedOutline,
  IoFileTrayStacked,
} from "react-icons/io5";

import { apiStock } from "../api/Stock";

const StokItem = ({ img, nama, supplier, tag, link, productId }) => {
  const [fetch, setFetch] = useState(false);
  const referenceAccordion = useRef(null);
  const [variant, setVariant] = useState([]);

  useEffect(() => {
    if (fetch && variant.length == 0) {
      apiStock(productId).then((res) => {
        const data = res.data;
        // const listWarna = Object.keys(data);
        let variants = [];

        data.forEach((item) => {
          variants.push({
            warehouse: item.warehouse,
            warna: item.color,
            ukuran: item.size,
            stok: item.stock,
          });
        });

        // listWarna.map((warna) => {
        //   let ukuran = [];
        //   let stok = [];


        //   data[warna].map((el) => {
        //     ukuran.push(el.ukuran);
        //     stok.push(el.stock);
        //   });

        //   let ob = {
        //     warna: warna,
        //     ukuran: ukuran,
        //     stok: stok,
        //   };
        //   variants.push(ob);
        // });
        setVariant((curr) => variants);
        setFetch(false);
      });
    }
  }, [fetch]);

  return (
    <>
      <Flex
        w="100%"
        bg="gray.100"
        borderRadius="md"
        boxShadow="md"
        mb="1rem"
        flexDir={{ base: "column", md: "row" }}
      >
        <Flex w={{ base: "100%", md: "36%" }} padding="0.8rem">
          <Img src={img} w="6rem" h="6rem" borderRadius="md" />
          <Box className="secondaryFont" marginLeft="0.75rem" w="100%">
            <Text
              color="gray.700"
              fontWeight="100"
              fontSize={{ base: "1.125rem", md: "1rem", lg: "1.125rem" }}
            >
              {nama}
            </Text>
            <Text
              color="gray.600"
              fontSize={{ base: "1rem", md: "0.8rem", lg: "1rem" }}
            >
              {supplier}
            </Text>
            <Tag
              variant="outline"
              colorScheme={tag === "reguler" ? "gray" : "orange"}
              marginTop="0.5rem"
              size="md"
            >
              <TagLeftIcon as={tag === "reguler" ? IoCartOutline : BsClock} />
              <TagLabel
                color={tag === "reguler" ? "" : "orange.600"}
                fontWeight="500"
              >
                {tag === "reguler" ? "Reguler" : "Pre-Order"}
              </TagLabel>
            </Tag>
          </Box>
        </Flex>
        <Flex
          w={{ base: "100%", md: "50%" }}
          pt="0.5rem"
          pb="0.8rem"
          pr={{ base: "0.5rem", lg: "0rem" }}
          pl={{ base: "0.5rem", lg: "0rem" }}
        >
          <Accordion allowToggle w="100%">
            <AccordionItem borderBottom="0px">
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    d="flex"
                    justifyContent="space-between"
                    ref={referenceAccordion}
                    onClick={() => {
                      setFetch(true);
                    }}
                  >
                    <Box
                      textAlign="left"
                      color="gray.500"
                      className="secondaryFont"
                      d="flex"
                      flexDir="row"
                      alignItems="center"
                    >
                      {!isExpanded && (
                        <IoFileTrayStackedOutline size="1.5rem" />
                      )}
                      {isExpanded && <IoFileTrayStacked size="1.5rem" />}
                      <Text ml="0.9ch">Varian Produk</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <Box
                    borderTop="1px"
                    borderTopColor="gray.200"
                    borderBottom="1px"
                    borderBottomColor="gray.500"
                    mx={{ base: "0.4rem", md: "0rem" }}
                    d="flex"
                    flexDir="row"
                    color="gray.500"
                    fontSize="0.875rem"
                    className="secondaryFont"
                    paddingTop="0.5rem"
                    paddingBottom="0.2rem"
                  >
                    <Box w="40%">
                      <Text>Gudang</Text>
                    </Box>
                    <Box w="40%">
                      <Text>Warna</Text>
                    </Box>
                    <Box w={{ base: "40%", lg: "50%" }}>
                      <Text>Ukuran</Text>
                    </Box>
                    <Box w={{ base: "20%", lg: "10%" }}>
                      <Text>Stok</Text>
                    </Box>
                  </Box>
                  <AccordionPanel
                    p="0rem"
                    color="gray.500"
                    className="secondaryFont"
                    fontSize="0.875rem"
                    mx={{ base: "0.4rem", md: "0rem" }}
                  >
                    {variant.length != 0 ? (
                      variant.map((vari, i) => {
                        return (
                          <>
                            <Box
                              key={i}
                              d="flex"
                              flexDir="row"
                              borderBottom="1px"
                              borderBottomColor="gray.200"
                              pt="0.4rem"
                              pb="0.6rem"
                            >
                              <Box w="40%">
                                {vari.warehouse !== "" && <Text>{vari.warehouse}</Text>}
                                {vari.warehouse === "" && (
                                  <Text color="gray.300">
                                    Tanpa Warehouse
                                  </Text>
                                )}
                              </Box>
                              <Box w="40%">
                                {vari.warna !== "" && <Text>{vari.warna}</Text>}
                                {vari.warna === "" && (
                                  <Text color="gray.300">
                                    Tanpa varian warna
                                  </Text>
                                )}
                              </Box>
                              <Box w={{ base: "40%", lg: "50%" }}>
                                {vari.ukuran !== "" && <Text>{vari.ukuran}</Text>}
                                {vari.ukuran === "" && (
                                  <Text color="gray.300">
                                    Tanpa varian ukuran
                                  </Text>
                                )}
                              </Box>
                              <Box w={{ base: "20%", lg: "10%" }}>
                                {vari.stok !== "" && <Text>{vari.stok}</Text>}
                                {vari.stok === "" && (
                                  <Text color="gray.300">
                                    Stok Habis
                                  </Text>
                                )}
                              </Box>
                            </Box>
                          </>
                        );
                      })
                    ) : (
                      <Flex justifyContent="center" mt="2rem" w="full">
                        <Spinner />
                      </Flex>
                    )}
                  </AccordionPanel>
                  <Text
                    mt="0.4rem"
                    color="orange.500"
                    fontSize="0.875rem"
                    className="secondaryFont"
                    cursor="pointer"
                    mx={{ base: "0.4rem", md: "0rem" }}
                    onClick={() => {
                      setFetch(true);
                      referenceAccordion.current.click();
                    }}
                  >
                    {isExpanded ? "Sembunyikan" : "Lihat varian produk"}
                  </Text>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Flex>
        <Flex
          w={{ base: "100%", md: "14%" }}
          d="flex"
          justifyContent={{ base: "flex-end", md: "center" }}
          pt={{ base: "0rem", md: "0.6rem" }}
          mb={{ base: "0.4rem", md: "0rem" }}
          pr={{ base: "0rem", md: "0.5rem", lg: "0rem" }}
        >
          <Link href={link}>
            <Button
              colorScheme="orange"
              className="primaryFont"
              maxW="12ch"
              w="100%"
              minW="8ch"
              mr="1rem"
              ml="1rem"
              mb={{ base: "0.25rem", md: 0 }}
            >
              Beli
            </Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default StokItem;
