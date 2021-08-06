import { Box, Flex, Text, Button, Grid, Input, Select } from "@chakra-ui/react";

import ProfileDesktop from "../../components/ProfileDesktop";
import KonfirmasiUpgradeAkun from "../../components/UpgradeAccountConfirmation";

const KonfirmasiUpgradeAkunPage = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <>
      {isMobile ? (
        <KonfirmasiUpgradeAkun isMobile={true} />
      ) : (
        <ProfileDesktop
          section="Konfirmasi Pembayaran Upgrade"
          element={<KonfirmasiUpgradeAkun isMobile={false} />}
        />
      )}
    </>
  );
};

export default KonfirmasiUpgradeAkunPage;
