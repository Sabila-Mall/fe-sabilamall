import { Box } from "@chakra-ui/react";

import styles from "../styles/Layout.module.scss";
import { BreadCrumb } from "./Breadcrumb";
import Footer from "./Footer";
import Navbar from "./Navbar";

// Untuk props berupa hasNavbar, hasBreadCrumb, hasFooter -> Punya navbar, punya breadcrumb?
// Untuk passing breadcrumb berupa array of object, defaultnya udah ada home, jadi kalo nambahin bakal jadi Home > ... > dst
// contoh passing props breadcrumb: breadCrumbItem = [{name: "Kontak Kami", link: "https://google.com", isOnPage}]
// isOnPage untuk jadi penanda  active page di breadCrumbnya

export const Layout = ({
  hasNavbar,
  children,
  hasBreadCrumb,
  breadCrumbItem,
  hasFooter,
}) => {
  return (
    <>
      <Box
        className={styles.layout}
        pt={{ base: "70px", md: "90px" }}
        pb={hasNavbar && "65px"}
      >
        {hasNavbar && <Navbar />}
        <Box mx={["1rem", "3rem", "2rem", "2rem", "5rem", "7.5rem"]}>
          {hasBreadCrumb && <BreadCrumb items={breadCrumbItem} />}
          {children}
        </Box>
      </Box>
      <Footer />
    </>
  );
};
