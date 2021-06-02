import { Box, Flex } from "@chakra-ui/react";

import { CardProfile } from "./CardProfile";

const ProfileDesktop = ({ sm }) => {
  return (
    <Box
      display={{ base: "none", md: "block" }}
      pt="89px"
      px={{ base: "50px", md: "60px", lg: "120px" }}
    >
      <Flex>
        <CardProfile sm={sm} />
      </Flex>
    </Box>
  );
};

export default ProfileDesktop;
