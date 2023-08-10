import { getImageLink } from "../functions";

export const fetchingStock = (product, supplierName) => {
  let stocksPush = {
    productId: product.products_id,
    productSlug: product.products_slug,
    img: getImageLink(product?.products_image?.actual),
    nama: product.name,
    supplier: supplierName,
    tag: product.jenis,
  };
  return stocksPush;
};
