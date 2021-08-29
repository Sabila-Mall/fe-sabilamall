import { StyleSheet } from "@react-pdf/renderer";

// Create styles
export const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
    fontFamily: "Noto Serif",
  },
  section: {
    margin: 17,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "20px",
    marginBottom: "32px",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: "12px",
    marginBottom: "8px",
  },

  rightInfo: {
    width: "45%",
  },

  textHead: {
    fontWeight: "bold",
    fontSize: "12px",
  },

  address: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "red",
    fontSize: "12px",
    marginBottom: "32px",
  },

  detailPesanan: {
    fontSize: "12px",
    marginBottom: "32px",
  },

  flexRow: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: "14px",
    paddingTop: "14px",
    borderBottom: "0.25px",
  },

  produk: {
    width: "30%",
  },

  biayaTambahan: {
    width: "20%",
    textAlign: "center",
  },

  hargaSatuan: {
    width: "20%",
    textAlign: "center",
  },
  jumlah: {
    width: "10%",
    textAlign: "center",
  },
  subTotal: {
    width: "20%",
    textAlign: "right",
  },

  flexRowPrice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    fontSize: "10px",
    marginBottom: "8px",
  },
});
