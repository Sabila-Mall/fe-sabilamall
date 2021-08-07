import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "../contexts/authProvider";
import { GlobalProvider } from "../contexts/globalProvider";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
