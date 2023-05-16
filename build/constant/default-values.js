"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultValues = void 0;
var types_1 = require("../types");
exports.defaultValues = {
    userAuth: {
        username: "johnsmith",
        password: "test123",
    },
    user: {
        username: "johnsmith",
        firstname: "John",
        lastname: "Smith",
        password: "test123",
    },
    newUser: {
        firstname: "John",
        lastname: "Wick",
    },
    product: {
        name: "test",
        price: 3000,
    },
    newProduct: {
        name: "test 2",
        price: 30000,
    },
    order: {
        products: function (product_id) { return [
            {
                product_id: product_id,
                quantity: 5,
            },
        ]; },
        status: types_1.orderStatus.PENDING,
    },
    newOrder: {
        products: function (product_id) { return [
            {
                product_id: product_id,
                quantity: 5,
            },
        ]; },
        status: types_1.orderStatus.PENDING,
    },
};
