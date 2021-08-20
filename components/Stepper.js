import { Circle, Divider, HStack, Text } from "@chakra-ui/layout";

import styles from "../styles/Footer.module.scss";

// Step: 1 or 2
export const Stepper = ({ step }) => {
  return (
    <HStack
      mt="1rem"
      w="full"
      className={styles.secondaryFont}
      justify={"center"}
    >
      <Circle bg={step === 2 ? "gray.50" : "orange.400"} size={"2rem"}>
        1
      </Circle>
      <Text color={step === 2 ? "gray.500" : "black"}>Alamat penerima</Text>

      <Divider
        orientation="horizontal"
        color={"gray.500"}
        w={{ base: "5%", md: "25%" }}
        mx={"auto"}
      />

      <Circle bg={step === 2 ? "orange.400" : "gray.50"} size={"2rem"}>
        2
      </Circle>
      <Text color={step === 2 ? "black" : "gray.500"}>Detail pesanan</Text>
    </HStack>
  );
};
