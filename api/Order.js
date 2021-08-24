import axios from "axios";

// export const placeOrder = (
//   vendorId,
//   customerBasketId,
//   destination,
//   customerId,
//   deliveryId,
//   dropshipperId,
//   paymentMethod,
//   paymentDesc,
//   isCouponApplied,
//   coupons,
//   couponAmount,
//   orderNote,
//   appVersion,
//   paymentAddCostMethod,
//   paymentAddCostValue,
// ) => {
//   return axios.post("https://api.sabilamall.co.id/api/order/place_order", {
//     dataorder: [
//       {
//         vendors_id: 425,
//         customers_basket_id: [115859, 115860],
//         destination:
//           "JNE | OKE19 | 2 - 3 D | cityid: 179,destinationid: 185,servicecode: OKE19,servicedisplay: OKE,type: Document / Paket,currency: IDR,price: 10000,est: 2 - 3 D | 10000 | Jawa Barat | Kota Depok | DEPOK | 179 | Kota BANDUNG | 40111 | 425 | 343 | Bandung Kidul",
//       },
//     ],
//     customers_id: 6917,
//     delivery_id: 7597,
//     dropshipper_id: 7982,
//     payment_method: "transferbank",
//     payment_desc: "BCA - 8691879542",
//     is_coupon_applied: 0,
//     coupons: {},
//     coupon_amount: 0,
//     order_notes: "",
//     app_version: "1.0.2",
//     payment_addcostmethod: "",
//     payment_addcostvalue: 0,
//   });
// };

export const getKurir = (
  customerId,
  postCode,
  cityId,
  zoneId,
  subDistrictId,
  subSubDistrictId,
  weight,
  vendorId,
  vendorOrigin,
) => {
  return axios.post(
    "https://apiweb.sabilamall.co.id/api/shipping/get_all_shipping",
    // {
    //   customers_id: customerId,
    //   countries_id: 100,
    //   postcode: postCode,
    //   city_id: cityId,
    //   zone_id: zoneId,
    //   subdistrict_id: subDistrictId,
    //   subsubdistrict_id: subSubDistrictId,
    //   language_id: 1,
    //   currency_code: "IDR",
    //   weight: weight,
    //   vendors_id: vendorId,
    //   vendors_origin: vendorOrigin,
    // },
    {
      customers_id: 3,
      countries_id: 100,
      postcode: 16918,
      city_id: 78,
      zone_id: 190,
      subdistrict_id: 1028,
      subsubdistrict_id: 8188,
      language_id: 1,
      currency_code: "IDR",
      weight: 200,
      vendors_id: 939,
      vendors_origin: 115,
    },
  );
};
