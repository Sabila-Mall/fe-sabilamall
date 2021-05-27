import { Box } from "@chakra-ui/react"

import ProductInformation from '../../components/ProductInformation';
import ProductHeader from '../../components/ProductHeader';
import RelatedProductContainer from '../../components/RelatedProductContainer';

const ProductDetails = () => {
    return(
        <Box mr={{base:"16px", md:"100px"}} ml={{base:"16px", md:"100px"}} >
            <Box w={{ base : "100%", md : "35%" }} ml={{base: "12px"}} mr={{base: "12px"}}>
                <ProductHeader />
                <ProductInformation />
            </Box>
            <RelatedProductContainer />
        </Box>
        
    )
}

export default ProductDetails