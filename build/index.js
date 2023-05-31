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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("./database/knex");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/ping", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send({ message: "Pong!" });
    }
    catch (error) {
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.raw(`
    SELECT * FROM users;
  `);
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
}));
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.raw(`
     SELECT * FROM products;
     `);
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
}));
app.get("/product/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        if (q.length < 1) {
            res.status(400);
            throw new Error("query params deve possuir pelo menos um caractere");
        }
        const [product] = yield knex_1.db.raw(`
    SELECT * FROM products
    WHERE name LIKE '${q}';
    `);
        res.status(200).send(product);
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
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, email, password, created_at } = req.body;
        if (typeof id !== "string" ||
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            typeof created_at !== ("string" || "null")) {
            res.status(400);
            throw new Error("todos os inputs devem ser tipo string");
        }
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            res.status(400);
            throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial");
        }
        yield knex_1.db.raw(`
    INSERT INTO users (id, email, name, password, created_at)
    VALUES ("${id}", "${email}", "${name}", "${password}", "${created_at}");
    `);
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
}));
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, price, description, imageUrl } = req.body;
        if (typeof id !== "string" ||
            typeof name !== "string" ||
            typeof price !== "number" ||
            typeof description !== "string" ||
            typeof imageUrl !== "string") {
            res.status(400);
            throw new Error("todos os inputs devem ser tipo correto");
        }
        const [notUniqueProduct] = yield knex_1.db.raw(`
      SELECT id FROM products
      WHERE id = '${id}' 
    `);
        if (notUniqueProduct) {
            res.status(406);
            throw new Error("Não é possível criar um produto com mesmo 'id'!");
        }
        yield knex_1.db.raw(`
    INSERT INTO products (id, name, price, description, image_url)
    VALUES ("${id}", "${name}", "${price}", "${description}", "${imageUrl}");
    `);
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
}));
app.post("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, buyer, totalPrice, createdAt, paid } = req.body;
        if (typeof id !== "string" ||
            typeof buyer !== "string" ||
            typeof totalPrice !== "number" ||
            typeof createdAt !== "string" ||
            typeof paid !== "number") {
            res.status(400);
            throw new Error("todos os inputs devem ser do tipo correto");
        }
        const [userExist] = yield knex_1.db.raw(`
    SELECT id FROM users
    WHERE id = '${buyer}' 
  `);
        if (!userExist) {
            res.status(404);
            throw new Error("Usuário não encontrado, verifique se já é cadastrado");
        }
        yield knex_1.db.raw(`
    INSERT INTO purchase (id, total_price, paid, created_at,buyer_id)
    VALUES ("${id}", "${totalPrice}", "${paid}", "${createdAt}", "${buyer}");
    `);
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
}));
app.put("/users/:id", (req, res) => {
    try {
        const id = req.params.id;
        if (typeof id !== "string" || id.length < 1) {
            res.status(400);
            throw new Error("'id' deve possuir pelo menos um caractere e ser uma string");
        }
        const newEmail = req.body.email;
        const newPassword = req.body.password;
        const newName = req.body.name;
        if (!newEmail && !newPassword && !newName) {
            res.status(400);
            throw new Error("para editar um usuário é necessário pelo menos um input");
        }
        const findUser = database_1.users.find((user) => {
            return user.id === id;
        });
        if (findUser) {
            findUser.id = id;
            findUser.name = newName || findUser.name;
            findUser.email = newEmail || findUser.email;
            findUser.password = newPassword || findUser.password;
            findUser.created_at = new Date().toLocaleString();
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
    const newDescription = req.body.description;
    const newImageUrl = req.body.imageUrl;
    const newCategory = req.body.category;
    if (!newName &&
        !newPrice &&
        !newDescription &&
        !newImageUrl &&
        !newCategory) {
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
        findProduct.description = newDescription || findProduct.description;
        findProduct.imageUrl = newImageUrl || findProduct.imageUrl;
        findProduct.category = newCategory || findProduct.category;
        res.status(200).send("Atualização realizada com sucesso");
        return;
    }
    res.status(400);
    throw new Error("Produto não encontrado");
});
app.get("/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (typeof id !== "string" || id.length < 1) {
            res.status(400);
            throw new Error("'id' deve possuir pelo menos um caractere e ser uma string");
        }
        const [result] = yield knex_1.db.raw(`
    SELECT * FROM products
    WHERE id = '${id}' 
  `);
        if (!result) {
            res.status(404);
            throw new Error("Produto não encontrado, verifique se já é cadastrado");
        }
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
}));
//# sourceMappingURL=index.js.map