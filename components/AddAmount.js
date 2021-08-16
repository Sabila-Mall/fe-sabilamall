import { Input } from "@chakra-ui/input";
import { Box, HStack, Text, Flex } from "@chakra-ui/layout";
import { css } from "@emotion/react";
import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

export const AddAmount = ({ setTotal, price, total, maxQuantity }) => {
  const [amount, setAmount] = useState(1);

  const prices = parseInt(price?.replace(/\./g, ""));

  return (
    <>
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
              color={amount === 1 ? "#E2E8F0" : "#A0AEC0"}
              size="1.5em"
              onClick={() => {
                if (amount > 1) setAmount(amount - 1);
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
              color={amount === maxQuantity ? "#E2E8F0" : "#A0AEC0"}
              size="1.5em"
              onClick={() => {
                if (amount < maxQuantity) {
                  setAmount(amount + 1);
                  setTotal(prices * amount);
                }
              }}
            />
          </Box>
        </HStack>
      </Flex>
      <Text
        fontSize="0.75rem"
        textAlign="center"
        color="gray.400"
        fontWeight="500"
        _hover={{
          cursor: "pointer",
        }}
      >
        Hapus
      </Text>
    </>
  );
};
