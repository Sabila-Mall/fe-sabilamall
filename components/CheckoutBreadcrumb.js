import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";

/**
 * CheckoutBreadcumb digunakan untuk menunjukan breadcrumb pada proses checkout
 * @param {string} breadCrumbText Text dari breadcrumb (e.g "Detail Pesanan" atau "Alamat Penerima")
 * @param {string} breadCrumbLink Link dari breadcrumb (e.g "/detail-pesanan" atau "/alamat-penerima")
 */
const CheckoutBreadcrumb = ({breadCrumbText, breadCrumbLink}) => {
  return (
    <Box w={{ base: "90vw", lg: "80vw" }}>
      <Breadcrumb
        spacing="8px"
        separator={<FiChevronRight color="gray.500" />}
        fontSize={{ base: "sm", md: "md" }}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/">
            <Text className="secondaryFont" fontWeight="500">
              Home
            </Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="#">
            <Text className="secondaryFont" fontWeight="500">
              Checkout
            </Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href={breadCrumbLink}>
            <Text
              className="primaryFont"
              color="orange.400"
              fontWeight="700"
            >
              {breadCrumbText}
            </Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  );
};

export default CheckoutBreadcrumb;