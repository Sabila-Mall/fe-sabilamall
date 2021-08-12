import { Flex, Spinner } from "@chakra-ui/react";

import { Layout } from "./Layout";

const Loading = () => (
  <Layout hasNavbar sticky>
    <Flex justify="center" align="center" h="100vh" w="full">
      <Spinner />
    </Flex>
  </Layout>
);

export default Loading;
