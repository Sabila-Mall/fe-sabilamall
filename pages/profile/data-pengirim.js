import {
  ChangeAddress,
  ChangeAddressMobile,
} from "../../components/ChangeAddress";
import ProfileDesktop from "../../components/ProfileDesktop";

const editAddress = () => {
  return (
    <>
      <ChangeAddressMobile menu="Data Pengirim" section="pengirim" />
      <ProfileDesktop
        cardProfileText={"Akun Saya"}
        section="Data Pengirim"
        element={<ChangeAddress isMobile={false} section="pengirim" />}
      />
    </>
  );
};

export default editAddress;
