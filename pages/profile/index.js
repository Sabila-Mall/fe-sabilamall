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
      <ProfileDesktop sm={sm} />
    </>
  );
};

export default Profile;
