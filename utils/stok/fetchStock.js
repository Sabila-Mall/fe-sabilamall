import { getImageUrl } from "../../utils/api";

export const fetchingStock = (product, supplierName) => {
  let stocksPush = {
    productId: product.id,
    img: getImageUrl(product.image_path),
    nama: product.name,
    supplier: supplierName,
    tag: product.jenis,
  };
  return stocksPush;
};
