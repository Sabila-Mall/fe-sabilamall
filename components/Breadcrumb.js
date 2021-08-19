import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";
import { useRouter } from "next/router";
import { IoChevronForwardSharp } from "react-icons/io5";

import styles from "../styles/Layout.module.scss";

const BreadCrumb = ({ items, px }) => {
  const router = useRouter();

  return (
    <Breadcrumb
      maxWidth="1440px"
      w="full"
      fontWeight={500}
      separator={<IoChevronForwardSharp size="0.75rem" />}
      className={styles.breadcrumb}
      px={px}
    >
      <BreadcrumbItem>
        <BreadcrumbLink
          onClick={(e) => {
            e.preventDefault();
            router.push("/");
          }}
        >
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>

      {items.map((el, index) => {
        return (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink
              onClick={(e) => {
                e.preventDefault();
                router.push(el.link);
              }}
              color={el.isOnPage ? "orange.400" : "black"}
              fontWeight={el.isOnPage && "700"}
            >
              {el.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};
export default BreadCrumb;
