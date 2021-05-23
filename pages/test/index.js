import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsWatch } from "react-icons/bs";

import CardCategory from "../../components/CardCategory";
import SMCard from "../../components/SMCard";

const Test = () => {
  return (
    <div>
      <SMCard />
      <CardCategory
        icon={BsWatch}
        name="Fashion Muslim"
        onClick={() => openModal()}
      />
    </div>
  );
};

export default Test;
