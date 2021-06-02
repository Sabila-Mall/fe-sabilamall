import {
  ChangePassword,
  ChangePasswordMobile,
} from "../../components/ChangePassword";
import ProfileDesktop from "../../components/ProfileDesktop";

const UbahPassword = () => {
  return (
    <>
      <ChangePasswordMobile />
      <ProfileDesktop
        section="Ubah Password"
        element={<ChangePassword isMobile={false} />}
      />
    </>
  );
};

export default UbahPassword;
