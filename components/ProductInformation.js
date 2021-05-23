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
    Stat,
    StatNumber,
    StatHelpText,
    StatGroup
} from "@chakra-ui/react"

import { BsFillStarFill } from "react-icons/bs"
import styles from "../styles/ProductInformation.module.scss"
import { useEffect } from "react";

const ProductInformation = () => {

    const rating = 4.7

    // useEffect(() => getRating, [])

    // const getRating = () => {
    //     const starPercentage = rating * 100
    //     const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`

    //     document.getElementById('starRating').style.width = starPercentageRounded
    // }

    const showDescription = () => {
        const descriptionText = document.getElementById("descriptionText")
        const toggleButton = document.getElementById("seeMoreButton")

        descriptionText.classList.remove(styles.productDescription)
        toggleButton.style.display = "none"
    }

    return(
        <Box mt="16px">
            <Tabs>
                <TabList borderTopColor="gray.200">
                    <Tab _selected={{ color: "orange.400", borderBottomColor: "orange.400"}} _focus={{boxShadow: "none"}}>Informasi Produk</Tab>
                    <Tab _selected={{ color: "orange.400", borderBottomColor: "orange.400"}} _focus={{boxShadow: "none"}}>Penilaian</Tab>
                    <Link href="#">
                        <Tab _selected={{ color: "orange.400", borderBottomColor: "orange.400"}} _focus={{boxShadow: "none"}}>Ulasan</Tab>
                    </Link>
                    
                </TabList>

                <TabPanels>
                    <TabPanel w="100%">
                        <Stack spacing="24px" direction="row" w="100%">
                            <Box border="1px" borderColor="gray.200" borderRadius="8px" px="15px" py="10px" w="100%">
                                <Text className="primaryFont" fontWeight="bold" fontSize="14px" h="18px">Vendor</Text>
                                <Text className="secondaryFont" fontWeight="500" fontSize="16px" color="gray.600">Ceritanya ini vendor</Text>
                                <Text className="secondaryFont" fontWeight="500" fontSize="18px" color="orange.400">98.48%</Text>
                            </Box>
                            <Box border="1px" borderColor="gray.200" borderRadius="8px" px="15px" py="10px" w="100%">
                                <Text className="primaryFont" fontWeight="bold" fontSize="14px" h="18px">Lokasi:</Text>
                                <Text className="secondaryFont" fontWeight="500" fontSize="16px" color="orange.400">Bandung Kidul</Text>
                                <Text className="secondaryFont" fontWeight="500" fontSize="16px" color="orange.400">BANDUNG</Text>
                            </Box>
                        </Stack>
                        <Box>
                            <Text color="#000000" fontWeight="bold" mt="8px" mb="8px">Deskripsi Produk</Text>
                            <Text id="descriptionText" className={styles.productDescription} color="gray.600" fontSize="14px">Chupa chups bonbon cotton candy. Cotton candy jelly-o lollipop. Bonbon carrot cake topping chocolate cake marzipan pie dragée liquorice. Chocolate cake bonbon candy canes bonbon chocolate bar. Cupcake fruitcake dragée. Liquorice ice cream pie oat cake toffee fruitcake powder sweet roll macaroon. Tart carrot cake muffin croissant jujubes oat cake caramels.
                                Fruitcake candy dessert bear claw dragée. Chupa chups toffee apple pie pie jelly. Marshmallow sesame snaps tiramisu jelly beans. Pastry croissant gummies. Candy canes gingerbread liquorice sesame snaps donut powder pie. Bonbon bonbon dragée croissant ice cream marzipan sesame snaps cake lemon drops. Chocolate bar gummi bears jujubes tiramisu sesame snaps cupcake chupa chups pastry. Cake pudding chupa chups gummi bears soufflé jelly-o gingerbread jelly beans apple pie.
                                Marzipan sweet roll sesame snaps sweet roll pastry pie jelly beans. Sweet jelly beans wafer muffin jujubes biscuit halvah. Oat cake jelly sesame snaps danish. Liquorice lollipop wafer oat cake muffin tiramisu marzipan donut tart. Chupa chups sugar plum apple pie oat cake marshmallow macaroon. Bear claw candy canes chocolate cake. Halvah cotton candy sweet roll powder toffee cookie sesame snaps.
                                Cupcake gingerbread toffee candy canes chocolate bar toffee lollipop gummi bears. Jelly-o cookie soufflé. Muffin pastry sweet sweet lemon drops gingerbread topping. Cake donut dragée icing tiramisu fruitcake dessert gingerbread wafer. Liquorice croissant oat cake gummies gummi bears cotton candy chupa chups dessert jelly-o. Donut biscuit toffee. Jelly beans cookie chocolate cake candy canes gingerbread. Powder candy canes brownie croissant pie soufflé. Tart soufflé candy powder lemon drops. Cake cake macaroon chocolate bar.
                                Jujubes powder lemon drops tootsie roll carrot cake bonbon brownie. Tootsie roll dragée jelly beans. Carrot cake candy icing apple pie. Donut gummies lemon drops icing powder pastry tootsie roll. Gummi bears halvah sugar plum sweet roll apple pie marshmallow liquorice gingerbread. 
                            </Text>
                            <Button bg="none" color="orange.400" fontWeight="bold" p="0" onClick={showDescription} id="seeMoreButton" _hover={{bg: "transparent", color:"orange.500"}} _focus={{boxShadow: "none"}}>
                                Lihat selengkapnya
                            </Button>
                        </Box>
                        
                    </TabPanel>
                    <TabPanel>
                        <Box>
                            <Stat>
                                <StatNumber>{rating}</StatNumber>
                                <Box className={styles.outerStar} direction="row">
                                    <BsFillStarFill />
                                    <BsFillStarFill />
                                    <BsFillStarFill />
                                    <BsFillStarFill />
                                    <BsFillStarFill />
                                    <Box className={styles.innerStar}>
                                        <BsFillStarFill />
                                        <BsFillStarFill />
                                        <BsFillStarFill />
                                        <BsFillStarFill />
                                        <BsFillStarFill />
                                    </Box>
                                </Box>
                                <StatHelpText>999 penilaian</StatHelpText>
                            </Stat>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            

        </Box>
    )
}

export default ProductInformation