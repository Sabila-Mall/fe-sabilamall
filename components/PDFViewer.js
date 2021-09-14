import { Box } from "@chakra-ui/react";
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

import { styles } from "../constants/stylesPDF";
import { currencyFormat } from "../utils/functions";

Font.register({
  family: "Noto Serif",
  fonts: [
    { src: "/fonts/NotoSerif-Regular.ttf" }, // font-style: normal, font-weight: normal
    {
      src: "/fonts/NotoSerif-Bold.ttf",
      fontWeight: 700,
    },
  ],
});

const TextHead = ({ text }) => <Text style={styles.textHead}>{text}</Text>;

const HeadContent = ({
  textHeadLeft,
  textContentLeft,
  textHeadRight,
  textContentRight,
}) => (
  <View style={styles.info}>
    <View>
      <TextHead text={textHeadLeft} />
      <Text>{textContentLeft}</Text>
    </View>
    <View style={styles.rightInfo}>
      <TextHead text={textHeadRight} />
      <Text>{textContentRight}</Text>
    </View>
  </View>
);

const DetailPesanan = ({
  fontWeight = "bold",
  isDetail = false,
  name,
  detail,
  berat,
  hargaSatuan,
  jumlah,
  subTotal,
}) => (
  <View style={[styles.flexRow, { fontWeight }]}>
    <View style={styles.produk}>
      {isDetail ? (
        <>
          <Text>{name}</Text>
          <Box style={{ fontSize: "10px" }}>
            {detail?.map(({ products_options, products_options_values }) => {
              return (
                <Text key={products_options}>
                  {products_options}: {products_options_values}
                </Text>
              );
            })}
          </Box>
          <Text style={{ fontSize: "10px" }}>Berat: {berat} gram</Text>
        </>
      ) : (
        <Text>Produk</Text>
      )}
    </View>
    <View style={styles.biayaTambahan}>
      <Text style={{ fontSize: `${isDetail ? "10px" : "12px"}` }}>
        {isDetail ? currencyFormat(biayaTambahan(detail)) : "Biaya Tambahan"}
      </Text>
    </View>
    <View style={styles.hargaSatuan}>
      <Text style={{ fontSize: `${isDetail ? "10px" : "12px"}` }}>
        {isDetail ? currencyFormat(hargaSatuan) : "Harga Satuan"}
      </Text>
    </View>
    <View style={styles.jumlah}>
      <Text>{isDetail ? jumlah : "Jumlah"}</Text>
    </View>
    <View style={styles.subTotal}>
      <Text>{isDetail ? currencyFormat(subTotal) : "Sub Total"}</Text>
    </View>
  </View>
);

// Create Document Component
const MyDocument = ({
  namaPembeli,
  namaPenjual,
  telpPembeli,
  telpPenjual,
  alamat,
  nomorPesanan,
  waktuPesanan,
  data,
  detailPrice,
}) => (
  <PDFViewer width="100%" height="100%">
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.title}>
            <Text>Nota Pembayaran</Text>
          </View>

          <HeadContent
            textHeadLeft="Nama Pengirim"
            textContentLeft={namaPembeli}
            textHeadRight="Nama Penerima"
            textContentRight={namaPenjual}
          />

          <HeadContent
            textHeadLeft="Nomor Telepon Pengirim"
            textContentLeft={telpPembeli}
            textHeadRight="Nomor Telepon Penerima"
            textContentRight={telpPenjual}
          />
          <View style={{ marginBottom: 25, marginTop: 5 }}>
            <HeadContent
              textHeadRight="Alamat Penerima"
              textContentRight={alamat}
            />
          </View>

          <HeadContent
            textHeadLeft="Nomor Pemesanan"
            textContentLeft={nomorPesanan}
            textHeadRight="Waktu Pemesanan"
            textContentRight={waktuPesanan}
          />

          <Text style={[styles.textHead, { marginTop: "32px" }]}>
            Rincian Pesanan
          </Text>

          <View style={styles.detailPesanan}>
            <DetailPesanan />
            {data.map(
              ({
                products_name,
                products_price,
                products_quantity,
                final_price,
                products_weight,
                attributes,
              }) => (
                <DetailPesanan
                  key={products_name}
                  name={products_name}
                  hargaSatuan={products_price}
                  jumlah={products_quantity}
                  subTotal={final_price}
                  berat={products_weight}
                  isDetail={true}
                  fontWeight="normal"
                  detail={attributes}
                />
              ),
            )}
          </View>
          {detailPrice.map(({ id, name, price }) => (
            <View key={id}>
              <View
                style={[
                  styles.flexRowPrice,
                  name === "Total Biaya" && {
                    fontWeight: "bold",
                    fontSize: "12px",
                  },
                ]}
              >
                <Text style={{ width: "20%" }}>{name}</Text>
                <Text style={{ textAlign: "right", width: "20%" }}>
                  {price}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

const biayaTambahan = (detail) => {
  let total = 0;
  detail?.forEach(({ options_values_price }) => {
    total += Number(options_values_price);
  });
  return total;
};

export default MyDocument;
