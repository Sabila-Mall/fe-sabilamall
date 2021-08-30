import { ChakraProvider } from "@chakra-ui/react";

import { SMPayPointProvider } from "./SMPayPointProvider";
import { AuthProvider } from "./authProvider";
import { CheckoutProvider } from "./checkoutProvider";
import { HomepageProvider } from "./homepageProvider";
import { WishlistProvider } from "./wishlistProvider";

export const GlobalProvider = ({ children }) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <SMPayPointProvider>
          <HomepageProvider>
            <CheckoutProvider>
              <WishlistProvider>{children}</WishlistProvider>
            </CheckoutProvider>
          </HomepageProvider>
        </SMPayPointProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};
