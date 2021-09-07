import { ArrowUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    toggleVisible();
  }, []);

  window.addEventListener("scroll", toggleVisible);
  return (
    <IconButton
      colorScheme="orange"
      isRound={true}
      icon={<ArrowUpIcon />}
      pos="fixed"
      right="2rem"
      bottom="5rem"
      onClick={scrollToTop}
      style={{ display: visible ? "inline" : "none" }}
    />
  );
};

export default ScrollButton;
