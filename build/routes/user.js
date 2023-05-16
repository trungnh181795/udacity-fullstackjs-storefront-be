"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../controllers/user");
var authentication_1 = require("../middleware/authentication");
function user_routes(app) {
    app.get("/users", user_1.getAllUsers);
    app.post("/users/create", user_1.createUser);
    app.get("/users/:id", user_1.getUserById);
    app.put("/users/:id", authentication_1.verifyAuthToken, user_1.updateUserById);
    app.delete("/users/:id", authentication_1.verifyAuthToken, user_1.deleteUserById);
    app.post("/users/authenticate", user_1.authenticate);
}
exports.default = user_routes;
