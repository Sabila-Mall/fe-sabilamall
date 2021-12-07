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
Description: Splitted cart products by vendor  

* totalPrice  
Location: cartProvider.js  
Description: total price of all products

* totalDiscount  
Location: cartProvider.js  
Description: total discount of all products

* cartData    
Location: cartrProvider.js  
Description: Splitted cart products by customer_basket_id

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
Return:
    + Failed: error toast     
    + Success: succcess toast and add product to cart if otherwise      
    
  
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
Description: make an array of set of product variants
Parameter: varian  
Return: array of set of variants of the same product    
Input example: 
```json 
[
    {  
        customers_basket_attributes_id: 364067  
        customers_basket_id: 188209  
        customers_id: 3  
        prefix: "+"  
        products_attributes_id: 53716  
        products_id: "8164"  
        products_options_id: 2  
        products_options_name: "Warna"  
        products_options_values_id: 1013  
        products_options_values_name: "Pale Pink"  
        seq_id: null  
        session_id: "EfajNts9ZVZpHzIZiPTmiwishJVLS1NcUPkbT5s1"  
        values_price: "0.00"  
        values_weight: "0.00  
    },   
    {  
        customers_basket_attributes_id: 364068  
        customers_basket_id: 188209  
        customers_id: 3  
        prefix: "+"  
        products_attributes_id: 53713  
        products_id: "8164"  
        products_options_id: 1  
        products_options_name: "Ukuran"  
        products_options_values_id: 840  
        products_options_values_name: "Dewasa"  
        seq_id: null  
        session_id: "EfajNts9ZVZpHzIZiPTmiwishJVLS1NcUPkbT5s1"  
        values_price: "0.00"  
        values_weight: "0.00"  
    }
]
```  
Output example: 
```json   
{1: 840, 2: 1013}
```  

## Process
1. If isLoggedIn(), add-to-cart button on ProductCheckout.js will call addCartItem function which contains specific product details, that is customers_id, user_level, products_id, numberOfItem, option_id, and option_values_id.
2. addCartItem will add the product to the cart and call getAllData function to refresh all the cart data.
3. getAllData will do some works, such as split the data by vendor, split the data by customers_basket_id along with its price and discount, update the quantity, and prevent duplicate products.