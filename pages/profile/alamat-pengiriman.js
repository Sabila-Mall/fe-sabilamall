import {
  ChangeAddress,
  ChangeAddressMobile,
} from "../../components/ChangeAddress";
import ProfileDesktop from "../../components/ProfileDesktop";

const editAddress = () => {
  return (
    <>
      <ChangeAddressMobile />
      <ProfileDesktop
        section="Data Pengiriman"
        element={<ChangeAddress isMobile={false} />}
      />
    </>
  );
};

export default editAddress;
