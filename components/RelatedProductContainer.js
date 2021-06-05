import { Box,
Grid,
GridItem,
Text,
Stack,
StackDivider,
Link,
Heading } from  "@chakra-ui/react"

import RelatedProductCard from "../components/RelatedProductCard";

const RelatedProductContainer = () => {
    const products = [
        {
            "name" : "ALEA GAMIS CASUAL",
            "price": 180000,
            "discount": 10,
            "image": "/images/productExample.svg"
        },  
        {
            "name" : "ALEA GAMIS CASUAL",
            "price": 180000,
            "discount": 10,
            "image": "/images/productExample.svg"
        },  
        {
            "name" : "ALEA GAMIS CASUAL",
            "price": 180000,
            "discount": 10,
            "image": "/images/productExample.svg"
        },  
        {
            "name" : "ALEA GAMIS CASUAL",
            "price": 180000,
            "discount": 10,
            "image": "/images/productExample.svg"
        },  
        {
            "name" : "ALEA GAMIS CASUAL",
            "price": 180000,
            "discount": 10,
            "image": "/images/productExample.svg"
        },  
        {
            "name" : "ALEA GAMIS CASUAL",
            "price": 180000,
            "discount": 10,
            "image": "/images/productExample.svg"
        }
    ]
    return(
        <Stack w="100%" 
            divider={<StackDivider borderColor="gray.200" />}>
            <Stack 
                direction="row" 
                justify="space-between" 
                w="100%" 
                align="center">

                    <Heading as="h3" 
                        className="primaryFont">
                        Produk Terkait
                    </Heading>

                    <Link href="/" 
                        color="orange.400" 
                        fontWeight="bold" 
                        fontSize="16px">
                        Lihat Semua
                    </Link>
            </Stack>
            <Grid 
                templateColumns="repeat(6, 1fr)" 
                gap="24px" 
                mt="16px" 
                overflowX="auto" >
                {products.map((product) => {
                    return(
                        <GridItem>
                            <RelatedProductCard 
                                name={product.name} 
                                price={product.price} 
                                discount={product.discount} 
                                image={product.image}/>
                        </GridItem>
                    )
                })}
            </Grid>
        </Stack>
    )
}
export default RelatedProductContainer;