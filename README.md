To run the server: node server.js

it will listen to port: http://localhost:3000


This is a basic Express.js server that serves as the backend for the bmc-test project.  
It uses a SQLite database to store user and cart data.


API Structure

- POST /api/auth/register – Register a new user
- POST /api/auth/login – Log in
- POST /api/cart/get_products – Get the user's cart
- POST /api/cart/add_product – Add a product to cart
- POST /api/cart/remove_product – Remove a product from cart