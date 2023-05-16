"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.createProduct = exports.getAllProducts = void 0;
var products_1 = require("../models/products");
var constant_1 = require("../constant");
var types_1 = require("../types");
var productStore = new products_1.ProductStore();
var getAllProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, productStore.getAllProducts()];
            case 1:
                products = (_a.sent()).data;
                res.status(200).json(products);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllProducts = getAllProducts;
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, price, product, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, price = _a.price;
                if (!name_1 || !price) {
                    return [2 /*return*/, res
                            .status(400)
                            .send(constant_1.messages.controllers.product.createProductFailed)];
                }
                return [4 /*yield*/, productStore.createProduct({ name: name_1, price: price })];
            case 1:
                product = (_b.sent()).data;
                res.status(201).json({
                    product: product,
                });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                res.status(400).json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createProduct = createProduct;
var getProductById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, product, status_1, message, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (!id) {
                    return [2 /*return*/, res
                            .status(400)
                            .send(constant_1.messages.controllers.product.getProductByIdFailed)];
                }
                return [4 /*yield*/, productStore.getProductById(parseInt(id))];
            case 1:
                _a = _b.sent(), product = _a.data, status_1 = _a.status, message = _a.message;
                if (status_1 === types_1.Status.FAIL) {
                    return [2 /*return*/, res.status(400).send(message)];
                }
                return [2 /*return*/, res.status(200).json(product)];
            case 2:
                err_3 = _b.sent();
                res.status(400).json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProductById = getProductById;
var updateProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name_2, price, _b, product, status_2, message, err_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                id = req.params.id;
                _a = req.body, name_2 = _a.name, price = _a.price;
                if (!name_2 || !price || !id) {
                    return [2 /*return*/, res
                            .status(400)
                            .send(constant_1.messages.controllers.product.updateProductFailed)];
                }
                return [4 /*yield*/, productStore.updateProductById(parseInt(id), {
                        name: name_2,
                        price: parseInt(price),
                    })];
            case 1:
                _b = _c.sent(), product = _b.data, status_2 = _b.status, message = _b.message;
                if (status_2 === types_1.Status.FAIL) {
                    return [2 /*return*/, res.status(400).send(message)];
                }
                return [2 /*return*/, res.status(201).json(product)];
            case 2:
                err_4 = _c.sent();
                res.status(400).json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateProduct = updateProduct;
var deleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, status_3, message, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (!id) {
                    return [2 /*return*/, res
                            .status(400)
                            .send(constant_1.messages.controllers.product.deleteProductFailed)];
                }
                return [4 /*yield*/, productStore.deleteProduct(id)];
            case 1:
                _a = _b.sent(), status_3 = _a.status, message = _a.message;
                if (status_3 === types_1.Status.FAIL) {
                    return [2 /*return*/, res.status(400).send(message)];
                }
                return [2 /*return*/, res.status(201).send("Product with id ".concat(id, " successfully deleted."))];
            case 2:
                err_5 = _b.sent();
                res.status(400).json(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteProduct = deleteProduct;
