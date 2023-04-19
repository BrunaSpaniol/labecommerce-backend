"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchase = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "123",
        email: "user123@email.com",
        password: "senha123",
    },
    {
        id: "124",
        email: "user124@email.com",
        password: "senha124",
    },
];
exports.products = [
    {
        id: "pao123",
        name: "pao",
        price: 5.0,
        category: types_1.category.FOOD,
    },
    {
        id: "sabao124",
        name: "sabão",
        price: 10.0,
        category: types_1.category.CLEANING,
    },
];
exports.purchase = [
    {
        userId: exports.users[0].id,
        productId: exports.products[1].id,
        quantity: 5,
        totalPrice: exports.products[1].price * 5,
    },
    {
        userId: exports.users[1].id,
        productId: exports.products[0].id,
        quantity: 5,
        totalPrice: 15,
    },
];
function createUser(id, email, password) {
    exports.users.push({ id, email, password });
    console.log("Cadastro realizado com sucesso");
    return exports.users;
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    exports.products.push({ id, name, price, category });
    console.log("Produto criado com sucesso");
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function getProductById(idToSearch) {
    const searchProduct = exports.products.find((product) => product.id === idToSearch);
    if (searchProduct) {
        console.log("o produto encontrado", searchProduct);
        return;
    }
    console.log("undefined");
}
exports.getProductById = getProductById;
function queryProductsByName(q) {
    const filteredProducts = exports.products.filter(({ name }) => name.includes(q.toLowerCase()));
    console.log(filteredProducts);
    return filteredProducts;
}
exports.queryProductsByName = queryProductsByName;
function getAllPurchasesFromUserId(userIdToSearch) {
    const filteredPurchases = exports.purchase.filter(({ userId }) => userId === userIdToSearch);
    console.log(filteredPurchases);
    return filteredPurchases;
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map