import ProfileDesktop from "../../components/ProfileDesktop";
import {
  UpgradeAccount,
  UpgradeAccountMobile,
} from "../../components/UpgradeAccount";

const UpgradeAccountPage = () => {
  return (
    <>
      <UpgradeAccountMobile />
      <ProfileDesktop
        cardProfileText={"Akun Saya"}
        section="Upgrade Akun"
        element={<UpgradeAccount isMobile={false} />}
      />
    </>
  );
};

export default UpgradeAccountPage;
