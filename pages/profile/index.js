import MyProfile from "../../components/MyProfile";
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
      <ProfileDesktop
        section="Profil Saya"
        cardProfileText="Akun Saya"
        element={<MyProfile />}
      />
    </>
  );
};

export default Profile;
