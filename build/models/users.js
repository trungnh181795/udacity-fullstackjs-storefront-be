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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var types_1 = require("../types");
var use_database_1 = require("../utils/use-database");
var UserStore = /** @class */ (function () {
    function UserStore() {
        this.sqlQueries = {
            getAllUsers: "SELECT * FROM users",
            createUser: "INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *",
            getUserById: "SELECT * FROM users WHERE id=($1)",
            updateUserById: "UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *",
            deleteUserById: "DELETE FROM users WHERE id=($1)",
            authenticate: "SELECT password_digest FROM users WHERE username=($1)",
        };
    }
    UserStore.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.getAllUsers)];
                    case 1:
                        rows = _a.sent();
                        return [2 /*return*/, {
                                status: types_1.Status.SUCCESS,
                                data: rows,
                            }];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, {
                                status: types_1.Status.FAIL,
                                message: "Fail to get users' data. The error is: ".concat(err_1),
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var firstname, lastname, username, password, hash, rows, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firstname = user.firstname, lastname = user.lastname, username = user.username, password = user.password;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        hash = bcrypt_1.default.hashSync(password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS, 10));
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.createUser, [firstname, lastname, username, hash])];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, {
                                status: types_1.Status.SUCCESS,
                                data: rows[0],
                            }];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, {
                                status: types_1.Status.FAIL,
                                message: "Fail to add new user: ".concat(firstname, " ").concat(lastname, ". The error is: ").concat(err_2),
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.getUserById, [id])];
                    case 1:
                        rows = _a.sent();
                        if (!rows || rows.length <= 0) {
                            return [2 /*return*/, {
                                    status: types_1.Status.FAIL,
                                    message: "No user found for ".concat(id)
                                }];
                        }
                        return [2 /*return*/, {
                                status: types_1.Status.SUCCESS,
                                data: rows[0],
                            }];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, {
                                status: types_1.Status.FAIL,
                                message: "Fail to get user ".concat(id, ". The error is: ").concat(err_3),
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.updateUserById = function (id, newUserData) {
        return __awaiter(this, void 0, void 0, function () {
            var firstname, lastname, rows, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firstname = newUserData.firstname, lastname = newUserData.lastname;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.updateUserById, [firstname, lastname, id])];
                    case 2:
                        rows = _a.sent();
                        if (!rows || rows.length === 0) {
                            return [2 /*return*/, {
                                    status: types_1.Status.FAIL,
                                    message: "No user found for ".concat(id),
                                }];
                        }
                        return [2 /*return*/, {
                                status: types_1.Status.SUCCESS,
                                data: rows[0],
                            }];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, {
                                status: types_1.Status.FAIL,
                                message: "Fail to update user ".concat(id, " with ").concat(firstname, " and ").concat(lastname, ". The error is ").concat(err_4),
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.deleteUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.getUserById, [id])];
                    case 1:
                        rows = _a.sent();
                        if (!rows || rows.length <= 0) {
                            return [2 /*return*/, {
                                    status: types_1.Status.FAIL,
                                    message: "No user found for ".concat(id, "!"),
                                }];
                        }
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.deleteUserById, [id])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: types_1.Status.SUCCESS,
                                message: "Deleted user ".concat(id, " successfully!"),
                            }];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, {
                                status: types_1.Status.FAIL,
                                message: "Fail to delete user ".concat(id, ". The error is: ").concat(err_5),
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.authenticate = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, user, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, use_database_1.useDatabase)(this.sqlQueries.authenticate, [username])];
                    case 1:
                        rows = _a.sent();
                        if (rows.length > 0) {
                            user = rows[0];
                            if (bcrypt_1.default.compareSync(password + process.env.BCRYPT_PASSWORD, user.password_digest)) {
                                return [2 /*return*/, {
                                        status: types_1.Status.SUCCESS,
                                        data: user,
                                    }];
                            }
                        }
                        return [2 /*return*/, {
                                status: types_1.Status.FAIL,
                                data: null,
                                message: "Fail to  find user ".concat(username, ". No user found."),
                            }];
                    case 2:
                        err_6 = _a.sent();
                        return [2 /*return*/, {
                                status: types_1.Status.FAIL,
                                message: "Fail to  find user ".concat(username, ". The error is: ").concat(err_6),
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserStore;
}());
exports.UserStore = UserStore;
