import { Box, Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";

const Pagination = ({ lastPage, currPage, setCurrPage, range, setRange }) => {
  const [pageCount, setPagecount] = useState([]);
  const [leftArrow, setLeftArrow] = useState(true);
  const [rightArrow, setRightArrow] = useState(true);

  useEffect(() => {
    setPagecount(
      Array(lastPage)
        .fill()
        .map((_, idx) => idx + 1),
    );
  }, [lastPage]);

  useEffect(() => {
    if (currPage === 1) {
      setLeftArrow(false);
    } else {
      setLeftArrow(true);
    }
    if (currPage === lastPage || lastPage === 1 || lastPage === 0) {
      setRightArrow(false);
    } else {
      setRightArrow(true);
    }
  }, [currPage, lastPage]);

  useEffect(() => {
    setRange(pageCount.slice(currPage - 1, currPage + 4));
  }, [pageCount]);

  const onClickPagination = (element) => {
    setCurrPage(element);
  };
  return (
    <Box>
      <Flex>
        {leftArrow && (
          <Flex
            onClick={() => {
              if (currPage !== 1 && currPage % 5 === 1) {
                setRange(pageCount.slice(currPage - 6, currPage - 1));
              }
              setCurrPage(currPage - 1);
            }}
            cursor="pointer"
            align="center"
            justify="center"
            border="1.5px solid #CBD5E0"
            width="1.5rem"
            height="1.5rem"
            _hover={{ bg: "red.500", color: "white" }}
          >
            {"<"}
          </Flex>
        )}
        {range.map((element) => {
          return (
            <Flex
              onClick={() => {
                onClickPagination(element);
              }}
              cursor="pointer"
              align="center"
              justify="center"
              border="1.5px solid #CBD5E0"
              width="1.5rem"
              height="1.5rem"
              color={currPage === element && "white"}
              bg={currPage === element && "red.500"}
              _hover={{ bg: "red.500", color: "white" }}
            >
              {element}
            </Flex>
          );
        })}
        {rightArrow && (
          <Flex
            onClick={() => {
              if (currPage !== 1 && currPage % 5 === 0) {
                setRange(pageCount.slice(currPage, currPage + 5));
              }
              setCurrPage(currPage + 1);
            }}
            cursor="pointer"
            align="center"
            justify="center"
            border="1.5px solid #CBD5E0"
            width="1.5rem"
            height="1.5rem"
            _hover={{ bg: "red.500", color: "white" }}
          >
            {">"}
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Pagination;
