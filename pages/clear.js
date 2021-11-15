import { useRouter } from "next/router";
import { useEffect } from "react";

import { deleteAllCookies } from "../utils/cookies";

const Clear = () => {
  const router = useRouter();
  useEffect(() => {
    deleteAllCookies();
    window.localStorage.clear();
    router.push("/");
  }, []);
  return <p>Data Reset Successfully, try accessing the web again</p>;
};

export default Clear;
