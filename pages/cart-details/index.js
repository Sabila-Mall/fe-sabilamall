import { Box } from "@chakra-ui/layout";

import { CardCheckout } from "../../components/CardCheckout";

const cartDetails = () => {
  return (
    <Box w="269px">
      <CardCheckout subTotal={"99.999.999"} discount={"89.999.999"} />;
    </Box>
  );
};
export default cartDetails;
