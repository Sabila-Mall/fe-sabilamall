import { Box, Spinner } from "@chakra-ui/react";
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

import { apiGetSingleOrder } from "../../api/GetOrder";
import MyDocument from "../../components/PDFViewer";
import { useAuthContext } from "../../contexts/authProvider";
import { currencyFormat } from "../../utils/functions";

export default function PDF() {
  const { userData } = useAuthContext();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [detailprice, setDetailprice] = useState([]);

  useEffect(() => {
    if (userData && router.isReady) {
      apiGetSingleOrder(userData.id, router.query.id).then((res) => {
        const d = res.data.data;
        setData(d);
        let subtotal = d.order_price;

        setDetailprice([
          {
            name: "Subtotal Produk",
            price: currencyFormat(subtotal - d.shipping_cost),
          },

          {
            name: "Biaya Pengiriman",
            price: currencyFormat(d.shipping_cost),
          },
          {
            name: "Total Biaya",
            price: currencyFormat(subtotal),
          },
        ]);
      });
    }
  }, [userData, router.isReady]);

  return (
    <Box h="100%">
      {data && detailprice.length > 0 ? (
        <MyDocument
          nomorPesanan={data.orders_number}
          namaPembeli={data.dropship_name}
          telpPembeli={data.dropship_phone}
          waktuPesanan={data.date_purchased}
          namaPenjual={data.billing_name}
          telpPenjual={data.billing_phone}
          data={data.data}
          detailPrice={detailprice}
          alamat={`${data.delivery_street_address} \n ${data.delivery_subdistrict}, ${data.delivery_cityname}\n ${data.delivery_province} ${data.delivery_postcode}`}
        />
      ) : (
        <Spinner />
      )}
    </Box>
  );
}
