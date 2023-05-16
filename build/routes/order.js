"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../controllers/order");
var authentication_1 = require("../middleware/authentication");
function orderRoutes(app) {
    app.get("/orders", order_1.getAllOrders);
    app.post("/orders/create", authentication_1.verifyAuthToken, order_1.createOrder);
    app.get("/orders/:id", authentication_1.verifyAuthToken, order_1.getOrderById);
    app.put("/orders/:id", authentication_1.verifyAuthToken, order_1.updateOrder);
    app.delete("/orders/:id", authentication_1.verifyAuthToken, order_1.deleteOrder);
}
exports.default = orderRoutes;
