"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
var types_1 = require("../types");
var use_database_1 = require("../utils/use-database");
var OrderStore = /** @class */ (function () {
    function OrderStore() {
        this.sqlQueries = {
            getAllOrders: "SELECT * FROM orders",
            getUserById: "SELECT * FROM users WHERE id=($1)",
            getOrderProductsById: "SELECT product_id, quantity FROM order_products WHERE order_id=($1)",
            createOrder: "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *",
            createOrderProducts: "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity",
            getOrderById: "SELECT * FROM orders WHERE id=($1)",
            updateOrderById: "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
            updateOrderProducts: "UPDATE order_products SET product_id = $1, quantity = $2 WHERE order_id = $3 RETURNING product_id, quantity",
            deleteOrderById: "DELETE FROM orders WHERE id=($1)",
            deleteOrderProducts: "DELETE FROM order_products WHERE order_id=($1)",
        };
    }
    OrderStore.prototype.getAllOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows, records, orders, _i, orders_1, order, rows_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.getAllOrders)];
                    case 1:
                        rows = _a.sent();
                        records = [];
                        orders = __spreadArray([], rows, true);
                        if (!orders || rows.length === 0) {
                            return [2 /*return*/, {
                                    status: types_1.Status.FAIL,
                                    message: 'No orders found',
                                }];
                        }
                        _i = 0, orders_1 = orders;
                        _a.label = 2;
                    case 2:
                        if (!(_i < orders_1.length)) return [3 /*break*/, 5];
                        order = orders_1[_i];
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.getOrderProductsById, [order.id])];
                    case 3:
                        rows_1 = _a.sent();
                        records.push(__assign(__assign({}, order), { products: rows_1 }));
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, {
                            status: types_1.Status.SUCCESS,
                            data: records,
                        }];
                    case 6:
                        err_1 = _a.sent();
                        return [2 /*return*/, {
                                status: types_1.Status.FAIL,
                                message: "Fail to get orders. The error is: ".concat(err_1),
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.createOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var products, status, user_id, users, rows, order_1, orderProducts, _i, products_1, product, product_id, quantity, rows_2, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        products = order.products, status = order.status, user_id = order.user_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.getUserById, [user_id])];
                    case 2:
                        users = _a.sent();
                        if (!users || users.length === 0) {
                            return [2 /*return*/, {
                                    status: types_1.Status.FAIL,
                                    message: "No user found for ".concat(user_id),
                                }];
                        }
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.createOrder, [user_id, status])];
                    case 3:
                        rows = _a.sent();
                        order_1 = rows[0];
                        orderProducts = [];
                        _i = 0, products_1 = products;
                        _a.label = 4;
                    case 4:
                        if (!(_i < products_1.length)) return [3 /*break*/, 7];
                        product = products_1[_i];
                        product_id = product.product_id, quantity = product.quantity;
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.createOrderProducts, [order_1.id, product_id, quantity])];
                    case 5:
                        rows_2 = _a.sent();
                        orderProducts.push(rows_2[0]);
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        if (orderProducts.length === 0) {
                            return [2 /*return*/, {
                                    status: types_1.Status.FAIL,
                                    message: "Products cannot be empty",
                                }];
                        }
                        return [2 /*return*/, {
                                status: types_1.Status.SUCCESS,
                                data: __assign(__assign({}, order_1), { products: orderProducts }),
                            }];
                    case 8:
                        err_2 = _a.sent();
                        return [2 /*return*/, {
                                status: types_1.Status.FAIL,
                                message: "Fail to add new order for user ".concat(user_id, ". The error is: ").concat(err_2),
                            }];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.getOrderById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, order, orderProductRows, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.getOrderById, [id])];
                    case 1:
                        rows = _a.sent();
                        order = rows[0];
                        if (!order) {
                            return [2 /*return*/, {
                                    status: types_1.Status.FAIL,
                                    message: "No order found for ".concat(id),
                                }];
                        }
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.getOrderProductsById, [id])];
                    case 2:
                        orderProductRows = _a.sent();
                        return [2 /*return*/, {
                                status: types_1.Status.SUCCESS,
                                data: __assign(__assign({}, order), { products: orderProductRows }),
                            }];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, {
                                status: types_1.Status.FAIL,
                                message: "Fail to find order ".concat(id, ". The error is: ").concat(err_3),
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.updateOrderById = function (id, orderData) {
        return __awaiter(this, void 0, void 0, function () {
            var products, status, user_id, selectedOrder, rows, order, orderProducts, _i, products_2, product, rows_3, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        products = orderData.products, status = orderData.status, user_id = orderData.user_id;
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.getOrderById, [id])];
                    case 1:
                        selectedOrder = _a.sent();
                        if (!selectedOrder || selectedOrder.length === 0) {
                            return [2 /*return*/, {
                                    status: types_1.Status.FAIL,
                                    message: "Order ".concat(id, " not found")
                                }];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, , 9]);
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.updateOrderById, [status, id])];
                    case 3:
                        rows = _a.sent();
                        order = rows[0];
                        orderProducts = [];
                        _i = 0, products_2 = products;
                        _a.label = 4;
                    case 4:
                        if (!(_i < products_2.length)) return [3 /*break*/, 7];
                        product = products_2[_i];
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.updateOrderProducts, [product.product_id, product.quantity, order.id])];
                    case 5:
                        rows_3 = _a.sent();
                        orderProducts.push(rows_3[0]);
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [2 /*return*/, {
                            status: types_1.Status.SUCCESS,
                            data: __assign(__assign({}, order), { products: orderProducts }),
                        }];
                    case 8:
                        err_4 = _a.sent();
                        throw new Error("Fail to update order for user ".concat(user_id, ". The erro is: ").concat(err_4));
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.deleteOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, order, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.getOrderById, [id])];
                    case 1:
                        rows = _a.sent();
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.deleteOrderProducts, [
                                id,
                            ])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.deleteOrderById, [id])];
                    case 3:
                        _a.sent();
                        order = rows[0];
                        if (!order) {
                            return [2 /*return*/, {
                                    status: types_1.Status.FAIL,
                                    message: "No order found for ".concat(id),
                                }];
                        }
                        return [2 /*return*/, {
                                status: types_1.Status.SUCCESS,
                                message: "Delelted order ".concat(id, " successfully!"),
                            }];
                    case 4:
                        err_5 = _a.sent();
                        return [2 /*return*/, {
                                status: types_1.Status.FAIL,
                                message: "Fail to delete order ".concat(id, ". The error is: ").concat(err_5),
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
