import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Button,
    Select
} from "@chakra-ui/react";
import router from "next/router";
import { useEffect, useState } from "react";
import NavbarProfile from "../../components/NavbarProfile";

const editReceiverMobile = () => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState("")
    const [province, setProvince] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [code, setCode] = useState("")

    let receiverAddress = [
        {
            name: "Farahhhhhhhhhh",
            phoneNumber: "088888888888",
            fullAddress: "Jl depok blok AA no. 17",
            province: "Jawa Barat",
            city: "Kota Depok",
            district: "Sukmajaya",
            code: "16417"
        }
    ]

    useEffect(() => {
        setName(receiverAddress.name)
        setPhone(receiverAddress.phoneNumber)
        setAddress(receiverAddress.fullAddress)
        setProvince(receiverAddress.province)
        setCity(receiverAddress.city)
        setDistrict(receiverAddress.district)
        setCode(receiverAddress.code)
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault();
        router.push("/profile/alamat-pengiriman")
    }
    return (
        <Box>
            <Box bgColor="white">
                <NavbarProfile section="Alamat Penerima" />
            </Box>
            <Box>
                <Box mx="24px" mt="48px">
                    <FormControl>
                        <FormLabel className="primaryFont" fontWeight="700" fontSize="16px">Nama Lengkap</FormLabel>
                        <Input id="name" value={name} required onChange={(e) => setName(e.target.value)} />

                        <FormLabel mt={4} className="primaryFont" fontWeight="700" fontSize="16px">Nomor Telepon</FormLabel>
                        <Input id="phoneNumber" value={phone} type="number" required onChange={(e) => setPhone(e.target.value.toString())} />

                        <FormLabel mt={4} className="primaryFont" fontWeight="700" fontSize="16px">Alamat Lengkap</FormLabel>
                        <Input id="address" value={address} required onChange={(e) => setAddress(e.target.value)} />
                        <FormLabel mt={4}>Provinsi</FormLabel>
                        <Select placeholder="Select option" onChange={(e) => setProvince(e.target.value)}>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </Select>
                        <FormLabel mt={4}>Kota/Kabupaten</FormLabel>
                        <Select placeholder="Select option" onChange={(e) => setCity(e.target.value)}>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </Select>
                        <FormLabel mt={4}>Kecamatan</FormLabel>
                        <Select placeholder="Select option" onChange={(e) => setDistrict(e.target.value)}>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </Select>
                        <FormLabel mt={4}>Kode Pos</FormLabel>
                        <Select placeholder="Select option" onChange={(e) => setCode(e.target.value)}>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <Button
                colorScheme="orange"
                borderRadius="20px"
                mt="60px"
                p="24px"
                bottom="36px"
                type="submit"
                fontWeight="700"
                className="primaryFont"
                fontSize="18px"
                w="90%"
                ml="5%"
                d="flex"
                onClick={(e) => handleUpdate(e)}>
                Update
            </Button>
        </Box>

    );
};

export default editReceiverMobile;
