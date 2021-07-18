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
} from "@chakra-ui/react";
import { BsClock } from "react-icons/bs";
import { IoCartOutline, IoFileTrayStackedOutline } from "react-icons/io5";

const StokItem = ({ img, nama, supplier, tag, variant }) => {
  return (
    <>
      <Flex w="100%" bg="gray.100" borderRadius="md" boxShadow="md" mb="1rem">
        <Flex w="40%" padding="0.8rem">
          <Img src={img} w="6rem" h="6rem" borderRadius="md" />
          <Box className="secondaryFont" marginLeft="0.75rem">
            <Text color="gray.700" fontWeight="100" fontSize="1.125rem">
              {nama}
            </Text>
            <Text color="gray.600" fontSize="1rem">
              {supplier}
            </Text>
            <Tag
              variant="outline"
              colorScheme={tag === "Reguler" ? "gray" : "orange"}
              marginTop="0.5rem"
              size="md"
            >
              <TagLeftIcon as={tag === "Reguler" ? IoCartOutline : BsClock} />
              <TagLabel
                color={tag === "Reguler" ? "" : "orange.600"}
                fontWeight="500"
              >
                {tag}
              </TagLabel>
            </Tag>
          </Box>
        </Flex>
        <Flex w="50%" pt="0.5rem" pb="0.8rem">
          <Accordion allowToggle w="100%">
            <AccordionItem borderBottom="0px">
              {({ isExpanded }) => (
                <>
                  <AccordionButton d="flex" justifyContent="space-between">
                    <Box
                      textAlign="left"
                      color="gray.500"
                      className="secondaryFont"
                      d="flex"
                      flexDir="row"
                      alignItems="center"
                    >
                      <IoFileTrayStackedOutline size="1.5rem" />
                      <Text ml="0.9ch">Varian Produk</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <Box
                    borderTop="1px"
                    borderTopColor="gray.200"
                    borderBottom="1px"
                    borderBottomColor="gray.500"
                    d="flex"
                    flexDir="row"
                    color="gray.500"
                    fontSize="0.875rem"
                    className="secondaryFont"
                    paddingTop="0.5rem"
                    paddingBottom="0.2rem"
                  >
                    <Box w="40%">
                      <Text>Warna</Text>
                    </Box>
                    <Box w="50%">
                      <Text>Ukuran</Text>
                    </Box>
                    <Box w="10%">
                      <Text>Stok</Text>
                    </Box>
                  </Box>
                  <AccordionPanel
                    p="0rem"
                    color="gray.500"
                    className="secondaryFont"
                    fontSize="0.875rem"
                  >
                    {variant &&
                      variant.map((vari) => {
                        return (
                          <>
                            <Box
                              d="flex"
                              flexDir="row"
                              borderBottom="1px"
                              borderBottomColor="gray.200"
                              pt="0.4rem"
                              pb="0.6rem"
                            >
                              <Box w="40%">
                                {vari.warna !== "" && <Text>{vari.warna}</Text>}
                                {vari.warna === "" && (
                                  <Text color="gray.300">
                                    Tanpa varian warna
                                  </Text>
                                )}
                              </Box>
                              <Box w="50%">
                                {vari.ukuran.length !== 0 &&
                                  vari.ukuran.map((ukur) => {
                                    return <Text>{ukur}</Text>;
                                  })}
                                {vari.ukuran.length === 0 && (
                                  <Text color="gray.300">
                                    Tanpa varian ukuran
                                  </Text>
                                )}
                              </Box>
                              <Box w="10%">
                                {vari.stok &&
                                  vari.stok.map((stokk) => {
                                    if (stokk !== 0) {
                                      return <Text>{stokk}</Text>;
                                    } else {
                                      return <Text color="red.500">Habis</Text>;
                                    }
                                  })}
                              </Box>
                            </Box>
                          </>
                        );
                      })}
                  </AccordionPanel>
                  <Text
                    mt="0.4rem"
                    color="orange.500"
                    fontSize="0.875rem"
                    className="secondaryFont"
                    cursor="pointer"
                  >
                    {isExpanded ? "Sembunyikan" : "Lihat varian produk"}
                  </Text>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Flex>
        <Flex w="10%" d="flex" justifyContent="center" pt="0.6rem">
          <Button colorScheme="orange" className="primaryFont" w="7.5ch">
            Beli
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default StokItem;
