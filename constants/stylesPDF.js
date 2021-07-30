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
    width: "50%",
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
    width: "40%",
  },

  hargaSatuan: {
    width: "20%",
    textAlign: "right",
  },
  jumlah: {
    width: "17%",
    textAlign: "center",
  },
  subTotal: {
    width: "23%",
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
