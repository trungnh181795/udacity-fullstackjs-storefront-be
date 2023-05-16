My Awesome Web Application
Welcome to My Awesome Web Application!

GET /
This endpoint will always return a status code of 200, indicating that the application is up and running. It does not require any parameters or authentication.

Set up database:
npm install to install all dependencies 
db-migrate up to set up the database and get access via http://127.0.0.1:5432 
npm run build to build the app

ENV Setup:
PORT=3000
POSTGRES_HOST="localhost"
POSTGRES_USER="magical_user"
POSTGRES_PASSWORD="password123"
POSTGRES_DB="storefront_be"
POSTGRES_TEST_DB="storefront_be_test"
TOKEN_KEY=###
ENV=dev
BCRYPT_PASSWORD=###
SALT_ROUNDS="10"
ADMIN_PASSWORD='###
ADMIN_USERNAME=###