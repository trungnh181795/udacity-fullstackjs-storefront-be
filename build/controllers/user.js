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
exports.authenticate = exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.createUser = exports.getAllUsers = void 0;
var users_1 = require("../models/users");
var constant_1 = require("../constant");
var authentication_1 = require("../middleware/authentication");
var types_1 = require("../types");
var userStore = new users_1.UserStore();
var getAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userStore.getAllUsers()];
            case 1:
                users = (_a.sent()).data;
                res.status(200).json(users);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstname, lastname, username, password, user, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, firstname = _a.firstname, lastname = _a.lastname, username = _a.username, password = _a.password;
                if (!firstname || !lastname || !username || !password) {
                    res.status(400).send(constant_1.messages.controllers.user.createUserFailed);
                }
                return [4 /*yield*/, userStore.createUser({
                        firstname: firstname,
                        lastname: lastname,
                        username: username,
                        password: password,
                    })];
            case 1:
                user = (_b.sent()).data;
                res.status(201).json({
                    user_id: user.id,
                    tokens: (0, authentication_1.getUserToken)(user),
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
exports.createUser = createUser;
var getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, user, status_1, message, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (!id) {
                    return [2 /*return*/, res.status(400).send(constant_1.messages.controllers.user.getUserByIdFailed)];
                }
                return [4 /*yield*/, userStore.getUserById(id)];
            case 1:
                _a = _b.sent(), user = _a.data, status_1 = _a.status, message = _a.message;
                if (status_1 === types_1.Status.FAIL) {
                    res.status(404).json(message);
                }
                return [2 /*return*/, res.status(200).json(user)];
            case 2:
                err_3 = _b.sent();
                res.status(400).json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
var updateUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, firstname, lastname, _b, user, status_2, message, err_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                id = req.params.id;
                _a = req.body, firstname = _a.firstname, lastname = _a.lastname;
                if (!firstname || !lastname || !id) {
                    return [2 /*return*/, res.status(400).send(constant_1.messages.controllers.user.updateUserFailed)];
                }
                return [4 /*yield*/, userStore.updateUserById(parseInt(id), {
                        firstname: firstname,
                        lastname: lastname,
                    })];
            case 1:
                _b = _c.sent(), user = _b.data, status_2 = _b.status, message = _b.message;
                if (status_2 === types_1.Status.FAIL) {
                    return [2 /*return*/, res.status(404).json(message)];
                }
                return [2 /*return*/, res.status(201).json(user)];
            case 2:
                err_4 = _c.sent();
                res.status(400).json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUserById = updateUserById;
var deleteUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, status_3, message, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (!id) {
                    return [2 /*return*/, res.status(400).send(constant_1.messages.controllers.user.deleteUserFailed)];
                }
                return [4 /*yield*/, userStore.deleteUserById(id)];
            case 1:
                _a = _b.sent(), status_3 = _a.status, message = _a.message;
                if (status_3 === types_1.Status.FAIL) {
                    return [2 /*return*/, res.status(404).send(message)];
                }
                return [2 /*return*/, res.status(201).send(message)];
            case 2:
                err_5 = _b.sent();
                res.status(400).json(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUserById = deleteUserById;
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, username, _c, password, user, err_6;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                _a = req.body, _b = _a.username, username = _b === void 0 ? constant_1.defaultValues.userAuth.username : _b, _c = _a.password, password = _c === void 0 ? constant_1.defaultValues.userAuth.password : _c;
                if (!username || !password) {
                    return [2 /*return*/, res.status(400).send(constant_1.messages.controllers.user.authenticateFailed)];
                }
                return [4 /*yield*/, userStore.authenticate(username, password)];
            case 1:
                user = (_d.sent()).data;
                if (!user) {
                    return [2 /*return*/, res.status(401).send("Wrong password for user ".concat(username, "."))];
                }
                res.status(200).json((0, authentication_1.getUserToken)(user));
                return [3 /*break*/, 3];
            case 2:
                err_6 = _d.sent();
                res.status(400).json(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.authenticate = authenticate;
