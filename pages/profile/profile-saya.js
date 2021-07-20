import {
    UpgradeAccount,
    UpgradeAccountMobile,
  } from "../../components/UpgradeAccount";
  import ProfileDesktop from "../../components/ProfileDesktop";
  
  const myProfile = () => {
    return (
      <>
        <UpgradeAccountMobile />
        <ProfileDesktop
          section="Upgrade Akun"
          element={<UpgradeAccount isMobile={false} />}
        />
      </>
    );
  };
  
  export default myProfile;