import MyProfile from "../../components/MyProfile";
import ProfileDesktop from "../../components/ProfileDesktop";
import ProfileMobile from "../../components/ProfileMobile";
import { useSmPayPointContext } from "../../contexts/SMPayPointProvider";
import { needForLogin } from "../../utils/functions";

const Profile = () => {
  const { smPoint, smPay } = useSmPayPointContext();
  const sm = [
    { text: "SM Pay", value: smPay },
    { text: "SM Point", value: smPoint },
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

export const getServerSideProps = needForLogin;
