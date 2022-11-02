import { Layout } from "../../components/Layout"
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Badge,
    InputGroup,
    InputLeftElement,
    Input,
    Text,
    Link,
    Spinner,
    Flex,
    Button,
} from "@chakra-ui/react";

import { FaSearch } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { HOST } from "../../constants/api";

export default function Cicilan() {
    const pencarian = useRef();
    const [listData, setListData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const path = [
        {
            name: "Cicilan",
            link: "/cicilan",
            isOnPage: true,
        },
    ];

    useEffect(() => {
        getDataCicilan();
    }, []);

    const getDataCicilan = async () => {
        setIsLoading(true);
        setListData([]);
        const response = await axios.post(HOST + '/api/product/get_product_cicilan', { product_name: pencarian.current.value });
        setListData(response.data.data);
        setIsLoading(false);
    }

    return (
        <Layout hasNavbar hasPadding hasBreadCrumb breadCrumbItem={path}>
            <Flex mt={5} mb={10}>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<FaSearch color='gray.300' />}
                    />
                    <Input type='text' onKeyUp={(e) => ((e.key == 'Enter') ? getDataCicilan() : null)} ref={pencarian} placeholder='Pencarian Nama Produk' />
                </InputGroup>
                <Button colorScheme='orange' ml="2" onClick={getDataCicilan}>Cari</Button>
                <Button colorScheme='red' ml="2" onClick={() => { pencarian.current.value = ''; getDataCicilan(); }}>Clear</Button>
            </Flex>

            <Box shadow={'base'} border={'1px'} borderColor={'gray.200'} borderRadius={'md'} mt="2">
                <TableContainer>
                    <Table variant='striped' >
                        <Thead>
                            <Tr>
                                <Th>No</Th>
                                <Th>Produk</Th>
                                <Th>Vendor</Th>
                                <Th>DP</Th>
                                <Th>Termin 1</Th>
                                <Th>Termin 2</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                isLoading && (
                                    <Tr>
                                        <Td colSpan={6} textAlign={'center'}>
                                            <Spinner />
                                        </Td>
                                    </Tr>
                                )
                            }
                            {
                                !isLoading && listData.length == 0 && (
                                    <Tr>
                                        <Td colSpan={6} textAlign={'center'}>Tidak Ada Data</Td>
                                    </Tr>
                                )
                            }
                            {
                                listData.map((item, index) =>
                                    <Tr>
                                        <Td>{index + 1}</Td>
                                        <Td>
                                            {item.map((item, index) => <Text mb={1} color='gray.600' fontWeight={"medium"}> <Link
                                                _hover={{ textStyle: "none" }}
                                                href={`/product-detail/${item.products_slug}`}
                                                target="_blank"

                                                color={"orange.400"}
                                            >
                                                {item.products_name}
                                            </Link></Text>)}
                                        </Td>
                                        <Td>{item[0].vendors_name}</Td>
                                        <Td><Badge colorScheme={'green'}>50%</Badge></Td>
                                        <Td>{item[0].termin_1} <Badge colorScheme={'green'}>25%</Badge></Td>
                                        <Td>{item[0].termin_2} <Badge colorScheme={'green'}>25%</Badge></Td>
                                    </Tr>
                                )
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Layout>
    )
}