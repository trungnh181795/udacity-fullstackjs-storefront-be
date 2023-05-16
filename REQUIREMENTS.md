API Endpoints
Products:
Index: 'products/' [GET]
Show: 'products/:id' [GET]
Create (args: Product)[token required]: 'products/' [POST] (token)
[OPTIONAL] Top 5 most popular products
[OPTIONAL] Products by category: 'products/cat/:category' [GET]
[ADDED] Delete: 'products/:id [DELETE]
Users:
Index [token required]: 'users/' [GET] (token)
Show [token required]: 'users/:id' [GET] (token)
Create (args: User)[token required]: 'users/' [POST] (token)
[ADDED] Delete [token required]: 'users/:id' [DELETE] (token)
Orders:
Index [token required]: 'orders/:user_id' [GET] (token)
Current Order by user [token required]: 'orders/current/:user_id' [GET] (token)
[OPTIONAL] Completed Orders by user [token required]: 'orders/completed/:user_id' [GET] (token)
[ADDED] Active Orders by user [token required]: 'orders/active/:user_id' [GET] (token)
[ADDED] Update order's status [token required]: 'orders?status=<status>&orderId=<order id> [PUT] (token)
[ADDED] Delete [token required]: 'orders/:id [DELETE] (token)

Data Shapes
Product:
id
name
price
Table: Product (id:serial[primary key], name:varchar(50)[not null], price:numeric[not null], category:varchar(50))
User:
id
firstname
lastname
password
Table: User (id:serial[primary key], firstname: varchar (50)[not null], lastname:varchar(50)[not null], password:varchar(60)[not null])
Orders:
id of each product in the order
quantity of each product in the order
user_id
status of order (active or complete)
Table: Orders (id:serial[primary key], product_id:integer(foreign key to products table), quantity:integer[default 1], user_id:integer(foreign key to users table), status:enum(active, complete)[not null])
Table: order_products
order_id INTEGER REFERENCES orders(id)
product_id INTEGER REFERENCES products(id)
quantity INTEGER
Table: Order Product (
order_id: integer(not null) REFERENCES orders (id),
product_id: integer(not null) REFERENCES products (id),
quantity: integer(not null)
)
