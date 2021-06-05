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

const RelatedProductCard = ({name, price, discount, image}) => {
    const [liked, setLiked] = useBoolean()
    
    const productDiscountPrice = price * (100 - discount) / 100

    const priceWithDot = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }


    return (
        <Center 
            border="gray.300" 
            borderWidth="1px" 
            borderRadius="8px" 
            w="168px">

            <Box p="8px">
                <Image src={image} />
                <Text 
                    className="secondaryFont" 
                    fontWeight="medium" 
                    fontSize="md" 
                    lineHeight="24px" 
                    mb={2} maxW="144px">
                    {name}
                </Text>
                <Box as="span" display="flex">
                    {discount ? 
                    <Box 
                        display="flex" 
                        w="max-content"
                        align="center">

                        <Center as="del" 
                            color="gray.500" 
                            className="secondaryFont" 
                            fontSize="10px" 
                            fontWeight="500">
                            {`Rp ${priceWithDot(price)}`}
                        </Center>
                        <Text 
                            color="red.700" 
                            className="secondaryFont" 
                            fontSize="10px" 
                            bgColor="red.200" 
                            ml={4} px={1} py={0.5} 
                            borderRadius="4px">
                            {discount}%
                        </Text>
                    </Box>
                    
                    : ""}
                </Box>
                <Stack h="21px" mt="4px" mb="8px" 
                    justify="space-between" 
                    direction="row" 
                    align="center">
                        
                    <Text 
                        className="primaryFont" 
                        fontSize="xl" 
                        fontWeight="bold">
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