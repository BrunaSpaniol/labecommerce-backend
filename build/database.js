"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategory = exports.deleteProduct = exports.deleteUser = exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchase = exports.products = exports.users = void 0;
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
        price: 5,
        category: types_1.Category.FOOD,
    },
    {
        id: "sabao124",
        name: "sabão",
        price: 10,
        category: types_1.Category.CLEANING,
    },
];
exports.purchase = [
    {
        userId: "123",
        productId: exports.products[1].id,
        quantity: 5,
        totalPrice: 25,
    },
    {
        userId: "124",
        productId: exports.products[1].id,
        quantity: 5,
        totalPrice: 50,
    },
];
function createUser(id, email, password) {
    exports.users.push({ id, email, password });
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    exports.products.push({ id, name, price, category });
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function getProductById(idToSearch) {
    const searchProduct = exports.products.find((product) => product.id === idToSearch);
    if (searchProduct) {
        console.log("objeto product encontrado");
        return searchProduct;
    }
    console.log("undefined");
}
exports.getProductById = getProductById;
function queryProductsByName(q) {
    return exports.products.filter(({ name }) => {
        return name.toLowerCase().includes(q.toLowerCase());
    });
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    exports.purchase.push({ userId, productId, quantity, totalPrice });
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userIdToSearch) {
    const filteredPurchases = exports.purchase.filter(({ userId }) => {
        return userId === userIdToSearch;
    });
    if (filteredPurchases) {
        console.log("objeto array de compras do user procurado encontrado");
        return filteredPurchases;
    }
    return undefined;
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
function deleteUser(userIdToDelete) {
    return exports.users.findIndex(({ id }) => {
        return id === userIdToDelete;
    });
}
exports.deleteUser = deleteUser;
function deleteProduct(productIdToDelete) {
    return exports.products.findIndex(({ id }) => {
        return id === productIdToDelete;
    });
}
exports.deleteProduct = deleteProduct;
function validateCategory(value) {
    let isCategory = false;
    for (let type in types_1.Category) {
        if (type === value) {
            isCategory = true;
        }
    }
    return isCategory;
}
exports.validateCategory = validateCategory;
//# sourceMappingURL=database.js.map