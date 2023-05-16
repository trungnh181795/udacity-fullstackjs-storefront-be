"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = exports.getUserToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var types_1 = require("../types");
var dotenv_1 = __importDefault(require("dotenv"));
var constant_1 = require("../constant");
dotenv_1.default.config();
var TOKEN_KEY = process.env.TOKEN_KEY;
var getUserToken = function (user) {
    //sign = create a token
    return jsonwebtoken_1.default.sign({ user: user }, TOKEN_KEY);
};
exports.getUserToken = getUserToken;
var verifyAuthToken = function (req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).json({ error: constant_1.messages.utils.invalidToken });
        return {
            status: types_1.Status.FAIL,
            message: constant_1.messages.utils.invalidToken,
        };
    }
    try {
        var token = req.headers.authorization.split(" ")[1];
        jsonwebtoken_1.default.verify(token, TOKEN_KEY);
        next();
        return {
            status: types_1.Status.SUCCESS,
            message: "Verified token successfully"
        };
    }
    catch (err) {
        res.status(401).json(constant_1.messages.utils.invalidToken);
        return {
            status: types_1.Status.FAIL,
            message: "Failed to verify token. The error is: ".concat(err),
        };
    }
};
exports.verifyAuthToken = verifyAuthToken;
