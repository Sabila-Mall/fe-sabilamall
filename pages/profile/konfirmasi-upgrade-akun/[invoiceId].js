import ProfileDesktop from "../../../components/ProfileDesktop";
import KonfirmasiUpgradeAkun from "../../../components/UpgradeAccountConfirmation";
import { useWindowSize } from "../../../hooks/useWindowSize";

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
