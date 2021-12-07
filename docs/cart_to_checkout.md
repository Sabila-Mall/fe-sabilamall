# Cart to Checkout Process

## Files/Context Used
* /components/QuickAdd.js
* /components/QuickAddItem.js
* /components/QuickAddListItem.js
* /contexts/cartProvider.js

### State Description
* quantity  
Location: QuickAddItem.js  
Description: used to display quantity in QuickAddItem  

* cartDataByVendor  
Location: cartProvider.js  
Description: Splited cart products by vendor   

* totalPrice  
Location: cartProvider.js  
Description: total price of all products

* totalDiscount  
Location: cartProvider.js  
Description: total discount of all products  

* selectedItem  
Location: cartProvider.js  
Description: array of selected products  

* selectedPrice 
Location: cartProvider.js  
Description: total price of selected products  

* selectedDiscount  
Location: cartProvider.js  
Description: total discount of selected products

* selectedQuantity  
Location: cartProvider.js  
Description: total quantity of selected products

* selectedWeight    
Location: cartProvider.js  
Description: total weight of selected products  

### Function Used
* handleCheckout  
Location: QuickAdd.js  
Description: call checkoutValidation function  
Parameter: -   
Return: -    

* checkoutValidation  
Location: cartProvider.js  
Description: do the validation for the checkout, that is from the same vendor and same type of product    
Parameter: -   
Return:
  + Failed: displays an error toast  
  + Success: redirect to checkout page    

* addToCheckout  
Location: cartProvider.js  
Description: add data to selectedItem  
Parameter: data     
Return: new selectedItem, new selectedPrice, and new selectedDiscount  

* handleDelete
Location: QuickAddItem.js  
Description: trigger deleteCartItem function
Parameter: productId  
Return: -  

* deleteCartItem  
Location: cartProvider.js  
Description: delete specific product from cart 
Parameter: userId, productId  
Return:
  + Success: displays success toast
  + Failed: displays error toast

* deleteFromCheckout  
Location: cartProvider.js  
Description: delete data from selectedItem  
Parameter: data     
Return: new selectedItem, new selectedPrice, and new selectedDiscount  

* updateQuantity  
Location: cartProvider.js  
Description: update the quantity of a product   
Parameter: customers_id, customers_basket_id, customers_basket_quantity    
Return: -   

* handleModifyNumberOfItem  
Location: QuickAddItem.js  
Description: handle the increase and decrease event of the product, set the totalDiscount, totalPrice, quantity, and trigger updateQuantity function  
Parameter: event  
Return: -

## Process
1. plus and minus button on each products on cart drawer(QuickAddItem) will trigger handleModifyNumberOfItem
2. Checkbox on each products will trigger handleCheckbox function which will call addToCheckout or deleteFromCheckout function
3. addToCheckout and deleteFromCheckout will set the selectedItem, selectedPrice, and selectedPrice
4. delete button on each products(trash icon) will trigger the handleDelete function
5. Button Checkout will trigger handleCheckout