import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "./authProvider";
import { CheckoutProvider } from "./checkoutProvider";
import { WishlistProvider } from "./wishlistProvider";

export const GlobalProvider = ({ children }) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <WishlistProvider>
          <CheckoutProvider>
            {children}
          </CheckoutProvider>
        </WishlistProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};
