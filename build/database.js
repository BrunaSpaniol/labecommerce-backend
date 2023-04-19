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
        price: 5.0,
        category: "food",
    },
    {
        id: "sabao124",
        name: "sabão",
        price: 10.0,
        category: "cleaning",
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
        userId: "125",
        productId: "manteiga",
        quantity: 5,
        totalPrice: 15,
    },
];
//# sourceMappingURL=database.js.map