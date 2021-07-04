import { Input } from "@chakra-ui/input";
import { Box, HStack, Text, Flex } from "@chakra-ui/layout";
import { css } from "@emotion/react";
import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

export const AddAmount = ({ setTotal, price, total }) => {
  const [amount, setAmount] = useState(1);

  const prices = parseInt(price.replace(/\./g, ""));

  return (
    <Flex justifyContent="center">
      <HStack w="8rem" alignItems="center" justifyContent={{ lg: "center" }}>
        <Box
          css={css`
            :hover {
              cursor: pointer;
            }
          `}
        >
          <AiOutlineMinusCircle
            color="#E2E8F0"
            size="1.5em"
            onClick={() => {
              if (amount > 0) setAmount(amount - 1);
              setTotal(prices * amount);
            }}
          />
        </Box>

        <Input
          color="black"
          textAlign="center"
          isDisabled
          variant="outline"
          w="5.5rem"
          h="2rem"
          placeholder={String(amount)}
        />
        <Box
          css={css`
            :hover {
              cursor: pointer;
            }
          `}
        >
          <AiOutlinePlusCircle
            color="#A0AEC0"
            size="1.5em"
            onClick={() => {
              setAmount(amount + 1);
              setTotal(prices * amount);
            }}
          />
        </Box>
      </HStack>
    </Flex>
  );
};
