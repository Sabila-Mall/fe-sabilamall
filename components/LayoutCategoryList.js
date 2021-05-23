import { Grid, Box, Text } from "@chakra-ui/react";
import { BsGridFill } from "react-icons/bs";

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
              {moreCategory.map((cat) => {
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
          {category.map((cat) => {
            return (
              <CardCategory
                icon={cat[0]}
                name={cat[1]}
                onClick={() => console.log(`redirect ke ${cat[1]}`)}
              />
            );
          })}
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
