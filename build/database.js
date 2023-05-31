"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "123",
        name: "regina",
        email: "user123@email.com",
        password: "senha123",
        created_at: new Date().toLocaleString(),
    },
    {
        id: "124",
        name: "Gabi",
        email: "user124@email.com",
        password: "senha124",
        created_at: new Date().toLocaleString(),
    },
];
exports.products = [
    {
        id: "pao123",
        name: "pao",
        price: 5,
        description: "string",
        imageUrl: "string",
        category: types_1.Category.FOOD,
    },
    {
        id: "sabao124",
        name: "sabão",
        price: 10,
        description: "string",
        imageUrl: "string",
        category: types_1.Category.CLEANING,
    },
];
function createUser(id, name, email, password) {
    exports.users.push({
        id,
        email,
        name,
        password,
        created_at: new Date().toLocaleString(),
    });
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, description, imageUrl, category) {
    exports.products.push({ id, name, price, description, imageUrl, category });
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
//# sourceMappingURL=database.js.map