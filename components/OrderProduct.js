import { Flex, Image, Text, Box } from "@chakra-ui/react"
import { IoCreateOutline } from "react-icons/io5"

const OrderProduct = ({ name, source, details, weight, notes }) => {
    return (
        <>
            <Flex>
                <Image src={source} alt="" h="50px" />
                <Box className="secondaryFont" fontWeight="500" ml="16px">
                    <Text fontSize="1rem" color="gray.700">{name}</Text>
                    <Text fontSize="0.875rem" color="gray.500">{details}</Text>
                    <Text fontSize="0.875rem" color="gray.500">{weight}</Text>
                </Box>
            </Flex>

            {notes === "" ? "" :
                <Box display="flex" color="gray.400">
                    <IoCreateOutline size="20px" />
                    <Text fontSize="0.75rem" >{notes}</Text>
                </Box>

            }
        </>
    )
}

export default OrderProduct