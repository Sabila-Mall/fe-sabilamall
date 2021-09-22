import { getImageLink } from "../functions";

export const fetchingStock = (product, supplierName) => {
  let stocksPush = {
    productId: product.id,
    img: getImageLink(product.image_path),
    nama: product.name,
    supplier: supplierName,
    tag: product.jenis,
  };
  return stocksPush;
};
