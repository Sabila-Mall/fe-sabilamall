import {
    ChangeAddress,
    ChangeAddressMobile,
} from "../../components/ChangeAddress";
import ProfileDesktop from "../../components/ProfileDesktop";

const editAddress = () => {
    return (
        <>
            <ChangeAddressMobile menu="Alamat Penerima" section="penerima" />
            <ProfileDesktop
                cardProfileText={"Akun Saya"}
                section="Alamat Penerima"
                element={<ChangeAddress isMobile={false} section="penerima" />}
            />
        </>
    );
};

export default editAddress;
