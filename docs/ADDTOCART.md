# Product Detail to Cart Process

## Files/Context Used
* /components/ProductCheckout.js
* /contexts/cartProvider.js
* /contexts/authProvider.js
* /api/cart.js

### State Description
* isLoggedIn  
Location: authProvider.js  
Description: return true if user is logged in and false if otherwise
  
* cartDataByVendor  
Location: cartProvider.js  
Description: Splited cart products by vendor  

* totalPrice  
Location: cartProvider.js  
Description: total price of all products

* totalDiscount  
Location: cartProvider.js  
Description: total discount of all products

* cartData    
Location: cartrProvider.js  
Description: Splited cart products by customer_basket_id

### Function Used
* apiGetCartByCustomerID  
Location: cart.js  
Description: get all cart products  
Parameter: customers_id  
Return: all cart products  
   
* addCartItem    
Location: cartProvider.js  
Description: add product to cart  
Parameter: customers_id, user_level, products_id, quantity, option_id, option_values_id  
Return: Displays an error toast if it fails to add to the cart or displays succcess toast and add product to cart if otherwise    
  

* updateQuantity  
Location: cartProvider.js  
Description: update the quantity of a product  
Parameter: customers_id, customers_basket_id, customers_basket_quantity  
Return: -  

* deleteCartItem  
Location: cartProvider.js  
Description: delete product from cart  
Parameter: customers_id. customers_basket_id, toaster  
Return: Displays an error toast if it fails to delete cart item from the cart or displays success toast and delete from cart if otherwise
  
* makeObjectOfVariant   
Location: cartProvider.js  
Description: make a array of set of product variants
Parameter: varian  
Return: array of set of variants of the same product    

## Process
1. If isLoggedIn(), add-to-cart button on ProductCheckout.js will call addCartItem function which contains specific product details, that is customers_id, user_level, products_id, numberOfItem, option_id, and option_values_id.
2. addCartItem will add the product to the cart and call getAllData function to refresh all the cart data.
3. getAllData will do some works, such as split the data by vendor, split the data by customers_basket_id along with its price and discount, update the quantity, and prevent duplicate products.