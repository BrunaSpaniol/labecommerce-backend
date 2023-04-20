"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/ping", (req, res) => {
    res.send("Pong!");
});
app.get("/users", (req, res) => {
    res.status(200).send(database_1.users);
});
app.get("/products", (req, res) => {
    res.status(200).send(database_1.products);
});
app.get("/product/search", (req, res) => {
    const q = req.query.q;
    const result = (0, database_1.queryProductsByName)(q);
    res.status(200).send(result);
});
app.post("/users", (req, res) => {
    const { id, email, password } = req.body;
    (0, database_1.createUser)(id, email, password);
    res.status(200).send("Usuário criado com sucesso!");
});
app.post("/products", (req, res) => {
    const { id, name, price, category } = req.body;
    (0, database_1.createProduct)(id, name, price, category);
    res.status(200).send("Produto criado com sucesso!");
});
app.post("/purchases", (req, res) => {
    const { userId, productId, quantity, totalPrice } = req.body;
    (0, database_1.createPurchase)(userId, productId, quantity, totalPrice);
    res.status(200).send("Compra cadastrada com sucesso!");
});
//# sourceMappingURL=index.js.map