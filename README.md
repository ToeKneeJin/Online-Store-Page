# Solar System Geeks Online Store

This project is adapted from my final project with the coding bootcamp that I had attended, Tech Elevator. In short, it is an Online Store web page with both server side code using Java Spring Boot, REST API, MVC pattern, PostgreSQL, and client side code with HTML/CSS, Javascript, Vue.js.

# API

Run the Java application in the server folder. It provides the API for the Vue front-end.

## Front-end

Open the `client` folder,
Then download any dependencies by running this command:
​
```bash
npm install
```

Finally, start the Vue application with the following command:
​
```bash
npm run serve
```

####The Read Me file below are edited from the Tech Elevator Project description

#### Registration and login

* As an anonymous user, I can register a new account.
* As an anonymous user, I can login using an existing username and password.
* As an authenticated user, I can click "Logout" to logout of the application.
  * After logout, the system redirects me to the Login page.

#### Products page

* As an anonymous or authenticated user, I can visit the Products page to see all the products in the SSGeek online store.
  * Route `/` and route `/products` both access the Products page.
  * Clicking `Home` on the navigation bar also accesses the Products page.
* As an anonymous or authenticated user, on the Products page, I can view the product list as a tiled view or a table view, by clicking the appropriate icon.
* As an anonymous or authenticated user, on the Products page, I can type a search term into a Search edit box, and the page displays only the products whose name contains the search term (ignoring case).
* As an anonymous or authenticated user, from the Products page, I can click a product name to go to the Product Details page.
  * Route `/product/n` accesses the Product Details page for the product with id = n.
* **Only as an authenticated user**, from the Products page, I can click a "shopping cart" icon next to the product, and the application adds the product to my cart.
  * As an anonymous user, the "shopping cart" icon isn't shown.
  * When I click the icon, the application adds 1 unit of the item to my cart.
  * If the item is already in my cart, the application adds 1 to the quantity that's already there.
  * The application shows me a message, confirming that it added the item to my cart.

#### Product Details page

* As an anonymous or authenticated user, I can see the details of one product on the Product Details page.
  * See the wireframes section for more information on the Product Details page
  * Route `/product/n` accesses the Product Details page for the product with id = n.
* **Only as an authenticated user**, from the Product Details page, I can click a "shopping cart" button on the page, and the application adds the product to my cart.
  * As an anonymous user, the "shopping cart" button isn't shown.
  * When I click the button, the application adds 1 unit of the item to my cart.
  * If the item is already in my cart, the application adds 1 to the quantity that's already there.
  * The application shows me a message, confirming that it added the item to my cart.

#### Shopping Cart page

* As an authenticated user, I can click the "Cart" link on the navigation bar to visit my shopping cart.
  * Route `/cart` accesses my Shopping Cart page.
  * The Shopping Cart page displays the quantity, name, price and extended price (qty * price) of each item in my cart.
  * The Shopping Cart page also displays the subtotal, tax, and total value of the all items in my cart.
* As an authenticated user, from the Shopping Cart page, I can click a product name to go to the Product Details page.
* As an authenticated user, on the Shopping Cart page, I can click an "X" icon next to any item to remove that item from my cart.
  * This removes the item totally, regardless of the quantity that was in the cart.
  * The application recalculates the subtotal, tax, and total amounts and re-displays the cart.
* As an authenticated user, on the Shopping Cart page, I can click a "Clear Cart" button to remove all items from my cart.
