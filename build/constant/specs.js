"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
exports.specs = {
    models: {
        user: {
            describe: "User Model",
            it: {
                haveGetAllUsers: "should have getAllUser method",
                haveGetUserById: "should have getUserById method",
                haveCreateUser: "should have createUser method",
                haveUpdateUser: "should have updateUser method",
                haveRemoveUser: "should have removeUser method",
                canReturnUsers: "should return list of users",
                canCreateUser: "should create a user",
                canReturnUserById: "should return correct user",
                canRemoveUser: "should remove correct user",
                canUpdateUser: "should update correct user",
            },
        },
        product: {
            describe: "Product Model",
            it: {
                haveGetAllProducts: "should have getAllProduct method",
                haveGetProductById: "should have getProductById method",
                haveCreateProduct: "should have createProduct method",
                haveUpdateProduct: "should have updateProduct method",
                haveRemoveProduct: "should have removeProduct method",
                canReturnProducts: "should return list of Products",
                canCreateProduct: "should create a Product",
                canReturnProductById: "should return correct Product",
                canRemoveProduct: "should remove correct Product",
                canUpdateProduct: "should update correct Product",
            },
        },
        order: {
            describe: "Order Model",
            it: {
                haveGetAllOrders: "should have getAllOrder method",
                haveGetOrderById: "should have getOrderById method",
                haveCreateOrder: "should have createOrder method",
                haveUpdateOrder: "should have updateOrder method",
                haveRemoveOrder: "should have removeOrder method",
                canReturnOrders: "should return list of Orders",
                canCreateOrder: "should create a Order",
                canReturnOrderById: "should return correct Order",
                canRemoveOrder: "should remove correct Order",
                canUpdateOrder: "should update correct Product",
            },
        },
    },
    controller: {
        user: {
            describe: "User Controller",
            it: {
                haveGetAllUserEndpoint: "should have the get all users endpoint",
                haveCreateUserEndpoint: "should have the create user endpoint",
                haveGetUserByIdEndpoint: "should have the get user by id endpoint",
                haveUpdateUserEndpoint: "should have the update user endpoint",
                haveRemoveUserEndpoint: "should have the remove user endpoint",
                haveAuthEndpoint: "should have the auth endpoint",
                haveRejectedAuthEndpoint: "should have the rejected auth endpoint if wrong password",
            },
        },
        product: {
            describe: "Product Controller",
            it: {
                haveGetAllProductEndpoint: "should have the get all Products endpoint",
                haveCreateProductEndpoint: "should have the create Product endpoint",
                haveGetProductByIdEndpoint: "should have the get Product by id endpoint",
                haveUpdateProductEndpoint: "should have the update Product endpoint",
                haveRemoveProductEndpoint: "should have the remove Product endpoint",
            },
        },
        order: {
            describe: "Order Controller",
            it: {
                haveGetAllOrderEndpoint: "should have the get all Orders endpoint",
                haveCreateOrderEndpoint: "should have the create Order endpoint",
                haveGetOrderByIdEndpoint: "should have the get Order by id endpoint",
                haveUpdateOrderEndpoint: "should have the update Order endpoint",
                haveRemoveOrderEndpoint: "should have the remove Order endpoint",
            },
        },
    },
};
