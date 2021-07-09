import { Grid } from "@chakra-ui/react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import CardCategory from "./CardCategory";

const LayoutCategoryList = ({ isLoggedIn, category }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <>
      <Grid
        templateColumns={
          isLoggedIn
            ? "repeat(7, 6rem)"
            : { md: "repeat(7,6rem)", lg: "repeat(7, 8rem)" }
        }
        gap={4}
      >
        {category.map((cat) => {
          return (
            <CardCategory
              isLoggedIn={isLoggedIn}
              icon={cat[0]}
              name={cat[1]}
              onClick={() => console.log(`redirect ke ${cat[1]}`)}
              key={cat[1]}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default LayoutCategoryList;
