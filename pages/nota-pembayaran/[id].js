import { Box, Spinner } from "@chakra-ui/react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

import { apiGetOrderCustomer } from "../../api/GetOrder";
import { useAuthContext } from "../../contexts/authProvider";
import { currencyFormat } from "../../utils/functions";

const PDFViewer = dynamic(() => import("../../components/PDFViewer"), {
  ssr: false,
});

export default function PDF() {
  const { userData } = useAuthContext();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [detailprice, setDetailprice] = useState([]);

  useEffect(() => {
    if (userData) {
      apiGetOrderCustomer(userData.id, router.query.id).then((res) => {
        const d = res.data[0];
        setData(d);
        let subtotal = 0;
        d.data.forEach(({ final_price }) => {
          subtotal += final_price;
        });
        setDetailprice([
          {
            name: "Subtotal Produk",
            price: currencyFormat(subtotal),
          },

          {
            name: "Biaya Pengiriman",
            price: currencyFormat(d.shipping_cost),
          },
          {
            name: "Total Diskon",
            price: currencyFormat(subtotal + d.shipping_cost - d.order_price),
          },
          {
            name: "Total Biaya",
            price: currencyFormat(d.order_price),
          },
        ]);
      });
    }
  }, [userData]);

  return (
    <Box h="100%">
      {data && detailprice.length > 0 ? (
        <PDFViewer
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
