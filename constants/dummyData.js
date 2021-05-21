export const dataFlashSale = [];
export const dataDiscount = [];
export const dataNormal = [];

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

for (let i = 0; i <= 17; i++) {
  dataFlashSale.push(flashSaleProduct);
  dataDiscount.push(discountProduct);
  dataNormal.push(product);
}
