"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const types_1 = require("./types");
console.log("users", database_1.users, "products", database_1.products, "purchase", database_1.purchase);
function executeTest() {
    (0, database_1.createUser)('bruna', 'email@email.com', 'aaa');
    (0, database_1.getAllUsers)();
    (0, database_1.createProduct)('05', 'torrada', 5.0, types_1.category.FOOD);
    (0, database_1.getAllProducts)();
    (0, database_1.getProductById)('05');
    (0, database_1.getProductById)('100');
    (0, database_1.queryProductsByName)('p');
    (0, database_1.getAllPurchasesFromUserId)('124');
}
executeTest();
//# sourceMappingURL=index.js.map