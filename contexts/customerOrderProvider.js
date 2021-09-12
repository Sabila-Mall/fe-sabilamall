import { useToast } from "@chakra-ui/toast";
import { createContext, useContext, useEffect, useState } from "react";

import { apiGetOrder, apiSearchOrder } from "../api/GetOrder";
import { useAuthContext } from "./authProvider";

const MyOrderContext = createContext();

export const MyOrderProvider = ({ children }) => {
  const { userData } = useAuthContext();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [fetchOrder, setFetchOrder] = useState(false);
  const [cacheData, setCacheData] = useState([]);
  const [searchCache, setSearchCache] = useState([]);
  const [searchState, setSearchState] = useState(false);
  const [lastPage, setLastPage] = useState(0);
  const [refetch, setRefetch] = useState(false);
  const [tidakDitemukan, setTidakDitemukan] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (userData != null) {
      if (refetch) {
        const d = apiGetOrder(userData?.id, currentPage);
        d.then((res) => {
          cacheData[currentPage - 1] = res.data;
          setData(res.data);
        }).finally(() => {
          setRefetch(false);
          setLoading(false);
        });
      } else {
        if (cacheData.length > currentPage - 1) {
          setData(cacheData[currentPage - 1]);
          setLoading(false);
        } else {
          const d = apiGetOrder(userData?.id, currentPage);
          d.then((res) => {
            setLastPage(res.last_page);
            setCacheData((curr) => [...curr, res.data]);
            setData(res.data);
            setLoading(false);
          });
        }
      }
    }
  }, [userData, currentPage, refetch]);

  useEffect(() => {
    if (fetchOrder) {
      setLoading(true);
      setTidakDitemukan(false);
      const filter = searchCache.filter(
        (el) => el.orders_id === Number(orderId),
      );
      if (filter.length > 0) {
        setData(filter);
        setSearchState(true);
        setTimeout(() => {
          setLoading(false);
          setFetchOrder(false);
        }, 300);
      } else {
        const d = apiSearchOrder(userData?.id, orderId);
        d.then((res) => {
          if (res.data.success) {
            setData([res.data.data]);
            setSearchCache((curr) => [...curr, res.data.data]);
            setSearchState(true);
          } else {
            setTidakDitemukan(true);
            setSearchState(true);
          }
          setLoading(false);
          setFetchOrder(false);
        });
      }
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const value = {
    data,
    setData,
    loading,
    setLoading,
    orderId,
    setOrderId,
    setFetchOrder,
    currentPage,
    setCurrentPage,
    cacheData,
    searchState,
    setSearchState,
    lastPage,
    refetch,
    setRefetch,
    tidakDitemukan,
    setTidakDitemukan,
  };

  return (
    <MyOrderContext.Provider value={value}>{children}</MyOrderContext.Provider>
  );
};

export const useMyOrderContext = () => {
  return useContext(MyOrderContext);
};
