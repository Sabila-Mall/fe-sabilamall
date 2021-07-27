import {
    Box,
    Flex,
    Text,
    Button,
    Grid,
    useMediaQuery,
    Input,
    Select
} from "@chakra-ui/react";

import ProfileDesktop from "../../components/ProfileDesktop";
import KonfirmasiUpgradeAkun from "../../components/UpgradeAccountConfirmation";

const KonfirmasiUpgradeAkunPage = () => {
    const [isMobile] = useMediaQuery("(max-width: 768px)")

    return (
        <>
            {isMobile ? <KonfirmasiUpgradeAkun isMobile={true} /> : <ProfileDesktop
                section="Konfirmasi Pembayaran Upgrade"
                element={<KonfirmasiUpgradeAkun isMobile={false} />}
            />}


        </>
    );
};

export default KonfirmasiUpgradeAkunPage;
