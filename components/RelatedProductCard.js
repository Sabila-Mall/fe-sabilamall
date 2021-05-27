import {
    Box,
    Image,
    Text,
    Stack,
    Center,
    useBoolean
} from "@chakra-ui/react"

import { FiHeart } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'

const RelatedProductCard = () => {
    const [liked, setLiked] = useBoolean()
    const productName = "ALEA GAMIS CASUAL"
    const productInitialPrice = 180000
    const discount = 10
    
    const productDiscountPrice = productInitialPrice * (100 - discount) / 100

    const priceWithDot = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }


    return (
        <Center border="gray.300" borderWidth="1px" borderRadius="8px">
            <Box p="8px">
                <Image src="/images/productExample.svg"/>
                <Text className="secondaryFont" fontWeight="medium" fontSize="md" lineHeight="24px" mb={2} maxW="144px">{productName}</Text>
                <Box as="span" display="flex">
                    {discount ? 
                    <Box display="flex" w="max-content" align="center">
                        <Center as="del" color="gray.500" className="secondaryFont" fontSize="xs" fontWeight="500">
                            {`Rp ${priceWithDot(productInitialPrice)}`}
                        </Center>
                        <Text color="red.700" className="secondaryFont" fontSize="xs" bgColor="red.200" ml={4} px={1} py={0.5} borderRadius="4px">
                            {discount}%
                        </Text>
                    </Box>
                    
                    : ""}
                </Box>
                <Stack h="21px" mt="4px" mb="8px" justify="space-between" direction="row" align="center">
                    <Text className="primaryFont" fontSize="xl" fontWeight="bold">
                        {`Rp ${priceWithDot(productDiscountPrice)}`}
                    </Text>
                    <Box>
                        {liked?<FaHeart onClick={setLiked.toggle} color="red" />: <FiHeart onClick={setLiked.toggle} />}
                    </Box>

                </Stack>   
            </Box>
            
            
            
        </Center>
        
    )
}

export default RelatedProductCard;