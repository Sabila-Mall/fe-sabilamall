import { Grid, Box } from "@chakra-ui/react";
import Slider from "react-slick";
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
      {isLoggedIn && (
        <Grid templateColumns="repeat(7, 6rem)" gap={5}>
          {category.map((cat) => {
            return (
              <CardCategory
                icon={cat[0]}
                name={cat[1]}
                onClick={() => console.log(`redirect ke ${cat[1]}`)}
                key={cat[1]}
              />
            );
          })}
        </Grid>
      )}
      {!isLoggedIn && (
        // <Slider {...settings}>
        //   {category.map((cat) => {
        //     return (
        //       <CardCategory
        //         icon={cat[0]}
        //         name={cat[1]}
        //         onClick={() => console.log(`redirect ke ${cat[1]}`)}
        //         key={cat[1]}
        //       />
        //     );
        //   })}
        // </Slider>
        <></>
      )}
    </>
  );
};

export default LayoutCategoryList;
