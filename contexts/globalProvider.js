import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "./authProvider";
import { CheckoutProvider } from "./checkoutProvider";
import { WishlistProvider } from "./wishlistProvider";
import { HomepageProvider } from "./homepageProvider";

export const GlobalProvider = ({ children }) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <HomepageProvider>
          <CheckoutProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CheckoutProvider>
        </HomepageProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};
