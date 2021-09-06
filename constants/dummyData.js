export const dataFlashSale = [];
export const dataDiscount = [];
export const dataNormal = [];
export const dataWishList = [];

const endTime = new Date();
endTime.setHours(endTime.getHours() + 10);

const product = {
  name: "Alea Casual Gamis Banget",
  image_path: "/images/product.png",
  price: "180000",
};

const flashSaleProduct = {
  endTime,
  discount: 10,
  ...product,
};

const discountProduct = {
  ...product,
  discount: 10,
};

// get tiap kali refresh page wishlist
const wishList = {
  ...product,
  discount: 10,
  remainingDays: 5,
};

for (let i = 0; i <= 17; i++) {
  dataFlashSale.push({ ...flashSaleProduct, id: `fs${i}` });
  dataDiscount.push({ ...discountProduct, id: `ds${i}` });
  dataNormal.push({ ...product, id: `dn${i}` });
  // dataWishList.push({ ...wishList, id: `dw${i}` });
}

export const productList = [
  {
    name: "Nama Produk Croissant Jujubes Sweet Sweet Powder Tiramisu Caramels",
    image: "/images/QuickAdd/product-image.png",
    price: 99999999,
    discount: 99,
  },
  {
    name: "Nama Produk Croissant Jujubes Sweet Sweet Powder Tiramisu Caramels",
    image: "/images/QuickAdd/product-image.png",
    price: 99999999,
    discount: 99,
  },
  {
    name: "Nama Produk Croissant Jujubes Sweet Sweet Powder Tiramisu Caramels",
    image: "/images/QuickAdd/product-image.png",
    price: 99999999,
    discount: 99,
  },
];

export const dataPengirim = {
  nama: "Tatang Sutarman",
  nomorHandphone: "085555555555",
};

export const dataPenerima = {
  nama: "Hendra Setiawan Indradjaja ",
  nomorHandphone: "085555555555",
  alamat:
    "Jl Kb Kacang Grand Indonesia Shopping Town East Mall Lt Ground 30, TANGERANG - CILEDUG, BANTEN, 15148",
};

export const daftarProduk = [
  {
    id: "1",
    gambar: "/images/produk.svg",
    nama: "Nama Produk Croissant",
    deskripsi: "Lengan panjang, merah cabe, XXXXXL",
    berat: 1000,
    diskon: 25,
    harga: 10000,
    jumlah: 2,
  },
  {
    id: "2",
    gambar: "/images/produk.svg",
    nama: "Nama Produk Croissant",
    deskripsi: "Lengan panjang, merah cabe, XXXXXL",
    berat: 1000,
    diskon: 99,
    harga: 99999999,
    jumlah: 999,
  },
  {
    id: "3",
    gambar: "/images/produk.svg",
    nama: "Nama Produk Croissant",
    deskripsi: "Lengan panjang, merah cabe, XXXXXL",
    berat: 1000,
    diskon: 99,
    harga: 99999999,
    jumlah: 999,
  },
];

export const daftarMetodePembayaran = [
  {
    id: "bank",
    nama: "Transfer Bank",
    biaya: 4000,
  },
  {
    id: "deposit",
    nama: "Deposit",
    biaya: 3000,
  },
  {
    id: "cod",
    nama: "Cash On Delivery (COD)",
    biaya: 20,
  },
  {
    id: "gopay",
    nama: "Go-Pay",
    biaya: 4000,
  },
  {
    id: "alfamart",
    nama: "Alfamart",
    biaya: 10000,
  },
];

export const dataSummary = {
  jumlah: 9999999,
  berat: 1000000,
  subtotal: 99999999,
  diskon: 99999999,
  pengiriman: 99999999,
  tambahan: 4000,
  voucher: 99999999,
};

export const dummyDataPDF = [
  {
    id: "pou1",
    name: "Lamborghini",
    detail: "Warna merah, ada 2 pintu, Xl",
    berat: "220kg",
    hargaSatuan: "Rp12.000.000.000",
    jumlah: 2,
    subTotal: "Rp12.000.000.000.000",
  },
  {
    id: "pou2",
    name: "Lamborghini",
    detail: "Warna merah, ada 2 pintu, Xl",
    berat: "220kg",
    hargaSatuan: "Rp12.000.000.000",
    jumlah: 2,
    subTotal: "Rp12.000.000.000.000",
  },
  {
    id: "pou3",
    name: "Lamborghini",
    detail: "Warna merah, ada 2 pintu, Xl",
    berat: "220kg",
    hargaSatuan: "Rp12.000.000.000",
    jumlah: 2,
    subTotal: "Rp12.000.000.000.000",
  },
  {
    id: "pou4",
    name: "Lamborghini",
    detail: "Warna merah, ada 2 pintu, Xl",
    berat: "220kg",
    hargaSatuan: "Rp12.000.000.000",
    jumlah: 2,
    subTotal: "Rp12.000.000.000.000",
  },
];

export const detailPricePDF = [
  { id: "pr12", name: "Subtotal Produk", price: "Rp999.999.999" },
  { id: "pr14", name: "Biaya Pengiriman", price: "Rp123.456.789" },
  { id: "pr15", name: "Biaya Tambahan", price: "Rp0" },
  { id: "pr16", name: "Total Biaya", price: "Rp999.999.999" },
];
