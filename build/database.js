"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.products = exports.users = void 0;
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
        category: "food",
    },
    {
        id: "sabao124",
        name: "sabão",
        price: 10,
        category: "cleaning",
    },
];
exports.purchase = [
    {
        userId: exports.users[0].id,
        productId: exports.products[1].id,
        quantity: 5,
        get totalPrice() { return exports.products[1].price * this.quantity; }
    },
    {
        userId: exports.users[1].id,
        productId: exports.products[1].id,
        quantity: 5,
        get totalPrice() { return exports.products[1].price * this.quantity; }
    },
];
//# sourceMappingURL=database.js.map