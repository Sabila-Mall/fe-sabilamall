import { Box } from "@chakra-ui/react";

import MyProfile from "../../components/MyProfile";
import Navbar from "../../components/Navbar";
import ProfileDesktop from "../../components/ProfileDesktop";
import ProfileMobile from "../../components/ProfileMobile";

const Profile = () => {
  const sm = [
    { text: "SM Pay", value: "100.000.000" },
    { text: "SM Point", value: 5 },
  ];
  return (
    <>
      <ProfileMobile sm={sm} />
      <ProfileDesktop section="Profile Saya" element={<MyProfile />} />
    </>
  );
};

export default Profile;
