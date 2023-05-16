"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var user_1 = __importDefault(require("./routes/user"));
var product_1 = __importDefault(require("./routes/product"));
var order_1 = __importDefault(require("./routes/order"));
var app = (0, express_1.default)();
var port = process.env.ENV === "test" ? 4000 : 4001;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: "https://localhost:".concat(port),
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.send("hello world");
});
(0, user_1.default)(app);
(0, product_1.default)(app);
(0, order_1.default)(app);
app.listen(port, function () {
    console.info("App is listening at http://localhost:".concat(port));
});
exports.default = app;
