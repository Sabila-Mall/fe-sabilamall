import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

import { dummyDataPDF, detailPricePDF } from "../constants/dummyData";
import { styles } from "../constants/stylesPDF";

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
          <Text style={{ fontSize: "10px" }}>{detail}</Text>
          <Text style={{ fontSize: "10px" }}>Berat: {berat}</Text>
        </>
      ) : (
        <Text>Produk</Text>
      )}
    </View>
    <View style={styles.hargaSatuan}>
      <Text style={{ fontSize: `${isDetail ? "10px" : "12px"}` }}>
        {isDetail ? hargaSatuan : "Harga Satuan"}
      </Text>
    </View>
    <View style={styles.jumlah}>
      <Text>{isDetail ? jumlah : "Jumlah"}</Text>
    </View>
    <View style={styles.subTotal}>
      <Text>{isDetail ? subTotal : "Sub Total"}</Text>
    </View>
  </View>
);

// Create Document Component
const MyDocument = () => (
  <PDFViewer width="100%" height="100%">
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.title}>
            <Text>Nota Pembayaran</Text>
          </View>

          <HeadContent
            textHeadLeft="Nama Pembeli"
            textContentLeft="Kim Jong Un"
            textHeadRight="Nama Penjual"
            textContentRight="Donald Trump"
          />

          <HeadContent
            textHeadLeft="Nomor Telepon Pembeli"
            textContentLeft="012345678910"
            textHeadRight="Nomor Telepon Penjual"
            textContentRight="012345678910"
          />

          <View style={styles.address}>
            <TextHead text="Alamat Pembeli" />
            <Text>
              Jl Kb Kacang Grand Indonesia Shopping Town East Mall Lt Ground 30,
              TANGERANG - CILEDUG, BANTEN, 15148
            </Text>
          </View>

          <HeadContent
            textHeadLeft="Nomor Pemesanan"
            textContentLeft="CSUI2020SKRT"
            textHeadRight="Waktu Pemesanan"
            textContentRight="12 Juli 2021"
          />

          <Text style={[styles.textHead, { marginTop: "32px" }]}>
            Rincian Pesanan
          </Text>

          <View style={styles.detailPesanan}>
            <DetailPesanan />
            {dummyDataPDF.map(({ ...dataDetail }) => (
              <DetailPesanan
                isDetail={true}
                fontWeight="normal"
                {...dataDetail}
              />
            ))}
          </View>
          {detailPricePDF.map(({ id, name, price }) => (
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

export default MyDocument;
