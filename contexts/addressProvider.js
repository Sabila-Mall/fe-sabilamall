import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";

import { addAddress, deleteAddress, getAddressByUserId } from "../api/address";
import { isRequestSuccess } from "../utils/api";
import { useAuthContext } from "./authProvider";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addressDataPengirim, setaddressDataPengirim] = useState([]);
  const [addressDataPenerima, setaddressDataPenerima] = useState([]);
  const [delivery_id, setDeliveryId] = useState(0);
  const [loading, setLoading] = useState(false);
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

  const getAllData = () => {
    setLoading(true);
    if (userId) {
      getAddressByUserId(userId, 2).then((res) => {
        setaddressDataPengirim(res);
      });
      getAddressByUserId(userId, 1)
        .then((res) => {
          setaddressDataPenerima(res);
        })
        .finally(() => setLoading(false));
    }
  };

  const deleteItem = (customers_id, address_book_id, type) => {
    deleteAddress({ customers_id, address_book_id })
      .then((res) => {
        if (isRequestSuccess(res)) {
          if (type === "delete") {
            successToast("Alamat berhasil dihapus");
            getAllData();
          }
        } else {
          if (type === "delete") {
            errorToast("Gagal menghapus alamat");
          }
        }
      })
      .catch(() => {
        if (type === "delete") {
          errorToast("Gagal menghapus alamat");
        }
      });
  };

  const addItemPengirim = (
    customers_id,
    is_default,
    address_book_type,
    entry_firstname,
    entry_lastname,
    entry_phone,
    type,
  ) => {
    addAddress({
      customers_id,
      is_default,
      address_book_type,
      entry_firstname,
      entry_lastname,
      entry_phone,
    })
      .then((res) => {
        if (isRequestSuccess(res)) {
          if (type === "add") {
            successToast("Alamat berhasil ditambahkan");
            getAllData();
          } else if (type === "edit") {
            successToast("Alamat berhasil diubah");
            getAllData();
          }
        } else {
          if (type === "add") {
            errorToast("Gagal menambahkan alamat");
          } else if (type === "edit") {
            errorToast("Gagal mengubah alamat");
          }
        }
      })
      .catch(() => {
        if (type === "add") {
          errorToast("Gagal menambahkan alamat");
        } else if (type === "edit") {
          errorToast("Gagal mengubah alamat");
        }
      });
  };

  const addItemPenerima = (
    customers_id,
    is_default,
    address_book_type,
    entry_firstname,
    entry_lastname,
    entry_phone,
    entry_postcode,
    entry_city,
    entry_district,
    entry_zone_id,
    entry_street_address,
    entry_country_id,
    type,
  ) => {
    addAddress({
      customers_id,
      is_default,
      address_book_type,
      entry_firstname,
      entry_lastname,
      entry_phone,
      entry_postcode,
      entry_city,
      entry_district,
      entry_zone_id,
      entry_street_address,
      entry_country_id,
    })
      .then((res) => {
        if (isRequestSuccess(res)) {
          if (type === "add") {
            successToast("Alamat berhasil ditambahkan");
            getAllData();
          } else if (type === "edit") {
            successToast("Alamat berhasil diubah");
            getAllData();
          }
        } else {
          if (type === "add") {
            errorToast("Gagal menambahkan alamat");
          } else if (type === "edit") {
            errorToast("Gagal mengubah alamat");
          }
        }
      })
      .catch(() => {
        if (type === "add") {
          errorToast("Gagal menambahkan alamat");
        } else if (type === "edit") {
          errorToast("Gagal mengubah alamat");
        }
      });
  };

  useEffect(() => {
    getAllData();
  }, [userData]);

  const value = {
    addressDataPengirim,
    setaddressDataPengirim,
    addressDataPenerima,
    setaddressDataPenerima,
    loading,
    setLoading,
    deleteItem,
    addItemPengirim,
    addItemPenerima,
    getAllData,
  };

  return (
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
};

export const useAddressContext = () => {
  return useContext(AddressContext);
};
