import { Box } from "@chakra-ui/react";
import Head from "next/head";

import CardProduct from "../components/CardProduct";
import FlashSale from "../components/FlashSale";
import { Layout } from "../components/Layout";
import {
  dataNormal,
  dataFlashSale,
  dataDiscount,
} from "../constants/dummyData";
import styles from "../styles/Home.module.scss";

export default function Home() {
  console.log(dataNormal);
  return (
    <>
      <Layout hasNavbar={true} hasBreadCrumb={false}>
        {dataNormal.map((item) => (
          <CardProduct {...item} />
        ))}
        {dataFlashSale.map((item) => (
          <CardProduct {...item} />
        ))}
        {dataDiscount.map((item) => (
          <CardProduct {...item} />
        ))}
        {/* <FlashSale data={dataFlashSale} /> */}
      </Layout>
    </>
  );
}
