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
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.get("/products", (req, res) => {
    try {
        res.status(200).send(database_1.products);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.get("/product/search", (req, res) => {
    try {
        const q = req.query.q;
        if (q.length < 1) {
            res.status(400);
            throw new Error("query params deve possuir pelo menos um caractere");
        }
        const result = (0, database_1.queryProductsByName)(q);
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.post("/users", (req, res) => {
    try {
        const { id, email, password } = req.body;
        if (typeof id !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string") {
            res.status(400);
            throw new Error("todos os inputs devem ser tipo string");
        }
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            res.status(400);
            throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial");
        }
        const notUniqueUser = database_1.users.findIndex((user) => {
            return user.id === id || user.email === email;
        });
        if (notUniqueUser) {
            res.status(406);
            throw new Error("Não é possível criar uma conta com mesmo 'id' ou 'email'!");
        }
        (0, database_1.createUser)(id, email, password);
        res.status(200).send("Usuário criado com sucesso!");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.post("/products", (req, res) => {
    try {
        const { id, name, price, category } = req.body;
        (0, database_1.createProduct)(id, name, price, category);
        if (typeof id !== "string" ||
            typeof name !== "string" ||
            typeof price !== "number" ||
            typeof category !== "string") {
            res.status(400);
            throw new Error("todos os inputs devem ser tipo correto");
        }
        if (!(0, database_1.validateCategory)(category)) {
            res.status(400);
            throw new Error("Essa categoria não é válida");
        }
        const notUniqueProduct = database_1.products.findIndex((product) => {
            return product.id === id;
        });
        if (notUniqueProduct) {
            res.status(406);
            throw new Error("Não é possível criar um produto com mesmo 'id'!");
        }
        res.status(200).send("Produto criado com sucesso!");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.post("/purchases", (req, res) => {
    try {
        const { userId, productId, quantity, totalPrice } = req.body;
        if (typeof userId !== "string" ||
            typeof productId !== "string" ||
            typeof quantity !== "number" ||
            typeof totalPrice !== "number") {
            res.status(400);
            throw new Error("todos os inputs devem ser do tipo correto");
        }
        const userExist = database_1.users.findIndex((user) => {
            return user.id === userId;
        });
        if (!userExist) {
            res.status(404);
            throw new Error("Usuário não encontrado, verifique se já é cadastrado");
        }
        const productExist = database_1.products.findIndex((product) => {
            return product.id === productId;
        });
        if (!productExist) {
            res.status(404);
            throw new Error("Produto não encontrado, verifique se já é cadastrado");
        }
        if (database_1.products[productExist].price * quantity !== totalPrice) {
            res.status(400);
            throw new Error("Preço total está incorreto");
        }
        (0, database_1.createPurchase)(userId, productId, quantity, totalPrice);
        res.status(200).send("Compra cadastrada com sucesso!");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.put("/users/:id", (req, res) => {
    try {
        const id = req.params.id;
        if (typeof id !== "string" || id.length < 1) {
            res.status(400);
            throw new Error("'id' deve possuir pelo menos um caractere e ser uma string");
        }
        const newEmail = req.body.email;
        const newPassword = req.body.password;
        if (typeof newEmail === "undefined" && typeof newPassword === "undefined") {
            res.status(400);
            throw new Error("para editar um usuário é necessário pelo menos um input");
        }
        const findUser = database_1.users.find((user) => {
            return user.id === id;
        });
        if (findUser) {
            findUser.id = id;
            findUser.email = newEmail || findUser.email;
            findUser.password = newPassword || findUser.password;
            res.status(200).send("Atualização realizada com sucesso");
        }
        res.status(400);
        throw new Error("Usuário não encontrado");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    if (typeof id !== "string" || id.length < 1) {
        res.status(400);
        throw new Error("'id' deve possuir pelo menos um caractere e ser uma string");
    }
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newCategory = req.body.category;
    if (!newName && !newPrice && !newCategory) {
        res.status(400);
        throw new Error("para editar uma compra é necessário informar pelo menos um input");
    }
    const findProduct = database_1.products.find((product) => {
        return product.id === id;
    });
    if (findProduct) {
        findProduct.id = id;
        findProduct.name = newName || findProduct.name;
        findProduct.price = newPrice || findProduct.price;
        findProduct.category = newCategory || findProduct.category;
        res.status(200).send("Atualização realizada com sucesso");
        return;
    }
    res.status(400);
    throw new Error("Produto não encontrado");
});
app.delete("/users/:id", (req, res) => {
    try {
        const { id } = req.params;
        if (typeof id !== "string" || id.length < 1) {
            res.status(400);
            throw new Error("'id' deve possuir pelo menos um caractere e ser uma string");
        }
        const userResult = (0, database_1.deleteUser)(id);
        if (userResult < 0) {
            res.status(404);
            throw new Error("Item não encontrado");
        }
        database_1.users.splice(userResult, 1),
            res.status(200).send("Item deletado com sucesso!");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.delete("/products/:id", (req, res) => {
    try {
        const { id } = req.params;
        if (typeof id !== "string" || id.length < 1) {
            res.status(400);
            throw new Error("'id' deve possuir pelo menos um caractere e ser uma string");
        }
        const productResult = (0, database_1.deleteProduct)(id);
        if (productResult < 0) {
            res.status(404);
            throw new Error("Item não encontrado");
        }
        database_1.users.splice(productResult, 1);
        res.status(200).send("Item deletado com sucesso!");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.get("/product/:id", (req, res) => {
    try {
        const { id } = req.params;
        if (typeof id !== "string" || id.length < 1) {
            res.status(400);
            throw new Error("'id' deve possuir pelo menos um caractere e ser uma string");
        }
        const result = (0, database_1.getProductById)(id);
        if (!result) {
            res.status(404);
            throw new Error("produto não encontrado");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
app.get("/users/:id/purchases", (req, res) => {
    try {
        const { id } = req.params;
        if (typeof id !== "string" || id.length < 1) {
            res.status(400);
            throw new Error("'id' deve possuir pelo menos um caractere e ser uma string");
        }
        const result = (0, database_1.getAllPurchasesFromUserId)(id);
        if (!result) {
            res.status(404);
            throw new Error("compra não realizada ou usuário não existe");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
});
//# sourceMappingURL=index.js.map