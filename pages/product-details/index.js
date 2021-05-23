import { Box } from "@chakra-ui/react"

import ProductInformation from '../../components/ProductInformation';
import ProductHeader from '../../components/ProductHeader';
const ProductDetails = () => {
    return(
        <Box w={{ base : "100%", md : "35%" }} ml={{base: "12px"}} mr={{base: "12px"}}>
            <ProductHeader />
            <ProductInformation />
        </Box>
    )
}

export default ProductDetails