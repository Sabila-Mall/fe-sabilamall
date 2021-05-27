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
    return(
        <Stack w="100%" divider={<StackDivider borderColor="gray.200" />}>
            <Stack direction="row" justify="space-between" w="100%" align="center">
                <Heading as="h3" className="primaryFont">Produk Terkait</Heading>
                <Link href="/" color="orange.400" fontWeight="bold" fontSize="16px">Lihat Semua</Link>
            </Stack>
            <Grid templateColumns="repeat(6, 1fr)" gap="24px" mt="16px" overflowX="auto" >
                <GridItem><RelatedProductCard /></GridItem>
                <GridItem><RelatedProductCard /></GridItem>
                <GridItem><RelatedProductCard /></GridItem>
                <GridItem><RelatedProductCard /></GridItem>
                <GridItem><RelatedProductCard /></GridItem>
                <GridItem><RelatedProductCard /></GridItem>
            </Grid>
        </Stack>
    )
}
export default RelatedProductContainer;