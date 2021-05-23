import { Grid, Box, Text, Icon } from "@chakra-ui/react";
import { BsWatch, BsGridFill } from "react-icons/bs";
import { FaPizzaSlice, FaStethoscope } from "react-icons/fa";

import CardCategory from "./CardCategory";

const LayoutCategoryList = ({ moreCategory, title, category, onOpen }) => {
  return (
    <>
      {moreCategory && (
        <Box w="100%" d="flex" flexDirection="row" marginTop="1.5rem">
          <Box w="25%" d="flex" alignItems="center">
            <Text className="secondaryFont" fontWeight="500" fontSize="1.5rem">
              {title}
            </Text>
          </Box>
          <Box w="75%">
            <Grid templateColumns="repeat(5, 8rem)" gap={5}>
              {category.map((cat) => {
                return (
                  <CardCategory
                    icon={cat[0]}
                    name={cat[1]}
                    onClick={() => console.log(`redirect ke ${cat[1]}`)}
                  />
                );
              })}
            </Grid>
          </Box>
        </Box>
      )}
      {!moreCategory && (
        <Grid templateColumns="repeat(5, 10rem)" gap={0}>
          <CardCategory
            icon={BsWatch}
            name="Fashion Muslim"
            onClick={() => console.log("redirect ke fashion muslim")}
          />
          <CardCategory
            icon={FaPizzaSlice}
            name="Makanan dan Minuman"
            onClick={() => console.log("redirect ke makanan dan minuman")}
          />
          <CardCategory
            icon={BsWatch}
            name="Perlengkapan Ibadah"
            onClick={() => console.log("redirect ke perlengkapan ibadah")}
          />
          <CardCategory
            icon={FaStethoscope}
            name="Kesehatan"
            onClick={() => console.log("redirect ke kesehatan")}
          />
          <CardCategory
            icon={BsGridFill}
            name="Kategori Lainnya"
            onClick={() => onOpen()}
          />
        </Grid>
      )}
    </>
  );
};

export default LayoutCategoryList;
