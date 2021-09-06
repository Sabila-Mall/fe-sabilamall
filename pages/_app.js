import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";

import { AuthProvider } from "../contexts/authProvider";
import { GlobalProvider } from "../contexts/globalProvider";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  axios.defaults.headers["apikey"] = "32c9284bfd35879a8dce97f8db9e0c2c";

  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
