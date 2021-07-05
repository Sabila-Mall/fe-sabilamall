import { Button, Text } from "@chakra-ui/react";
import React from "react";
import QuickAddItem from "./QuickAddItem";

const QuickAddListItem = ({ products }) => {
  if (products.length > 0) {
    return (
      products.map((product, index) =>
        <QuickAddItem key={index} product={product}/>,
      ));
  } else {
    return (
      <>
        <Text>Keranjang belanja Anda masih kosong.</Text>
        <Button>Kembali Belanja</Button>
      </>
    );
  }
};

export default QuickAddListItem;