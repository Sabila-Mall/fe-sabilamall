import { Box, Grid, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import CardCategory from "./CardCategory";
import { useRouter } from "next/router";

const LayoutCategoryList = ({ isLoggedIn, queryCategories }) => {
  const router = useRouter();

  return (
    <Grid
      templateColumns={
        isLoggedIn
          ? "repeat(7, 6rem)"
          : { md: "repeat(7,6rem)", lg: "repeat(7, 8rem)" }
      }
      gap={isLoggedIn ? 4 : { md: 3, lg: 4 }}
    >
      {
        queryCategories.data?.map((each, index) =>
          !queryCategories.isFetched
            ? <Box
              width={isLoggedIn ? "6rem" : { md: "6rem", lg: "8rem" }}
              height={isLoggedIn ? "6rem" : { md: "6rem", lg: "8rem" }}
              boxShadow="md" bg="white" p="1rem" key={index} align="center"
            >
              <SkeletonCircle size="2rem" />
              <SkeletonText mt="0.5rem" noOfLines={2} spacing="1" />
            </Box>
            : <CardCategory
              isLoggedIn={isLoggedIn}
              icon={each.image.path}
              name={each.categories_name}
              onClick={() => router.push(`/daftar-produk?id=${each.categories_id}&nama=${each.categories_name}`)}
              key={each.categories_id}
            />,
        )
      }
    </Grid>
  );
};

export default LayoutCategoryList;
