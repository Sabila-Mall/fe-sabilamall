import { FaUser } from "react-icons/fa";

import { useHomePageContext } from "../contexts/homepageProvider";

export const menuSidebar = {
  headerText: "Menu",
  menu: [
    { text: "Kategori - Brand", id: "kb", href: "#" },
    { text: "Mengenal SabilaMall", id: "ms", href: "/about-us" },
    { text: "Gabung Reseller Baju Murah", id: "grbm", href: "/join-reseller" },
    { text: "Kebijakan Privasi", id: "kp", href: "/privacy-policy" },
    { text: "Syarat & Ketentuan", id: "sk", href: "/terms-and-conditions" },
    { text: "Hubungi Kami", id: "hk", href: "/contact-us" },
    { text: "Stok Barang", id: "sb", href: "/stok" },
    { text: "Keluar", id: "kl" },
    {
      text: "Download Aplikasi",
      id: "dagp",
      href:
        "https://play.google.com/store/apps/details?id=id.co.sabilamall.sm_app",
    },
  ],
};

export const menuCategory = ({ category }) => {
  return {
    headerText: "Kategori - Brand",
    menu: category,
  };
};
