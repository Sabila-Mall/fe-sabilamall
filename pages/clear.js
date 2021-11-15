import { useEffect } from "react";

import { deleteAllCookies } from "../utils/cookies";

const ClearData = () => {
  useEffect(() => {
    deleteAllCookies();
    window.localStorage.clear();
  }, []);
  return <p>Data Reset Successfully, try accessing the web again</p>;
};
