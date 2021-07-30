export const dataFlashSale = [];
export const dataDiscount = [];
export const dataNormal = [];
export const dataWishList = [];

const endTime = new Date();
endTime.setHours(endTime.getHours() + 10);

const product = {
  productName: "Alea Casual Gamis Banget",
  imageUrl: "/images/product.png",
  realPrice: 180000,
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
  dataWishList.push({ ...wishList, id: `dw${i}` });
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
