import { Box, Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";

import styles from "../styles/Layout.module.scss";
import BreadCrumb from "./Breadcrumb";
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
  sticky,
  noFooter,
  hasPadding,
  background,
  display,
  pt,
  noMaxWidth,
}) => {
  return (
    <>
      <Flex
        display={display ? display : "flex"}
        bg={background}
        minH="100%"
        direction="column"
        alignItems="center"
        justifyItems="center"
        className={sticky ? styles.stickLayout : styles.layout}
        pt={pt ? pt : hasNavbar && { base: "70px", md: "90px" }}
        pb="2rem"
      >
        {hasNavbar && <Navbar />}
        {hasBreadCrumb && (
          <BreadCrumb
            px={{ base: "1rem", md: "1.5rem", lg: "3rem", xl: "50px" }}
            items={breadCrumbItem}
          />
        )}
        <Box
          w="full"
          d="flex"
          flexDirection="column"
          justifyContent="center"
          maxWidth={!noMaxWidth && "1440px"}
          pt="1rem"
          px={
            hasPadding
              ? { base: "1rem", md: "1.5rem", lg: "3rem", xl: "50px" }
              : "0"
          }
        >
          {children}
        </Box>
      </Flex>
      {!noFooter && <Footer />}
    </>
  );
};

Layout.propTypes = {
  hasNavbar: PropTypes.bool,
  hasBreadCrumb: PropTypes.bool,
  breadCrumbItem: PropTypes.object,
  hasFooter: PropTypes.bool,
  sticky: PropTypes.bool,
  noFooter: PropTypes.bool,
  hasPadding: PropTypes.bool,
  background: PropTypes.string,
  display: PropTypes.string,
};
