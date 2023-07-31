import { useToast } from "@chakra-ui/toast";
import { createContext, useContext, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";

import { getBanners, getCategories, getProducts } from "../api/Homepage";
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
  const toast = useToast();
  const errorToast = (errMessage) => {
    toast({
      position: "top",
      title: errMessage,
      status: "error",
      isClosable: true,
    });
  };

  const [filter, setFilter] = useState("");

  const flashSaleProducts = useQuery(
    "flash_sale",
    async () => {
      try {
        const res = await getProducts(
          1,
          userId,
          "flash_sale",
          null,
          null,
          null,
          0,
          999999999,
          10,
        );
        if (isRequestSuccess(res.data)) {
          return res.data.data;
        } else {
          throw "Gagal mendapatkan produk flash sale";
        }
      } catch (err) {
        console.error(err);

        errorToast(err);
      }
    },
    {
      initialData: {
        data: new Array(8).fill(0),
      },
      refetchOnWindowFocus: false,
      enabled: !authIsLoading,
    },
  );

  const discountProducts = useQuery(
    "special",
    async () => {
      try {
        const res = await getProducts(
          1,
          userId,
          "special",
          null,
          null,
          null,
          0,
          999999999,
          10,
        );
        if (isRequestSuccess(res.data)) {
          return res.data.data;
        } else {
          throw "Gagal mendapatkan produk special";
        }
      } catch (err) {
        console.error(err);

        errorToast(err);
      }
    },
    {
      initialData: {
        data: new Array(8).fill(0),
      },
      refetchOnWindowFocus: false,
      enabled: !authIsLoading,
    },
  );

  const instalmentProducts = useQuery(
    "instalment",
    async () => {
      try {
        const res = await getProducts(
          1,
          userId,
          "instalment",
          null,
          null,
          null,
          0,
          999999999,
          10,
        );
        if (isRequestSuccess(res.data)) {
          return res.data.data;
        } else {
          throw "Gagal mendapatkan produk cicilan";
        }
      } catch (err) {
        console.error(err);
        errorToast(err);
      }
    },
    {
      initialData: {
        data: new Array(8).fill(0),
      },
      refetchOnWindowFocus: false,
      enabled: !authIsLoading,
    },
  );

  const queryProducts = useInfiniteQuery(
    ["products", filter],
    async ({ pageParam = 0 }) => {
      try {
        const res = await getProducts(pageParam, userId, filter);
        if (isRequestSuccess(res.data)) {
          return res.data.data;
        } else {
          throw "Gagal mendapatkan produk";
        }
      } catch (err) {
        console.error(err);
        errorToast(err);
      }
    },
    {
      initialData: {
        pages: [{ data: new Array(8).fill(0) }],
      },
      refetchOnWindowFocus: false,
      enabled: !authIsLoading,
      getNextPageParam: (lastPage) =>
        lastPage.current_page >= lastPage.last_page
          ? undefined
          : lastPage.current_page + 1,
    },
  );

  const preOrderProducts = useQuery(
    "pre_order",
    async () => {
      try {
        const res = await getProducts(
          1,
          userId,
          "pre_order",
          null,
          null,
          null,
          0,
          999999999,
          10,
        );
        if (isRequestSuccess(res.data)) {
          return res.data.data;
        } else {
          throw "Gagal mendapatkan produk pre order";
        }
      } catch (err) {
        console.error(err);
        errorToast(err);
      }
    },
    {
      initialData: {
        data: new Array(8).fill(0),
      },
      refetchOnWindowFocus: false,
      enabled: !authIsLoading,
    },
  );

  // console.log('Debug::', queryProducts.isFetched);

  const queryBanners = useQuery(
    ["banner"],
    async () => {
      try {
        const res = await getBanners();
        if (isRequestSuccess(res.data)) {
          return res.data.data;
        } else {
          throw "Gagal mendapatkan banner";
        }
      } catch (err) {
        console.error(err);

        errorToast(err);
      }
    },
    {
      initialData: {
        data: new Array(8).fill(0),
      },
      refetchOnWindowFocus: false,
      enabled: !authIsLoading,
    },
  );

  // const [discountProducts, setDiscountProducts] = useState({
  //   data: new Array(8).fill(0),
  //   loading: true,
  //   currentPage: 1,
  //   lastPage: Number.MAX_SAFE_INTEGER,
  // });

  // const [instalmentProducts, setInstalmentProducts] = useState({
  //   data: new Array(8).fill(0),
  //   loading: true,
  //   currentPage: 1,
  //   lastPage: Number.MAX_SAFE_INTEGER,
  // });

  // const [banner, setBanner] = useState({
  //   data: [],
  //   loading: true,
  // });

  // const [category, setCategory] = useState({
  //   data: new Array(13).fill(0),
  //   loading: true,
  // });

  // useEffect(() => {
  //   !authIsLoading && getAllProductsByFilters(1, userId, 'flash_sale', null, null, null, 0, 999999999, 10)
  //     .then((res) => {
  //       if (isRequestSuccess(res.data)) {
  //         setFlashSaleProducts({
  //           data: res.data.data.data ?? [],
  //           loading: false,
  //           currentPage: 1,
  //           lastPage: res.data.data.last_page,
  //         });
  //       } else {
  //         throw "Gagal mendapatkan produk flash sale";
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       errorToast(err);
  //       setFlashSaleProducts({
  //         data: [],
  //         loading: false,
  //         ...flashSaleProducts,
  //       });
  //     });

  // }, [authIsLoading, userLevel]);

  // useEffect(() => {
  //   !authIsLoading && getAllProductsByFilters(1, userId, 'instalment', null, null, null, 0, 999999999, 10)
  //     .then((res) => {
  //       if (isRequestSuccess(res.data)) {
  //         setInstalmentProducts({
  //           data: res.data.data.data ?? [],
  //           loading: false,
  //           currentPage: 1,
  //           lastPage: res.data.data.last_page,
  //         });
  //       } else {
  //         throw "Gagal mendapatkan produk cicilan";
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       errorToast(err);
  //       setInstalmentProducts({
  //         data: [],
  //         loading: false,
  //         ...instalmentProducts,
  //       });
  //     });

  // }, [authIsLoading, userLevel]);

  // useEffect(() => {
  //   !authIsLoading && getAllProductsByFilters(1, userId, 'special', null, null, null, 0, 999999999, 10)
  //     .then((res) => {
  //       if (isRequestSuccess(res.data)) {
  //         setDiscountProducts({
  //           data: res.data.data.data ?? [],
  //           loading: false,
  //           currentPage: 1,
  //           lastPage: res.data.data.last_page,
  //         });
  //       } else {
  //         throw "Gagal mendapatkan produk diskon";
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       errorToast(err);
  //       setDiscountProducts({
  //         data: [],
  //         loading: false,
  //         ...discountProducts,
  //       });
  //     });
  // }, [authIsLoading, userLevel]);

  // useEffect(() => {
  //   getBanner()
  //     .then((res) => {
  //       if (isRequestSuccess(res.data)) {
  //         setBanner({
  //           data: res.data.data ?? [],
  //           loading: false,
  //         });
  //       } else {
  //         throw "Gagal mendapatkan banner";
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       errorToast(err);
  //       setBanner({ ...banner, loading: false });
  //     });
  // }, []);

  const queryCategories = useQuery(
    ["category"],
    async () => {
      try {
        const res = await getCategories();
        if (isRequestSuccess(res.data)) {
          return res.data.data;
        } else {
          throw Error("Gagal mendapatkan kategori");
        }
      } catch (err) {
        console.error(err);
        errorToast(err);
      }
    },
    {
      initialData: new Array(13).fill(0),
      refetchOnWindowFocus: false,
    },
  );

  // useEffect(() => {
  //   !authIsLoading && getAllProductsByFilters(1, userId, filter)
  //     .then((res) => {
  //       if (isRequestSuccess(res.data)) {
  //         setProducts({
  //           data:
  //             filter === ""
  //               ? Object.values(res.data.data.data)
  //               : res.data.data.data,
  //           currentPage: 1,
  //           lastPage: res.data.data.last_page,
  //           loading: false,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       errorToast("Gagal mendapatkan produk");
  //       setProducts({ ...products, data: [], loading: false });
  //     });
  // }, [filter, authIsLoading, userLevel]);

  function handleLoadMoreProducts() {
    products.fetchNextPage();
  }

  function handleFilterProducts(filter) {
    setFilter(filter);
  }

  const value = {
    queryProducts,
    flashSaleProducts,
    discountProducts,
    instalmentProducts,
    preOrderProducts,
    queryBanners,
    // banner,
    queryCategories,
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
