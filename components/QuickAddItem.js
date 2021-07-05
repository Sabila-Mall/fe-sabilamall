import { Button, HStack, IconButton, Input, Text, VStack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";

const QuickAddItem = ({ product }) => {
  return (
    <VStack>
      <HStack>
        <Image
          src={product.image}
          alt="Product Image"
        />

        <VStack>
          <Text isTruncated>{product.name}</Text>
          <Text>Diskon {product.discount}%</Text>
        </VStack>

        <IconButton aria-label={"delete"} />
      </HStack>

      <HStack>
        <HStack>
          <Button>Minus</Button>
          <Input />
          <Button>Plus</Button>
        </HStack>

        <Text>Harga</Text>
      </HStack>
    </VStack>
  );
};

export default QuickAddItem;