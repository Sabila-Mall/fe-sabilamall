import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";
import { IoChevronForwardSharp } from "react-icons/io5";

import styles from "../styles/Layout.module.scss";

export const BreadCrumb = ({ items }) => {
  return (
    <Breadcrumb
      fontWeight={500}
      separator={<IoChevronForwardSharp size="0.75rem" />}
      className={styles.breadcrumb}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>

      {items.map((el) => {
        return (
          <BreadcrumbItem>
            <BreadcrumbLink
              href={el.link}
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
