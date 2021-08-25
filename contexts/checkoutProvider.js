import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
    const [namaPengirim, setnamaPengirim] = useState("")
    const [nomorPengirim, setnomorPengirim] = useState("")

    const [namaAwalPenerima, setnamaAwalPenerima] = useState("")
    const [namaAkhirPenerima, setnamaAkhirPenerima] = useState("")
    const [nomorPenerima, setnomorPenerima] = useState("")
    const [negaraPenerima, setnegaraPenerima] = useState("")
    const [provinsiPenerima, setprovinsiPenerima] = useState("")
    const [kotaPenerima, setkotaPenerima] = useState("")
    const [kecamatanPenerima, setkecamatanPenerima] = useState("")
    const [kodePosPenerima, setkodePosPenerima] = useState(0)
    const [alamatPenerima, setalamatPenerima] = useState("")
    const [namaPenerima, setnamaPenerima] = useState(namaAwalPenerima + " " + namaAkhirPenerima)

    const value = {
        namaPengirim, setnamaPengirim,
        nomorPengirim, setnomorPengirim,
        namaAwalPenerima, setnamaAwalPenerima,
        namaAkhirPenerima, setnamaAkhirPenerima,
        nomorPenerima, setnomorPenerima,
        negaraPenerima, setnegaraPenerima,
        provinsiPenerima, setprovinsiPenerima,
        kotaPenerima, setkotaPenerima,
        kecamatanPenerima, setkecamatanPenerima,
        kodePosPenerima, setkodePosPenerima,
        alamatPenerima, setalamatPenerima,
        namaPenerima, setnamaPenerima
    }

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    )
}

export const useCheckoutContext = () => {
    return useContext(CheckoutContext)
}