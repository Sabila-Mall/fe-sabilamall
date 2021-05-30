export const dataFlashSale = [];
export const dataDiscount = [];
export const dataNormal = [];
export const dataWishList = [];

const product = {
  productName: "Alea Casual Gamis Banget",
  imageUrl: "/images/product.png",
  realPrice: 180000,
};

const flashSaleProduct = {
  remainingDays: 5,
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
