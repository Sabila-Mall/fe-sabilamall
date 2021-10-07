import {
  Flex,
  Stack,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

import { getSubresellerOrderRecap } from "../../../api/Subreseller";
import { useAuthContext } from "../../../contexts/authProvider";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { currencyFormat } from "../../../utils/functions";
import SubresellerDesktop from "./subreseller-desktop";
import SubresellerMobile from "./subreseller-mobile";

const Subreseller = () => {
  const { userData } = useAuthContext();
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [subResellerData, setSubResellerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowSize();

  const sm = [
    { text: "SM Pay", value: currencyFormat(userData?.memberdeposit) },
    { text: "SM Point", value: userData?.smpoint },
  ];

  useEffect(() => {
    if (userData?.id) {
      setLoading(true);
      setError("");
      getSubresellerOrderRecap(userData?.id)
        .then((res) => {
          let values = res.data.data.reseller_order;
          let tempSubreseller = [];
          for (let i = 0; i < values.length; i++) {
            tempSubreseller.push({
              memberId: values[i].memberid,
              nama: values[i].name,
              jumlah: currencyFormat(values[i].omset),
            });
          }
          setSubResellerData(tempSubreseller);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
          setError("Gagal mendapatkan data");
        });
      setLoading(false);
    }
  }, [userData]);

  if (width > 528) {
    return (
      <SubresellerDesktop
        sm={sm}
        search={search}
        setSearch={setSearch}
        subResellerData={subResellerData}
        loading={loading}
        error={error}
      />
    );
  } else {
    return (
      <SubresellerMobile
        sm={sm}
        search={search}
        setSearch={setSearch}
        subResellerData={subResellerData}
        loading={loading}
        error={error}
      />
    );
  }
};

export default Subreseller;
