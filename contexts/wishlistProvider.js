import { useToast } from "@chakra-ui/toast";
import { createContext, useContext, useEffect, useState } from "react";

import {
  addWishlist,
  deleteWishlist,
  getWishlistByUserId,
} from "../api/wishlist";
import { isRequestSuccess } from "../utils/api";
import { useAuthContext } from "./authProvider";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removedItems, setRemovedItems] = useState([]);
  const { userData } = useAuthContext();
  const userId = userData?.id;
  const toast = useToast();

  const successToast = (successMessage) => {
    toast({
      position: "top",
      title: successMessage,
      status: "success",
      isClosable: true,
    });
  };

  const errorToast = (errMessage) => {
    toast({
      position: "top",
      title: errMessage,
      status: "error",
      isClosable: true,
    });
  };

  const deleteItem = (liked_products_id, liked_customers_id) => {
    const dataBefore = [...wishlistData];
    setWishlistData(
      wishlistData.filter((item) => item.id != liked_products_id),
    );
    deleteWishlist({ liked_products_id, liked_customers_id })
      .then((res) => {
        if (isRequestSuccess(res)) {
          successToast("Berhasil menghapus produk dari wishlist");
        } else {
          setWishlistData(dataBefore);
          errorToast("Gagal menghapus produk dari wishlist");
        }
      })
      .catch(() => {
        setWishlistData(dataBefore);
        errorToast("Gagal menghapus produk dari wishlist");
      });
  };

  const addItem = (liked_products_id, liked_customers_id) => {
    setLoading(true);
    addWishlist({ liked_products_id, liked_customers_id }).then((res) => {
      if (isRequestSuccess(res)) {
        successToast("Berhasil menambahkan produk ke wishlist");
        getWishlistByUserId(userId)
          .then((res) => {
            setWishlistData(res);
          })
          .finally(() => setLoading(false));
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    if (userId) {
      getWishlistByUserId(userId)
        .then((res) => {
          setWishlistData(res);
        })
        .finally(() => setLoading(false));
    }
  }, [userData]);

  const value = {
    wishlistData,
    setWishlistData,
    loading,
    setLoading,
    deleteItem,
    addItem,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  return useContext(WishlistContext);
};
