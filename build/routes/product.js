"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("../controllers/product");
var authentication_1 = require("../middleware/authentication");
function productRoutes(app) {
    app.get("/products", product_1.getAllProducts);
    app.post("/products/create", authentication_1.verifyAuthToken, product_1.createProduct);
    app.get("/products/:id", product_1.getProductById);
    app.put("/products/:id", authentication_1.verifyAuthToken, product_1.updateProduct);
    app.delete("/products/:id", authentication_1.verifyAuthToken, product_1.deleteProduct);
}
exports.default = productRoutes;
