import { EditProfile, EditProfileMobile } from "../../components/EditProfile";
import ProfileDesktop from "../../components/ProfileDesktop";

const EditProfilePage = () => {
  return (
    <>
      <EditProfileMobile />
      <ProfileDesktop
        section="Edit Profile"
        element={<EditProfile isMobile={false} />}
      />
    </>
  );
};

export default EditProfilePage;
