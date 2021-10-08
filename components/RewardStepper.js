import { Box, Circle, Image, Tooltip, Divider, Flex, Icon } from "@chakra-ui/react"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { IMAGE_HOST } from "../constants/api"

const RewardStepper = ({ rewards, userPoint }) => {
    const [currentStepOpened, setCurrentStepOpened] = useState(null)
    return (
        <Box mt="1rem">
            <Flex
                justifyContent="space-between"
                overflowX="auto" w={{ base: "auto", md: "fit-content" }}>
                {rewards.map((el, index) => {
                    return (
                        <Flex alignItems="center">
                            <Tooltip
                                isOpen={currentStepOpened === index}
                                hasArrow
                                label={el.rewarddesc}
                                bgColor="gray.800">
                                <Circle
                                    onMouseEnter={() => setCurrentStepOpened(index)}
                                    onClick={() => { setCurrentStepOpened(index) }}
                                    key={index}
                                    size={{ base: "50px", md: "40px", lg: "50px" }}
                                    border={userPoint >= el.rewardpoint ? "5px solid #DD6B20" : "5px solid #C4C4C4"}
                                    bgColor="white"
                                    backgroundImage={IMAGE_HOST + el.rewardimg}
                                    backgroundSize="24px"
                                    backgroundPosition="center"
                                    backgroundRepeat="no-repeat"
                                >
                                    {userPoint >= el.rewardpoint ? <Icon as={FaCheck} color="orange.500" w={6} h={6} /> : <Image src={IMAGE_HOST + el.rewardimg} w="24px" />}

                                </Circle>
                            </Tooltip>
                            {index !== rewards.length - 1 &&
                                <Divider
                                    borderWidth="5px"
                                    borderColor={userPoint >= el.rewardpoint ? "#DD6B20" : "#C4C4C4"}
                                    w={{ base: "36px", md: "8px", lg: "30px" }}
                                />}
                        </Flex>

                    )
                })}
            </Flex>

        </Box>
    )
}

export default RewardStepper