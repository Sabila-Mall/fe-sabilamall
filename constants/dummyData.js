export const dataFlashSale = [];
export const dataDiscount = [];
export const dataNormal = [];

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

for (let i = 0; i <= 17; i++) {
  dataFlashSale.push({ ...flashSaleProduct, id: `fs${i}` });
  dataDiscount.push({ ...discountProduct, id: `ds${i}` });
  dataNormal.push({ ...product, id: `dn${i}` });
}
