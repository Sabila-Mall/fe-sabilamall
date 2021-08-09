import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "./authProvider";
import { WishlistProvider } from "./wishlistProvider";

export const GlobalProvider = ({ children }) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};
