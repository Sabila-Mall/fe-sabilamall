import { ChakraProvider } from "@chakra-ui/react";

import { SMPayPointProvider } from "./SMPayPointProvider";
import { AddressProvider } from "./addressProvider";
import { AuthProvider } from "./authProvider";
import { CartProvider } from "./cartProvider";
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
              <AddressProvider>
                <WishlistProvider>
                  <CartProvider>{children}</CartProvider>
                </WishlistProvider>
              </AddressProvider>
            </CheckoutProvider>
          </HomepageProvider>
        </SMPayPointProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};
