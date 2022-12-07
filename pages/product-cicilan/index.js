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
    Img,
    Divider,
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

    const getImagePath = (image) => {
        let temp_image = image.replaceAll('images/media/', '');
        temp_image = `https://media.sabilamall.co.id/${temp_image}`;
        return temp_image;
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

            <Box>
                {
                    isLoading && (
                        <Text align={'center'}><Spinner /></Text>
                    )
                }
                {
                    !isLoading && listData.length == 0 && (
                        <Text align={'center'}>Tidak Ada Data</Text>
                    )
                }
                {
                    listData.map((item, index) =>
                        <Flex direction={'column'} shadow={'md'} borderRadius={'lg'} mb={5} p={1} border={'2px'} bg={'gray.200'} borderColor={'gray.300'} gridGap={2}>
                            <Box border={'1px'} bg={'white'} borderColor={'gray.300'} borderRadius={'md'} padding={'2'}>
                                <table size='sm' >
                                    <tbody>
                                        <tr>
                                            <td><Text color={'gray.600'} fontWeight={'semibold'}> DP&ensp;</Text></td>
                                            <td>:&ensp;</td>
                                            <td><Badge colorScheme={'green'}>50%</Badge></td>
                                        </tr>
                                        <tr>
                                            <td><Text color={'gray.600'} fontWeight={'semibold'}> Termin 1&ensp;</Text></td>
                                            <td>:&ensp;</td>
                                            <td>{item[0].termin_1} | <Badge colorScheme={'green'}>25%</Badge></td>
                                        </tr>
                                        <tr>
                                            <td><Text color={'gray.600'} fontWeight={'semibold'}> Termin 2&ensp;</Text></td>
                                            <td>:&ensp;</td>
                                            <td>{item[0].termin_2} | <Badge colorScheme={'green'}>25%</Badge></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Box>
                            <Flex gridGap={1} direction={'column'}>
                                {item.map((item, index) =>
                                    <Link href={`/product-detail/${item.products_slug}`} target={'_blank'} _hover={{ textStyle: 'none' }}>
                                        <Flex borderRadius={'md'} gridGap={2} border={'1px'} bg={'white'} borderColor={'gray.300'} p={2}>
                                            <Img src={getImagePath(item.image)} w="4rem" h="4rem"></Img>
                                            <Box>
                                                <Text fontSize={'md'} fontWeight={'semibold'} color={'gray.600'}>{item.products_name}</Text>
                                                <Text fontWeight={'medium'} color={'gray.500'}>{item.vendors_name}</Text>
                                            </Box>
                                        </Flex>
                                    </Link>

                                )}
                            </Flex>

                        </Flex>
                    )}
            </Box>
        </Layout>
    )
}