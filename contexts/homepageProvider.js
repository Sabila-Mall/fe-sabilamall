import { useToast } from "@chakra-ui/toast";
import { createContext, useContext, useEffect, useState } from "react";

import { getBanner, getCategory, getDiscountProducts, getFlashSaleProducts, getProducts, getAllProductsByFilters } from "../api/Homepage";
import { isRequestSuccess } from "../utils/api";
import { useAuthContext } from "./authProvider";

const HomepageContext = createContext();

export const HomepageProvider = ({ children }) => {
  const auth = useAuthContext();
  const userId = auth.userData?.id;
  const userLevel = auth.userData?.user_level;
  const adminId = auth.userData?.admin_id;
  const isLoggedIn = auth.isLoggedIn;
  const authIsLoading = auth.loading;

  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState({
    data: new Array(8).fill(0),
    loading: true,
    currentPage: 1,
    lastPage: Number.MAX_SAFE_INTEGER,
  });

  const [flashSaleProducts, setFlashSaleProducts] = useState({
    data: new Array(8).fill(0),
    loading: true,
    currentPage: 1,
    lastPage: Number.MAX_SAFE_INTEGER,
  });

  const [discountProducts, setDiscountProducts] = useState({
    data: new Array(8).fill(0),
    loading: true,
    currentPage: 1,
    lastPage: Number.MAX_SAFE_INTEGER,
  });

  const [instalmentProducts, setInstalmentProducts] = useState({
    data: new Array(8).fill(0),
    loading: true,
    currentPage: 1,
    lastPage: Number.MAX_SAFE_INTEGER,
  });

  const [banner, setBanner] = useState({
    data: [],
    loading: true,
  });
  const [category, setCategory] = useState({
    data: new Array(13).fill(0),
    loading: true,
  });

  const toast = useToast();
  const errorToast = (errMessage) => {
    toast({
      position: "top",
      title: errMessage,
      status: "error",
      isClosable: true,
    });
  };

  useEffect(() => {
    !authIsLoading && getAllProductsByFilters(1, userId, 'flash_sale', null, null, null, 0, 999999999, 10)
      .then((res) => {
        if (isRequestSuccess(res.data)) {
          setFlashSaleProducts({
            data: res.data.data.data ?? [],
            loading: false,
            currentPage: 1,
            lastPage: res.data.data.last_page,
          });
        } else {
          throw "Gagal mendapatkan produk flash sale";
        }
      })
      .catch((err) => {
        console.error(err);
        errorToast(err);
        setFlashSaleProducts({
          data: [],
          loading: false,
          ...flashSaleProducts,
        });
      });

  }, [authIsLoading, userLevel]);

  useEffect(() => {
    !authIsLoading && getAllProductsByFilters(1, userId, 'instalment', null, null, null, 0, 999999999, 10)
      .then((res) => {
        if (isRequestSuccess(res.data)) {
          setInstalmentProducts({
            data: res.data.data.data ?? [],
            loading: false,
            currentPage: 1,
            lastPage: res.data.data.last_page,
          });
        } else {
          throw "Gagal mendapatkan produk cicilan";
        }
      })
      .catch((err) => {
        console.error(err);
        errorToast(err);
        setInstalmentProducts({
          data: [],
          loading: false,
          ...instalmentProducts,
        });
      });

  }, [authIsLoading, userLevel]);

  useEffect(() => {
    !authIsLoading && getAllProductsByFilters(1, userId, 'special', null, null, null, 0, 999999999, 10)
      .then((res) => {
        if (isRequestSuccess(res.data)) {
          setDiscountProducts({
            data: res.data.data.data ?? [],
            loading: false,
            currentPage: 1,
            lastPage: res.data.data.last_page,
          });
        } else {
          throw "Gagal mendapatkan produk diskon";
        }
      })
      .catch((err) => {
        console.error(err);
        errorToast(err);
        setDiscountProducts({
          data: [],
          loading: false,
          ...discountProducts,
        });
      });
  }, [authIsLoading, userLevel]);

  useEffect(() => {
    getBanner()
      .then((res) => {
        if (isRequestSuccess(res.data)) {
          setBanner({
            data: res.data.data ?? [],
            loading: false,
          });
        } else {
          throw "Gagal mendapatkan banner";
        }
      })
      .catch((err) => {
        console.error(err);
        errorToast(err);
        setBanner({ ...banner, loading: false });
      });
  }, []);

  useEffect(() => {
    getCategory()
      .then((res) => {
        if (isRequestSuccess(res.data)) {
          setCategory({
            data: res.data.data ?? [],
            loading: false,
          });
        } else {
          throw "Gagal mendapatkan kategori";
        }
      })
      .catch((err) => {
        console.error(err);
        errorToast(err);
        setCategory({ data: [], loading: false });
      });
  }, []);

  useEffect(() => {
    !authIsLoading && getAllProductsByFilters(1, userId, filter)
      .then((res) => {
        if (isRequestSuccess(res.data)) {
          setProducts({
            data:
              filter === ""
                ? Object.values(res.data.data.data)
                : res.data.data.data,
            currentPage: 1,
            lastPage: res.data.data.last_page,
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        errorToast("Gagal mendapatkan produk");
        setProducts({ ...products, data: [], loading: false });
      });
  }, [filter, authIsLoading, userLevel]);

  function handleLoadMoreProducts() {
    setProducts({ ...products, loading: true });

    const newPage = products.currentPage + 1;
    getAllProductsByFilters(newPage, userId, filter)
      .then((res) => {
        if (isRequestSuccess(res.data)) {
          setProducts({
            data:
              filter === ""
                ? products.data.concat(Object.values(res.data.data.data))
                : products.data.concat(res.data.data.data),
            currentPage: newPage,
            lastPage: res.data.data.last_page,
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        errorToast("Gagal menampilkan produk lebih");
      });
  }

  function handleFilterProducts(filter) {
    setProducts({ ...products, loading: true });
    setFilter(filter);
  }

  const value = {
    products,
    flashSaleProducts,
    discountProducts,
    instalmentProducts,
    banner,
    category,
    handleFilterProducts,
    handleLoadMoreProducts,
    filter,
  };

  return (
    <HomepageContext.Provider value={value}>
      {children}
    </HomepageContext.Provider>
  );
};

export const useHomePageContext = () => {
  return useContext(HomepageContext);
};
