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
app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const findUser = database_1.users.find((user) => {
        return user.id === id;
    });
    if (findUser) {
        (findUser.id = id),
            (findUser.email = newEmail || findUser.email),
            (findUser.password = newPassword || findUser.password);
        res.status(200).send("Atualização realizada com sucesso");
    }
    res.status(400).send("Usuário não encontrado");
});
app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newCategory = req.body.category;
    const findProduct = database_1.products.find((product) => {
        return product.id === id;
    });
    if (findProduct) {
        findProduct.id = id;
        findProduct.name = newName || findProduct.name;
        findProduct.price = newPrice !== null && newPrice !== void 0 ? newPrice : findProduct.price;
        findProduct.category = newCategory || findProduct.category;
        res.status(200).send("Atualização realizada com sucesso");
    }
    res.status(400).send("Usuário não encontrado");
});
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const userResult = (0, database_1.deleteUser)(id);
    userResult < 0
        ? res.status(404).send("Item não encontrado")
        : (database_1.users.splice(userResult, 1),
            res.status(200).send("Item deletado com sucesso!"));
});
app.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    const productResult = (0, database_1.deleteProduct)(id);
    productResult < 0
        ? res.status(404).send("Item não encontrado")
        : (database_1.users.splice(productResult, 1),
            res.status(200).send("Item deletado com sucesso!"));
});
app.get("/product/:id", (req, res) => {
    const { id } = req.params;
    const result = (0, database_1.getProductById)(id);
    res.status(200).send(result);
});
app.get("/users/:id/purchases", (req, res) => {
    const { id } = req.params;
    const result = (0, database_1.getAllPurchasesFromUserId)(id);
    res.status(200).send(result);
});
//# sourceMappingURL=index.js.map