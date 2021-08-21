import { useRouter } from "next/router";
import { useEffect } from "react";

import { EditProfile, EditProfileMobile } from "../../components/EditProfile";
import ProfileDesktop from "../../components/ProfileDesktop";
import { useWindowSize } from "../../hooks/useWindowSize";

const EditProfilePage = () => {
  const { width } = useWindowSize();
  const router = useRouter();

  useEffect(() => {
    if (width >= 768) router.push("/profile");
  }, [width]);

  return (
    <>
      <EditProfileMobile />
    </>
  );
};

export default EditProfilePage;
