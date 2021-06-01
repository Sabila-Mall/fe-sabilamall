import { useState } from "react";

import {
  AkunSaya,
  NavbarProfile,
  UbahKataSandi,
} from "../../components/ProfileComponents";

const Profile = () => {
  const [section, setSection] = useState("Akun Saya");
  let content = null;

  if (section === "Akun Saya") {
    content = <AkunSaya setSection={setSection} />;
  } else if (section === "Ubah Kata Sandi") {
    content = <UbahKataSandi />;
  }

  return (
    <>
      <NavbarProfile section={section} setSection={setSection} />
      {content}
    </>
  );
};

export default Profile;
