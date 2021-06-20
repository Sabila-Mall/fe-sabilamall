import {
    Grid,
    GridItem,
    Stack,
    StackDivider,
    Link,
    Heading
} from "@chakra-ui/react"

import RelatedProductCard from "../components/RelatedProductCard";

const RelatedProductContainer = () => {
    return (
        <Stack divider={<StackDivider borderColor="gray.200" />} mt="24px" >
            <Stack direction="row" justify="space-between" w="100%" align="center">
                <Heading fontSize="24px" className="primaryFont">Produk Terkait</Heading>
                <Link href="/" color="orange.400" fontWeight="bold" fontSize="16px">Lihat Semua</Link>
            </Stack>
            <Grid templateColumns="repeat(6, 1fr)" gap="24px" mt="16px" overflowX="auto" >
                <GridItem><RelatedProductCard name={"ALEA GAMIS CASUAL"} isDiscount={true} discountAmount={10} price={180000} /></GridItem>
                <GridItem><RelatedProductCard name={"ALEA GAMIS CASUAL"} isDiscount={true} discountAmount={10} price={180000} /></GridItem>
                <GridItem><RelatedProductCard name={"ALEA GAMIS CASUAL"} isDiscount={true} discountAmount={10} price={180000} /></GridItem>
                <GridItem><RelatedProductCard name={"ALEA GAMIS CASUAL"} isDiscount={true} discountAmount={10} price={180000} /></GridItem>
                <GridItem><RelatedProductCard name={"ALEA GAMIS CASUAL"} isDiscount={true} discountAmount={10} price={180000} /></GridItem>
                <GridItem><RelatedProductCard name={"ALEA GAMIS CASUAL"} isDiscount={true} discountAmount={10} price={180000} /></GridItem>
            </Grid>
        </Stack>
    )
}
export default RelatedProductContainer;