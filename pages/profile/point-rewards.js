import { Image } from "@chakra-ui/image";
import { Box, Stack, Text, Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getRewards } from "../../api/getReward";
import { CardProfile } from "../../components/CardProfile";
import { Layout } from "../../components/Layout"
import NavbarProfile from "../../components/NavbarProfile"
import RewardStepper from "../../components/RewardStepper";
import { useAuthContext } from "../../contexts/authProvider";
import { useWindowSize } from "../../hooks/useWindowSize";
import { currencyFormat } from "../../utils/functions";

const PointRewards = () => {
    const [pointRewards, setPointRewards] = useState([])
    const [memberPoint, setMemberPoint] = useState(null)
    const [currentUpdate, setCurrentUpdate] = useState("")
    const { width } = useWindowSize();
    const { userData } = useAuthContext();
    const memberID = userData?.memberid
    const memberLevel = userData?.user_level
    const isMobile = width < 768;
    const sm = [
        { text: "SM Pay", value: currencyFormat(userData?.memberdeposit) },
        { text: "SM Point", value: userData?.smpoint },
    ];
    const router = useRouter()

    const getAllData = () => {
        if (memberID) {
            getRewards(memberID).then((res) => {
                console.log(res);
                setPointRewards(res?.daftar_reward)
                setMemberPoint(res?.member_reward.point)
            });
        }
    };
    useEffect(() => {
        getAllData();
        const currentDate = new Date()
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"];
        const current = currentDate.getDate() + "/" + months[currentDate.getMonth()] + "/" + currentDate.getFullYear() + " " + currentDate.getHours().toString().padStart(2, 0) + ":" + currentDate.getMinutes().toString().padStart(2, 0) + ":" + currentDate.getSeconds().toString().padStart(2, 0)
        setCurrentUpdate(current)
    }, [memberID]);

    const currentDate = new Date()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"];
    const current = currentDate.getDate() + "/" + months[currentDate.getMonth()] + "/" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()

    return (
        <Box backgroundColor="gray.50" h="100vh">
            {isMobile && (
                <NavbarProfile
                    section="Point Rewards"
                    onClick={() => router.push("/profile")}
                />
            )}
            <Layout hasPadding={!isMobile} background="gray.50" pt={{ base: "32px", md: "90px" }} sticky noFooter hasNavbar>
                <Flex
                    justify="center"
                    pb="32px"
                    bg="gray.50"
                    px={{ base: "0", md: "10px", lg: "80px", xl: "120px" }}
                >
                    <Flex display={{ base: "none", md: "block" }}>
                        <CardProfile sm={sm} cardProfileText="Point Rewards" />
                    </Flex>
                    <Stack
                        border={{ base: "none", md: "1px solid #E2E8F0" }}
                        borderRadius="20px"
                        p={{ base: "20px", md: "32px" }}
                        ml={{ base: "", md: "15px" }}
                        boxShadow={{ base: "none", md: "0px 2px 4px -1px rgba(45, 55, 72, 0.06), 0px 4px 6px -1px rgba(45, 55, 72, 0.1)" }}
                        bgColor={{ base: "transparent", md: "white" }}
                        spacing="16px"
                        w="100%"
                        h="fit-content"
                    >
                        <Text
                            fontSize="28px"
                            fontWeight="700"
                            lineHeight="120%"
                            className="primaryFont"
                            display={{ base: "none", md: "block" }}
                        >
                            Point Rewards
                        </Text>
                        <Box fontSize={{ base: "0.875rem", md: "1rem" }}>
                            <Text className="primaryFont" lineHeight="130%" fontWeight="700">
                                Member ID
                            </Text>
                            <Text className="secondaryFont" lineHeight="150%" fontWeight="500">
                                {memberID}
                            </Text>
                        </Box>
                        <Box fontSize={{ base: "0.875rem", md: "1rem" }}>
                            <Text className="primaryFont" lineHeight="130%" fontWeight="700">
                                Level Member
                            </Text>
                            <Text className="secondaryFont" lineHeight="150%" fontWeight="500" textTransform="capitalize">
                                {memberLevel}
                            </Text>
                        </Box>
                        <Box fontSize="1rem">
                            <Text className="primaryFont" lineHeight="130%" fontWeight="700">
                                Jumlah Point
                            </Text>
                            <Flex className="secondaryFont" lineHeight="150%" fontWeight="500">
                                <Text>
                                    {memberPoint}
                                </Text>
                                <Text color="gray.500" ml="4px">
                                    {`(update ${currentUpdate})`}
                                </Text>
                            </Flex>
                        </Box>
                        <Box my="1rem">
                            <Text
                                fontSize={{ base: "16px", md: "28px" }}
                                fontWeight="700"
                                lineHeight={{ base: "130%", md: "120%" }}
                                className="primaryFont"
                                mt={{ base: "36px", md: "0" }}
                            >
                                Progres Point Rewards
                            </Text>
                            <RewardStepper rewards={pointRewards} userPoint={memberPoint} />
                        </Box>

                    </Stack>
                </Flex>
            </Layout>
        </Box>
    )
}

export default PointRewards