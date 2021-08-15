import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "./authProvider";
import { CartProvider } from "./cartProvider";
import { WishlistProvider } from "./wishlistProvider";

export const GlobalProvider = ({ children }) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>{children}</CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};
