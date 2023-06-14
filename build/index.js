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
        const result = yield (0, knex_1.db)("users").select("id", "name", "email", "password", "created_at AS createdAt");
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
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
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, email, password } = req.body;
        if (typeof id !== "string" ||
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string") {
            res.status(400);
            throw new Error("todos os inputs devem ser tipo string");
        }
        if (!id || !name || !email || !password) {
            res.status(400);
            throw new Error("Dados inválidos");
        }
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            res.status(400);
            throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial");
        }
        const [notUniqueUser] = yield (0, knex_1.db)("users").where({ id: id });
        if (!!notUniqueUser) {
            res.status(406);
            throw new Error("Não é possível criar uma conta com mesmo 'id' ou 'email'!");
        }
        const newUser = {
            id: id,
            name: name,
            email: email,
            password: password,
        };
        yield (0, knex_1.db)("users").insert(newUser);
        res.status(200).send({ message: "Usuário criado com sucesso!" });
    }
    catch (error) {
        console.log(error);
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
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, price, description, imageUrl } = req.body;
        if (typeof id !== "string" ||
            typeof name !== "string" ||
            typeof price !== "number" ||
            typeof description !== "string" ||
            typeof imageUrl !== "string") {
            res.status(400);
            throw new Error("todos os inputs devem ser do tipo correto");
        }
        if (!id || !name || isNaN(price) || !description || !imageUrl) {
            res.status(400);
            throw new Error("Dados inválidos");
        }
        const [notUniqueProduct] = yield (0, knex_1.db)("products").where({ id: id });
        if (!!notUniqueProduct) {
            res.status(406);
            throw new Error("Não é possível criar um produto com mesmo 'id'!");
        }
        const newProduct = {
            id: id,
            name: name,
            price: price,
            description: description,
            image_url: imageUrl,
        };
        yield knex_1.db.insert(newProduct).into("products");
        res.status(200).send({ message: "Produto criado com sucesso!" });
    }
    catch (error) {
        console.log(error);
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
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("products");
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
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
app.get("/product/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        if (q.length < 1) {
            res.status(400);
            throw new Error("query params deve possuir pelo menos um caractere");
        }
        const result = yield (0, knex_1.db)("products")
            .select()
            .where("name", "LIKE", `%${q}%`);
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
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
app.put("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const newId = req.body.id;
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newDescription = req.body.description;
        const newImageUrl = req.body.imageUrl;
        if (!newName && !newPrice && !newDescription && !newImageUrl) {
            res.status(400);
            throw new Error("para editar uma compra é necessário informar pelo menos um input");
        }
        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400);
                throw new Error("'id' deve ser string");
            }
            if (newId.length < 1) {
                res.status(400);
                throw new Error("'id' deve possuir no mínimo 1 caractere");
            }
        }
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400);
                throw new Error("'name' deve ser string");
            }
            if (newName.length < 1) {
                res.status(400);
                throw new Error("'name' deve possuir no mínimo 1 caractere");
            }
        }
        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400);
                throw new Error("'price' deve ser number");
            }
            if (isNaN(newPrice)) {
                res.status(400);
                throw new Error("'price' deve ser um valor válido");
            }
        }
        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                res.status(400);
                throw new Error("'description' deve ser string");
            }
            if (newDescription.length < 1) {
                res.status(400);
                throw new Error("'description' deve possuir no mínimo 1 caractere");
            }
        }
        if (newImageUrl !== undefined) {
            if (typeof newImageUrl !== "string") {
                res.status(400);
                throw new Error("'imageUrl' deve ser string");
            }
            if (newImageUrl.length < 1) {
                res.status(400);
                throw new Error("'imageUrl' deve possuir no mínimo 1 caractere");
            }
        }
        const [findProduct] = yield (0, knex_1.db)("products").where({ id: id });
        if (!!findProduct) {
            const updatedProduct = {
                id: newId || id,
                name: newName || findProduct.name,
                price: newPrice || findProduct.price,
                description: newDescription || findProduct.description,
                imageUrl: newImageUrl || findProduct.imageUrl,
            };
            yield (0, knex_1.db)("products").update(updatedProduct).where({ id: id });
            res.status(200).send({ message: "Atualização realizada com sucesso" });
        }
        else {
            res.status(400);
            throw new Error("Produto não encontrado");
        }
    }
    catch (error) {
        console.log(error);
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
app.post("/purchase", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, buyer, products } = req.body;
        if (typeof id !== "string" || typeof buyer !== "string") {
            res.status(400);
            throw new Error("todos os inputs devem ser do tipo correto");
        }
        if (!id || !buyer) {
            res.status(400);
            throw new Error("todos os inputs devem ser preenchidos");
        }
        const [purchaseExist] = yield (0, knex_1.db)("purchase").where({ id: id });
        if (!!purchaseExist) {
            res.status(400);
            throw new Error("O 'id' da compra já existe");
        }
        const [userExist] = yield (0, knex_1.db)("users").where({ id: buyer });
        if (!userExist) {
            res.status(400);
            throw new Error("o usuário não existe");
        }
        let newPurchase = {
            id: id,
            buyer_id: buyer,
            total_price: 0,
        };
        yield knex_1.db.insert(newPurchase).into("purchase");
        const productsDB = yield Promise.all(products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const [productExist] = yield (0, knex_1.db)("products").where({
                id: product.product_id,
            });
            newPurchase.total_price += productExist.price * product.quantity;
            yield knex_1.db
                .insert({
                purchase_id: id,
                product_id: productExist.id,
                quantity: product.quantity,
            })
                .into("purchases_products");
            return productExist;
        })));
        console.log(productsDB, "produtos promise.all");
        console.log(newPurchase, "new purchase");
        yield knex_1.db.update(newPurchase).into("purchase").where({ id: id });
        res.status(200).send("Compra cadastrada com sucesso!");
    }
    catch (error) {
        console.log(error);
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
app.delete("/purchase/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [isPurchaseExist] = yield (0, knex_1.db)("purchase").where({
            id: id,
        });
        if (!isPurchaseExist) {
            res.status(404);
            throw new Error("Compra não cadastrada");
        }
        const isPurchasesProducts = yield (0, knex_1.db)("purchases_products").where({
            purchase_id: id,
        });
        if (isPurchasesProducts.length > 0) {
            yield (0, knex_1.db)("purchases_products").del().where({
                purchase_id: id,
            });
        }
        yield (0, knex_1.db)("purchase").del().where({
            id: id,
        });
        res.status(200).send("Compra deletada com sucesso.");
    }
    catch (error) {
        console.log(error);
        if (error.statusCode === 200) {
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
app.get("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [isPurchase] = yield (0, knex_1.db)("purchase").where({
            id: id,
        });
        if (!isPurchase) {
            res.status(400);
            throw new Error("Compra inexistente!");
        }
        const [getPurchase] = yield (0, knex_1.db)("purchase")
            .select("purchase.id AS purchaseId", "users.id AS buyerId", "users.name AS buyerName", "users.email AS buyerEmail", "purchase.total_price AS totalPrice", "purchase.created_at AS createdAt")
            .where({
            "purchase.id": id,
        })
            .innerJoin("users", "purchase.buyer_id", "=", "users.id");
        const getPurchaseProducts = yield (0, knex_1.db)("purchases_products")
            .select()
            .where({
            purchase_id: id,
        })
            .innerJoin("products", "purchases_products.product_id", "=", "products.id");
        const purchase = Object.assign(Object.assign({}, getPurchase), { products: getPurchaseProducts });
        res.status(200).send(purchase);
    }
    catch (error) {
        console.log(error);
        if (error.statusCode === 200) {
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