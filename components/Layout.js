import { Box } from "@chakra-ui/react";

import styles from "../styles/Layout.module.scss";
import { BreadCrumb } from "./Breadcrumb";
import Navbar from "./Navbar";

// Untuk props berupa hasNavbar & hasBreadCrumb -> Punya navbar, punya breadcrumb?
// Untuk passing breadcrumb berupa array of object, defaultnya udah ada home, jadi kalo nambahin bakal jadi Home > ... > dst
// contoh passing props breadcrumb: breadCrumbItem = [{name: "Kontak Kami", link: "https://google.com", isOnPage}]
// isOnPage untuk jadi penanda  active page di breadCrumbnya

export const Layout = ({
  hasNavbar,
  children,
  hasBreadCrumb,
  breadCrumbItem,
}) => {
  return (
    <>
      <Box className={styles.layout}>
        {hasNavbar && <Navbar />}
        <Box mx={["2rem", "3rem", "2rem", "2rem", "5rem", "7.5rem"]}>
          {hasBreadCrumb && <BreadCrumb items={breadCrumbItem} />}
          {children}
        </Box>
      </Box>
    </>
  );
};
